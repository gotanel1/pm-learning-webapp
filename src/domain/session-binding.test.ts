import { describe, expect, it } from "vitest";
import { DEFAULT_PROFILE } from "./session";
import {
  DEFAULT_AUTH_STRATEGY,
  resolveLearnerProfileFromSession,
} from "./session-binding";

describe("session binding", () => {
  it("defaults to guest-only strategy", () => {
    expect(DEFAULT_AUTH_STRATEGY).toBe("guest-only");
  });

  it("keeps guest mode when strategy is guest-only", () => {
    const resolved = resolveLearnerProfileFromSession(
      {
        ...DEFAULT_PROFILE,
        displayName: "Local Learner",
      },
      "guest-only",
      {
        userId: "auth-user-1",
        displayName: "Auth User",
      },
    );

    expect(resolved.sessionMode).toBe("guest");
    expect(resolved.userId).toBe("local-guest");
    expect(resolved.displayName).toBe("Local Learner");
  });

  it("maps authenticated session when strategy is provider-ready", () => {
    const resolved = resolveLearnerProfileFromSession(
      DEFAULT_PROFILE,
      "provider-ready",
      {
        userId: "auth-user-1",
        displayName: "Auth User",
      },
    );

    expect(resolved).toEqual({
      userId: "auth-user-1",
      displayName: "Auth User",
      sessionMode: "authenticated",
    });
  });

  it("falls back to guest mode when no auth session is present", () => {
    const resolved = resolveLearnerProfileFromSession(
      DEFAULT_PROFILE,
      "provider-ready",
      null,
    );

    expect(resolved.sessionMode).toBe("guest");
    expect(resolved.userId).toBe("local-guest");
  });
});
