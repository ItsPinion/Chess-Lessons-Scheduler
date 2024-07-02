"use server";

import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { lessonSchema } from "./db/schema";
import type { LessonInsert } from "./db/schema";
import {
  formatTime,
  getAvaiavleTimes,
} from "~/components/demo/available-times";

export async function createLesson(lesson: LessonInsert) {
  const alreadySelectedBySomeone = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.time, lesson.time));

  const alreadyBookedOnce = await db
    .select()
    .from(lessonSchema)
    .where(
      and(
        eq(lessonSchema.date, lesson.date),
        eq(lessonSchema.user_id, lesson.user_id),
      ),
    );

  if (alreadyBookedOnce[0]) {
    return {
      message: "You already booked one slot for this date",
      success: false,
    };
  }

  if (alreadySelectedBySomeone[0]) {
    return {
      message: "This slot already booked",
      success: false,
    };
  }

  try {
    await db.insert(lessonSchema).values(lesson);
  } catch (error) {
    return { message: "Sorry something went wrong", success: false, error };
  }
  return { ...lesson, message: "Lesson booked successfully", success: true };
}

export async function getAvaiavleTimesbyDate(
  date: string,
  workingTimes: string[],
) {
  const data = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.date, date));

  const selectedTimes = data.map((lesson) => formatTime(lesson.time));

  const avaiavleTimes = getAvaiavleTimes(workingTimes, selectedTimes);

  const result = avaiavleTimes.map(
    (time) =>
      JSON.parse(time) as {
        "12": string;
        "24": string;
      },
  );

  return result;
}

export async function getLessonDatabyTime(time: Date): Promise<LessonInsert[]> {
  const result = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.time, time));

  return result;
}

export async function getLessonDatabyUserID(
  user_id: string,
): Promise<LessonInsert[]> {
  const result = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.user_id, user_id));

  return result;
}

export async function deleteURLData(id: number) {
  const result = await db.delete(lessonSchema).where(eq(lessonSchema.id, id));

  return result;
}

export async function getUnnotifiedLessons() {
  const result = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.notified, 0));
  return result;
}

export async function updateNotified(id: number) {
  const result = await db
    .update(lessonSchema)
    .set({ notified: 1 })
    .where(eq(lessonSchema.id, id));

  return result;
}
