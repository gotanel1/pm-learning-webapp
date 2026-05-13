export type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
};

export type Lesson = {
  id: string;
  title: string;
  level: string;
  minutes: number;
  xp: number;
  theme: string;
  objective: string;
  concept: string;
  coachNote: string;
  prompt: string;
  choices: Choice[];
  practice: string;
};

export type Distractor = {
  text: string;
  feedback: string;
};

export type LessonSeed = Omit<Lesson, "choices"> & {
  answer: string;
  answerFeedback: string;
  distractors: [Distractor, Distractor, Distractor];
};

export type SavedState = {
  activeLessonId: string;
  completedIds: string[];
  xp: number;
  streak: number;
  lastPractice: string;
};

export type AnswerLabel = "A" | "B" | "C" | "D";

export type AnswerDistribution = Record<AnswerLabel, number>;
