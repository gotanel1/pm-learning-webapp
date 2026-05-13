import { describe, expect, it } from "vitest";
import { canMoveNext, getProgressPercent, isLessonUnlocked } from "./progress";
import type { Choice, Lesson } from "./types";

const lessons = [
  { id: "lesson-1" },
  { id: "lesson-2" },
  { id: "lesson-3" },
] satisfies Pick<Lesson, "id">[];

const correctChoice: Choice = {
  text: "Correct",
  correct: true,
  feedback: "Good choice.",
};

const wrongChoice: Choice = {
  text: "Wrong",
  correct: false,
  feedback: "Try again.",
};

describe("progress rules", () => {
  it("always unlocks the first lesson", () => {
    expect(isLessonUnlocked(0, [], lessons)).toBe(true);
  });

  it("unlocks the next lesson when the previous lesson is completed", () => {
    expect(isLessonUnlocked(1, ["lesson-1"], lessons)).toBe(true);
  });

  it("keeps a lesson locked when the previous lesson is incomplete", () => {
    expect(isLessonUnlocked(2, ["lesson-1"], lessons)).toBe(false);
  });

  it("calculates rounded progress percent", () => {
    expect(getProgressPercent(1, 3)).toBe(33);
    expect(getProgressPercent(2, 3)).toBe(67);
    expect(getProgressPercent(0, 0)).toBe(0);
  });

  it("allows moving next after a correct answer or completed lesson", () => {
    expect(canMoveNext(correctChoice, false)).toBe(true);
    expect(canMoveNext(wrongChoice, true)).toBe(true);
    expect(canMoveNext(wrongChoice, false)).toBe(false);
    expect(canMoveNext(null, false)).toBe(false);
  });
});
