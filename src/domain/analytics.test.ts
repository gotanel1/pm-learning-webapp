import { describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_EVENT_NAMES,
  createAnalyticsEvent,
  trackEvent,
} from "./analytics";

const basePayload = {
  userId: "local-guest",
  sessionMode: "guest" as const,
};

describe("analytics events", () => {
  it("creates an event with timestamp, name, and payload", () => {
    const event = createAnalyticsEvent("lesson_selected", {
      ...basePayload,
      lessonId: "lesson-1",
      lessonIndex: 0,
      completedCount: undefined,
    });

    expect(event.name).toBe("lesson_selected");
    expect(event.payload).toEqual({
      userId: "local-guest",
      sessionMode: "guest",
      lessonId: "lesson-1",
      lessonIndex: 0,
    });
    expect(Date.parse(event.timestamp)).not.toBeNaN();
  });

  it("tracks an event through the provided sink", () => {
    const sink = vi.fn();

    trackEvent("quiz_answered", {
      ...basePayload,
      lessonId: "lesson-1",
      answerCorrect: true,
      answerLabel: "A",
    }, sink);

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink.mock.calls[0][0]).toMatchObject({
      name: "quiz_answered",
      payload: {
        userId: "local-guest",
        sessionMode: "guest",
        lessonId: "lesson-1",
        answerCorrect: true,
        answerLabel: "A",
      },
    });
  });

  it("does not throw when the sink fails and logs a warning", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const failingSink = vi.fn(() => {
      throw new Error("sink failed");
    });

    expect(() =>
      trackEvent("progress_reset", basePayload, failingSink),
    ).not.toThrow();
    expect(warnSpy).toHaveBeenCalledWith(
      "Failed to track analytics event.",
      expect.any(Error),
    );

    warnSpy.mockRestore();
  });

  it("covers the MVP learning-loop event names", () => {
    expect(ANALYTICS_EVENT_NAMES).toEqual([
      "onboarding_completed",
      "lesson_selected",
      "quiz_answered",
      "mission_answered",
      "lesson_completed",
      "mission_completed",
      "next_lesson_clicked",
      "practice_note_updated",
      "profile_updated",
      "progress_reset",
    ]);
  });
});
