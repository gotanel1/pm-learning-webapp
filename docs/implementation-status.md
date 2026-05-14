# Implementation Status

## Current Branch

- Branch: `codex/onboarding-user-preferences`
- Phase: Onboarding and user preferences
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

## Current App Capabilities

- 30-day PM learning path
- Lesson selection and lock/unlock behavior
- Quiz choices with immediate feedback
- XP, streak, progress counter, and reset
- Practice notes saved per lesson in browser `localStorage`
- First-run onboarding for learner preferences
- Learner Plan panel for reviewing and editing preferences

## Next Phase

Start `auth/session` after this branch is merged:

- Keep the `localStorage` migration stable until auth/persistence is designed.
- Preserve the tested domain rules when introducing backend persistence.
- Add analytics event abstraction before sending product events to a vendor.
