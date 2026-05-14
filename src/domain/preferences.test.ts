import { describe, expect, it } from "vitest";
import {
  DEFAULT_PREFERENCES,
  completeOnboarding,
  normalizePreferences,
} from "./preferences";
import { DEFAULT_PROFILE } from "./session";
import type { SavedState } from "./types";

const baseState: SavedState = {
  activeLessonId: "lesson-1",
  completedIds: [],
  xp: 0,
  streak: 1,
  practiceNotes: {},
  onboardingCompleted: false,
  preferences: DEFAULT_PREFERENCES,
  profile: DEFAULT_PROFILE,
};

describe("user preferences", () => {
  it("uses default preferences when saved data is missing", () => {
    expect(normalizePreferences(undefined)).toEqual(DEFAULT_PREFERENCES);
  });

  it("keeps valid saved preferences", () => {
    expect(
      normalizePreferences({
        experienceLevel: "career-switcher",
        learningGoal: "work-with-tech-team",
        dailyTarget: 2,
      }),
    ).toEqual({
      experienceLevel: "career-switcher",
      learningGoal: "work-with-tech-team",
      dailyTarget: 2,
    });
  });

  it("falls back per field when saved preferences are invalid", () => {
    expect(
      normalizePreferences({
        experienceLevel: "expert",
        learningGoal: "build-own-product",
        dailyTarget: 99,
      }),
    ).toEqual({
      experienceLevel: DEFAULT_PREFERENCES.experienceLevel,
      learningGoal: "build-own-product",
      dailyTarget: DEFAULT_PREFERENCES.dailyTarget,
    });
  });

  it("marks onboarding complete and stores preferences", () => {
    const nextState = completeOnboarding(baseState, {
      experienceLevel: "junior",
      learningGoal: "improve-delivery",
      dailyTarget: 3,
    });

    expect(nextState.onboardingCompleted).toBe(true);
    expect(nextState.preferences).toEqual({
      experienceLevel: "junior",
      learningGoal: "improve-delivery",
      dailyTarget: 3,
    });
    expect(nextState.completedIds).toEqual([]);
  });
});
