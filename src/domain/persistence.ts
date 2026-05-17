import {
  fromPersistedStatePayload,
  toSavedStateEnvelope,
  type SavedStateEnvelopeV1,
} from "./persistence-model";
import type { SavedState } from "./types";

export type KeyValueStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export type PersistenceMode = "local-browser" | "remote-backend";

export type SavedStateRepository = {
  mode: PersistenceMode;
  load: (fallback: SavedState) => SavedState;
  save: (state: SavedState) => void;
  clear: () => void;
};

export type RemoteSavedStateAdapter = {
  load: (userId: string) => SavedStateEnvelopeV1 | SavedState | null;
  save: (userId: string, value: SavedStateEnvelopeV1) => void;
  clear: (userId: string) => void;
};

type Logger = Pick<typeof console, "warn">;

function safeParseSavedState(
  value: string,
  fallback: SavedState,
  logger: Logger,
): SavedState {
  try {
    return fromPersistedStatePayload(JSON.parse(value), fallback);
  } catch (error) {
    logger.warn("Failed to parse saved progress payload.", error);
    return fallback;
  }
}

export function createSavedStateRepository(
  key: string,
  storage: KeyValueStorage | null | undefined,
  logger: Logger = console,
): SavedStateRepository {
  return {
    mode: "local-browser",
    load(fallback) {
      if (!storage) return fallback;

      try {
        const saved = storage.getItem(key);
        return saved ? safeParseSavedState(saved, fallback, logger) : fallback;
      } catch (error) {
        logger.warn("Failed to load saved progress.", error);
        return fallback;
      }
    },
    save(state) {
      if (!storage) return;

      try {
        storage.setItem(key, JSON.stringify(toSavedStateEnvelope(state)));
      } catch (error) {
        logger.warn("Failed to save progress.", error);
      }
    },
    clear() {
      if (!storage) return;

      try {
        storage.removeItem(key);
      } catch (error) {
        logger.warn("Failed to clear saved progress.", error);
      }
    },
  };
}

export function createBrowserSavedStateRepository(
  key: string,
  logger: Logger = console,
): SavedStateRepository {
  if (typeof window === "undefined") {
    return createSavedStateRepository(key, null, logger);
  }

  return createSavedStateRepository(key, window.localStorage, logger);
}

export function createRemoteSavedStateRepository(
  userId: string,
  adapter: RemoteSavedStateAdapter,
  logger: Logger = console,
): SavedStateRepository {
  return {
    mode: "remote-backend",
    load(fallback) {
      try {
        const saved = adapter.load(userId);
        return saved ? fromPersistedStatePayload(saved, fallback) : fallback;
      } catch (error) {
        logger.warn("Failed to load remote progress.", error);
        return fallback;
      }
    },
    save(state) {
      try {
        adapter.save(userId, toSavedStateEnvelope(state));
      } catch (error) {
        logger.warn("Failed to save remote progress.", error);
      }
    },
    clear() {
      try {
        adapter.clear(userId);
      } catch (error) {
        logger.warn("Failed to clear remote progress.", error);
      }
    },
  };
}
