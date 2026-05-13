export type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
};

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

type Distractor = {
  text: string;
  feedback: string;
};

type LessonSeed = Omit<Lesson, "choices"> & {
  answer: string;
  answerFeedback: string;
  distractors: [Distractor, Distractor, Distractor];
};

const lessonSeeds: LessonSeed[] = [
  {
    id: "day-01-problem-vs-solution",
    title: "Day 1: Problem ≠ Solution",
    level: "Foundation",
    minutes: 5,
    xp: 20,
    theme: "Problem Thinking",
    objective: "แยกปัญหาออกจากวิธีแก้ ก่อนรีบเขียนโค้ด",
    concept:
      "PM ที่ดีเริ่มจากถามว่า user เจ็บเรื่องอะไร ไม่ใช่เริ่มจากจะสร้าง feature อะไร เพราะ solution ที่ดูดีอาจไม่ได้แก้ pain จริง",
    coachNote:
      "Developer มักได้ requirement แล้วคิด implementation ทันที วันนี้ให้หยุดก่อน 30 วินาทีแล้วถามหา problem ให้ชัด",
    prompt:
      "Stakeholder บอกว่า: ‘อยากได้ dashboard ใหม่แบบสวย ๆ’ คำถามแรกที่ควรถามคือข้อไหน?",
    answer: "dashboard เดิมมีปัญหาอะไร และใครใช้มันตัดสินใจเรื่องอะไร?",
    answerFeedback: "ถูกต้อง เริ่มจาก user, pain, decision ที่ dashboard ต้องช่วย",
    distractors: [
      {
        text: "อยากใช้ React หรือ Next.js ครับ?",
        feedback: "ยังเร็วไป นี่เป็นคำถามเชิง implementation ก่อนรู้ปัญหา",
      },
      {
        text: "ใช้ chart library ตัวไหนดี?",
        feedback: "นี่คือ solution detail ต้องรอหลังรู้ goal และ data ก่อน",
      },
      {
        text: "ทำ dark mode ด้วยไหม?",
        feedback: "อาจดี แต่ยังไม่ตอบว่าปัญหาหลักคืออะไร",
      },
    ],
    practice:
      "เขียน requirement นี้ใหม่เป็น Problem Statement 1 ประโยค: ‘อยากได้ dashboard ใหม่แบบสวย ๆ’",
  },
  {
    id: "day-02-primary-user",
    title: "Day 2: หา User ตัวจริง",
    level: "Foundation",
    minutes: 6,
    xp: 20,
    theme: "User Thinking",
    objective: "ระบุ primary user และ job-to-be-done ให้ชัด",
    concept:
      "คำว่า user ไม่ควรกว้างเกินไป เช่น ‘ทุกคนในบริษัท’ เพราะจะทำให้ scope บวม ต้องระบุ primary user และงานที่เขาต้องทำให้สำเร็จ",
    coachNote:
      "ถ้า user ไม่ชัด acceptance criteria จะไม่ชัด และทีมจะ build ตามความรู้สึก",
    prompt:
      "Feature ‘ระบบอนุมัติค่าใช้จ่าย’ ควรเริ่มนิยาม primary user แบบไหนดีที่สุด?",
    answer: "พนักงานที่ส่งคำขอเบิกเงิน และ manager ที่ต้องอนุมัติภายใน 2 วัน",
    answerFeedback: "ดีมาก ระบุ persona และงานที่ต้องสำเร็จชัด",
    distractors: [
      {
        text: "พนักงานทุกคนในบริษัท",
        feedback: "กว้างเกินไป อาจมีหลาย persona ที่ต้องการต่างกัน",
      },
      {
        text: "ฝ่ายบัญชีเท่านั้น เพราะเกี่ยวกับเงิน",
        feedback: "อาจเป็น stakeholder สำคัญ แต่ไม่ครอบคลุม flow หลักทั้งหมด",
      },
      {
        text: "คนที่ login ได้ทุกคน",
        feedback: "เป็นเงื่อนไขระบบ ไม่ใช่ user persona",
      },
    ],
    practice: "เลือก feature ที่คุณเคยทำ 1 อัน แล้วเขียน primary user + job-to-be-done ให้ชัด",
  },
  {
    id: "day-03-pain-frequency-urgency",
    title: "Day 3: Pain / Frequency / Urgency",
    level: "Discovery",
    minutes: 7,
    xp: 25,
    theme: "Problem Validation",
    objective: "ประเมินว่าปัญหานี้เจ็บจริง เกิดบ่อย และควรแก้ตอนนี้ไหม",
    concept:
      "ปัญหาที่ดีสำหรับ product มักมี 3 อย่าง: เจ็บพอ, เกิดบ่อยพอ, และเร่งด่วนพอ ถ้าขาดทั้งหมดอาจเป็นแค่ nice-to-have",
    coachNote:
      "อย่าให้เสียงดังของ stakeholder หลอกว่าเป็นปัญหาใหญ่ ต้องดูความถี่และผลกระทบจริง",
    prompt: "ถ้า user บ่นปัญหาหนึ่งเดือนละครั้งและไม่มีผลต่อรายได้/งานหลัก ควรจัดเป็นอะไร?",
    answer: "ควร validate เพิ่มหรือจัดเป็น lower priority ก่อน ไม่ใช่ Must ทันที",
    answerFeedback: "ถูกต้อง ต้องดู pain, frequency, urgency ก่อนดันเข้า MVP",
    distractors: [
      {
        text: "Must-have ทันที เพราะมีคนบ่นแล้ว",
        feedback: "คนบ่นไม่ได้แปลว่าควรทำก่อนเสมอ ต้องดูผลกระทบ",
      },
      {
        text: "ตัดทิ้งตลอดไป",
        feedback: "เร็วเกินไป อาจเก็บเป็น backlog และรอข้อมูลเพิ่มได้",
      },
      {
        text: "ให้ Dev ทำถ้าว่างโดยไม่ต้องบันทึกเหตุผล",
        feedback: "จะทำให้ priority เละและวัดผลไม่ได้",
      },
    ],
    practice: "เลือกปัญหา 1 เรื่อง แล้วให้คะแนน Pain/Frequency/Urgency อย่างละ 1–5 พร้อมเหตุผล",
  },
  {
    id: "day-04-jtbd",
    title: "Day 4: Job-to-be-Done",
    level: "Discovery",
    minutes: 7,
    xp: 25,
    theme: "User Outcome",
    objective: "นิยามงานที่ user ต้องทำให้สำเร็จ ไม่ใช่แค่หน้าจอที่อยากได้",
    concept:
      "Job-to-be-Done คือ ‘เมื่อสถานการณ์ X ฉันอยากทำ Y เพื่อให้ได้ผลลัพธ์ Z’ ช่วยให้ PM ไม่ติดกับ solution แรก",
    coachNote:
      "เวลา user ขอปุ่มเพิ่ม ให้ถามว่าเขาจะใช้ปุ่มนั้นทำงานอะไรให้สำเร็จ",
    prompt: "ข้อไหนเป็น JTBD ที่ดีที่สุดสำหรับระบบ reorder สินค้า?",
    answer: "เมื่อฉันอยากซื้อของซ้ำ ฉันอยากสั่งจากรายการเดิมได้เร็ว เพื่อประหยัดเวลา",
    answerFeedback: "ถูกต้อง มีสถานการณ์ งานที่ต้องทำ และผลลัพธ์ชัด",
    distractors: [
      {
        text: "ระบบต้องมีปุ่ม reorder สีเขียว",
        feedback: "นี่คือ solution/UI detail ไม่ใช่ job",
      },
      {
        text: "ลูกค้าชอบความเร็ว",
        feedback: "ยังทั่วไปเกินไป ไม่เห็นสถานการณ์และงานที่ต้องทำ",
      },
      {
        text: "ทำหน้า order history ใหม่",
        feedback: "เป็น feature proposal ยังไม่ใช่ outcome ของ user",
      },
    ],
    practice: "เขียน JTBD 3 ประโยคจาก feature ที่คุณเคยทำ",
  },
  {
    id: "day-05-success-metric",
    title: "Day 5: Success Metric",
    level: "Discovery",
    minutes: 8,
    xp: 25,
    theme: "Outcome Metrics",
    objective: "กำหนด metric ที่บอกว่างานนี้สำเร็จจริงไหม",
    concept:
      "Metric ที่ดีต้องเชื่อมกับ outcome ไม่ใช่แค่จำนวน feature ที่ ship เช่น activation, completion, conversion, time saved, error reduction",
    coachNote:
      "ถ้าไม่มี metric ทีมจะฉลองตอน deploy แต่ไม่รู้ว่า user ดีขึ้นไหม",
    prompt: "Metric ไหนเหมาะกับ feature ‘reorder สินค้า’ มากที่สุด?",
    answer: "เปอร์เซ็นต์ลูกค้าที่สั่งซื้อซ้ำสำเร็จ และเวลาที่ใช้จน checkout ลดลง",
    answerFeedback: "ดีมาก วัดทั้ง outcome และ friction ที่ลดลง",
    distractors: [
      {
        text: "จำนวนบรรทัดโค้ดที่เขียน",
        feedback: "ไม่สะท้อน value ต่อ user",
      },
      {
        text: "จำนวนสีใน UI",
        feedback: "เป็น design detail ไม่ใช่ success metric",
      },
      {
        text: "จำนวน meeting ของทีม",
        feedback: "อาจสะท้อน process แต่ไม่ใช่ product outcome",
      },
    ],
    practice: "ตั้ง success metrics 3 ข้อให้ app ฝึก PM นี้",
  },
  {
    id: "day-06-mini-prd",
    title: "Day 6: Mini PRD 1 หน้า",
    level: "PRD",
    minutes: 8,
    xp: 30,
    theme: "Requirement → PRD",
    objective: "แปลง requirement ให้เป็นเอกสารที่ทีมเอาไปทำต่อได้",
    concept:
      "PRD ที่ดีไม่จำเป็นต้องยาว แต่ต้องตอบ Goal, User, Scope, Out of Scope, Acceptance Criteria, Risk และ Open Questions",
    coachNote:
      "Developer ที่เขียน mini PRD ได้จะลดงานแก้ซ้ำ เพราะทีมเห็นภาพเดียวกันก่อนเริ่ม code",
    prompt: "ข้อไหนควรอยู่ใน PRD มากที่สุด?",
    answer: "Goal, target user, scope, out of scope, acceptance criteria, risk",
    answerFeedback: "ถูกต้อง นี่คือ minimum ที่ทำให้ทีมเข้าใจตรงกัน",
    distractors: [
      {
        text: "สีปุ่มทุกปุ่มแบบละเอียดตั้งแต่แรก",
        feedback: "รายละเอียด UI อาจอยู่ใน design spec ไม่ใช่แกน PRD เสมอไป",
      },
      {
        text: "โค้ดตัวอย่างทุก function",
        feedback: "เป็น implementation detail ให้ Tech Lead/Dev จัดการต่อ",
      },
      {
        text: "รายชื่อ library ที่จะใช้ทั้งหมด",
        feedback: "มักเป็นหน้าที่ Tech Lead มากกว่า PM",
      },
    ],
    practice: "เขียน mini PRD 1 หน้าให้ feature: ‘ระบบเรียน PM แบบ Duolingo สำหรับ Developer’",
  },
  {
    id: "day-07-user-story",
    title: "Day 7: User Story",
    level: "PRD",
    minutes: 8,
    xp: 30,
    theme: "Story Writing",
    objective: "เขียน story ที่บอก user, need, benefit ชัดเจน",
    concept:
      "User Story แบบ As a / I want / So that ช่วยให้ทีมเห็นว่าใครต้องการอะไรและทำไปเพื่อผลลัพธ์ไหน",
    coachNote:
      "Story ที่ดีไม่ใช่ task ทางเทคนิค เช่น ‘สร้าง API’ แต่เป็นความต้องการของ user",
    prompt: "ข้อไหนเป็น user story ที่ดีที่สุด?",
    answer: "As a returning customer, I want to reorder from past purchases so that I can buy faster.",
    answerFeedback: "ถูกต้อง มี persona, need, benefit ครบ",
    distractors: [
      {
        text: "สร้าง endpoint POST /reorder",
        feedback: "เป็น technical task ไม่ใช่ user story",
      },
      {
        text: "ทำ reorder ให้ดี ๆ",
        feedback: "กว้างเกินไป ไม่รู้ user และ benefit",
      },
      {
        text: "ใช้ Redis cache สำหรับ reorder",
        feedback: "เป็น implementation decision ไม่ใช่ story",
      },
    ],
    practice: "แตก feature เดียวเป็น user stories 3–5 เรื่อง",
  },
  {
    id: "day-08-acceptance-criteria",
    title: "Day 8: Acceptance Criteria",
    level: "PRD",
    minutes: 8,
    xp: 30,
    theme: "Quality of Requirement",
    objective: "เขียนเงื่อนไขสำเร็จที่ QA/Dev ตรวจได้จริง",
    concept:
      "Acceptance Criteria ต้อง observable และ testable เช่น ‘เมื่อ user เลือกคำตอบถูก ระบบเพิ่ม XP 20 และบันทึก progress’",
    coachNote:
      "คำว่า ‘ใช้งานง่าย’ ยัง test ไม่ได้ ต้องแปลงเป็น behavior ที่เห็นได้",
    prompt: "ข้อไหนเป็น acceptance criteria ที่ดีที่สุด?",
    answer: "เมื่อผู้เรียนตอบถูก ระบบแสดง feedback, เพิ่ม XP, และปลดล็อกบทถัดไป",
    answerFeedback: "ถูกต้อง ตรวจได้ชัดเจนทั้ง behavior และผลลัพธ์",
    distractors: [
      {
        text: "หน้าต้องดูดีและเร็ว",
        feedback: "กว้างและวัดยาก ต้องระบุ observable behavior หรือ metric",
      },
      {
        text: "ระบบควร modern",
        feedback: "เป็นความรู้สึก ไม่ใช่ criteria ที่ test ได้",
      },
      {
        text: "ใช้ animation เยอะ ๆ",
        feedback: "เป็น design preference ไม่ใช่ผลสำเร็จของ feature",
      },
    ],
    practice: "เขียน acceptance criteria 5 ข้อสำหรับ app ฝึก PM นี้",
  },
  {
    id: "day-09-scope-boundary",
    title: "Day 9: Scope Boundary",
    level: "PRD",
    minutes: 7,
    xp: 30,
    theme: "Scope Control",
    objective: "เขียน in-scope และ out-of-scope เพื่อลดงานบาน",
    concept:
      "Out-of-scope ไม่ใช่การปฏิเสธ แต่คือการปกป้อง MVP ให้พิสูจน์ value ได้เร็วขึ้น",
    coachNote:
      "PM ที่ดีต้องกล้าตัดของที่ยังไม่จำเป็น พร้อมบอกเหตุผล",
    prompt: "สำหรับ MVP app ฝึก PM แบบคนเดียว ข้อไหนควร out-of-scope ก่อน?",
    answer: "ระบบองค์กรหลายทีมพร้อม leaderboard และ admin role ซับซ้อน",
    answerFeedback: "ถูกต้อง เก็บไว้ phase หลังได้ เพราะยังไม่จำเป็นต่อ learning loop แรก",
    distractors: [
      {
        text: "บทเรียนหลักและ quiz",
        feedback: "นี่คือ core loop ต้องอยู่ใน MVP",
      },
      {
        text: "feedback หลังตอบคำถาม",
        feedback: "จำเป็นต่อการเรียนรู้",
      },
      {
        text: "progress ของผู้เรียน",
        feedback: "สำคัญต่อ game loop และ motivation",
      },
    ],
    practice: "เขียน In Scope 5 ข้อ และ Out of Scope 5 ข้อให้ feature ที่คุณอยากสร้าง",
  },
  {
    id: "day-10-assumption-risk",
    title: "Day 10: Assumption & Risk",
    level: "PRD",
    minutes: 8,
    xp: 30,
    theme: "Risk Thinking",
    objective: "แยกสิ่งที่รู้จริงออกจาก assumption และ risk",
    concept:
      "Assumption คือสิ่งที่เราเชื่อแต่ยังไม่พิสูจน์ Risk คือสิ่งที่อาจทำให้ goal ไม่สำเร็จ ทั้งคู่ต้องถูกเขียนให้เห็นชัด",
    coachNote:
      "ถ้า assumption ซ่อนอยู่ในหัว PM ทีมจะ build จากความเชื่อที่ตรวจไม่ได้",
    prompt: "ข้อไหนเป็น assumption ที่ควรเขียนใน PRD?",
    answer: "เราเชื่อว่า developer จะยอมฝึก PM วันละ 5–10 นาที ถ้าบทเรียนสั้นและมี feedback",
    answerFeedback: "ถูกต้อง เป็นความเชื่อที่สำคัญและควร validate",
    distractors: [
      {
        text: "Next.js สามารถ render หน้าเว็บได้",
        feedback: "นี่เป็นข้อเท็จจริงทางเทคนิคทั่วไป ไม่ใช่ product assumption สำคัญ",
      },
      {
        text: "ปุ่มควรอยู่มุมขวา",
        feedback: "เป็น design decision ไม่ใช่ assumption หลัก",
      },
      {
        text: "ทีมจะเขียนโค้ดได้",
        feedback: "กว้างไปและไม่ช่วย validate product risk",
      },
    ],
    practice: "เขียน assumptions 3 ข้อ และ risks 3 ข้อสำหรับ app นี้",
  },
  {
    id: "day-11-moscow",
    title: "Day 11: MoSCoW Priority",
    level: "Prioritization",
    minutes: 8,
    xp: 35,
    theme: "Priority",
    objective: "แยก Must / Should / Could / Won’t เพื่อลด scope บวม",
    concept:
      "MVP ต้องมี Must ที่ทำให้ goal สำเร็จ ส่วน Should/Could เก็บไว้ phase ถัดไป ถ้าไม่ตัด scope ทีมจะเสียเวลาไปกับสิ่งที่ยังไม่พิสูจน์ value",
    coachNote:
      "PM skill ที่สำคัญคือกล้าพูดว่า ‘ยังไม่ทำตอนนี้’ พร้อมเหตุผล",
    prompt: "MVP ของ app ฝึก PM แบบ Duolingo ข้อไหนควรเป็น Must?",
    answer: "บทเรียนเป็นลำดับ, คำถาม, feedback, progress, XP",
    answerFeedback: "ถูกต้อง นี่คือ core loop ที่พิสูจน์ learning value",
    distractors: [
      {
        text: "ระบบสมัครสมาชิก OAuth หลาย provider",
        feedback: "อาจจำเป็นในอนาคต แต่ MVP ฝึกคนเดียวใช้ local progress ก่อนได้",
      },
      {
        text: "leaderboard ระดับองค์กร",
        feedback: "เป็น engagement feature phase หลัง ไม่ใช่ core MVP",
      },
      {
        text: "AI voice coach แบบ real-time",
        feedback: "น่าสนใจแต่แพงและซับซ้อนเกิน MVP แรก",
      },
    ],
    practice: "จัด MoSCoW ให้ feature backlog ของ app นี้ 8 รายการ",
  },
  {
    id: "day-12-rice",
    title: "Day 12: RICE Score",
    level: "Prioritization",
    minutes: 8,
    xp: 35,
    theme: "Priority",
    objective: "ใช้ Reach / Impact / Confidence / Effort จัดลำดับงาน",
    concept:
      "RICE ช่วยให้การเลือก feature มีเหตุผลขึ้น แต่ตัวเลขต้องซื่อสัตย์ โดยเฉพาะ Confidence และ Effort",
    coachNote:
      "Developer ได้เปรียบตรงประเมิน Effort ได้ใกล้จริงกว่า PM non-tech",
    prompt: "ถ้า feature มี Impact สูง แต่ Confidence ต่ำมาก PM ควรทำอะไร?",
    answer: "ทำ discovery หรือ experiment เล็ก ๆ เพื่อเพิ่ม confidence ก่อน",
    answerFeedback: "ถูกต้อง ลดความเสี่ยงก่อนลงทุนใหญ่",
    distractors: [
      {
        text: "ทำทันทีเพราะ impact สูง",
        feedback: "เสี่ยงสร้างของใหญ่จาก assumption ที่ยังไม่พิสูจน์",
      },
      {
        text: "ตัดทิ้งทันที",
        feedback: "อาจพลาด opportunity ใหญ่ ควร validate ก่อน",
      },
      {
        text: "ให้ dev estimate ใหม่จน effort ต่ำลง",
        feedback: "ไม่ควรบิด effort เพื่อให้ score ดูดี",
      },
    ],
    practice: "เลือก 5 feature แล้วให้คะแนน RICE พร้อมเหตุผลแบบสั้น",
  },
  {
    id: "day-13-mvp-slicing",
    title: "Day 13: MVP Slicing",
    level: "Prioritization",
    minutes: 9,
    xp: 35,
    theme: "MVP",
    objective: "ตัด feature ใหญ่ให้เหลือ version แรกที่ยังให้ value ได้",
    concept:
      "MVP ไม่ใช่ของห่วย แต่คือ slice ที่เล็กที่สุดซึ่งยังพิสูจน์ value หลักได้",
    coachNote:
      "ถามเสมอว่า ‘ถ้าทำได้แค่ 20% อะไรคือแกนที่ห้ามขาด?’",
    prompt: "MVP slice ของ AI PRD grader ควรเริ่มแบบไหน?",
    answer: "ให้ user paste PRD แล้ว AI ให้ feedback 3 หมวด: clarity, scope, AC",
    answerFeedback: "ถูกต้อง เล็กแต่พิสูจน์ value ของ grader ได้",
    distractors: [
      {
        text: "สร้าง marketplace template, role permission, billing, SSO พร้อมกัน",
        feedback: "ใหญ่เกิน MVP และยังไม่พิสูจน์ grader value",
      },
      {
        text: "ทำหน้า landing อย่างเดียวโดยไม่มีการตรวจ PRD",
        feedback: "ไม่พิสูจน์ core value ของ AI grader",
      },
      {
        text: "ทำระบบ mobile native ก่อน",
        feedback: "channel ยังไม่สำคัญเท่า core loop",
      },
    ],
    practice: "เลือก feature ใหญ่ 1 อัน แล้วตัดเป็น MVP / V2 / Later",
  },
  {
    id: "day-14-roadmap",
    title: "Day 14: Roadmap 3 Phase",
    level: "Planning",
    minutes: 8,
    xp: 35,
    theme: "Roadmap",
    objective: "วางลำดับงานเป็น phase ที่เข้าใจง่าย",
    concept:
      "Roadmap ที่ดีบอก sequence และเหตุผล ไม่ใช่แค่ list feature ยาว ๆ โดย phase แรกควร validate core value ก่อน",
    coachNote:
      "Roadmap ต้องเปลี่ยนได้เมื่อข้อมูลใหม่มา อย่าทำให้ดูเหมือนสัญญาที่ล็อกตาย",
    prompt: "ลำดับ roadmap ที่เหมาะกับ app ฝึก PM คือข้อไหน?",
    answer: "MVP learning loop → AI feedback → account/team analytics",
    answerFeedback: "ถูกต้อง เริ่มจาก value หลักแล้วค่อยเพิ่ม intelligence และ scale",
    distractors: [
      {
        text: "billing → admin → lesson content",
        feedback: "เริ่มจาก business/admin ก่อนพิสูจน์ learning value เร็วเกินไป",
      },
      {
        text: "leaderboard → avatar shop → quiz",
        feedback: "gamification มาก่อน learning loop ไม่เหมาะ",
      },
      {
        text: "mobile app → desktop app → web content",
        feedback: "channel มาก่อน core value",
      },
    ],
    practice: "เขียน roadmap 3 phase ให้ app นี้ โดยแต่ละ phase มี goal และ success metric",
  },
  {
    id: "day-15-backlog",
    title: "Day 15: Backlog Hygiene",
    level: "Planning",
    minutes: 7,
    xp: 35,
    theme: "Backlog",
    objective: "ดูแล backlog ให้เป็น decision tool ไม่ใช่กองขยะ",
    concept:
      "Backlog ที่ดีต้องมี owner, priority, reason, status และควรถูก prune เป็นระยะ งานที่ไม่มีเหตุผลควรถูกตัดหรือย้ายออก",
    coachNote:
      "ถ้าทุกอย่าง priority สูง แปลว่าไม่มี priority จริง",
    prompt: "Backlog item ที่ดีควรมีอะไร?",
    answer: "problem, user/value, priority, effort estimate, status, owner หรือ next action",
    answerFeedback: "ถูกต้อง ทำให้ backlog ใช้ตัดสินใจได้",
    distractors: [
      {
        text: "มีแค่ชื่อ feature ก็พอ",
        feedback: "ไม่พอสำหรับจัดลำดับและ handoff",
      },
      {
        text: "เก็บทุก request ตลอดไปห้ามลบ",
        feedback: "จะทำให้ backlog กลายเป็นกองขยะและเสีย focus",
      },
      {
        text: "ใส่ priority P0 ทุกงานเพื่อให้ทีมเห็นว่าสำคัญ",
        feedback: "ทำให้ priority หมดความหมาย",
      },
    ],
    practice: "จัด backlog 10 รายการของ project หนึ่งให้มี priority และเหตุผล",
  },
  {
    id: "day-16-handoff-tech-lead",
    title: "Day 16: Handoff ให้ Tech Lead",
    level: "Communication",
    minutes: 8,
    xp: 35,
    theme: "Handoff",
    objective: "ส่งต่องานให้ Tech Lead ออกแบบต่อโดยไม่ตีความผิด",
    concept:
      "handoff ที่ดีต้องมี goal, scope, AC, constraints, open questions และสิ่งที่ยังไม่ตัดสินใจ ห้ามซ่อน assumption",
    coachNote:
      "PM ไม่ต้องเลือก library เอง แต่ต้องบอก constraint ให้ Tech Lead ตัดสินใจถูก",
    prompt: "ข้อมูลไหนสำคัญที่สุดใน handoff ไปหา Tech Lead?",
    answer: "goal, scope, AC, constraints, risk, open questions",
    answerFeedback: "ถูกต้อง Tech Lead จะเอาไปประเมิน architecture และ trade-off ต่อได้",
    distractors: [
      {
        text: "บอกให้ใช้ stack ที่ PM ชอบ",
        feedback: "PM ไม่ควรล็อก implementation ถ้าไม่มีเหตุผล product/constraint ชัด",
      },
      {
        text: "แค่ส่ง screenshot คร่าว ๆ",
        feedback: "ไม่พอสำหรับตัดสินใจทางเทคนิคและ scope",
      },
      {
        text: "ส่ง deadline อย่างเดียว",
        feedback: "deadline สำคัญแต่ไม่พอให้ทีมตัดสินใจถูก",
      },
    ],
    practice: "เขียน handoff ไปหา Tech Lead สำหรับ MVP app นี้ 1 ฉบับ",
  },
  {
    id: "day-17-stakeholder-update",
    title: "Day 17: Stakeholder Update",
    level: "Communication",
    minutes: 7,
    xp: 35,
    theme: "Stakeholder",
    objective: "สื่อสารสถานะให้คนตัดสินใจเข้าใจเร็ว",
    concept:
      "Update ที่ดีควรมี progress, decision needed, risk/blocker, next step ไม่ใช่เล่าทุกอย่างที่ทีมทำ",
    coachNote:
      "ผู้บริหารต้องการรู้ว่าอะไรเปลี่ยน, อะไรเสี่ยง, และต้องตัดสินใจอะไร",
    prompt: "สถานะ feature delay เพราะ dependency API ยังไม่พร้อม ควร update อย่างไร?",
    answer: "บอก impact, option ที่เลือกได้, decision ที่ต้องการ และวันตรวจอีกครั้ง",
    answerFeedback: "ถูกต้อง เป็น update ที่ช่วยตัดสินใจ ไม่ใช่แค่รายงานปัญหา",
    distractors: [
      {
        text: "บอกแค่ว่า dev กำลังทำอยู่",
        feedback: "ไม่บอก risk หรือ decision ที่ต้องทำ",
      },
      {
        text: "ซ่อนปัญหาไว้จนกว่าจะถึง deadline",
        feedback: "เสี่ยงทำให้ stakeholder แก้เกมไม่ทัน",
      },
      {
        text: "ส่ง log technical ยาว ๆ ทั้งหมด",
        feedback: "รายละเอียดมากเกินและไม่ช่วยตัดสินใจเร็ว",
      },
    ],
    practice: "เขียน stakeholder update 5 บรรทัดสำหรับ feature ที่เสี่ยง delay",
  },
  {
    id: "day-18-decision-log",
    title: "Day 18: Decision Log",
    level: "Communication",
    minutes: 7,
    xp: 35,
    theme: "Decision Making",
    objective: "บันทึก decision และเหตุผลเพื่อกันทีมวนซ้ำ",
    concept:
      "Decision log ช่วยให้ทีมรู้ว่าเลือกอะไร เพราะอะไร มี consequence อะไร และเมื่อไรควร revisit",
    coachNote:
      "หลายทีมเสียเวลาเพราะตัดสินใจเรื่องเดิมซ้ำ ๆ โดยไม่มีบันทึก",
    prompt: "Decision log ที่ดีควรมีอะไร?",
    answer: "context, options, decision, reason, consequence, owner/date",
    answerFeedback: "ถูกต้อง มีพอให้คนมาอ่านทีหลังเข้าใจเหตุผล",
    distractors: [
      {
        text: "มีแค่คำว่า approved",
        feedback: "ไม่พอให้เข้าใจเหตุผลและ trade-off",
      },
      {
        text: "เก็บไว้ในแชทส่วนตัวของ PM",
        feedback: "ทีมจะเข้าถึงไม่ได้และความรู้หาย",
      },
      {
        text: "เขียนเฉพาะคนที่เห็นด้วย",
        feedback: "ควรบันทึก option และ consequence ไม่ใช่คะแนนนิยมอย่างเดียว",
      },
    ],
    practice: "เขียน decision log 1 ฉบับจาก decision ล่าสุดในงานของคุณ",
  },
  {
    id: "day-19-ux-flow",
    title: "Day 19: UX Flow พื้นฐาน",
    level: "UX Basics",
    minutes: 8,
    xp: 35,
    theme: "UX",
    objective: "มอง flow ของ user ก่อนลงรายละเอียด UI",
    concept:
      "UX flow คือขั้นตอนที่ user ต้องผ่านเพื่อทำงานให้สำเร็จ ถ้า flow สะดุด ต่อให้ UI สวยก็ยังใช้ยาก",
    coachNote:
      "PM ไม่ต้องเป็น designer แต่ต้องมอง friction และ missing state ออก",
    prompt: "ก่อนออกแบบหน้าจอ quiz PM ควรนิยามอะไรก่อน?",
    answer: "flow ตั้งแต่เลือกบทเรียน → อ่าน concept → ตอบ → รับ feedback → ไปบทถัดไป",
    answerFeedback: "ถูกต้อง เริ่มจาก flow ก่อนลง component detail",
    distractors: [
      {
        text: "เลือก gradient ให้สวยที่สุดก่อน",
        feedback: "visual สำคัญแต่ยังไม่ใช่ flow หลัก",
      },
      {
        text: "เลือก icon pack ก่อน",
        feedback: "เป็น detail หลังเข้าใจ flow",
      },
      {
        text: "เขียน database schema ก่อนเสมอ",
        feedback: "สำหรับ UX flow ยังเร็วไป",
      },
    ],
    practice: "วาด user flow 5 ขั้นตอนสำหรับ app ฝึก PM นี้เป็น bullet list",
  },
  {
    id: "day-20-usability-states",
    title: "Day 20: Empty / Error / Success State",
    level: "UX Basics",
    minutes: 8,
    xp: 35,
    theme: "UX",
    objective: "คิด state สำคัญที่มักตกหล่นใน requirement",
    concept:
      "Requirement ที่ดีต้องครอบคลุม state หลัก เช่น empty, loading, error, success, locked, completed เพราะ state เหล่านี้กระทบประสบการณ์จริง",
    coachNote:
      "Developer จะรัก PM ที่เขียน state ชัด เพราะลด edge case ระหว่าง implement",
    prompt: "สำหรับ lesson path แบบล็อกบทเรียน state ไหนต้องนิยาม?",
    answer: "locked, unlocked, active, completed, error/loading ถ้ามี network",
    answerFeedback: "ถูกต้อง เป็น state ที่ user เห็นและ dev ต้อง implement",
    distractors: [
      {
        text: "มีแค่สีหลักของแบรนด์ก็พอ",
        feedback: "ยังไม่ครอบคลุม behavior state",
      },
      {
        text: "ไม่ต้องนิยาม ให้ dev เดาเอง",
        feedback: "จะทำให้ experience ไม่สม่ำเสมอ",
      },
      {
        text: "คิดเฉพาะ happy path",
        feedback: "edge state คือจุดที่ user เจ็บบ่อย",
      },
    ],
    practice: "เขียน states ทั้งหมดของ quiz card ใน app นี้",
  },
  {
    id: "day-21-analytics-events",
    title: "Day 21: Analytics Events",
    level: "Metrics",
    minutes: 8,
    xp: 40,
    theme: "Analytics",
    objective: "คิด event tracking ที่ตอบคำถาม product ได้จริง",
    concept:
      "Event ที่ดีควรบอก behavior ที่นำไปสู่ decision เช่น lesson_started, answer_submitted, lesson_completed, practice_written",
    coachNote:
      "อย่า track ทุก click โดยไม่มีคำถาม product เพราะจะได้ noise มากกว่า insight",
    prompt: "ถ้าจะรู้ว่า user ติดตรงไหนใน learning path ควร track อะไร?",
    answer: "lesson_started, answer_submitted, answer_correct, lesson_completed, drop-off point",
    answerFeedback: "ถูกต้อง ทำให้หา friction ใน funnel ได้",
    distractors: [
      {
        text: "จำนวนไฟล์ใน repo",
        feedback: "ไม่เกี่ยวกับ behavior ของผู้เรียน",
      },
      {
        text: "สีปุ่มที่ชอบที่สุด",
        feedback: "อาจใช้ใน UX research แต่ไม่พอวัด learning path",
      },
      {
        text: "เวลาที่ทีมใช้ประชุม",
        feedback: "เป็น team process metric ไม่ใช่ product usage event",
      },
    ],
    practice: "ออกแบบ analytics events 8 ตัวสำหรับ PM Quest",
  },
  {
    id: "day-22-north-star",
    title: "Day 22: North Star Metric",
    level: "Metrics",
    minutes: 8,
    xp: 40,
    theme: "Product Metrics",
    objective: "เลือก metric หลักที่สะท้อน value ระยะยาว",
    concept:
      "North Star Metric ต้องสะท้อน value ที่ user ได้รับและสัมพันธ์กับการเติบโต ไม่ใช่ vanity metric อย่าง page views อย่างเดียว",
    coachNote:
      "สำหรับ learning product metric ที่ดีมักเชื่อมกับ completion และ skill improvement",
    prompt: "North Star ที่เหมาะกับ PM Quest เวอร์ชันฝึกจริงคือข้อไหน?",
    answer: "จำนวนผู้เรียนที่จบบทสำคัญและส่ง mini PRD ที่ผ่านเกณฑ์คุณภาพ",
    answerFeedback: "ดีมาก วัดทั้ง progress และ skill outcome",
    distractors: [
      {
        text: "จำนวนสีในหน้าเว็บ",
        feedback: "ไม่สะท้อน value ต่อผู้เรียน",
      },
      {
        text: "จำนวน commit ต่อวัน",
        feedback: "เป็น dev activity ไม่ใช่ learning value",
      },
      {
        text: "จำนวนหน้า landing ที่เปิด",
        feedback: "เป็น vanity ได้ถ้าไม่เชื่อมกับ learning outcome",
      },
    ],
    practice: "ตั้ง North Star Metric และ supporting metrics 3 ตัวให้ app นี้",
  },
  {
    id: "day-23-experiment",
    title: "Day 23: Experiment Design",
    level: "Metrics",
    minutes: 9,
    xp: 40,
    theme: "Validation",
    objective: "ออกแบบ experiment เล็กเพื่อพิสูจน์ assumption",
    concept:
      "Experiment ที่ดีมี hypothesis, target user, method, success criteria และ timebox ไม่ใช่ทำ feature ใหญ่เพื่อ ‘ลองดู’",
    coachNote:
      "ถ้าไม่รู้ว่าอะไรจะทำให้ experiment สำเร็จหรือ fail แปลว่ายังออกแบบไม่ดี",
    prompt: "จะพิสูจน์ว่า AI feedback ช่วยให้เขียน PRD ดีขึ้น ควรทดลองอย่างไร?",
    answer: "ให้ผู้เรียนเขียน PRD ก่อน/หลังรับ AI feedback แล้วใช้ rubric เทียบคะแนน",
    answerFeedback: "ถูกต้อง วัด improvement โดยตรงจาก outcome",
    distractors: [
      {
        text: "สร้างระบบ AI เต็มรูปแบบก่อนแล้วค่อยดู",
        feedback: "ใหญ่เกินและเสี่ยงลงทุนก่อน validate",
      },
      {
        text: "ถามทีม dev ว่าชอบไหมอย่างเดียว",
        feedback: "opinion ไม่พอ ต้องวัด skill improvement",
      },
      {
        text: "นับจำนวน animation หลังเพิ่ม AI",
        feedback: "ไม่เกี่ยวกับคุณภาพ PRD",
      },
    ],
    practice: "เขียน experiment 1 ชุด: hypothesis, method, metric, timebox",
  },
  {
    id: "day-24-tech-lead-literacy",
    title: "Day 24: Tech Lead Literacy",
    level: "Tech Bridge",
    minutes: 9,
    xp: 40,
    theme: "PM + Tech Lead",
    objective: "รู้ว่าตอนไหนควรถาม Tech Lead และถามอะไร",
    concept:
      "PM ไม่ต้องเป็นคนออกแบบ architecture แต่ต้องเข้าใจว่า product decision กระทบ complexity, risk, security, performance และ delivery time",
    coachNote:
      "คุณเป็น developer อยู่แล้ว ให้ใช้จุดแข็งนี้เพื่อเขียน requirement ที่ realistic มากขึ้น",
    prompt: "Requirement ไหนควรส่งให้ Tech Lead ประเมินก่อน commit scope?",
    answer: "เพิ่ม real-time collaboration, auth, payment, และ analytics ใน release เดียว",
    answerFeedback: "ถูกต้อง มีหลาย cross-cutting concern ต้องประเมิน architecture/trade-off",
    distractors: [
      {
        text: "เปลี่ยนคำบนปุ่มจาก Start เป็น Begin",
        feedback: "ผลกระทบเล็ก ไม่ต้องใช้ architecture decision",
      },
      {
        text: "แก้ typo ในหน้า onboarding",
        feedback: "ไม่ใช่งานเชิง architecture",
      },
      {
        text: "เปลี่ยน icon ใน card",
        feedback: "เป็น UI detail มากกว่า technical architecture",
      },
    ],
    practice: "เขียน technical questions 5 ข้อที่ PM ควรถาม Tech Lead ก่อนสร้าง learning platform จริง",
  },
  {
    id: "day-25-nfr",
    title: "Day 25: Non-Functional Requirements",
    level: "Tech Bridge",
    minutes: 8,
    xp: 40,
    theme: "NFR",
    objective: "ระบุ performance, security, reliability ที่จำเป็นต่อ product",
    concept:
      "NFR คือ requirement ที่ไม่ใช่ feature โดยตรงแต่กระทบคุณภาพ เช่น response time, uptime, privacy, accessibility, audit log",
    coachNote:
      "PM ที่ดีไม่ต้องเขียน solution แต่ต้องบอก constraint ที่ product ต้องการ",
    prompt: "สำหรับระบบ payment ข้อไหนเป็น NFR สำคัญ?",
    answer: "security, audit trail, error handling, availability และ compliance ที่เกี่ยวข้อง",
    answerFeedback: "ถูกต้อง payment มี risk สูง ต้องกำหนด constraint ชัด",
    distractors: [
      {
        text: "สีปุ่ม checkout เท่านั้น",
        feedback: "เป็น UX detail ไม่ใช่ NFR หลัก",
      },
      {
        text: "ใช้ framework ที่กำลังฮิต",
        feedback: "เป็น solution preference ไม่ใช่ product requirement",
      },
      {
        text: "ไม่ต้องคิด เพราะ DevOps ดูเอง",
        feedback: "PM ควรรู้ product risk เพื่อกำหนด expectation",
      },
    ],
    practice: "เขียน NFR 5 ข้อสำหรับ PM Quest ถ้าจะเปิดให้หลายคนใช้งานจริง",
  },
  {
    id: "day-26-tradeoff",
    title: "Day 26: Trade-off Thinking",
    level: "Tech Bridge",
    minutes: 8,
    xp: 40,
    theme: "Decision",
    objective: "คิด trade-off ระหว่าง speed, quality, cost, risk",
    concept:
      "การตัดสินใจ product มักไม่มีคำตอบที่ดีที่สุดทุกด้าน ต้องเลือก trade-off ที่เหมาะกับเป้าหมายช่วงนั้น",
    coachNote:
      "PM ที่โตขึ้นจะพูดได้ว่าเราเลือกเสียอะไรเพื่อได้อะไร",
    prompt: "ถ้าเป้าหมายคือ validate ภายใน 1 สัปดาห์ ควร trade-off แบบไหน?",
    answer: "เลือก solution ง่าย/เร็วที่ยังวัด value ได้ และยอมเลื่อน automation บางอย่าง",
    answerFeedback: "ถูกต้อง เหมาะกับ validation phase",
    distractors: [
      {
        text: "สร้างระบบ enterprise ครบทุกอย่างก่อน release",
        feedback: "ช้าเกินสำหรับ validation",
      },
      {
        text: "ไม่สน quality เลยเพราะแค่ MVP",
        feedback: "MVP ยังต้องใช้งานได้และไม่ทำลาย trust",
      },
      {
        text: "ตัด metric ออกเพื่อให้เร็วขึ้น",
        feedback: "ถ้าไม่มี metric จะ validate ไม่ได้",
      },
    ],
    practice: "เขียน trade-off 3 ทางเลือกสำหรับเพิ่ม AI grader ใน PM Quest",
  },
  {
    id: "day-27-release-planning",
    title: "Day 27: Release Planning",
    level: "Delivery",
    minutes: 8,
    xp: 40,
    theme: "Delivery",
    objective: "วาง release ให้ลด risk และตรวจผลได้",
    concept:
      "Release plan ควรมี scope, rollout, verification, rollback, owner และ communication ไม่ใช่แค่กด deploy",
    coachNote:
      "PM ควรรู้ release risk เพื่อสื่อสาร stakeholder และเตรียม fallback",
    prompt: "ก่อนปล่อย feature ใหม่ให้ user ทุกคน ควรมีอะไร?",
    answer: "verification checklist, rollout plan, rollback/fallback และ owner ชัดเจน",
    answerFeedback: "ถูกต้อง ช่วยลดความเสี่ยงหลัง release",
    distractors: [
      {
        text: "ปล่อยทันทีโดยไม่ต้อง monitor",
        feedback: "เสี่ยงพังแล้วไม่รู้เร็ว",
      },
      {
        text: "รอให้สมบูรณ์ 100% ตลอดไป",
        feedback: "อาจช้าเกินและไม่ได้เรียนรู้จาก user",
      },
      {
        text: "ส่งข่าวดีอย่างเดียวไม่พูด risk",
        feedback: "stakeholder ต้องรู้ risk และ plan",
      },
    ],
    practice: "เขียน release checklist 8 ข้อสำหรับ PM Quest เวอร์ชันถัดไป",
  },
  {
    id: "day-28-feedback-loop",
    title: "Day 28: Feedback Loop",
    level: "Delivery",
    minutes: 8,
    xp: 40,
    theme: "Learning Loop",
    objective: "สร้างวงจรรับ feedback แล้วเปลี่ยนเป็น decision",
    concept:
      "Feedback ที่ดีต้องถูกรวบรวม จัดหมวด วิเคราะห์ pattern และนำไปสู่ decision ไม่ใช่เก็บไว้เฉย ๆ",
    coachNote:
      "อย่าตามทุก feedback ทันที ให้หา pattern และเชื่อมกับ metric",
    prompt: "ถ้า user 3 คนบอกบทเรียนยาวเกินไป ควรทำอะไรต่อ?",
    answer: "ดู completion/drop-off data แล้วทดลองย่อบทเรียนบางส่วนเพื่อวัดผล",
    answerFeedback: "ถูกต้อง ใช้ทั้ง qualitative และ quantitative data",
    distractors: [
      {
        text: "เปลี่ยนทั้งหมดทันทีโดยไม่ดู data",
        feedback: "อาจ overreact จาก sample เล็ก",
      },
      {
        text: "ไม่สนใจเพราะ feedback ไม่ใช่ metric",
        feedback: "feedback ช่วยอธิบาย metric และหา pain ได้",
      },
      {
        text: "ถาม dev อย่างเดียวว่าคิดยังไง",
        feedback: "ทีมช่วยได้ แต่ต้องดู user behavior ด้วย",
      },
    ],
    practice: "ออกแบบ feedback loop หลัง user ใช้ PM Quest ครบ 7 วัน",
  },
  {
    id: "day-29-retro",
    title: "Day 29: Product Retro",
    level: "Delivery",
    minutes: 8,
    xp: 40,
    theme: "Reflection",
    objective: "สรุปสิ่งที่เรียนรู้หลัง ship ไม่ใช่แค่ปิดงาน",
    concept:
      "Product retro ควรถามว่าเราคิดถูก/ผิดเรื่องอะไร metric เป็นอย่างไร user เจ็บตรงไหน และ next decision คืออะไร",
    coachNote:
      "นี่คือจุดที่ PM skill โตเร็วที่สุด เพราะเรียนจากผลจริง",
    prompt: "หลัง release แล้ว metric ไม่ดี ควรถามอะไรก่อน?",
    answer: "ปัญหาอยู่ที่ awareness, activation, usability, value หรือ measurement ผิด?",
    answerFeedback: "ถูกต้อง แยกสาเหตุก่อนรีบแก้ solution",
    distractors: [
      {
        text: "เพิ่ม feature ใหม่ทันที",
        feedback: "อาจแก้ผิดจุดถ้ายังไม่รู้สาเหตุ",
      },
      {
        text: "โทษ user ว่าไม่เข้าใจ",
        feedback: "ควรเริ่มจากเรียนรู้ behavior จริง",
      },
      {
        text: "ปิด metric แล้วดูความรู้สึกแทน",
        feedback: "ควรใช้ทั้ง data และ insight ไม่ใช่ตัด data ทิ้ง",
      },
    ],
    practice: "เขียน product retro 1 หน้าให้ PM Quest MVP: expected, actual, learned, next",
  },
  {
    id: "day-30-capstone",
    title: "Day 30: Capstone PRD",
    level: "Capstone",
    minutes: 15,
    xp: 60,
    theme: "End-to-End PM",
    objective: "รวมทุกทักษะเป็น PRD + roadmap + handoff ที่พร้อมส่งทีม",
    concept:
      "บทสุดท้ายคือการทำงานแบบ PM ครบวงจร: problem, user, metric, PRD, scope, priority, roadmap, handoff, risk และ next experiment",
    coachNote:
      "ถ้าคุณทำ capstone นี้ได้ คุณจะไม่ใช่แค่ dev ที่เขียนโค้ด แต่เป็น builder ที่เลือกสิ่งที่ควรสร้างได้ดีขึ้น",
    prompt: "Capstone output ที่สมบูรณ์ที่สุดควรประกอบด้วยอะไร?",
    answer: "PRD, user stories, AC, MoSCoW/RICE, roadmap, metrics, risks, handoff to Tech Lead",
    answerFeedback: "ถูกต้อง นี่คือชุดส่งต่องานแบบ PM-capable technical builder",
    distractors: [
      {
        text: "โค้ด feature ให้เสร็จอย่างเดียว",
        feedback: "สำคัญสำหรับ dev แต่ capstone นี้วัด PM thinking",
      },
      {
        text: "ไอเดีย feature 50 ข้อโดยไม่จัด priority",
        feedback: "ไอเดียเยอะไม่เท่ากับ product decision ดี",
      },
      {
        text: "mockup สวย ๆ โดยไม่มี goal หรือ metric",
        feedback: "visual อย่างเดียวไม่พอสำหรับ PM handoff",
      },
    ],
    practice:
      "ทำ Capstone: เขียน PRD 1 หน้า + roadmap 3 phase + handoff to Tech Lead สำหรับ product ที่คุณอยากสร้างจริง",
  },
];

export const lessons: Lesson[] = lessonSeeds.map((lesson) => {
  const { answer, answerFeedback, distractors, ...baseLesson } = lesson;

  return {
    ...baseLesson,
    choices: [
      { text: distractors[0].text, correct: false, feedback: distractors[0].feedback },
      { text: answer, correct: true, feedback: answerFeedback },
      { text: distractors[1].text, correct: false, feedback: distractors[1].feedback },
      { text: distractors[2].text, correct: false, feedback: distractors[2].feedback },
    ],
  };
});
