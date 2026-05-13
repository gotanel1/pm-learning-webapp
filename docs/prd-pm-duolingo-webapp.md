# PRD: PM Learning Webapp แบบ Duolingo

## 1. ภาพรวมผลิตภัณฑ์

`PM Learning Webapp` คือเว็บแอปสำหรับสอนผู้ใช้ที่ไม่มีพื้นฐานให้ค่อย ๆ พัฒนาเป็น Project Manager / Product-minded PM ที่ทำงานจริงได้ ผ่านบทเรียนสั้น quiz ภารกิจจำลองสถานการณ์จริง และระบบ progression แบบ Duolingo

ผลิตภัณฑ์นี้ไม่ได้ต้องการเป็นคอร์สออนไลน์แบบวิดีโอยาว แต่ต้องการเป็นแอปฝึกทักษะ PM ที่ผู้ใช้กลับมาเรียนทุกวันได้ ใช้เวลาไม่นานต่อครั้ง และได้ฝึกคิดแบบ PM ผ่านสถานการณ์ที่ใกล้เคียงงานจริง เช่น รับ requirement จาก stakeholder, เขียน PRD, จัด priority, วาง roadmap, ตัดสินใจเรื่อง scope, สื่อสารความเสี่ยง และเตรียม release

## 2. Product Vision

สร้างเว็บแอปที่ทำให้คนเริ่มจากศูนย์สามารถเรียนรู้และฝึกทักษะ PM ได้ทีละขั้น โดยมี learning path ชัดเจน feedback ทันที และความรู้สึกเหมือนกำลังเล่นเกมฝึกอาชีพ ไม่ใช่อ่านตำรา

เป้าหมายระยะยาวคือทำให้ผู้ใช้มีความมั่นใจพอที่จะเข้าใจบทบาท PM, คุยกับทีม tech ได้, เขียนเอกสารพื้นฐานได้, ตัดสินใจเชิง product ได้ดีขึ้น และพร้อมต่อยอดไปสู่การทำงาน PM จริง

## 3. Problem Statement

ผู้เริ่มต้นที่อยากเป็น PM มักเจอปัญหาเหล่านี้:

- ไม่รู้ว่าควรเริ่มเรียนจากอะไร เพราะงาน PM มีทั้ง product, project, stakeholder, agile, requirement, roadmap, QA และ release
- คอร์สทั่วไปมักยาว อ่านเยอะ หรือเน้นทฤษฎี ทำให้ผู้เรียนหมดแรงก่อนเห็นภาพการทำงานจริง
- ไม่มีสถานการณ์จำลองให้ฝึกตัดสินใจแบบ PM เช่น tradeoff ระหว่าง scope, timeline, quality และ stakeholder expectation
- ไม่มี feedback แบบทันทีว่าคำตอบหรือวิธีคิดของตัวเองดีพอหรือยัง
- ผู้ใช้ไม่เห็นความคืบหน้าของตัวเอง จึงรักษาแรงจูงใจยาก

## 4. Target Users

กลุ่มผู้ใช้หลักของ MVP:

- ผู้ไม่มีพื้นฐาน PM แต่อยากเริ่มเรียนอย่างเป็นระบบ
- Junior PM หรือ Project Coordinator ที่อยากอัปสกิลให้คิดและทำงานเป็นมืออาชีพขึ้น
- คนย้ายสายจาก developer, QA, support, business, marketing หรือ operations
- Founder หรือ business owner ที่อยากเข้าใจการจัดการ product/software project
- Developer หรือ Tech Lead ที่อยากเข้าใจมุม PM เพื่อทำงานกับ stakeholder ได้ดีขึ้น

## 5. MVP Goals

MVP ต้องทำให้ผู้ใช้สามารถ:

