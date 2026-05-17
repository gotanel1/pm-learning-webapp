import { normalizeLearnerProfile } from "./session";
import type { LearnerProfile } from "./types";

export type AuthStrategy = "guest-only" | "provider-ready";

export type AuthSessionSnapshot = {
  userId: string;
  displayName?: string;
} | null;

export const DEFAULT_AUTH_STRATEGY: AuthStrategy = "guest-only";

export function resolveLearnerProfileFromSession(
  savedProfile: LearnerProfile,
  strategy: AuthStrategy,
  authSession: AuthSessionSnapshot,
): LearnerProfile {
  if (strategy === "provider-ready" && authSession) {
    return normalizeLearnerProfile(
      {
        userId: authSession.userId,
        displayName: authSession.displayName ?? savedProfile.displayName,
        sessionMode: "authenticated",
      },
      savedProfile,
    );
  }

  return normalizeLearnerProfile(
    {
      ...savedProfile,
      sessionMode: "guest",
    },
    savedProfile,
  );
}
