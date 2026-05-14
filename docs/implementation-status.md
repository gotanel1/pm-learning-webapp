# Implementation Status

## Current Branch

- Branch: `codex/analytics-event-abstraction`
- Phase: Analytics event abstraction without vendor
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

## Next Phase

Choose the next implementation slice after this branch is merged:

- Add real auth provider and backend persistence.
- Replace the dev console analytics sink with a real provider/backend after an explicit vendor decision.
- Keep the `localStorage` migration stable until auth/persistence is implemented.
