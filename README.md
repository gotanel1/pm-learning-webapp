# PM Quest — Developer to PM Trainer

เว็บฝึกทักษะ Product Management สำหรับ Developer สไตล์ Duolingo: ปูพื้นทีละวัน, มีคำถาม, feedback, XP, progress, mission และ Practice Box สำหรับฝึกเขียนจริง

## Preview

- Local: http://127.0.0.1:3108/
- Public VPS: http://37.60.233.88:3108/

## Features

- Learning path 30 บท / 30 วัน
- Unlock บทถัดไปหลังตอบถูก
- XP / streak / progress counter
- Quiz พร้อม feedback ทันที
- Practice textarea บันทึกใน browser `localStorage`
- 30-day mission checklist
- Reset progress

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
export PATH=/root/.hermes/node/bin:$PATH
npm install
npm run dev -- --hostname 0.0.0.0 --port 3108
```

## Production preview

```bash
export PATH=/root/.hermes/node/bin:$PATH
npm run build
npm run start -- --hostname 0.0.0.0 --port 3108
```

## Next ideas

- เพิ่ม AI grader ตรวจ mini PRD และ Practice Box
- เพิ่ม badge/achievement และ daily streak ตามวันที่จริง
- เพิ่ม backend/account ถ้าต้องการเก็บ progress ข้ามเครื่อง
- เพิ่ม team dashboard สำหรับติดตามหลายคน
