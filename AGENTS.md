# AGENTS.md

คู่มือนี้คือ operating manual สำหรับ agent หรือ developer ที่ทำงานใน repo `pm-learning-webapp`

## Mission

สร้างเว็บแอปสอนทักษะ PM ให้ผู้เริ่มจากศูนย์ โดยประสบการณ์การเรียนคล้าย Duolingo: บทเรียนสั้น quiz feedback ทันที XP/streak progress path และ mission จำลองงาน PM จริง

เอกสารหลักที่ต้องอ่านก่อนตัดสินใจ product/implementation:

- PRD: `docs/prd-pm-duolingo-webapp.md`
- Tech Lead plan: `docs/tech-lead-implementation-plan.md`
- System overview: `docs/system-overview.md`
- Implementation status: `docs/implementation-status.md`

## Current System Shape

- Framework: Next.js App Router
- Language: TypeScript
- UI: React Client Component หลักที่ `src/app/page.tsx`
- Content seed: `src/app/lessons.ts`
- Styling: Tailwind CSS v4 ผ่าน `src/app/globals.css`
- Current storage: browser `localStorage`
- Current app state: prototype ที่ทำ guest profile, onboarding, learner preferences และ learning loop ได้ในหน้าเดียว

ยังไม่มี backend, database, auth จริง, server API หรือ production analytics provider ในรอบนี้
มี unit tests สำหรับ domain logic ด้วย Vitest
ยังไม่ได้เลือก auth provider จริง ห้ามเพิ่ม auth vendor/dependency โดยไม่มี explicit decision
Analytics events ใช้ dev console sink เท่านั้นจนกว่าจะมี explicit provider/backend decision

## Next.js 16 Rule

This is NOT the Next.js you know.

Next.js version in this repo may have breaking changes from older assumptions. Before changing routing, layouts, metadata, server/client boundaries, route handlers, caching, or testing setup, read the relevant guide in:

```text
node_modules/next/dist/docs/
```

Useful starting points:

- `node_modules/next/dist/docs/01-app/index.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
- `node_modules/next/dist/docs/01-app/02-guides/testing/`
- `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`

## Git Rules

ใช้ git เสมอเมื่อเริ่มเขียนโค้ดหรือแก้เอกสารที่เป็นส่วนหนึ่งของงานระบบ

- เช็กสถานะก่อนทำงาน: `git status --short --branch`
- ทำงานบน feature branch เสมอ เช่น `feature/app-foundation`
- Commit เป็น logical change เล็ก ๆ พร้อมข้อความชัดเจน
- Push branch ขึ้น GitHub เมื่อจบชุดงาน
- เปิดหรืออัปเดต PR สำหรับงานที่ต้อง review
- ห้ามใช้ destructive commands เช่น `git reset --hard`, `git checkout --`, `git clean -fd` เว้นแต่เจ้าของโปรเจกต์สั่งชัดเจน
- ถ้าเจอไฟล์เปลี่ยนที่ไม่ได้ทำเอง ให้ตรวจและทำงานร่วมกับมัน ห้าม revert เอง

## Run Locally

ติดตั้ง dependencies:

```bash
npm install
```

เปิด dev server:

```bash
npm run dev
```

เปิดเว็บ:

```text
http://localhost:3000
```

หากต้อง bind host/port เอง:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Production preview:

```bash
npm run build
npm run start
```

Production preview พร้อม host/port:

```bash
npm run start -- --hostname 0.0.0.0 --port 3000
```

## Verification Commands

รันก่อน commit เมื่อแตะโค้ด:

```bash
npm run lint
npm run typecheck
npm run build
```

หรือรันครบชุด:

```bash
npm run check
```

สำหรับเอกสารอย่างเดียว ให้เช็กอย่างน้อย:

```bash
git diff --check
```

ถ้าเปิด dev server แล้ว ให้ verify หน้าแรก:

```powershell
(Invoke-WebRequest -Uri http://127.0.0.1:3000 -UseBasicParsing).StatusCode
```

Expected result: `200`

## Implementation Priorities

ทำตามลำดับนี้เว้นแต่เจ้าของโปรเจกต์เปลี่ยน direction:

1. Stabilize app foundation
2. Extract progress, reward, unlock, and scoring rules into testable domain modules
3. Add tests for domain behavior
4. Add onboarding and user preferences
5. Add auth/session layer
6. Add backend or persistence layer
7. Add analytics event abstraction
8. Prepare deployment and smoke tests

## Coding Guidelines

- Keep behavior aligned with the PRD and Tech Lead plan.
- Prefer small, focused changes over broad rewrites.
- Keep learning behavior deterministic and testable.
- Move domain rules out of UI before making them more complex.
- Do not mix product content changes with infrastructure refactors unless the task needs both.
- Keep Thai learner-facing copy clear and beginner-friendly.
- Preserve current working behavior unless intentionally changing it.
- Avoid adding paid services or external vendors without an explicit decision.
- Do not add auth providers, analytics vendors, SDKs, backend services, or new paid dependencies without an explicit product/tech decision.
- Do not replace the dev console analytics sink with a vendor, SDK, API route, database, or persistent event log without an explicit decision.
- Wrap every API call in `try/catch` or an equivalent typed error-handling path.
- Use `try/catch` around functions that can reasonably fail, such as JSON parsing, storage access, network calls, file IO, auth/session work, database operations, and third-party SDK calls.
- Never swallow errors silently. Return a safe fallback, surface a user-friendly message when relevant, and keep enough detail for debugging.

## Frontend Guidelines

- This is a learning product, not a marketing landing page.
- First screen should help the learner continue learning quickly.
- Make progress, locked/unlocked state, feedback, and next action obvious.
- Keep mobile usable because lessons are short and repeatable.
- Do not let gamification hide the learning outcome.
- Avoid giant decorative sections that slow down the learning flow.
- Check text overflow on small screens when changing UI copy.

## Product Rules

MVP learning loop:

```text
lesson -> quiz -> scenario mission -> feedback -> XP/streak -> unlock next step
```

Current prototype approximates this as:

```text
lesson -> quiz choice -> feedback -> XP/streak -> unlock next lesson -> practice note
```

When adding features, protect these core product expectations:

- ผู้ใช้ใหม่ควรเริ่มเรียนได้เร็ว
- Feedback ต้องอธิบายหลักคิด PM ไม่ใช่บอกแค่ถูก/ผิด
- Progress ต้องไม่ให้ XP ซ้ำจาก completion เดิม
- Locked/unlocked state ต้องเข้าใจง่าย
- Beginner path ต้องไม่กว้างเกิน MVP

## File Map

- `src/app/page.tsx`: current one-page learning app with guest profile and onboarding
- `src/app/lessons.ts`: 30-day lesson seed content and quiz choices
- `src/domain/`: testable domain rules for lessons, progress, rewards, practice notes, preferences, session profile, and analytics events
- `src/app/layout.tsx`: metadata and root layout
- `src/app/globals.css`: Tailwind import and global tokens
- `docs/prd-pm-duolingo-webapp.md`: product requirements
- `docs/tech-lead-implementation-plan.md`: technical execution plan
- `docs/system-overview.md`: current system architecture and behavior
- `docs/implementation-status.md`: current status and next phase
- `pm-learning-webapp.service`: sample systemd service for deployment

## Pull Request Checklist

Before opening or updating a PR:

- `git status --short --branch` is understood
- Relevant docs are updated
- `npm run lint` passes when code changed
- `npm run typecheck` passes when TypeScript changed
- `npm run build` passes for app behavior or config changes
- API calls and failure-prone functions have explicit error handling
- PR body includes summary, verification, and known risks
- Any skipped check is explained honestly

## Known Risk

`npm audit --audit-level=moderate` currently reports moderate vulnerabilities through Next/PostCSS. The suggested `npm audit fix --force` would introduce a breaking dependency change, so do not run it casually. Treat dependency upgrades as a separate deliberate task.