- เริ่มเรียน PM ได้โดยไม่ต้องมีพื้นฐานเดิม
- เข้าใจคำศัพท์และ mindset สำคัญของ PM
- เรียนผ่านบทเรียนสั้นที่ใช้เวลาไม่นานต่อ session
- ทำ quiz เพื่อเช็กความเข้าใจทันทีหลังเรียน
- ฝึกสถานการณ์จำลองที่บังคับให้คิดแบบ PM
- ได้ feedback หลังทำภารกิจหรือเลือกคำตอบ
- เห็น progress ของตัวเองผ่าน level, XP, streak และ skill path
- ปลดล็อกเนื้อหาถัดไปเมื่อผ่านเงื่อนไขขั้นต่ำ

## 6. Non-Goals สำหรับ MVP

สิ่งที่ยังไม่ทำในรอบ MVP:

- ยังไม่ทำ community, discussion board หรือ peer review
- ยังไม่ทำ live mentor, live class หรือ appointment กับ coach
- ยังไม่ออก certificate จริงหรือระบบสอบรับรองทางการ
- ยังไม่ทำ marketplace สำหรับซื้อขายคอร์ส
- ยังไม่ทำ enterprise admin, team dashboard หรือ organization management
- ยังไม่ทำ native mobile app
- ยังไม่ทำ AI tutor แบบสนทนาเต็มรูปแบบ
- ยังไม่ทำระบบชำระเงิน subscription หรือ paid course

## 7. Core Learning Loop

ลูปหลักของการเรียน:

```text
lesson -> quiz -> scenario mission -> feedback -> XP/streak -> unlock next step
```

รายละเอียด:

- `lesson`: บทเรียนสั้น 3-7 นาที อธิบาย concept เดียวแบบกระชับ
- `quiz`: คำถามสั้นหลังบทเรียน เช่น multiple choice, true/false, ordering, matching
- `scenario mission`: ภารกิจจำลอง เช่น เลือก priority, เขียน acceptance criteria, ตอบ stakeholder
- `feedback`: อธิบายว่าคำตอบดีหรือควรปรับตรงไหน โดยเชื่อมกับหลัก PM
- `XP/streak`: ให้คะแนนและนับวันที่เรียนต่อเนื่อง
- `unlock next step`: ปลดล็อก lesson หรือ mission ถัดไปเมื่อผ่านเกณฑ์

## 8. MVP Features

### 8.1 Onboarding

ผู้ใช้ใหม่ต้องเห็นเส้นทางเริ่มต้นที่ไม่น่ากลัว และเลือกเป้าหมายพื้นฐานได้

Requirements:

- สมัครหรือเข้าใช้งานด้วย email/password หรือ social login อย่างน้อยหนึ่งแบบ
- ถามระดับพื้นฐานของผู้ใช้ เช่น ไม่มีพื้นฐาน, เคยทำงาน project, เคยเป็น PM
- ถามเป้าหมายการเรียน เช่น อยากเป็น PM, อยากทำงานกับทีม tech ดีขึ้น, อยากจัดการโปรเจกต์ตัวเอง
- แนะนำ learning path เริ่มต้นที่เหมาะกับผู้ไม่มีพื้นฐานเป็น default

Acceptance Criteria:

- ผู้ใช้ใหม่สามารถสร้างบัญชีและเริ่ม lesson แรกได้ภายใน 3 นาที
- หากผู้ใช้ไม่เลือก preference ระบบต้องพาเข้า beginner path อัตโนมัติ
- หลัง onboarding ผู้ใช้ต้องเห็น progress เริ่มต้นเป็น 0% และ lesson แรกที่ควรเริ่ม

### 8.2 Skill Path

แสดงเส้นทางการเรียนเป็น node หรือ module คล้าย map progression

Requirements:

- แบ่ง skill path เป็น module เช่น PM Foundation, Requirement, Planning, Execution, Release
- แต่ละ module มี lesson, quiz และ scenario mission อย่างน้อยหนึ่งชุด
- เนื้อหาถัดไปถูก lock จนกว่าผู้ใช้ผ่านเงื่อนไขขั้นต่ำ
- ผู้ใช้เห็นสถานะของแต่ละ node เช่น locked, available, completed, needs retry

Acceptance Criteria:

