import { describe, expect, it } from "vitest";
import { lessons } from "@/app/lessons";
import { completeOnboarding } from "./preferences";
import { isLessonUnlocked, canMoveNext } from "./progress";
import { completeLesson } from "./rewards";
import { DEFAULT_PROFILE, updateLearnerProfile } from "./session";
import { DEFAULT_PREFERENCES } from "./preferences";
import { getPracticeNote, savePracticeNote } from "./practice";
import type { SavedState } from "./types";

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

describe("first-run learning flow smoke", () => {
  it("moves from onboarding to first completion without losing local state", () => {
    const onboarded = completeOnboarding(starterState, {
      experienceLevel: "zero",
      learningGoal: "become-pm",
      dailyTarget: 1,
    });
    const firstLesson = lessons[0];
    const secondLesson = lessons[1];
    const correctChoice = firstLesson.choices.find((choice) => choice.correct);

    expect(onboarded.onboardingCompleted).toBe(true);
    expect(isLessonUnlocked(0, onboarded.completedIds, lessons)).toBe(true);
    expect(isLessonUnlocked(1, onboarded.completedIds, lessons)).toBe(false);
    expect(correctChoice).toBeDefined();
    expect(canMoveNext(correctChoice ?? null, false)).toBe(true);

    const completed = completeLesson(onboarded, firstLesson);
    const withPractice = savePracticeNote(
      completed,
      firstLesson.id,
      "Practice answer for a first-time learner.",
    );
    const renamed = updateLearnerProfile(withPractice, {
      displayName: "Product Tana",
    });

    expect(renamed.completedIds).toEqual([firstLesson.id]);
    expect(renamed.xp).toBe(firstLesson.xp);
    expect(isLessonUnlocked(1, renamed.completedIds, lessons)).toBe(true);
    expect(renamed.activeLessonId).toBe(firstLesson.id);
    expect(secondLesson.id).not.toBe(firstLesson.id);
    expect(getPracticeNote(renamed, firstLesson.id)).toContain("Practice");
    expect(renamed.profile.displayName).toBe("Product Tana");
  });
});
