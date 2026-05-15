# Goal: PM Learning Webapp

## Product Goal

สร้างเว็บแอป `PM Quest` ที่ช่วยให้ผู้ใช้เริ่มจากไม่มีพื้นฐาน ค่อย ๆ ฝึกจนเข้าใจและทำงานแบบ PM มืออาชีพได้ ผ่านประสบการณ์การเรียนสั้น คล้าย Duolingo แต่เน้นสถานการณ์งานจริงของ PM

Learning loop หลัก:

```text
onboarding -> learning path -> lesson -> quiz -> practice/scenario -> feedback -> XP/streak -> unlock next lesson
```

## MVP Goal

MVP ต้องพิสูจน์ว่า user สามารถ:

- เริ่มเรียน PM ได้เร็วโดยไม่ต้องมีพื้นฐาน
- เรียนบทเรียนสั้นแล้วตอบ quiz ได้
- ได้ feedback ที่อธิบายหลักคิด PM
- ฝึกลงมือทำผ่าน practice/scenario task
- เห็น XP, streak, progress และบทเรียนที่ unlock ถัดไป
- กลับมาเรียนต่อได้จาก browser เดิมโดย progress ไม่หาย

## Current Progress

สถานะล่าสุดหลัง milestone `Content + Mission Structure`:

- Overall MVP ตาม PRD: ประมาณ `45%`
- Local prototype ที่ยังไม่รวม auth/backend จริง: ประมาณ `80%`

## Completed So Far

- วาง PRD, Tech Lead plan, system overview และ implementation status
- สร้าง Next.js app foundation และ GitHub workflow
- ทำ 30-day PM learning path
- ทำ lesson selection, locked/unlocked state, quiz feedback
- แก้ answer distribution ไม่ให้คำตอบถูกกระจุกที่ข้อ B
- แยก domain logic สำหรับ lessons, progress, rewards, practice, preferences, session และ analytics
- เพิ่ม Vitest unit tests และ smoke coverage สำหรับ first-run learning flow
- ทำ onboarding และ learner preferences
- ทำ guest profile/session foundation
- บันทึก progress, practice note, preferences และ profile ผ่าน `localStorage`
- เพิ่ม analytics event abstraction แบบ dev console only
- แก้ hydration mismatch จากการอ่าน `localStorage`
- เพิ่ม stable `data-testid` selectors สำหรับ smoke automation
- เพิ่ม Scenario Mission แบบ structured choice พร้อม feedback ให้ทุก lesson

## Remaining Major Work

- Real auth/signup/login
- Backend/database persistence
- Mission completion persistence/reward แยกจาก lesson completion
- Dashboard/profile progress แบบเต็ม
- Real analytics provider หรือ backend event sink
- Production CI/deploy pipeline และ smoke checklist
- Full browser E2E runner เมื่อระบบใหญ่ขึ้น

## Recommended Next Milestone

ทำ `Mission Completion + Reward Rules` ต่อจาก structured mission ก่อน real auth/backend

เหตุผล:

- Learning loop หลักมีแล้ว และ `scenario mission` เริ่มมี structure แล้ว
- ขั้นถัดไปควรทำให้ mission completion มี state/reward ชัด เพื่อให้เข้าใกล้ loop ตาม PRD มากขึ้น
- Auth/backend ควรเข้าหลังจากเรารู้แน่แล้วว่า content, quiz, mission และ progress shape ต้องเก็บอะไรบ้าง

Next milestone target:

```text
lesson -> quiz -> structured mission -> feedback -> XP/progress
```

โดยยังใช้ local/static data ก่อน และยังไม่เพิ่ม vendor หรือ backend จนกว่าจะตัดสินใจชัดเจน