- ผู้ใช้เห็นภาพรวมว่าเรียนถึงไหนและควรไปต่อที่ไหน
- เมื่อผ่าน quiz/mission ตามเกณฑ์ node ถัดไปต้อง unlock
- หากทำไม่ผ่าน ระบบต้องอนุญาตให้ retry และยังไม่ unlock step ถัดไป

### 8.3 Micro Lessons

บทเรียนสั้นที่สอนทีละ concept พร้อมตัวอย่างที่เข้าใจง่าย

Requirements:

- Lesson มี title, estimated time, learning objective และเนื้อหาแบบ short-form
- เนื้อหาแต่ละ lesson ควรใช้เวลาอ่านหรือเรียนไม่เกิน 7 นาที
- Lesson ต้องมีตัวอย่างสถานการณ์งาน PM จริงอย่างน้อยหนึ่งตัวอย่าง
- ผู้ใช้สามารถ mark lesson เป็น completed ได้เมื่ออ่านจบหรือกด continue

Acceptance Criteria:

- ผู้ใช้สามารถเรียน lesson แรกได้โดยไม่ต้องมีพื้นฐาน PM
- Lesson ต้องไม่พึ่งพาวิดีโอยาวหรือเอกสารภายนอกใน MVP
- หลังจบบทเรียน ระบบต้องพาไป quiz ที่เกี่ยวข้องทันที

### 8.4 Quizzes

Quiz ใช้เช็กความเข้าใจหลังเรียน และให้ feedback ทันที

Requirements:

- รองรับคำถามแบบ multiple choice เป็นอย่างน้อย
- คำถามต้องผูกกับ lesson หรือ module
- คำตอบต้องมีคำอธิบายว่าเพราะอะไรถูกหรือผิด
- ต้องมี pass threshold เช่น ตอบถูก 70% ขึ้นไป

Acceptance Criteria:

- ผู้ใช้เห็นผล quiz ทันทีหลัง submit
- ระบบบันทึก score, attempt count และ pass/fail status
- หากไม่ผ่าน ผู้ใช้ต้อง retry ได้

### 8.5 Scenario Missions

ภารกิจจำลองใช้ฝึกคิดและตัดสินใจแบบ PM

ตัวอย่าง mission สำหรับ MVP:

- เลือกคำถามที่จะถาม stakeholder เพิ่มเติมจาก requirement ที่ไม่ชัด
- จัด priority feature จาก value, effort และ risk
- เลือกว่าจะ cut scope หรือเลื่อน timeline เมื่อทีม dev เจอ blocker
- เขียน acceptance criteria จาก user story สั้น ๆ
- เลือกวิธีสื่อสารความเสี่ยงกับ stakeholder

Requirements:

- Mission ต้องมีสถานการณ์, ตัวเลือกหรือคำตอบที่ผู้ใช้ต้องส่ง, และ feedback
- Mission แรก ๆ ควรเป็น structured answer เช่น multiple choice หรือ ordering
- Mission ที่เกี่ยวกับการเขียน เช่น acceptance criteria สามารถเริ่มจาก template หรือ fill-in-the-blank ได้
- ระบบต้องบันทึก completion และ feedback history

Acceptance Criteria:

- ผู้ใช้ต้องเข้าใจโจทย์ mission ได้โดยไม่ต้องอ่านเอกสารยาว
- หลังส่งคำตอบ ผู้ใช้ต้องเห็น feedback ที่อธิบายหลักคิด PM
- Mission ที่ผ่านแล้วต้องเพิ่ม XP และช่วยปลดล็อก step ถัดไป

### 8.6 XP, Streak และ Level Progression

Gamification ใช้เพื่อสร้างแรงจูงใจ แต่ต้องไม่กลบเป้าหมายการเรียนจริง

Requirements:

- ให้ XP จาก lesson completion, quiz pass และ mission completion
- นับ streak จากวันที่ผู้ใช้ทำกิจกรรมการเรียนอย่างน้อยหนึ่งอย่าง
- มี level หรือ rank เบื้องต้น เช่น Beginner PM, Associate PM, Junior PM
- แสดง progress รวมใน profile หรือ dashboard

Acceptance Criteria:

