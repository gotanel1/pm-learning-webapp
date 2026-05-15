import type { LessonSeed, ScenarioMission } from "./types";

const missionChoiceOrder = [
  [0, 1, 2, 3],
  [1, 2, 3, 0],
  [2, 3, 0, 1],
  [3, 0, 1, 2],
] as const;

export function buildScenarioMission(
  lessonSeed: LessonSeed,
  lessonIndex: number,
): ScenarioMission {
  const choices = [
    {
      text: `ใช้หลัก "${lessonSeed.theme}" เพื่อเขียนคำตอบที่โยงกับ goal, user และผลลัพธ์ที่ต้องการ`,
      correct: true,
      feedback:
        "ถูกต้อง ภารกิจ PM ที่ดีต้องเริ่มจากหลักคิดของบทเรียนและแปลงเป็นคำตอบที่ทีมใช้ตัดสินใจต่อได้",
    },
    {
      text: "รีบเสนอ solution หรือ implementation ก่อนอธิบายปัญหาและบริบท",
      correct: false,
      feedback:
        "ยังไม่เหมาะ เพราะกระโดดไป solution เร็วเกินไป ทีมอาจสร้างสิ่งที่ไม่แก้ pain จริง",
    },
    {
      text: "เขียนคำตอบกว้าง ๆ โดยไม่ระบุ user, trade-off หรือ success criteria",
      correct: false,
      feedback:
        "ยังไม่พอสำหรับงาน PM เพราะทีมตรวจไม่ได้ว่าคำตอบช่วย user หรือ business อย่างไร",
    },
    {
      text: "ปล่อยให้ stakeholder หรือ dev ตัดสินใจเองทั้งหมดโดยไม่สรุป recommendation",
      correct: false,
      feedback:
        "PM ควรช่วยสรุปทางเลือกและเหตุผล ไม่ใช่แค่ส่งต่อความไม่ชัดเจนให้ทีม",
    },
  ] as const;

  const orderedChoices = missionChoiceOrder[lessonIndex % missionChoiceOrder.length].map(
    (choiceIndex) => choices[choiceIndex],
  ) as ScenarioMission["choices"];

  return {
    id: `${lessonSeed.id}-mission`,
    title: `${lessonSeed.title} Mission`,
    scenario: lessonSeed.practice,
    prompt: `ถ้าต้องส่งคำตอบภารกิจนี้ให้ทีมเข้าใจ คุณควรเริ่มจากแนวทางไหน?`,
    choices: orderedChoices,
  };
}

export function getCorrectMissionChoice(mission: ScenarioMission) {
  return mission.choices.find((choice) => choice.correct) ?? null;
}
