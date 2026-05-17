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

สถานะล่าสุดหลัง milestone `Persistence Abstraction Foundation`:

- Overall MVP ตาม PRD: ประมาณ `52%`
- Local prototype ที่ยังไม่รวม auth/backend จริง: ประมาณ `86%`

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
- บันทึก mission completion แยกจาก lesson completion
- ให้ mission XP แบบ one-time หลัง quiz ผ่าน และกัน XP ซ้ำเมื่อกลับมาตอบใหม่
- เพิ่ม analytics events สำหรับ `mission_answered` และ `mission_completed`
- แยก persistence เป็น domain repository abstraction เพื่อลด coupling จาก UI ไป `localStorage` โดยตรง
- เพิ่ม unit tests สำหรับ persistence load/save/clear และ failure fallback

## Remaining Major Work

- Real auth/signup/login
- Backend/database persistence
- ตัดสินใจว่า mission completion จะ gate การปลดล็อกบทถัดไปหรือเป็น bonus reward
- Dashboard/profile progress แบบเต็ม
- Real analytics provider หรือ backend event sink
- Production CI/deploy pipeline และ smoke checklist
- Full browser E2E runner เมื่อระบบใหญ่ขึ้น

## Recommended Next Milestone

ทำ `Auth + Backend Persistence Decision` หรือ `Mission Gate Decision` ต่อจาก mission reward rules

เหตุผล:

- Learning loop local มี lesson, quiz, structured mission, practice note, XP และ saved state แล้ว
- ตอนนี้เริ่มเห็น data shape ที่ backend ต้องเก็บ: lesson completion, mission completion, notes, profile และ preferences
- ก่อนเพิ่ม backend ควรตัดสินใจว่า mission เป็น gate หลักของ progress หรือเป็น bonus reward เพื่อไม่ต้อง migrate behavior ซ้ำ

Next milestone target:

```text
guest local progress -> auth/backend-ready progress model -> cross-device persistence
```

โดยยังใช้ local/static data ก่อน และยังไม่เพิ่ม vendor หรือ backend จนกว่าจะตัดสินใจชัดเจน
