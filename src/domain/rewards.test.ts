import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES } from "./preferences";
import {
  MISSION_COMPLETION_XP,
  completeLesson,
  completeMission,
} from "./rewards";
import { DEFAULT_PROFILE } from "./session";
import type { SavedState } from "./types";

const baseState: SavedState = {
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

describe("reward rules", () => {
  it("adds completed lesson id and XP on first completion", () => {
    const nextState = completeLesson(baseState, { id: "lesson-1", xp: 20 });

    expect(nextState.completedIds).toEqual(["lesson-1"]);
    expect(nextState.xp).toBe(20);
    expect(nextState.streak).toBe(1);
  });

  it("does not add duplicate XP for an already completed lesson", () => {
    const completedState: SavedState = {
      ...baseState,
      completedIds: ["lesson-1"],
      xp: 20,
      streak: 1,
    };

    const nextState = completeLesson(completedState, { id: "lesson-1", xp: 20 });

    expect(nextState).toBe(completedState);
    expect(nextState.completedIds).toEqual(["lesson-1"]);
    expect(nextState.xp).toBe(20);
  });

  it("adds completed mission id and mission XP on first mission completion", () => {
    const nextState = completeMission(baseState, { id: "lesson-1-mission" });

    expect(nextState.completedMissionIds).toEqual(["lesson-1-mission"]);
    expect(nextState.xp).toBe(MISSION_COMPLETION_XP);
    expect(nextState.completedIds).toEqual([]);
  });

  it("does not add duplicate XP for an already completed mission", () => {
    const completedState: SavedState = {
      ...baseState,
      completedMissionIds: ["lesson-1-mission"],
      xp: MISSION_COMPLETION_XP,
    };

    const nextState = completeMission(completedState, { id: "lesson-1-mission" });

    expect(nextState).toBe(completedState);
    expect(nextState.completedMissionIds).toEqual(["lesson-1-mission"]);
    expect(nextState.xp).toBe(MISSION_COMPLETION_XP);
  });

  it("keeps streak at least as high as completed lesson count", () => {
    const nextState = completeLesson(
      {
        ...baseState,
        completedIds: ["lesson-1", "lesson-2"],
        streak: 1,
      },
      { id: "lesson-3", xp: 30 },
    );

    expect(nextState.streak).toBe(3);
  });
});
