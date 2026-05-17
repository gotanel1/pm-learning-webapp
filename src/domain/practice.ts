import type { SavedState } from "./types";
import { normalizePreferences } from "./preferences";
import { normalizeLearnerProfile } from "./session";

type LegacySavedState = Partial<SavedState> & {
  lastPractice?: unknown;
  practiceNotes?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePracticeNotes(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

export function normalizeSavedState(
  value: unknown,
  fallback: SavedState,
): SavedState {
  if (!isRecord(value)) return fallback;

  const saved = value as LegacySavedState;
  const activeLessonId =
    typeof saved.activeLessonId === "string"
      ? saved.activeLessonId
      : fallback.activeLessonId;
  const practiceNotes = normalizePracticeNotes(saved.practiceNotes);

  if (
    Object.keys(practiceNotes).length === 0 &&
    typeof saved.lastPractice === "string" &&
    saved.lastPractice.length > 0
  ) {
    practiceNotes[activeLessonId] = saved.lastPractice;
  }

  return {
    activeLessonId,
    completedIds: Array.isArray(saved.completedIds)
      ? saved.completedIds.filter((id): id is string => typeof id === "string")
      : fallback.completedIds,
    completedMissionIds: Array.isArray(saved.completedMissionIds)
      ? saved.completedMissionIds.filter(
          (id): id is string => typeof id === "string",
        )
      : fallback.completedMissionIds,
    xp: typeof saved.xp === "number" ? saved.xp : fallback.xp,
    streak: typeof saved.streak === "number" ? saved.streak : fallback.streak,
    practiceNotes,
    onboardingCompleted:
      typeof saved.onboardingCompleted === "boolean"
        ? saved.onboardingCompleted
        : fallback.onboardingCompleted,
    preferences: normalizePreferences(saved.preferences, fallback.preferences),
    profile: normalizeLearnerProfile(saved.profile, fallback.profile),
  };
}

export function getPracticeNote(
  state: Pick<SavedState, "practiceNotes">,
  lessonId: string,
): string {
  return state.practiceNotes[lessonId] ?? "";
}

export function savePracticeNote(
  state: SavedState,
  lessonId: string,
  value: string,
): SavedState {
  return {
    ...state,
    practiceNotes: {
      ...state.practiceNotes,
      [lessonId]: value,
    },
  };
}
