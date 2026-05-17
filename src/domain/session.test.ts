import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES } from "./preferences";
import {
  DEFAULT_PROFILE,
  normalizeLearnerProfile,
  updateLearnerProfile,
} from "./session";
import type { SavedState } from "./types";

const baseState: SavedState = {
  activeLessonId: "lesson-1",
  completedIds: ["lesson-1"],
  completedMissionIds: ["lesson-1-mission"],
  xp: 20,
  streak: 1,
  practiceNotes: { "lesson-1": "practice note" },
  onboardingCompleted: true,
  preferences: DEFAULT_PREFERENCES,
  profile: DEFAULT_PROFILE,
};

describe("learner session", () => {
  it("uses the default profile when saved data is missing", () => {
    expect(normalizeLearnerProfile(undefined)).toEqual(DEFAULT_PROFILE);
  });

  it("keeps a valid saved profile", () => {
    expect(
      normalizeLearnerProfile({
        userId: "user-123",
        displayName: "Tana",
        sessionMode: "authenticated",
      }),
    ).toEqual({
      userId: "user-123",
      displayName: "Tana",
      sessionMode: "authenticated",
    });
  });

  it("falls back per field when saved profile data is invalid", () => {
    expect(
      normalizeLearnerProfile({
        userId: "",
        displayName: "  ",
        sessionMode: "unknown",
      }),
    ).toEqual(DEFAULT_PROFILE);
  });

  it("updates display name without changing learning progress", () => {
    const nextState = updateLearnerProfile(baseState, {
      displayName: "Product Tana",
    });

    expect(nextState.profile).toEqual({
      ...DEFAULT_PROFILE,
      displayName: "Product Tana",
    });
    expect(nextState.completedIds).toEqual(baseState.completedIds);
    expect(nextState.completedMissionIds).toEqual(
      baseState.completedMissionIds,
    );
    expect(nextState.xp).toBe(baseState.xp);
    expect(nextState.streak).toBe(baseState.streak);
    expect(nextState.preferences).toBe(baseState.preferences);
    expect(nextState.practiceNotes).toBe(baseState.practiceNotes);
  });
});
