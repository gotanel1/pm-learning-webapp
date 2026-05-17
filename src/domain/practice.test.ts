import { describe, expect, it } from "vitest";
import {
  getPracticeNote,
  normalizeSavedState,
  savePracticeNote,
} from "./practice";
import { DEFAULT_PREFERENCES } from "./preferences";
import { DEFAULT_PROFILE } from "./session";
import type { SavedState } from "./types";

const fallback: SavedState = {
  activeLessonId: "lesson-1",
  completedIds: [],
  completedMissionIds: [],
  xp: 0,
  streak: 1,
  practiceNotes: {},
  onboardingCompleted: false,
  preferences: DEFAULT_PREFERENCES,
  profile: DEFAULT_PROFILE,
};

describe("practice notes", () => {
  it("stores practice notes per lesson", () => {
    const withFirstNote = savePracticeNote(fallback, "lesson-1", "first note");
    const withSecondNote = savePracticeNote(
      withFirstNote,
      "lesson-2",
      "second note",
    );

    expect(getPracticeNote(withSecondNote, "lesson-1")).toBe("first note");
    expect(getPracticeNote(withSecondNote, "lesson-2")).toBe("second note");
  });

  it("returns an empty note for lessons without practice content", () => {
    expect(getPracticeNote(fallback, "lesson-99")).toBe("");
  });

  it("migrates legacy lastPractice into the active lesson note", () => {
    const migrated = normalizeSavedState(
      {
        activeLessonId: "lesson-2",
        completedIds: ["lesson-1"],
        xp: 20,
        streak: 2,
        lastPractice: "legacy note",
      },
      fallback,
    );

    expect(migrated.practiceNotes).toEqual({ "lesson-2": "legacy note" });
    expect(migrated.completedIds).toEqual(["lesson-1"]);
    expect(migrated.completedMissionIds).toEqual([]);
    expect(migrated.xp).toBe(20);
    expect(migrated.streak).toBe(2);
  });

  it("migrates saved onboarding state and preferences", () => {
    const migrated = normalizeSavedState(
      {
        activeLessonId: "lesson-1",
        onboardingCompleted: true,
        preferences: {
          experienceLevel: "builder",
          learningGoal: "build-own-product",
          dailyTarget: 3,
        },
      },
      fallback,
    );

    expect(migrated.onboardingCompleted).toBe(true);
    expect(migrated.preferences).toEqual({
      experienceLevel: "builder",
      learningGoal: "build-own-product",
      dailyTarget: 3,
    });
  });

  it("migrates old saved state without a profile to the default guest profile", () => {
    const migrated = normalizeSavedState(
      {
        activeLessonId: "lesson-1",
        completedIds: ["lesson-1"],
        xp: 20,
      },
      fallback,
    );

    expect(migrated.profile).toEqual(DEFAULT_PROFILE);
    expect(migrated.completedIds).toEqual(["lesson-1"]);
    expect(migrated.xp).toBe(20);
  });

  it("migrates saved mission completion ids and filters invalid values", () => {
    const migrated = normalizeSavedState(
      {
        activeLessonId: "lesson-1",
        completedMissionIds: ["lesson-1-mission", 42, null],
      },
      fallback,
    );

    expect(migrated.completedMissionIds).toEqual(["lesson-1-mission"]);
  });

  it("migrates a valid saved learner profile", () => {
    const migrated = normalizeSavedState(
      {
        activeLessonId: "lesson-1",
        profile: {
          userId: "user-123",
          displayName: "Tana",
          sessionMode: "authenticated",
        },
      },
      fallback,
    );

    expect(migrated.profile).toEqual({
      userId: "user-123",
      displayName: "Tana",
      sessionMode: "authenticated",
    });
  });
});
