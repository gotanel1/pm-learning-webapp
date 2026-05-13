# PM Learning Webapp

เว็บแอปฝึกทักษะ PM สำหรับผู้เริ่มจากศูนย์ สไตล์ Duolingo: เรียนสั้น ทำ quiz รับ feedback เก็บ XP/streak และฝึก mission ที่จำลองงาน PM จริง

## Current Product Shape

แบรนด์หน้าแอปตอนนี้ใช้ชื่อ `PM Quest` เป็น prototype ของ MVP ตาม PRD โดยมี 30-day learning path และบันทึก progress ใน browser ผ่าน `localStorage`

## Features

- Learning path 30 บท / 30 วัน
- Unlock บทถัดไปหลังตอบถูก
- XP / streak / progress counter
- Quiz พร้อม feedback ทันที
- Practice textarea บันทึกใน browser `localStorage`
- 30-day mission checklist
- Reset progress

## Product Docs

- PRD: [docs/prd-pm-duolingo-webapp.md](docs/prd-pm-duolingo-webapp.md)
- Tech Lead plan: [docs/tech-lead-implementation-plan.md](docs/tech-lead-implementation-plan.md)
- System overview: [docs/system-overview.md](docs/system-overview.md)
- Agent guide: [AGENTS.md](AGENTS.md)

## Curriculum

1. Day 1: Problem ≠ Solution
2. Day 2: หา User ตัวจริง
3. Day 3: Pain / Frequency / Urgency
4. Day 4: Job-to-be-Done
5. Day 5: Success Metric
6. Day 6: Mini PRD 1 หน้า
7. Day 7: User Story
8. Day 8: Acceptance Criteria
9. Day 9: Scope Boundary
10. Day 10: Assumption & Risk
11. Day 11: MoSCoW Priority
12. Day 12: RICE Score
13. Day 13: MVP Slicing
14. Day 14: Roadmap 3 Phase
15. Day 15: Backlog Hygiene
16. Day 16: Handoff ให้ Tech Lead
17. Day 17: Stakeholder Update
18. Day 18: Decision Log
19. Day 19: UX Flow พื้นฐาน
20. Day 20: Empty / Error / Success State
21. Day 21: Analytics Events
22. Day 22: North Star Metric
23. Day 23: Experiment Design
24. Day 24: Tech Lead Literacy
25. Day 25: Non-Functional Requirements
26. Day 26: Trade-off Thinking
27. Day 27: Release Planning
28. Day 28: Feedback Loop
29. Day 29: Product Retro
30. Day 30: Capstone PRD

## Run locally

```bash
npm install
npm run dev
```

Local app: http://localhost:3000

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

หรือรันครบชุด:

```bash
npm run check
```

## Deployment Preview

```bash
npm run build
npm run start
```

## Next Implementation Steps

- แยก domain logic สำหรับ progress, reward และ unlock rules ออกจาก UI
- เพิ่ม auth/onboarding ตาม PRD
- เพิ่ม seed content สำหรับ 3 beginner modules ใน format ที่ backend ใช้ต่อได้
- เพิ่ม dashboard/profile API เมื่อเริ่ม backend foundation
