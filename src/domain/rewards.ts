import type { Lesson, SavedState } from "./types";

export function completeLesson(
  currentState: SavedState,
  lesson: Pick<Lesson, "id" | "xp">,
): SavedState {
  if (currentState.completedIds.includes(lesson.id)) {
    return currentState;
  }

  const completedIds = [...currentState.completedIds, lesson.id];

  return {
    ...currentState,
    completedIds,
    xp: currentState.xp + lesson.xp,
    streak: Math.max(currentState.streak, completedIds.length),
  };
}
