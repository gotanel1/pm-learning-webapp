# System Overview: PM Learning Webapp

## Purpose

`PM Learning Webapp` เป็นเว็บแอปฝึกทักษะ PM สำหรับผู้เริ่มจากศูนย์ โดยใช้รูปแบบการเรียนสั้นและ feedback ทันทีคล้าย Duolingo เป้าหมายคือช่วยให้ผู้ใช้ค่อย ๆ เข้าใจ product thinking, requirement, PRD, prioritization, roadmap, stakeholder communication, QA และ release planning ผ่านบทเรียนและภารกิจจำลอง

## Current Architecture

ระบบปัจจุบันเป็น Next.js App Router prototype ที่ทำงานในหน้าเดียว

- `src/app/layout.tsx`: root layout, metadata, font setup
- `src/app/page.tsx`: client-side app สำหรับ guest profile, onboarding, learning path, quiz, feedback, XP/streak, progress และ practice note
- `src/app/lessons.ts`: seed content ของบทเรียน 30 วัน พร้อมคำถาม ตัวเลือก feedback และ practice prompt
- `src/domain/`: domain logic สำหรับ lesson choices, progress, rewards, practice notes, user preferences, learner session, analytics events และ shared types
- `src/app/globals.css`: global styles, Tailwind CSS import, focus/selection styles
- `public/`: static assets จาก Next scaffold

ยังไม่มี backend หรือ database จริง ข้อมูล progress ถูกเก็บใน browser ด้วย `localStorage`

## Runtime Flow

เมื่อผู้ใช้เปิดหน้าแรก:

1. `src/app/page.tsx` โหลด lesson seed จาก `src/app/lessons.ts`
2. initial render ใช้ `starterState` เพื่อให้ server/client hydration ตรงกัน
3. หลัง mount แล้ว component อ่าน progress เดิมจาก `localStorage` key `pm-duolingo-progress-v2`
4. ถ้าไม่มีข้อมูลเดิม ระบบใช้ `starterState`
5. ระบบ migrate หรือสร้าง `LearnerProfile` default สำหรับ guest session
6. ถ้า onboarding ยังไม่ complete ผู้ใช้ตั้งระดับพื้นฐาน เป้าหมาย และจำนวนบทต่อวัน
7. ผู้ใช้เลือกบทเรียนที่ unlock แล้วได้จาก Learning Path
8. ผู้ใช้ตอบ quiz
9. ถ้าตอบถูก ระบบเพิ่ม lesson id เข้า `completedIds`, เพิ่ม XP และปรับ streak
10. state ถูกเขียนกลับเข้า `localStorage`
11. ผู้ใช้สามารถไปบทถัดไป เขียน practice note ปรับ Learner Plan หรือแก้ display name ได้
12. action สำคัญของ learning loop จะเรียก analytics abstraction และส่ง event เข้า dev console

## Current Data Shape

### `Lesson`

`Lesson` อยู่ใน `src/app/lessons.ts`

```ts
export type Lesson = {
  id: string;
  title: string;
  level: string;
  minutes: number;
  xp: number;
  theme: string;
  objective: string;
  concept: string;
  coachNote: string;
  prompt: string;
  choices: Choice[];
  practice: string;
};
```

### `SavedState`

`SavedState` อยู่ใน `src/app/page.tsx`

```ts
type SavedState = {
  activeLessonId: string;
  completedIds: string[];
  xp: number;
  streak: number;
  practiceNotes: Record<string, string>;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  profile: LearnerProfile;
};
```

### `UserPreferences`

`UserPreferences` อยู่ใน `src/domain/types.ts`

```ts
type UserPreferences = {
  experienceLevel: "zero" | "junior" | "career-switcher" | "builder";
  learningGoal:
    | "become-pm"
    | "work-with-tech-team"
    | "build-own-product"
    | "improve-delivery";
  dailyTarget: 1 | 2 | 3;
};
```

### `LearnerProfile`

`LearnerProfile` อยู่ใน `src/domain/types.ts`

```ts
type LearnerProfile = {
  userId: string;
  displayName: string;
  sessionMode: "guest" | "authenticated";
};
```

### `AnalyticsEvent`

Analytics event contract อยู่ใน `src/domain/analytics.ts`

```ts
type AnalyticsEvent = {
  name: AnalyticsEventName;
  timestamp: string;
  payload: AnalyticsEventPayload;
};
```

Event sink ปัจจุบันเป็น dev console only ยังไม่มี provider, SDK, API route, database หรือ `localStorage` event log

## Current Product Behavior

ระบบปัจจุบันรองรับ:

- Learning path 30 lessons
- Lock/unlock lesson ตามบทก่อนหน้า
- Quiz แบบ multiple choice
- Feedback ทันทีหลังเลือกคำตอบ
- XP จากการตอบถูกครั้งแรกของ lesson
- Streak แบบ prototype
- Progress counter
- Practice notes แยกตาม lesson และเก็บใน `localStorage`
- First-run onboarding สำหรับ learner preferences
- Learner Plan panel สำหรับดูและแก้ preferences
- Guest learner profile และ session mode display
- Display name editing ที่บันทึกใน browser เดิม
- Analytics event abstraction สำหรับ MVP learning loop ผ่าน dev console sink
- Reset progress

## Gaps From PRD

สิ่งที่ยังไม่ครบตาม PRD:

- ยังไม่มี signup/login จริง
- ยังไม่มี backend API
- ยังไม่มี database หรือ cross-device sync
- ยังไม่ได้เลือก auth provider
- ยังไม่มี scenario mission engine แยกจาก quiz
- ยังไม่มี profile progress page แยก
- ยังไม่มี analytics provider จริง
- ยังไม่มี analytics event persistence หรือ dashboard
- ยังไม่มี admin/content manager workflow

## Domain Logic

Domain logic ถูกแยกออกจากหน้า UI แล้วบางส่วน:

- `src/domain/lessons.ts`: สร้าง choices และกระจายตำแหน่งคำตอบถูก
- `src/domain/progress.ts`: lesson unlock, progress percent และ next-step gating
- `src/domain/rewards.ts`: complete lesson, XP และ streak rules
- `src/domain/practice.ts`: normalize saved progress และจัดการ practice notes ราย lesson
- `src/domain/preferences.ts`: default preferences, preference normalization และ onboarding completion
- `src/domain/session.ts`: default guest profile, profile normalization และ local profile update
- `src/domain/analytics.ts`: event contract, event creation และ dev console tracking sink
- `src/domain/types.ts`: shared types ระหว่าง app และ domain

ขั้นถัดไปคือเลือกว่าจะเพิ่ม auth provider จริง backend persistence หรือ analytics sink จริง โดยยังรักษา migration path จาก guest `localStorage`

## Development Commands

ติดตั้ง dependencies:

```bash
npm install
```

รัน dev server:

```bash
npm run dev
```

เปิดเว็บ:

```text
http://localhost:3000
```

ตรวจคุณภาพ:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

รันครบชุด:

```bash
npm run check
```

## Deployment Notes

มีตัวอย่าง systemd service ที่ `pm-learning-webapp.service`

Production commands:

```bash
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

Environment example อยู่ที่ `.env.example`

## Operating Assumptions

- MVP เป็น webapp ก่อน ยังไม่ทำ native mobile app
- Content เริ่มจาก seed/static content ได้
- Gamification เป็นตัวช่วย motivation แต่ learning outcome สำคัญกว่า
- Beginner path ต้องเริ่มง่ายและไม่กว้างเกินไป
- งานเขียนโค้ดทุกครั้งต้องใช้ git และทำบน branch
