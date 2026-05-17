import { normalizeSavedState } from "./practice";
import type { SavedState } from "./types";

export const SAVED_STATE_SCHEMA_VERSION = 1;

export type SavedStateEnvelopeV1 = {
  schemaVersion: typeof SAVED_STATE_SCHEMA_VERSION;
  savedAt: string;
  data: SavedState;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toSavedStateEnvelope(
  state: SavedState,
  savedAt = new Date().toISOString(),
): SavedStateEnvelopeV1 {
  return {
    schemaVersion: SAVED_STATE_SCHEMA_VERSION,
    savedAt,
    data: state,
  };
}

export function fromPersistedStatePayload(
  value: unknown,
  fallback: SavedState,
): SavedState {
  if (!isRecord(value)) return fallback;

  if (
    value.schemaVersion === SAVED_STATE_SCHEMA_VERSION &&
    "data" in value
  ) {
    return normalizeSavedState(value.data, fallback);
  }

  // Backward compatibility for legacy raw SavedState payloads in localStorage.
  return normalizeSavedState(value, fallback);
}
