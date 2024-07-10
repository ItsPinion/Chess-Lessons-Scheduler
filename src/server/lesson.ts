"use server";

import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { lessonSchema } from "./db/schema";
import type { LessonInsert } from "./db/schema";
import { findAvailableHours } from "~/components/demo/available-times";
import { env } from "~/env";
import { createTransport } from "nodemailer";
import { format, toZonedTime } from "date-fns-tz";

export async function createLesson(lesson: LessonInsert) {
  const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: env.NODE_ENV === "production",
    auth: {
      user: env.EMAIL_HOST,
      pass: env.EMAIL_PASSWORD,
    },
  });

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
      message: "This transaction id is already used you or someone else",
      success: false,
    };
  }

  try {
    await db.insert(lessonSchema).values(lesson);
  } catch (error) {
    return { message: "Sorry something went wrong", success: false, error };
  }

  const formatDateWithOffset = (date: Date, offset: number) => {
    const utcDate = date;
    const timeZone = `Etc/GMT${offset > 0 ? "-" : "+"}${Math.abs(offset)}`;
    const zonedDate = toZonedTime(utcDate, timeZone);
    return format(zonedDate, "yyyy MMM dd HH:mm 'GMT'XXX", { timeZone });
  };

  try {
    await transporter.sendMail({
      from: env.EMAIL_HOST,
      to: lesson.email,
      subject: "Private lesson with Jonathan Peterson",
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?: <b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?: <b>${lesson.chess}</b></li><li>Lesson Type: <b>${lesson.lesson_type}</b></li><li>Paypal Transaction ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting : <b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(lesson.time, lesson.offset / 10)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: "jonapeter91@gmail.com",
      subject: `New lesson booked by ${lesson.name}`,
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?: <b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?: <b>${lesson.chess}</b></li><li>Lesson Type: <b>${lesson.lesson_type}</b></li><li>Paypal Transaction ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting : <b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(lesson.time, -5)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });
  } catch (error) {
    return { message: "Sorry, couldn't send email", success: false, error };
  }

  return { ...lesson, message: "Lesson booked successfully", success: true };
}

export async function getAvaiavleTimesbyDate(
  date: string,
  realWorkingHours: {
    "12": string;
    "24": string;
    time: Date;
  }[],
) {
  const bookedHours = await db
    .select()
    .from(lessonSchema)
    .where(eq(lessonSchema.date, date));
  console.log(bookedHours);

  return findAvailableHours(realWorkingHours, bookedHours);
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
