# Tech Lead Implementation Plan: PM Learning Webapp

## 1. Executive Summary

เอกสารนี้เป็นแผนจากมุม `Tech Lead` สำหรับนำ PRD `PM Learning Webapp แบบ Duolingo` ไปแตกเป็นงาน implementation ให้ทีม frontend, backend, QA และ DevOps ทำต่อได้

ขอบเขตยังเป็น MVP webapp ตาม PRD โดยเป้าหมายรอบแรกคือสร้าง learning loop ให้ครบ end-to-end:

```text
signup/login -> onboarding -> skill path -> lesson -> quiz -> mission -> feedback -> XP/streak -> progress
```

แนวทางเทคนิคหลักคือเริ่มจากระบบที่เรียบง่าย ตรวจสอบง่าย และต่อยอดได้ โดยใช้ seed/static content ก่อน เพื่อให้ทีมสร้าง product loop ที่ใช้งานได้จริงเร็วที่สุด

## 2. Mandatory Engineering Rule

ทุกงานที่เริ่มเขียนโค้ดต้องใช้ git เสมอ

Rules:

- ก่อนแก้โค้ดต้องเช็ก `git status`
- สร้าง branch แยกตามงาน เช่น `feature/mvp-learning-loop` หรือ `docs/tech-lead-plan`
- Commit เป็นชุดเล็กตาม logical change
- ห้ามแก้หลาย concern ใน commit เดียวถ้าแยกได้
- ก่อนส่งงานต้องมี `git status` ที่สะอาด หรือระบุไฟล์ที่ยังค้างอย่างชัดเจน
- ห้ามใช้ destructive git commands เช่น `git reset --hard` หรือ `git checkout --` โดยไม่มีคำสั่งชัดเจนจากเจ้าของโปรเจกต์

## 3. Recommended MVP Architecture

สำหรับรอบแรก แนะนำให้ใช้ full-stack web framework ที่ทำ frontend, server routes และ data access ได้ในโปรเจกต์เดียว เพื่อให้ทีมเล็กเดินเร็วและลด integration overhead

Recommended stack:

- Frontend: React-based web UI
- Backend: Server routes/API ภายในโปรเจกต์เดียว
- Data: SQLite หรือ Postgres-compatible schema โดยเริ่มจาก local/dev ที่ setup ง่าย
- Content: Seed/static content สำหรับ 3 modules แรก
- Auth: Email/password หรือ provider สำเร็จรูปที่ framework รองรับ
- Analytics: สร้าง event abstraction ก่อน แม้ยัง log ลง console/database ใน MVP

Architecture principles:

- แยก content, progress, attempt และ reward calculation ให้ชัด
- Progress correctness สำคัญกว่าความสวยของ gamification
- Mission MVP ต้องเป็น structured answer ก่อน เพื่อให้ตรวจคำตอบและ test ได้
- UI ต้องพาผู้ใช้ทำ learning loop แบบต่อเนื่อง ไม่ใช่ให้เลือกเองเยอะตั้งแต่แรก

## 4. Core Modules

### 4.1 Auth และ User

Responsibilities:

- สมัครสมาชิกและ login
- เก็บ learner profile เบื้องต้น
- ผูก progress ทั้งหมดกับ user

Build items:

- User account
- Session handling
- Protected learning routes
- Basic learner profile

Acceptance criteria:

- ผู้ใช้ใหม่สมัครแล้วเข้าสู่ onboarding ได้
- ผู้ใช้เดิม login แล้วกลับไป dashboard ได้
- Progress ไม่ปะปนข้าม user

### 4.2 Onboarding

Responsibilities:

- รับข้อมูลพื้นฐานและเป้าหมายผู้เรียน
- เลือก beginner path เป็น default

Build items:

- Onboarding form
- User preference persistence
- Redirect to dashboard after completion

Acceptance criteria:

- ผู้ใช้ไม่เลือก preference ก็เริ่ม beginner path ได้
- Onboarding เสร็จแล้วเห็น lesson แรกที่ควรเรียน

### 4.3 Content และ Curriculum

Responsibilities:

- จัดเก็บ learning path, modules, lessons, quizzes, questions และ missions
- Seed content 3 modules แรก

MVP content scope:

- Module 1: PM Foundation
- Module 2: Product Thinking
- Module 3: Stakeholder Management

Build items:

- Seed data structure
- Content loader/API
- Lesson detail response
- Quiz and mission content response

Acceptance criteria:

