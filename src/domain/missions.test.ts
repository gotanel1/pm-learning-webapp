import { describe, expect, it } from "vitest";
import { buildScenarioMission, getCorrectMissionChoice } from "./missions";
import type { LessonSeed } from "./types";

const seed: LessonSeed = {
  id: "day-01-problem-vs-solution",
  title: "Day 1: Problem ≠ Solution",
  level: "Foundation",
  minutes: 5,
  xp: 20,
  theme: "Problem Thinking",
  objective: "แยกปัญหาออกจากวิธีแก้",
  concept: "Start from the problem.",
  coachNote: "Ask for the problem first.",
  prompt: "What should you ask first?",
  answer: "What problem are we solving?",
  answerFeedback: "Good.",
  distractors: [
    { text: "Which library?", feedback: "Too early." },
    { text: "Which color?", feedback: "Too early." },
    { text: "Which icon?", feedback: "Too early." },
  ],
  practice: "Rewrite a vague dashboard request as a problem statement.",
};

describe("scenario missions", () => {
  it("builds a stable mission from lesson seed content", () => {
    const mission = buildScenarioMission(seed, 0);

    expect(mission.id).toBe("day-01-problem-vs-solution-mission");
    expect(mission.title).toBe("Day 1: Problem ≠ Solution Mission");
    expect(mission.scenario).toBe(seed.practice);
    expect(mission.choices).toHaveLength(4);
  });

  it("creates exactly one correct mission choice", () => {
    const mission = buildScenarioMission(seed, 1);

    expect(mission.choices.filter((choice) => choice.correct)).toHaveLength(1);
    expect(getCorrectMissionChoice(mission)?.text).toContain(seed.theme);
  });

  it("keeps answer position deterministic across builds", () => {
    const firstBuild = buildScenarioMission(seed, 2);
    const secondBuild = buildScenarioMission(seed, 2);

    expect(firstBuild.choices).toEqual(secondBuild.choices);
  });
});
