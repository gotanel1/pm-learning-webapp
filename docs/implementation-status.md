# Implementation Status

## Current Branch

- Branch: `codex/persistence-foundation`
- Phase: Persistence abstraction foundation
- GitHub repo: `gotanel1/pm-learning-webapp`

## Completed

- Git repository is initialized and connected to GitHub.
- PRD and Tech Lead implementation plan are committed.
- Existing Next.js prototype is installed, linted, and build-verified.
- Project naming, scripts, README, env example, and deployment service references are aligned with `pm-learning-webapp`.
- Domain modules now cover lesson choice building, progress/unlock rules, reward completion, and shared types.
- Vitest unit tests cover answer distribution, unlock behavior, reward duplication, progress percent, and next-step gating.
- Practice notes are saved per lesson and legacy `lastPractice` data migrates into the active lesson note.
- Onboarding captures learner experience level, primary learning goal, and daily lesson target.
- User preferences are normalized through domain logic and stored with progress in the existing `localStorage` state.
- Guest learner profile is stored with progress and includes display name plus session mode.
- Session domain helpers normalize saved profile data and update local display names without changing learning progress.
- Analytics event contract now covers the core MVP learning loop.
- Analytics events currently use a dev console sink only; no provider, backend, API route, database, dependency, or event log has been added.
- First-run hydration now starts from the same server/client state and loads browser progress after mount to avoid mismatch.
- Primary interactive controls now expose stable `data-testid` attributes for smoke automation.
- Unit smoke coverage now verifies onboarding, first lesson completion, next lesson unlock, practice note persistence, and profile update together.
- Each lesson now includes a structured `ScenarioMission` generated from lesson seed content.
- Scenario missions show selectable choices and immediate feedback before the learner writes a practice note.
- Mission domain tests verify stable mission IDs, exactly one correct choice, and deterministic choice order.
- Mission completion is now stored separately from lesson completion through `completedMissionIds`.
- Correct mission answers award one-time mission XP after lesson completion and do not duplicate rewards after reload or repeat attempts.
- Analytics events now include `mission_answered` and `mission_completed` through the existing dev console sink.
- Saved-state persistence is now routed through a domain repository abstraction instead of direct `localStorage` calls in the UI component.
- Persistence tests now cover successful load/save/clear behavior and failure-safe fallback paths.
- Persistence payload now uses a versioned envelope for backend-ready serialization while still reading legacy raw state payloads.
- Remote repository contract is defined (`remote-backend` mode) for future adapter wiring without changing UI state handling.
- Repository selection now follows learner session mode (`guest` -> local, `authenticated` -> remote adapter when configured).

## Current App Capabilities

- 30-day PM learning path
- Lesson selection and lock/unlock behavior
- Quiz choices with immediate feedback
- XP, streak, progress counter, and reset
- Practice notes saved per lesson in browser `localStorage`
- First-run onboarding for learner preferences
- Learner Plan panel for reviewing and editing preferences
- Guest mode profile display in the header
- Local display name editing for the current browser profile
- Dev console analytics events for onboarding, lesson selection, quiz answers, lesson completion, next lesson, practice note updates, profile updates, and reset
- Hydration-safe first-run loading from browser `localStorage`
- Stable smoke-test selectors for key learning-flow actions
- Structured scenario mission card for every lesson
- Practice note area separated from mission decision feedback
- Mission completion state saved in browser `localStorage`
- One-time mission XP reward after quiz completion with duplicate reward protection
- Persistence abstraction layer ready for future backend adapter replacement
- Versioned state payload contract for backend mapping and migration

## Next Phase

Choose the next implementation slice after this branch is merged:

- Add real auth provider and backend persistence.
- Add backend-ready progress model and mapping for cross-device persistence.
- Replace the dev console analytics sink with a real provider/backend after an explicit vendor decision.
- Keep the `localStorage` migration stable until auth/persistence is implemented.
- Add a full browser E2E runner when the app grows beyond the current single-page MVP.