- เมื่อผู้ใช้ทำกิจกรรมสำเร็จ XP ต้องเพิ่มทันที
- Streak ต้องเพิ่มเฉพาะวันที่มีกิจกรรม learning activity
- ผู้ใช้เห็น level ปัจจุบันและ XP ที่ต้องใช้เพื่อไป level ถัดไป

### 8.7 Profile Progress

ผู้ใช้ต้องเห็นภาพรวมการเรียนและความคืบหน้าของตัวเอง

Requirements:

- แสดง completed lessons, quiz pass rate, missions completed, current streak และ total XP
- แสดง module progress เป็นเปอร์เซ็นต์
- แสดง recent activity อย่างน้อย 5 รายการล่าสุด

Acceptance Criteria:

- ผู้ใช้สามารถเปิด profile แล้วเข้าใจความคืบหน้าของตัวเองภายในไม่กี่วินาที
- ข้อมูล progress ต้องอัปเดตหลังทำกิจกรรมสำเร็จ

## 9. MVP Curriculum

หลักสูตร MVP ควรเริ่มจากพื้นฐานและไล่ไปสู่การทำงานจริง:

1. PM Foundation
   - PM คืออะไร
   - ความต่างระหว่าง Project Manager, Product Manager และ Product Owner
   - PM mindset: outcome, tradeoff, communication, ownership

2. Product Thinking
   - ปัญหาผู้ใช้และ business value
   - Objective, metric และ success criteria
   - การคิดแบบ value-first

3. Stakeholder Management
   - stakeholder คือใคร
   - วิธีถามคำถามเพื่อ clarify requirement
   - การจัดการ expectation

4. Requirement และ PRD
   - user story
   - acceptance criteria
   - scope in / scope out
   - PRD structure เบื้องต้น

5. Prioritization
   - value vs effort
   - risk และ dependency
   - MVP thinking

6. Roadmap และ Planning
   - milestone
   - release planning
   - timeline และ dependency

7. Agile / Scrum Basics
   - sprint
   - backlog
   - standup
   - retrospective

8. Risk และ Communication
   - risk log
   - blocker
   - status update
   - escalation

9. QA และ Release Basics
   - acceptance testing
   - regression
   - release checklist
   - rollback concept

## 10. Primary User Flows

### Flow A: ผู้ใช้ใหม่เริ่มเรียน

1. ผู้ใช้เปิดเว็บแอป
2. สมัครบัญชีหรือ login
3. ตอบ onboarding สั้น ๆ
4. ระบบแนะนำ beginner path
5. ผู้ใช้เริ่ม lesson แรก
6. ผู้ใช้ทำ quiz
7. ผู้ใช้ทำ scenario mission
8. ระบบให้ feedback, XP, streak และปลดล็อก step ถัดไป

### Flow B: ผู้ใช้กลับมาเรียนต่อ

1. ผู้ใช้ login
2. Dashboard แสดง continue learning
3. ผู้ใช้เลือก node ถัดไปใน skill path
4. ระบบพาไป lesson/quiz/mission ตามลำดับ
5. Progress อัปเดตหลังทำกิจกรรมสำเร็จ

### Flow C: ผู้ใช้ทำ quiz ไม่ผ่าน

1. ผู้ใช้ส่งคำตอบ quiz
2. ระบบแสดงคะแนนและ feedback
3. ระบบแนะนำให้ทบทวน lesson หรือ retry
4. Node ถัดไปยังไม่ unlock
5. เมื่อ retry ผ่าน ระบบ unlock step ถัดไป

## 11. Main Screens สำหรับ Tech Lead

หน้าจอหลักที่ควรมีใน MVP:

- Landing/Login: เข้าใช้งานหรือสมัครบัญชี
- Onboarding: ตั้งค่าพื้นฐานและเป้าหมายการเรียน
- Dashboard: continue learning, streak, XP, next lesson
- Skill Path: แผนที่ module และ node progression
- Lesson Player: อ่านบทเรียนสั้นและกด continue
- Quiz Screen: ทำแบบทดสอบและดูผล
- Scenario Mission Screen: อ่านโจทย์ เลือก/ส่งคำตอบ และรับ feedback
- Profile Progress: ดู XP, streak, completion และ activity ล่าสุด

