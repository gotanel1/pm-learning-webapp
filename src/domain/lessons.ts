import type {
  AnswerDistribution,
  AnswerLabel,
  Choice,
  Lesson,
  LessonSeed,
} from "./types";

const answerLabels: AnswerLabel[] = ["A", "B", "C", "D"];
const correctAnswerSlots = [0, 2, 3, 1] as const;

export function buildChoices(lesson: LessonSeed, lessonIndex: number): Choice[] {
  const { answer, answerFeedback, distractors } = lesson;

  const choices: Choice[] = distractors.map((distractor) => ({
    text: distractor.text,
    correct: false,
    feedback: distractor.feedback,
  }));

  choices.splice(correctAnswerSlots[lessonIndex % correctAnswerSlots.length], 0, {
    text: answer,
    correct: true,
    feedback: answerFeedback,
  });

  return choices;
}

export function getCorrectAnswerDistribution(
  lessons: Pick<Lesson, "choices">[],
): AnswerDistribution {
  return lessons.reduce<AnswerDistribution>(
    (distribution, lesson) => {
      const correctIndex = lesson.choices.findIndex((choice) => choice.correct);
      if (correctIndex < 0) return distribution;

      distribution[answerLabels[correctIndex]] += 1;
      return distribution;
    },
    { A: 0, B: 0, C: 0, D: 0 },
  );
}
