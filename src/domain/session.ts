import type { LearnerProfile, SavedState, SessionMode } from "./types";

export const DEFAULT_PROFILE: LearnerProfile = {
  userId: "local-guest",
  displayName: "PM Learner",
  sessionMode: "guest",
};

export const SESSION_MODES = [
  "guest",
  "authenticated",
] as const satisfies readonly SessionMode[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSessionMode(value: unknown): value is SessionMode {
  return SESSION_MODES.includes(value as SessionMode);
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function normalizeLearnerProfile(
  value: unknown,
  fallback: LearnerProfile = DEFAULT_PROFILE,
): LearnerProfile {
  if (!isRecord(value)) return fallback;

  return {
    userId: normalizeText(value.userId, fallback.userId),
    displayName: normalizeText(value.displayName, fallback.displayName),
    sessionMode: isSessionMode(value.sessionMode)
      ? value.sessionMode
      : fallback.sessionMode,
  };
}

export function updateLearnerProfile(
  state: SavedState,
  profilePatch: Partial<LearnerProfile>,
): SavedState {
  return {
    ...state,
    profile: normalizeLearnerProfile(
      {
        ...state.profile,
        ...profilePatch,
      },
      state.profile,
    ),
  };
}
