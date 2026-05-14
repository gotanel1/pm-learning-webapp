import type { AnswerLabel, SessionMode } from "./types";

export const ANALYTICS_EVENT_NAMES = [
  "onboarding_completed",
  "lesson_selected",
  "quiz_answered",
  "lesson_completed",
  "next_lesson_clicked",
  "practice_note_updated",
  "profile_updated",
  "progress_reset",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export type AnalyticsEventPayload = {
  userId: string;
  sessionMode: SessionMode;
  lessonId?: string;
  targetLessonId?: string;
  lessonIndex?: number;
  completedCount?: number;
  xp?: number;
  answerCorrect?: boolean;
  answerLabel?: AnswerLabel;
  practiceNoteLength?: number;
  displayName?: string;
};

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  timestamp: string;
  payload: AnalyticsEventPayload;
};

export type AnalyticsSink = (event: AnalyticsEvent) => void;

function normalizePayload(
  payload: AnalyticsEventPayload,
): AnalyticsEventPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as AnalyticsEventPayload;
}

export function createAnalyticsEvent(
  name: AnalyticsEventName,
  payload: AnalyticsEventPayload,
): AnalyticsEvent {
  return {
    name,
    timestamp: new Date().toISOString(),
    payload: normalizePayload(payload),
  };
}

export const devConsoleAnalyticsSink: AnalyticsSink = (event) => {
  console.info("[analytics]", event.name, event);
};

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsEventPayload,
  sink: AnalyticsSink = devConsoleAnalyticsSink,
): void {
  try {
    sink(createAnalyticsEvent(name, payload));
  } catch (error) {
    console.warn("Failed to track analytics event.", error);
  }
}
