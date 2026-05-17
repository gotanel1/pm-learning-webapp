import { describe, expect, it, vi } from "vitest";
import { DEFAULT_PREFERENCES } from "./preferences";
import {
  createSavedStateRepository,
  type KeyValueStorage,
} from "./persistence";
import { DEFAULT_PROFILE } from "./session";
import type { SavedState } from "./types";

const fallback: SavedState = {
  activeLessonId: "lesson-1",
  completedIds: [],
  completedMissionIds: [],
  xp: 0,
  streak: 1,
  practiceNotes: {},
  onboardingCompleted: false,
  preferences: DEFAULT_PREFERENCES,
  profile: DEFAULT_PROFILE,
};

function createMemoryStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));

  return {
    storage: {
      getItem(key: string) {
        return store.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        store.set(key, value);
      },
      removeItem(key: string) {
        store.delete(key);
      },
    } satisfies KeyValueStorage,
    read(key: string) {
      return store.get(key) ?? null;
    },
  };
}

describe("saved state persistence", () => {
  it("loads normalized state from storage", () => {
    const { storage } = createMemoryStorage({
      "pm-duolingo-progress-v2": JSON.stringify({
        activeLessonId: "lesson-2",
        completedIds: ["lesson-1"],
        completedMissionIds: ["lesson-1-mission"],
        xp: 20,
        streak: 2,
      }),
    });

    const repository = createSavedStateRepository(
      "pm-duolingo-progress-v2",
      storage,
    );
    const loaded = repository.load(fallback);

    expect(loaded.activeLessonId).toBe("lesson-2");
    expect(loaded.completedIds).toEqual(["lesson-1"]);
    expect(loaded.completedMissionIds).toEqual(["lesson-1-mission"]);
    expect(loaded.xp).toBe(20);
    expect(loaded.streak).toBe(2);
  });

  it("returns fallback and warns when JSON payload is invalid", () => {
    const { storage } = createMemoryStorage({
      "pm-duolingo-progress-v2": "{oops",
    });
    const warn = vi.fn();
    const repository = createSavedStateRepository(
      "pm-duolingo-progress-v2",
      storage,
      { warn },
    );

    const loaded = repository.load(fallback);

    expect(loaded).toBe(fallback);
    expect(warn).toHaveBeenCalledWith(
      "Failed to parse saved progress payload.",
      expect.any(Error),
    );
  });

  it("saves and clears state through the storage adapter", () => {
    const { storage, read } = createMemoryStorage();
    const repository = createSavedStateRepository(
      "pm-duolingo-progress-v2",
      storage,
    );

    repository.save({ ...fallback, xp: 99 });
    expect(read("pm-duolingo-progress-v2")).toContain("\"xp\":99");

    repository.clear();
    expect(read("pm-duolingo-progress-v2")).toBeNull();
  });

  it("does not throw when storage operations fail", () => {
    const failingStorage: KeyValueStorage = {
      getItem() {
        throw new Error("get failed");
      },
      setItem() {
        throw new Error("set failed");
      },
      removeItem() {
        throw new Error("remove failed");
      },
    };
    const warn = vi.fn();
    const repository = createSavedStateRepository(
      "pm-duolingo-progress-v2",
      failingStorage,
      { warn },
    );

    expect(() => repository.load(fallback)).not.toThrow();
    expect(() => repository.save(fallback)).not.toThrow();
    expect(() => repository.clear()).not.toThrow();
    expect(warn).toHaveBeenCalledTimes(3);
  });
});
