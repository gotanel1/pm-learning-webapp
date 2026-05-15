"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/domain/analytics";
import {
  canMoveNext,
  getProgressPercent,
  isLessonUnlocked,
} from "@/domain/progress";
import {
  getPracticeNote,
  normalizeSavedState,
  savePracticeNote,
} from "@/domain/practice";
import {
  DEFAULT_PREFERENCES,
  completeOnboarding,
} from "@/domain/preferences";
import { completeLesson } from "@/domain/rewards";
import {
  DEFAULT_PROFILE,
  normalizeLearnerProfile,
  updateLearnerProfile,
} from "@/domain/session";
import type {
  AnswerLabel,
  DailyTarget,
  ExperienceLevel,
  LearningGoal,
  SavedState,
  UserPreferences,
} from "@/domain/types";
import { lessons, type Lesson } from "./lessons";

const STORAGE_KEY = "pm-duolingo-progress-v2";
const ANSWER_LABELS = ["A", "B", "C", "D"] as const satisfies readonly AnswerLabel[];

const starterState: SavedState = {
  activeLessonId: lessons[0].id,
  completedIds: [],
  xp: 0,
  streak: 1,
  practiceNotes: {},
  onboardingCompleted: false,
  preferences: DEFAULT_PREFERENCES,
  profile: DEFAULT_PROFILE,
};

const experienceOptions: Array<{
  value: ExperienceLevel;
  title: string;
  description: string;
}> = [
  {
    value: "zero",
    title: "เริ่มจากศูนย์",
    description: "ยังไม่รู้ศัพท์ PM และอยากปูพื้นแบบใจเย็น",
  },
  {
    value: "junior",
    title: "Junior PM",
    description: "พอรู้ภาพรวม แต่อยากฝึก decision และเอกสารให้คมขึ้น",
  },
  {
    value: "career-switcher",
    title: "ย้ายสาย",
    description: "มาจากสายอื่น และอยากเข้าใจงาน PM แบบใช้งานจริง",
  },
  {
    value: "builder",
    title: "Founder / Developer",
    description: "อยากคุยกับทีม product/tech ให้เข้าใจกันมากขึ้น",
  },
];

const goalOptions: Array<{
  value: LearningGoal;
  title: string;
  description: string;
}> = [
  {
    value: "become-pm",
    title: "เป็น PM มืออาชีพ",
    description: "ฝึก mindset, requirement, roadmap และการตัดสินใจ",
  },
  {
    value: "work-with-tech-team",
    title: "ทำงานกับทีม Tech",
    description: "เขียน requirement และ handoff ให้ทีม dev เข้าใจง่าย",
  },
  {
    value: "build-own-product",
    title: "สร้าง product ของตัวเอง",
    description: "แปลง idea ให้เป็น MVP และ roadmap ที่ทำต่อได้",
  },
  {
    value: "improve-delivery",
    title: "ส่งมอบงานให้ดีขึ้น",
    description: "โฟกัส prioritization, risk, QA และ release planning",
  },
];

const dailyTargetOptions: Array<{
  value: DailyTarget;
  title: string;
  description: string;
}> = [
  {
    value: 1,
    title: "1 บท / วัน",
    description: "เหมาะกับการเริ่มนิสัยเรียนแบบไม่กดดัน",
  },
  {
    value: 2,
    title: "2 บท / วัน",
    description: "เดินเร็วขึ้น แต่ยังมีเวลาทำ practice note",
  },
  {
    value: 3,
    title: "3 บท / วัน",
    description: "โหมดเร่งพื้นฐานสำหรับคนอยากเห็นภาพรวมไว",
  },
];

function loadInitialState(): SavedState {
  if (typeof window === "undefined") return starterState;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved
      ? normalizeSavedState(JSON.parse(saved), starterState)
      : starterState;
  } catch (error) {
    console.warn("Failed to load saved progress.", error);
    return starterState;
  }
}

