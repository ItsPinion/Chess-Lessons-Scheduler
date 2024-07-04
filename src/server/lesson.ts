"use server";

import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { lessonSchema } from "./db/schema";
import type { LessonInsert } from "./db/schema";
import {
  formatTime,
  getAvaiavleTimes,
} from "~/components/demo/available-times";
import { Resend } from "resend";
import { env } from "~/env";

function formatDateWithOffset(date: Date, offset: number): string {
  // Create a new Date object with the given date
  const dt = new Date(date);
  // Apply the offset (in hours)
  dt.setHours(dt.getHours() + offset);

  // Format the date to the required string format
  const formattedDate = dt
    .toString()
    .replace(
      /\(([^)]+)\)/,
      "GMT" +
        (offset >= 0 ? "+" : "") +
        (offset * 100).toString().padStart(4, "0"),
    );

  return formattedDate;
}

export async function createLesson(lesson: LessonInsert) {
  const resend = new Resend(env.RESEND_EMAIL_TOKEN);

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

  const oldTransaction = await db
    .select()
    .from(lessonSchema)
    .where(and(eq(lessonSchema.transaction, lesson.transaction)));

  if (alreadyBookedOnce[0]) {
    return {
      message: "You already booked one slot for this date",
      success: false,
    };
  }

  if (alreadySelectedBySomeone[0]) {
    console.log(alreadySelectedBySomeone);
    return {
      message: "This slot already booked",
      success: false,
    };
  }

  if (oldTransaction[0]) {
    return {
      message: "This transaction id is already used you or someoen else",
      success: false,
    };
  }

  try {
    await db.insert(lessonSchema).values(lesson);
  } catch (error) {
    return { message: "Sorry something went wrong", success: false, error };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: lesson.email,
      subject: "Private lesson with Jonathan Peterson",
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?:<b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?:<b>${lesson.chess}</b></li><li>Paypal Transcation ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting :<b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(lesson.time, lesson.offset/10)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "jonapeter91@gmail.com",
      subject: `New lesson booked by ${lesson.name}`,
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?:<b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?:<b>${lesson.chess}</b></li><li>Paypal Transcation ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting :<b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(lesson.time, -50)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });
  } catch (error) {
    return { message: "Sorry coudn't send email", success: false, error };
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
