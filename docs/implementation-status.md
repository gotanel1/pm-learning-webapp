# Implementation Status

## Current Branch

- Branch: `feature/domain-logic-tests`
- Phase: Domain logic and unit tests
- GitHub repo: `gotanel1/pm-learning-webapp`

## Completed

- Git repository is initialized and connected to GitHub.
- PRD and Tech Lead implementation plan are committed.
- Existing Next.js prototype is installed, linted, and build-verified.
- Project naming, scripts, README, env example, and deployment service references are aligned with `pm-learning-webapp`.
- Domain modules now cover lesson choice building, progress/unlock rules, reward completion, and shared types.
- Vitest unit tests cover answer distribution, unlock behavior, reward duplication, progress percent, and next-step gating.

## Current App Capabilities

- 30-day PM learning path
- Lesson selection and lock/unlock behavior
- Quiz choices with immediate feedback
- XP, streak, progress counter, and reset
- Practice notes saved per lesson in browser `localStorage`

## Next Phase

Start `auth + onboarding` after this branch is merged:

- Add onboarding and user preferences.
- Keep the `localStorage` migration stable until auth/persistence is designed.
- Preserve the tested domain rules when introducing backend persistence.