- ระบบโหลด lesson, quiz และ mission ของ 3 modules แรกได้
- Content สามารถแก้ใน seed/config ได้โดยไม่แตะ business logic หลัก

### 4.4 Progression Engine

Responsibilities:

- คุมสถานะ locked, available, completed และ needs retry
- ปลดล็อก step ถัดไปตามผล quiz/mission

Build items:

- Progress model
- Unlock rules
- Completion rules
- Retry handling

Acceptance criteria:

- Lesson แรก available หลัง onboarding
- Quiz ผ่านแล้ว unlock mission หรือ step ถัดไป
- Quiz ไม่ผ่านแล้ว step ถัดไปยัง locked หรือ needs retry
- Retry ผ่านแล้ว progress อัปเดตถูกต้อง

### 4.5 Quiz Engine

Responsibilities:

- รับคำตอบ quiz
- ตรวจคำตอบ
- ให้ score, pass/fail และ feedback

Build items:

- Quiz attempt submission
- Score calculation
- Feedback response
- Attempt history

Acceptance criteria:

- Submit quiz แล้วได้ผลทันที
- Pass threshold ใช้ค่า 70% สำหรับ MVP
- Attempt count ถูกบันทึก

### 4.6 Scenario Mission Engine

Responsibilities:

- ให้ภารกิจจำลองแบบ structured answer
- ตรวจคำตอบด้วย rules ที่กำหนดไว้ใน seed content
- ให้ feedback ที่อธิบายหลักคิด PM

Build items:

- Mission player
- Mission submission
- Feedback calculation
- Mission completion tracking

Acceptance criteria:

- Mission มี scenario, choices และ feedback ครบ
- Mission ผ่านแล้วได้ XP และ unlock step ถัดไป
- Mission ที่ยังไม่ผ่าน retry ได้

### 4.7 Rewards: XP, Streak และ Level

Responsibilities:

- คำนวณ XP จากกิจกรรมสำเร็จ
- อัปเดต streak รายวัน
- คำนวณ level เบื้องต้น

Build items:

- Reward ledger
- XP rules
- Streak update rules
- Level thresholds

MVP reward rules:

- Lesson completed: 10 XP
- Quiz passed: 20 XP
- Mission completed: 30 XP
- Streak เพิ่มเมื่อผู้ใช้ทำ learning activity สำเร็จอย่างน้อยหนึ่งครั้งในวันนั้น

Acceptance criteria:

- XP เพิ่มครั้งเดียวต่อ completion event เดียวกัน
- Streak ไม่เพิ่มซ้ำหลายครั้งในวันเดียว
- Profile แสดง XP, streak และ level ถูกต้อง

### 4.8 Dashboard และ Profile

Responsibilities:

- แสดง next lesson, current streak, total XP และ module progress
- แสดง activity ล่าสุด

Build items:

- Dashboard summary
- Continue learning CTA
- Profile progress
- Recent activity list

Acceptance criteria:

- ผู้ใช้กลับมาแล้วเห็นว่าควรเรียนอะไรต่อ
- Profile สะท้อน progress ล่าสุดหลังทำกิจกรรม

### 4.9 Analytics Contract

Responsibilities:

- สร้าง contract สำหรับ event tracking ตาม PRD
- เรียก event จากจุดสำคัญของ learning loop

Build items:

- `trackEvent(name, payload)` abstraction
- Event names ตาม PRD
- Development logger หรือ database-backed event table

Acceptance criteria:

- Event สำคัญถูกยิงเมื่อ signup, onboarding, lesson complete, quiz submit, mission complete, XP award และ unlock module
- หากยังไม่มี analytics provider จริง ระบบต้องไม่พัง

## 5. Data Model Draft

Tech Lead ควรให้ backend/data owner refine ต่อ แต่โครง MVP เริ่มจาก entities เหล่านี้:

- `users`
- `user_preferences`
- `learning_paths`
- `modules`
- `lessons`
- `quizzes`
- `questions`
- `scenario_missions`
- `attempts`
- `progress_records`
- `reward_ledger`
- `activity_events`

Important relationships:

- User มี progress หลายรายการ
- Module มี lessons/quizzes/missions ตามลำดับ
- Quiz และ mission สร้าง attempt ต่อ user ได้หลายครั้ง
- Reward ledger ต้องกัน duplicate reward สำหรับกิจกรรมที่ complete ไปแล้ว
- Activity events ใช้ทั้ง analytics และ recent activity ได้ใน MVP

## 6. Frontend Work Breakdown

Frontend owner ควรแตกงานเป็น:

