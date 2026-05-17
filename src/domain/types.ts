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
  mission: ScenarioMission;
};

export type MissionChoice = {
  text: string;
  correct: boolean;
  feedback: string;
};

export type ScenarioMission = {
  id: string;
  title: string;
  scenario: string;
  prompt: string;
  choices: [MissionChoice, MissionChoice, MissionChoice, MissionChoice];
};

export type Distractor = {
  text: string;
  feedback: string;
};

export type LessonSeed = Omit<Lesson, "choices" | "mission"> & {
  answer: string;
  answerFeedback: string;
  distractors: [Distractor, Distractor, Distractor];
};

export type SavedState = {
  activeLessonId: string;
  completedIds: string[];
  completedMissionIds: string[];
  xp: number;
  streak: number;
  practiceNotes: Record<string, string>;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  profile: LearnerProfile;
};

export type AnswerLabel = "A" | "B" | "C" | "D";

export type AnswerDistribution = Record<AnswerLabel, number>;

export type ExperienceLevel = "zero" | "junior" | "career-switcher" | "builder";

export type LearningGoal =
  | "become-pm"
  | "work-with-tech-team"
  | "build-own-product"
  | "improve-delivery";

export type DailyTarget = 1 | 2 | 3;

export type UserPreferences = {
  experienceLevel: ExperienceLevel;
  learningGoal: LearningGoal;
  dailyTarget: DailyTarget;
};

export type SessionMode = "guest" | "authenticated";

export type LearnerProfile = {
  userId: string;
  displayName: string;
  sessionMode: SessionMode;
};
