import { describe, expect, it } from "vitest";
import { lessons } from "@/app/lessons";
import { buildChoices, getCorrectAnswerDistribution } from "./lessons";
import type { LessonSeed } from "./types";

const seed: LessonSeed = {
  id: "sample",
  title: "Sample",
  level: "Foundation",
  minutes: 5,
  xp: 20,
  theme: "Testing",
  objective: "Verify choice building",
  concept: "A lesson needs one correct answer.",
  coachNote: "Keep choices stable.",
  prompt: "Which option is correct?",
  answer: "Correct answer",
  answerFeedback: "That is correct.",
  distractors: [
    { text: "Wrong A", feedback: "Not this one." },
    { text: "Wrong B", feedback: "Not this one." },
    { text: "Wrong C", feedback: "Not this one." },
  ],
  practice: "Explain the answer.",
};

describe("lesson choice helpers", () => {
  it("builds choices with exactly one correct answer", () => {
    const choices = buildChoices(seed, 0);

    expect(choices).toHaveLength(4);
    expect(choices.filter((choice) => choice.correct)).toHaveLength(1);
    expect(choices[0]).toMatchObject({
      text: "Correct answer",
      correct: true,
      feedback: "That is correct.",
    });
  });

  it("distributes correct answers across the 30 lesson path", () => {
    expect(getCorrectAnswerDistribution(lessons)).toEqual({
      A: 8,
      B: 7,
      C: 8,
      D: 7,
    });
  });
});
