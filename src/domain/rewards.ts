import type { Lesson, SavedState, ScenarioMission } from "./types";

export const MISSION_COMPLETION_XP = 5;

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

export function completeMission(
  currentState: SavedState,
  mission: Pick<ScenarioMission, "id">,
  rewardXp = MISSION_COMPLETION_XP,
): SavedState {
  if (currentState.completedMissionIds.includes(mission.id)) {
    return currentState;
  }

  return {
    ...currentState,
    completedMissionIds: [...currentState.completedMissionIds, mission.id],
    xp: currentState.xp + rewardXp,
  };
}
