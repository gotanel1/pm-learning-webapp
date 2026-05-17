import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES } from "./preferences";
import {
  SAVED_STATE_SCHEMA_VERSION,
  fromPersistedStatePayload,
  toSavedStateEnvelope,
} from "./persistence-model";
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

describe("persistence model", () => {
  it("serializes saved state as versioned envelope", () => {
    const envelope = toSavedStateEnvelope(
      { ...fallback, xp: 42 },
      "2026-05-17T00:00:00.000Z",
    );

    expect(envelope).toEqual({
      schemaVersion: SAVED_STATE_SCHEMA_VERSION,
      savedAt: "2026-05-17T00:00:00.000Z",
      data: { ...fallback, xp: 42 },
    });
  });

  it("restores state from a valid versioned envelope", () => {
    const restored = fromPersistedStatePayload(
      {
        schemaVersion: SAVED_STATE_SCHEMA_VERSION,
        savedAt: "2026-05-17T00:00:00.000Z",
        data: {
          activeLessonId: "lesson-3",
          completedIds: ["lesson-1", "lesson-2"],
          completedMissionIds: ["lesson-1-mission"],
          xp: 55,
          streak: 3,
          practiceNotes: { "lesson-3": "note" },
          onboardingCompleted: true,
          preferences: DEFAULT_PREFERENCES,
          profile: DEFAULT_PROFILE,
        },
      },
      fallback,
    );

    expect(restored.activeLessonId).toBe("lesson-3");
    expect(restored.completedIds).toEqual(["lesson-1", "lesson-2"]);
    expect(restored.completedMissionIds).toEqual(["lesson-1-mission"]);
    expect(restored.xp).toBe(55);
  });

  it("supports legacy raw saved-state payloads for migration", () => {
    const restored = fromPersistedStatePayload(
      {
        activeLessonId: "lesson-2",
        completedIds: ["lesson-1"],
        xp: 20,
      },
      fallback,
    );

    expect(restored.activeLessonId).toBe("lesson-2");
    expect(restored.completedIds).toEqual(["lesson-1"]);
    expect(restored.completedMissionIds).toEqual([]);
  });

  it("falls back when payload is invalid", () => {
    expect(fromPersistedStatePayload("bad", fallback)).toBe(fallback);
  });
});