## 12. Domain Objects เบื้องต้น

Tech Lead สามารถใช้ object เหล่านี้เป็นฐานในการออกแบบ data model:

- `User`: ข้อมูลบัญชีและ profile เบื้องต้น
- `UserPreference`: ระดับพื้นฐาน เป้าหมายการเรียน และ onboarding choices
- `LearningPath`: เส้นทางการเรียนหลัก
- `Module`: หมวดเนื้อหา เช่น Requirement, Prioritization, Release
- `Lesson`: บทเรียนสั้น
- `Quiz`: ชุดคำถามหลัง lesson
- `Question`: คำถามและตัวเลือก
- `ScenarioMission`: ภารกิจจำลองสถานการณ์
- `Attempt`: การส่งคำตอบ quiz หรือ mission แต่ละครั้ง
- `Progress`: สถานะ completed, locked, available และ score
- `RewardLedger`: ประวัติ XP, streak และ level changes
- `ActivityEvent`: event ล่าสุดของผู้ใช้ในระบบ

## 13. Permissions และ Roles

MVP มี role ขั้นต่ำ:

- `Learner`: ผู้เรียนทั่วไป สามารถเรียน ทำ quiz ทำ mission และดู progress ของตัวเอง
- `Admin` หรือ `Content Manager`: จัดการ content พื้นฐาน เช่น lesson, quiz, mission

หมายเหตุ: หากต้องลด scope MVP มากขึ้น สามารถ hardcode content หรือ seed content ผ่านไฟล์/static data ก่อน และเลื่อน admin content management ไป phase ถัดไป

## 14. Analytics Events

ควรเก็บ event พื้นฐานเพื่อวัดพฤติกรรมและคุณภาพ learning loop:

- `user_signed_up`
- `onboarding_completed`
- `lesson_started`
- `lesson_completed`
- `quiz_started`
- `quiz_submitted`
- `quiz_passed`
- `quiz_failed`
- `mission_started`
- `mission_submitted`
- `mission_completed`
- `xp_awarded`
- `streak_updated`
- `level_unlocked`
- `module_unlocked`

## 15. Success Metrics

MVP success metrics:

- Activation rate: ผู้สมัครใหม่ที่เริ่ม lesson แรก
- Lesson completion rate: ผู้เริ่ม lesson ที่เรียนจบ
- Quiz pass rate: อัตราผ่าน quiz ต่อ attempt
- Scenario completion rate: ผู้เริ่ม mission ที่ทำจนจบ
- Day-2 และ Day-7 retention
- Average streak length
- Module completion rate
- User confidence score: คะแนน self-assessment ก่อนและหลังเรียน module

## 16. Functional Acceptance Criteria ระดับ Product

MVP ถือว่าพร้อมเมื่อ:

- ผู้ใช้ใหม่สามารถสมัคร เริ่มเรียน ทำ quiz ทำ mission และเห็น progress ได้ครบ end-to-end
- Beginner path มีเนื้อหาอย่างน้อย 3 modules แรกพร้อม lesson, quiz และ mission
- ระบบ lock/unlock progression ได้ตามผลการเรียน
- ระบบให้ XP และ streak จากกิจกรรมการเรียนได้
- ผู้ใช้เห็น feedback หลัง quiz และ mission
- ผู้ใช้เห็น profile progress ที่อัปเดตจากกิจกรรมจริง
- Admin หรือทีมพัฒนาสามารถเพิ่ม/แก้ content MVP ได้อย่างน้อยผ่าน data seed, config หรือเครื่องมือภายใน

## 17. QA Test Scenarios เบื้องต้น

QA ควรทดสอบอย่างน้อย:

