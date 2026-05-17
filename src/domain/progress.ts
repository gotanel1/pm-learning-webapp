import type { Choice, Lesson } from "./types";

export function isLessonUnlocked(
  lessonIndex: number,
  completedIds: string[],
  lessons: Pick<Lesson, "id">[],
): boolean {
  if (lessonIndex === 0) return true;

  const lesson = lessons[lessonIndex];
  const previousLesson = lessons[lessonIndex - 1];
  if (!lesson || !previousLesson) return false;

  return (
    completedIds.includes(previousLesson.id) || completedIds.includes(lesson.id)
  );
}

export function getProgressPercent(
  completedCount: number,
  totalLessons: number,
): number {
  if (totalLessons <= 0) return 0;
  return Math.round((completedCount / totalLessons) * 100);
}

export function canMoveNext(
  selectedChoice: Choice | null | undefined,
  isCompleted: boolean,
): boolean {
  return Boolean(selectedChoice?.correct || isCompleted);
}

export function canAnswerMission(
  isLessonCompleted: boolean,
  isMissionCompleted: boolean,
): boolean {
  return isLessonCompleted && !isMissionCompleted;
}
