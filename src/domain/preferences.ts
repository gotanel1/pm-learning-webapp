import type {
  DailyTarget,
  ExperienceLevel,
  LearningGoal,
  SavedState,
  UserPreferences,
} from "./types";

export const DEFAULT_PREFERENCES: UserPreferences = {
  experienceLevel: "zero",
  learningGoal: "become-pm",
  dailyTarget: 1,
};

export const EXPERIENCE_LEVELS = [
  "zero",
  "junior",
  "career-switcher",
  "builder",
] as const satisfies readonly ExperienceLevel[];

export const LEARNING_GOALS = [
  "become-pm",
  "work-with-tech-team",
  "build-own-product",
  "improve-delivery",
] as const satisfies readonly LearningGoal[];

export const DAILY_TARGETS = [1, 2, 3] as const satisfies readonly DailyTarget[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includesValue<T extends readonly unknown[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return values.includes(value);
}

export function normalizePreferences(
  value: unknown,
  fallback: UserPreferences = DEFAULT_PREFERENCES,
): UserPreferences {
  if (!isRecord(value)) return fallback;

  return {
    experienceLevel: includesValue(EXPERIENCE_LEVELS, value.experienceLevel)
      ? value.experienceLevel
      : fallback.experienceLevel,
    learningGoal: includesValue(LEARNING_GOALS, value.learningGoal)
      ? value.learningGoal
      : fallback.learningGoal,
    dailyTarget: includesValue(DAILY_TARGETS, value.dailyTarget)
      ? value.dailyTarget
      : fallback.dailyTarget,
  };
}

export function completeOnboarding(
  state: SavedState,
  preferences: UserPreferences,
): SavedState {
  return {
    ...state,
    onboardingCompleted: true,
    preferences: normalizePreferences(preferences, state.preferences),
  };
}