function getInitials(title: string) {
  return title
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAnswerLabel(index: number): AnswerLabel {
  return ANSWER_LABELS[index] ?? "A";
}

export default function Home() {
  const [state, setState] = useState<SavedState>(starterState);
  const [hasLoadedSavedState, setHasLoadedSavedState] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draftPreferences, setDraftPreferences] = useState<UserPreferences>(
    starterState.preferences,
  );
  const [draftDisplayName, setDraftDisplayName] = useState(
    starterState.profile.displayName,
  );

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;

      const savedState = loadInitialState();
      setState(savedState);
      setDraftPreferences(savedState.preferences);
      setDraftDisplayName(savedState.profile.displayName);
      setHasLoadedSavedState(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedState) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to save progress.", error);
    }
  }, [hasLoadedSavedState, state]);

  const completedSet = useMemo(
    () => new Set(state.completedIds),
    [state.completedIds],
  );
  const activeLesson =
    lessons.find((lesson) => lesson.id === state.activeLessonId) ?? lessons[0];
  const activeIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const totalLessons = lessons.length;
  const completedCount = state.completedIds.length;
  const selectedChoice =
    selectedIndex === null ? null : activeLesson.choices[selectedIndex];
  const progressPercent = getProgressPercent(completedCount, totalLessons);
  const canGoNext = canMoveNext(
    selectedChoice,
    completedSet.has(activeLesson.id),
  );
  const activePracticeNote = getPracticeNote(state, activeLesson.id);

  function selectLesson(lesson: Lesson) {
    const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
    const isUnlocked = isLessonUnlocked(
      lessonIndex,
      state.completedIds,
      lessons,
    );
    if (!isUnlocked) return;
    setState((current) => ({ ...current, activeLessonId: lesson.id }));
    setSelectedIndex(null);
    trackEvent("lesson_selected", {
      userId: state.profile.userId,
      sessionMode: state.profile.sessionMode,
      lessonId: lesson.id,
      lessonIndex,
      completedCount,
      xp: state.xp,
    });
  }

  function answer(index: number) {
    setSelectedIndex(index);
    const choice = activeLesson.choices[index];
    const answerCorrect = choice.correct;
    const wasCompleted = completedSet.has(activeLesson.id);

    trackEvent("quiz_answered", {
      userId: state.profile.userId,
      sessionMode: state.profile.sessionMode,
      lessonId: activeLesson.id,
      lessonIndex: activeIndex,
      completedCount,
      xp: state.xp,
      answerCorrect,
      answerLabel: getAnswerLabel(index),
    });

    if (!answerCorrect || wasCompleted) return;

    const nextState = completeLesson(state, activeLesson);
    setState(nextState);
    trackEvent("lesson_completed", {
      userId: nextState.profile.userId,
      sessionMode: nextState.profile.sessionMode,
      lessonId: activeLesson.id,
      lessonIndex: activeIndex,
      completedCount: nextState.completedIds.length,
      xp: nextState.xp,
    });
  }

  function goNext() {
    const nextLesson = lessons[Math.min(activeIndex + 1, lessons.length - 1)];
    setState((current) => ({ ...current, activeLessonId: nextLesson.id }));
    setSelectedIndex(null);
    trackEvent("next_lesson_clicked", {
      userId: state.profile.userId,
      sessionMode: state.profile.sessionMode,
      lessonId: activeLesson.id,
      targetLessonId: nextLesson.id,
      lessonIndex: activeIndex,
      completedCount,
      xp: state.xp,
    });
  }

  function resetProgress() {
    trackEvent("progress_reset", {
      userId: state.profile.userId,
      sessionMode: state.profile.sessionMode,
      completedCount,
      xp: state.xp,
    });
    setState(starterState);
    setDraftPreferences(DEFAULT_PREFERENCES);
    setDraftDisplayName(DEFAULT_PROFILE.displayName);
    setSelectedIndex(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to reset saved progress.", error);
    }
  }

  function savePractice(value: string) {
    setState((current) => savePracticeNote(current, activeLesson.id, value));
    trackEvent("practice_note_updated", {
      userId: state.profile.userId,
      sessionMode: state.profile.sessionMode,
      lessonId: activeLesson.id,
      lessonIndex: activeIndex,
      completedCount,
      xp: state.xp,
      practiceNoteLength: value.length,
    });
  }

  function updatePreference<Key extends keyof UserPreferences>(
    key: Key,
    value: UserPreferences[Key],
  ) {
    setDraftPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function finishOnboarding() {
    const nextState = completeOnboarding(state, draftPreferences);
    setState(nextState);
    trackEvent("onboarding_completed", {
      userId: nextState.profile.userId,
      sessionMode: nextState.profile.sessionMode,
      completedCount: nextState.completedIds.length,
      xp: nextState.xp,
    });
  }

  function editOnboarding() {
    setDraftPreferences(state.preferences);
    setState((current) => ({ ...current, onboardingCompleted: false }));
    setSelectedIndex(null);
  }

  function saveDisplayName() {
    const nextProfile = normalizeLearnerProfile(
      { ...state.profile, displayName: draftDisplayName },
      state.profile,
    );
    const nextState = updateLearnerProfile(state, {
      displayName: nextProfile.displayName,
    });
    setDraftDisplayName(nextProfile.displayName);
    setState(nextState);
    trackEvent("profile_updated", {
      userId: nextState.profile.userId,
      sessionMode: nextState.profile.sessionMode,
      completedCount: nextState.completedIds.length,
      xp: nextState.xp,
      displayName: nextState.profile.displayName,
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(27,212,111,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_36%),linear-gradient(180deg,#07111f_0%,#0b1220_45%,#08131e_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:44px_44px]" />

        <header className="relative z-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-400 text-2xl font-black text-slate-950 shadow-lg shadow-lime-400/25">
              PM
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime-200">
                Developer → PM Trainer
              </p>
              <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                PM Quest — 30 วันฝึกเป็น PM
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center sm:flex sm:items-center">
            <div className="col-span-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-2 text-left sm:col-span-1">
              <p className="max-w-40 truncate text-sm font-black leading-none">
                {state.profile.displayName}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sky-100/70">
                {state.profile.sessionMode === "guest"
                  ? "Guest mode"
                  : "Authenticated"}
              </p>
            </div>
            <Stat label="XP" value={state.xp.toString()} tone="green" />
            <Stat label="Streak" value={`${state.streak} วัน`} tone="orange" />
            <Stat label="Progress" value={`${completedCount}/${totalLessons}`} tone="blue" />
          </div>
        </header>

        {!state.onboardingCompleted ? (
          <OnboardingPanel
            preferences={draftPreferences}
            onChange={updatePreference}
            onComplete={finishOnboarding}
          />
        ) : (
        <div className="relative z-10 mt-5 grid flex-1 gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">Learning Path</h2>
                <p className="text-sm text-slate-300">30 บท · ปูพื้น PM → UX → Tech Bridge</p>
              </div>
              <button
                type="button"
                onClick={resetProgress}
                data-testid="reset-progress-button"
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300 transition hover:border-rose-300/60 hover:text-rose-200"
              >
                Reset
              </button>
            </div>

            <div className="max-h-[72vh] space-y-3 overflow-y-auto pr-1">
              {lessons.map((lesson, index) => {
                const isDone = completedSet.has(lesson.id);
                const isUnlocked = isLessonUnlocked(
                  index,
                  state.completedIds,
                  lessons,
                );
                const isActive = lesson.id === activeLesson.id;
                return (
                  <button
                    type="button"
                    key={lesson.id}
                    onClick={() => selectLesson(lesson)}
                    disabled={!isUnlocked}
                    data-testid={`lesson-button-${lesson.id}`}
                    className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      isActive
                        ? "border-lime-300/70 bg-lime-300/15 shadow-lg shadow-lime-300/10"
                        : isUnlocked
                          ? "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
                          : "border-white/5 bg-white/[0.02] opacity-45"
                    }`}
                  >
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black ${
                        isDone
                          ? "bg-lime-400 text-slate-950"
                          : isUnlocked
                            ? "bg-white/10 text-white"
                            : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isDone ? "✓" : isUnlocked ? getInitials(lesson.title) : "🔒"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{lesson.title}</p>
                      <p className="truncate text-xs text-slate-300">
                        {lesson.level} · {lesson.minutes} นาที · {lesson.xp} XP
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="grid gap-5 xl:grid-cols-[1fr_330px]">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-lime-200">{activeLesson.theme}</p>
                  <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-slate-300">
                    {activeLesson.objective}
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-200">
                    Lesson {activeIndex + 1} / {totalLessons}
                  </p>
                </div>
                <div className="rounded-2xl border border-lime-300/25 bg-lime-300/10 px-4 py-3 text-center">
                  <p className="text-2xl font-black text-lime-200">+{activeLesson.xp}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-lime-100/70">
                    XP
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-sky-200">
                    Concept
                  </p>
                  <p className="leading-7 text-slate-100">{activeLesson.concept}</p>
                </div>
                <div className="rounded-3xl border border-amber-200/20 bg-amber-300/10 p-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-amber-100">
                    Coach Note
                  </p>
                  <p className="leading-7 text-amber-50/90">{activeLesson.coachNote}</p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-400 text-lg font-black text-slate-950">
                    ?
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-200">
                      Question
                    </p>
                    <h3 className="text-lg font-black">เริ่มตั้งคำถามแบบ PM</h3>
                  </div>
                </div>

                <p className="mb-4 text-lg font-bold leading-8 text-white">
                  {activeLesson.prompt}
                </p>

                <div className="grid gap-3">
                  {activeLesson.choices.map((choice, index) => {
                    const isSelected = selectedIndex === index;
                    const showCorrect = selectedIndex !== null && choice.correct;
                    const showWrong = isSelected && !choice.correct;
                    return (
                      <button
                        type="button"
                        key={choice.text}
                        onClick={() => answer(index)}
                        data-testid={`quiz-choice-${String.fromCharCode(65 + index)}`}
                        className={`rounded-2xl border p-4 text-left font-bold transition ${
                          showCorrect
                            ? "border-lime-300 bg-lime-300/20 text-lime-50"
                            : showWrong
                              ? "border-rose-300 bg-rose-400/20 text-rose-50"
                              : isSelected
                                ? "border-sky-300 bg-sky-400/15"
                                : "border-white/10 bg-slate-950/35 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-full bg-white/10 text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {choice.text}
                      </button>
                    );
                  })}
                </div>

                {selectedChoice ? (
                  <div
                    className={`mt-4 rounded-2xl border p-4 ${
                      selectedChoice.correct
                        ? "border-lime-300/40 bg-lime-300/15"
                        : "border-rose-300/40 bg-rose-300/15"
                    }`}
                  >
                    <p className="font-black">
                      {selectedChoice.correct ? "ถูกต้อง ✅" : "ยังไม่ใช่ ❌"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-100">
                      {selectedChoice.feedback}
                    </p>
                  </div>
                ) : null}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-300">
                    ตอบถูกเพื่อเก็บ XP และปลดล็อกบทถัดไป
                  </p>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext || activeIndex === lessons.length - 1}
                    data-testid="next-lesson-button"
                    className="rounded-full bg-lime-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300 disabled:shadow-none"
                  >
                    ไปบทถัดไป →
                  </button>
                </div>
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-200">
                  Practice
                </p>
                <h3 className="mt-2 text-xl font-black">โจทย์ลงมือทำ</h3>
                <p className="mt-3 leading-7 text-slate-200">{activeLesson.practice}</p>
                <textarea
                  value={activePracticeNote}
                  onChange={(event) => savePractice(event.target.value)}
                  placeholder="พิมพ์คำตอบ/โน้ตของคุณตรงนี้ ระบบจะจำไว้ในเครื่องนี้"
                  className="mt-4 min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-white outline-none ring-lime-300/30 placeholder:text-slate-500 focus:border-lime-300/60 focus:ring-4"
                />
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">
                  Guest Profile
                </p>
                <h3 className="mt-2 text-xl font-black">โปรไฟล์ในเครื่องนี้</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Progress ของ guest จะถูกเก็บไว้ใน browser เครื่องนี้จนกว่าจะมีระบบ login จริง
                </p>
                <label className="mt-4 block text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Display name
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={draftDisplayName}
                    onChange={(event) => setDraftDisplayName(event.target.value)}
                    onBlur={saveDisplayName}
                    data-testid="display-name-input"
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-bold text-white outline-none ring-cyan-300/30 placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4"
                    placeholder="PM Learner"
                  />
                  <button
                    type="button"
                    onClick={saveDisplayName}
                    data-testid="save-display-name-button"
                    className="rounded-full bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-200">
                  Learner Plan
                </p>
                <h3 className="mt-2 text-xl font-black">
                  {getLearningGoalTitle(state.preferences.learningGoal)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  ระดับ: {getExperienceTitle(state.preferences.experienceLevel)}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  เป้าหมายวันนี้: {state.preferences.dailyTarget} บทเรียน
                </p>
                <button
                  type="button"
                  onClick={editOnboarding}
                  data-testid="edit-onboarding-button"
                  className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm font-black text-slate-200 transition hover:border-sky-200/60 hover:text-sky-100"
                >
                  ปรับแผนเรียน
                </button>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-200">
                  30-Day Mission
                </p>
                <h3 className="mt-2 text-xl font-black">ภารกิจวันนี้</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <MissionItem done={state.completedIds.length >= 1} text="จบบทเรียนอย่างน้อย 1 บท" />
                  <MissionItem done={activePracticeNote.length >= 80} text="เขียน practice note อย่างน้อย 80 ตัวอักษร" />
                  <MissionItem done={progressPercent >= 30} text="ทำ path ให้ครบ 30% (9 บทแรก)" />
                </ul>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-5">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-200">
                  Next Build Ideas
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  <li>• ต่อ AI grader ตรวจ PRD และ Practice Box</li>
                  <li>• เพิ่ม badge/achievement ตาม milestone</li>
                  <li>• เพิ่ม daily streak ตามวันที่จริง</li>
                  <li>• เชื่อม account/backend เพื่อ sync ข้ามเครื่อง</li>
                </ul>
              </div>
            </aside>
          </section>
        </div>
        )}
      </section>
    </main>
  );
}

function getExperienceTitle(value: ExperienceLevel) {
  return (
    experienceOptions.find((option) => option.value === value)?.title ??
    experienceOptions[0].title
  );
}

function getLearningGoalTitle(value: LearningGoal) {
  return (
    goalOptions.find((option) => option.value === value)?.title ??
    goalOptions[0].title
  );
}

function OnboardingPanel({
  preferences,
  onChange,
  onComplete,
}: {
  preferences: UserPreferences;
  onChange: <Key extends keyof UserPreferences>(
    key: Key,
    value: UserPreferences[Key],
  ) => void;
  onComplete: () => void;
}) {
  return (
    <section className="relative z-10 mt-5 grid flex-1 gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-200">
            Onboarding
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight sm:text-6xl">
            ตั้งแผนเรียน PM ที่เข้ากับคุณ
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
            รอบนี้เราจะใช้ข้อมูลแค่ 3 อย่างเพื่อจัดจังหวะการเรียนในเครื่องนี้:
            ระดับพื้นฐาน เป้าหมาย และจำนวนบทเรียนต่อวัน
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Stat label="Path" value="30 วัน" tone="blue" />
          <Stat label="Daily" value={`${preferences.dailyTarget} บท`} tone="green" />
          <Stat label="Mode" value="MVP" tone="orange" />
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl sm:p-6">
        <PreferenceGroup
          title="พื้นฐานตอนนี้"
          options={experienceOptions}
          selected={preferences.experienceLevel}
          onSelect={(value) => onChange("experienceLevel", value)}
        />
        <PreferenceGroup
          title="เป้าหมายหลัก"
          options={goalOptions}
          selected={preferences.learningGoal}
          onSelect={(value) => onChange("learningGoal", value)}
        />
        <PreferenceGroup
          title="จังหวะเรียนต่อวัน"
          options={dailyTargetOptions}
          selected={preferences.dailyTarget}
          onSelect={(value) => onChange("dailyTarget", value)}
        />

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-300">
            เริ่มด้วยบทแรกได้ทันที และปรับแผนนี้ใหม่ภายหลังได้จาก Learner Plan
          </p>
          <button
            type="button"
            onClick={onComplete}
            data-testid="start-learning-button"
            className="rounded-full bg-lime-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            เริ่มเรียนบทแรก →
          </button>
        </div>
      </div>
    </section>
  );
}

function PreferenceGroup<T extends string | number>({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: Array<{ value: T; title: string; description: string }>;
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <section className="border-b border-white/10 py-5 first:pt-0 last:border-b-0">
      <h3 className="text-sm font-black uppercase tracking-[0.22em] text-sky-200">
        {title}
      </h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => onSelect(option.value)}
            data-testid={`preference-option-${option.value}`}
            className={`rounded-2xl border p-4 text-left transition ${
              selected === option.value
                ? "border-lime-300/70 bg-lime-300/15 shadow-lg shadow-lime-300/10"
                : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
            }`}
          >
            <span className="block text-base font-black text-white">
              {option.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-300">
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "orange" | "blue";
}) {
  const tones = {
    green: "border-lime-300/25 bg-lime-300/10 text-lime-100",
    orange: "border-orange-300/25 bg-orange-300/10 text-orange-100",
    blue: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  };
  return (
    <div className={`rounded-2xl border px-4 py-2 ${tones[tone]}`}>
      <p className="text-lg font-black leading-none">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest opacity-70">
        {label}
      </p>
    </div>
  );
}

function MissionItem({ done, text }: { done: boolean; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-black ${
          done ? "bg-lime-400 text-slate-950" : "bg-white/10 text-slate-400"
        }`}
      >
        {done ? "✓" : ""}
      </span>
      <span className={done ? "text-lime-100" : "text-slate-300"}>{text}</span>
    </li>
  );
}