- App shell และ route structure
- Auth screens
- Onboarding flow
- Dashboard
- Skill path map/list
- Lesson player
- Quiz screen
- Scenario mission screen
- Result/feedback state
- Profile progress
- Loading, empty, error และ retry states

UX direction:

- หน้าจอแรกหลัง login ต้องพาผู้ใช้เรียนต่อทันที
- Skill path ควรเห็นสถานะ locked/available/completed ชัดเจน
- Quiz และ mission ต้องให้ feedback ทันทีหลัง submit
- Mobile viewport ต้องใช้งานได้ เพราะ learning session ควรสั้นและเข้าถึงง่าย

## 7. Backend Work Breakdown

Backend owner ควรแตกงานเป็น:

- Auth/session integration
- Content seed และ content read API
- User preference API
- Progress read/update service
- Quiz attempt service
- Mission attempt service
- Reward service
- Activity/analytics service
- Dashboard summary API
- Profile progress API

Service priorities:

- Progress update ต้อง idempotent เท่าที่เป็นไปได้
- Reward ต้องกันการให้ XP ซ้ำจาก attempt เดิม
- Unlock rules ต้องอยู่ฝั่ง backend หรือ shared logic ที่ test ได้

## 8. QA Work Breakdown

QA owner ควรสร้าง test coverage จาก flow หลัก:

- New user completes onboarding and starts first lesson
- Lesson completion opens the correct quiz
- Quiz pass unlocks the next step
- Quiz fail blocks unlock and allows retry
- Mission completion awards XP and feedback
- Streak updates once per active learning day
- Profile progress matches completed activities
- Skill path status is correct across locked, available, completed และ needs retry

Recommended automated tests:

- Unit tests: reward rules, unlock rules, quiz scoring
- Integration tests: submit quiz, submit mission, dashboard summary
- E2E tests: first-time learning loop from signup to first mission completion

## 9. DevOps And Release Plan

DevOps owner ควรเตรียม:

- Local development setup
- Environment variables document
- Seed content command
- CI pipeline สำหรับ lint, typecheck, test
- Production deploy target
- Smoke test checklist
- Rollback checklist

Minimum smoke test:

- Login works
- Dashboard loads
- Lesson opens
- Quiz submit returns feedback
- Progress updates after pass

Rollback trigger:

- Login ใช้งานไม่ได้
- Dashboard โหลดไม่ได้
- Progress update ผิดหรือหาย
- Quiz/mission submission ล้มเหลวใน production

## 10. Suggested Implementation Sequence

1. Initialize app foundation and git branch workflow
2. Build auth and onboarding
3. Add seed content for 3 beginner modules
4. Build dashboard and skill path read flow
5. Build lesson player and lesson completion
6. Build quiz submission, scoring, feedback and retry
7. Build mission submission and feedback
8. Add progress unlock rules
9. Add XP, streak and level
10. Add profile progress and recent activity
11. Add analytics event abstraction
12. Add unit/integration/E2E coverage
13. Prepare CI, deployment, smoke tests and rollback notes

## 11. Open Technical Decisions

ต้องตัดสินใจก่อนเริ่มเขียนโค้ดจริง:

- เลือก framework หลัก เช่น Next.js, Remix หรือ stack อื่น
- เลือก database สำหรับ MVP
- เลือก auth provider หรือทำ email/password เอง
- เลือก deploy target เช่น Vercel, Render, Fly.io หรือ VPS
- เลือก test framework และ E2E runner

Default recommendation:

- ใช้ stack ที่ setup เร็วที่สุดและทีมคุ้นที่สุด
- ใช้ seed/static content ก่อน
- ใช้ structured mission ก่อน
- ทำ production deploy หลัง learning loop end-to-end ผ่านใน local แล้ว

## 12. Handoff To Development Team

Frontend:

- เริ่มจาก route, onboarding, dashboard, skill path, lesson, quiz, mission และ profile

Backend:

- เริ่มจาก auth, content seed, progress, attempts, rewards และ dashboard/profile API

QA:

- เริ่ม test plan จาก learning loop และ progression correctness

DevOps:

- เตรียม local setup, env vars, CI, seed command, deploy และ smoke test

Tech Lead:

- คุม integration contract ระหว่าง content, progress, attempts และ rewards
- Review ทุก PR ที่แตะ progression หรือ reward rules
- ตรวจว่า MVP ยังยึด beginner path 3 modules แรก ไม่หลุด scope ไปทำระบบใหญ่เกินจำเป็น
