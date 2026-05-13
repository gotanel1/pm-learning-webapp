import { describe, expect, it } from "vitest";
import { completeLesson } from "./rewards";
import type { SavedState } from "./types";

const baseState: SavedState = {
  activeLessonId: "lesson-1",
  completedIds: [],
  xp: 0,
  streak: 1,
  practiceNotes: {},
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