- สมัครบัญชีใหม่และเข้า beginner path สำเร็จ
- ทำ onboarding โดยไม่เลือก preference แล้วระบบใช้ default path
- เรียน lesson แรกจบแล้วเข้าสู่ quiz ที่ถูกต้อง
- ทำ quiz ผ่านแล้วได้ XP และ unlock mission/step ถัดไป
- ทำ quiz ไม่ผ่านแล้วไม่ unlock step ถัดไป
- Retry quiz แล้วผ่าน ระบบอัปเดต progress ถูกต้อง
- ทำ scenario mission สำเร็จแล้วได้ feedback และ XP
- Streak เพิ่มเมื่อทำกิจกรรมในวันใหม่
- Profile แสดง completed lessons, quiz pass rate, mission completion, XP และ streak ถูกต้อง
- Node status ใน skill path แสดง locked, available, completed และ needs retry ถูกต้อง

## 18. DevOps และ Deploy Considerations

MVP ควรเตรียมสิ่งต่อไปนี้:

- Environment แยกอย่างน้อย `development` และ `production`
- Auth secret, database URL และ analytics key ต้องจัดการผ่าน environment variables
- Seed content สำหรับบทเรียน MVP ต้อง deploy ซ้ำได้อย่างปลอดภัย
- CI ควรรัน lint, typecheck และ test พื้นฐานก่อน deploy
- Production deploy ต้องมี smoke test ขั้นต่ำ เช่น login, load dashboard, open lesson
- ต้องมี rollback plan หาก deploy แล้ว login, progress หรือ learning path ใช้งานไม่ได้
- ควรมี basic logging สำหรับ auth error, content loading error, quiz submission error และ progress update error

## 19. Risks และ Mitigations

- Risk: เนื้อหา PM อาจกว้างเกินไปสำหรับ MVP
  - Mitigation: เริ่มจาก 3 modules แรกและใช้ beginner path เป็น scope หลัก

- Risk: Gamification อาจทำให้ผู้ใช้เน้นคะแนนมากกว่าทักษะ
  - Mitigation: ให้ feedback ที่ผูกกับหลักคิด PM และใช้ scenario mission เป็นตัววัดทักษะ

- Risk: Mission แบบเขียนอิสระตรวจยาก
  - Mitigation: MVP ใช้ structured answer, template หรือ fill-in-the-blank ก่อน

- Risk: ผู้ใช้ไม่มีพื้นฐานแล้วหลุดตั้งแต่ lesson แรก
  - Mitigation: ใช้ภาษาง่าย ตัวอย่างจริง และบทเรียนสั้น

## 20. Tech Lead Handoff

Tech Lead ควรแตกงานต่อเป็น module ต่อไปนี้:

- Frontend: onboarding, dashboard, skill path, lesson player, quiz screen, mission screen, profile progress
- Backend: auth, content API, progress tracking, quiz attempt, mission attempt, reward calculation
- Data: user, learning path, module, lesson, quiz, question, mission, progress, reward ledger
- QA: end-to-end learning loop, progression rules, reward rules, retry behavior, profile consistency
- DevOps: environment config, seed content workflow, CI checks, deploy pipeline, smoke tests, rollback

คำแนะนำสำหรับ implementation รอบแรก:

- ใช้ content แบบ seed/static ก่อนเพื่อให้ learning loop ทำงานครบเร็ว
- เริ่มจาก beginner path 3 modules แรก
- ให้ quiz และ mission เป็น structured format ก่อน
- สร้าง analytics event contract ตั้งแต่แรก แม้ยังต่อ provider จริงภายหลัง
- ให้ความสำคัญกับ progress correctness เพราะเป็นแกนหลักของประสบการณ์แบบ Duolingo

## 21. Assumptions

- ผู้ใช้เริ่มจากไม่มีพื้นฐาน PM จริง
- MVP เป็น webapp ก่อน ยังไม่ทำ native mobile app
- การเรียนเป็น self-paced learning ไม่ใช่ live coaching
- Gamification ใช้เพื่อเสริมแรงจูงใจ แต่ผลลัพธ์หลักคือทำงาน PM ได้จริง
- PRD นี้เป็นเอกสารรอบแรกสำหรับให้ `it-tech-lead` นำไปจัด implementation planning ต่อ
