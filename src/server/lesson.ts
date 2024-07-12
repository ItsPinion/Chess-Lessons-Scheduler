"use server";

import { db } from "./db";
import { and, eq, gt, lt } from "drizzle-orm";
import { lessonSchema } from "./db/schema";
import type { LessonInsert } from "./db/schema";
import {
  findAvailableHours,
  getPrevious30thDay,
  getPrevious7thDay,
} from "~/components/demo/available-times";
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

  try {
    const alreadySelectedBySomeone = await db
      .select()
      .from(lessonSchema)
      .where(eq(lessonSchema.time, lesson.time));
    console.log("alreadySelectedBySomeone", alreadySelectedBySomeone);

    if (alreadySelectedBySomeone[0]) {
      console.log(alreadySelectedBySomeone);
      return {
        message: "This slot already booked",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const alreadyBookedOnceToday = await db
      .select()
      .from(lessonSchema)
      .where(
        and(
          eq(lessonSchema.date, lesson.date),
          eq(lessonSchema.user_id, lesson.user_id),
        ),
      );
    console.log("alreadyBookedOnceToday", alreadyBookedOnceToday);
    if (alreadyBookedOnceToday[0]) {
      return {
        message: "You already booked one slot for this date",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const oldTransaction = await db
      .select()
      .from(lessonSchema)
      .where(and(eq(lessonSchema.transaction, lesson.transaction)));

    console.log("oldTransaction", oldTransaction);
    if (lesson.transaction && oldTransaction[0]) {
      return {
        message: "This transaction id is already used you or someone else",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const previous30thDay = getPrevious30thDay(lesson.time);

    const freeLessonWithin30Days = await db
      .select()
      .from(lessonSchema)
      .where(
        and(
          eq(lessonSchema.user_id, lesson.user_id),
          gt(lessonSchema.time, previous30thDay),
          lt(lessonSchema.time, lesson.time),
        ),
      );
    console.log("freeLessonWithin30Days", freeLessonWithin30Days);
    if (freeLessonWithin30Days[0] && lesson.lesson_type === "Free") {
      return {
        message: "You already have a free lesson within 30 days",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const previous7thDay = getPrevious7thDay(lesson.time);

    const casualLessonWithin7Days = await db
      .select()
      .from(lessonSchema)
      .where(
        and(
          eq(lessonSchema.user_id, lesson.user_id),
          gt(lessonSchema.time, previous7thDay),
          lt(lessonSchema.time, lesson.time),
        ),
      );

    console.log("casualLessonWithin7Days", casualLessonWithin7Days);

    if (casualLessonWithin7Days[0] && lesson.lesson_type === "Casual") {
      console.log(
        new Date(lesson.time).toDateString(),
        lesson.time,
        "The Date Im giving",
        "\n",
        casualLessonWithin7Days.map((x) => new Date(x.time).toDateString()),
        casualLessonWithin7Days.map((x) => x.time),
        "The Date That is stored",
        "\n",
        new Date(previous7thDay).toDateString(),
        previous7thDay,
        "The Date previous 7th day",
      );
      return {
        message: "You already have a casual lesson within 7 days",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const firstSeriousLesson = await db
      .select()
      .from(lessonSchema)
      .where(
        and(
          eq(lessonSchema.user_id, lesson.user_id),
          eq(lessonSchema.lesson_type, "First Serious"),
        ),
      );

    console.log("firstSeriousLesson", firstSeriousLesson);

    if (firstSeriousLesson[0]) {
      return {
        message: "You already had a free serious lesson",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const firstCauseFreeLesson = await db
      .select()
      .from(lessonSchema)
      .where(
        and(
          eq(lessonSchema.user_id, lesson.user_id),
          eq(lessonSchema.lesson_type, "First Casual"),
        ),
      );

    console.log("firstCauseFreeLesson", firstCauseFreeLesson);

    if (firstCauseFreeLesson[0]) {
      return {
        message: "You already had a free casual lesson",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("Inserting");
    await db.insert(lessonSchema).values(lesson);
    console.log("Inserted", lesson);
  } catch (error) {
    console.log("Error inserting", error);
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
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?: <b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?: <b>${lesson.chess}</b></li><li>Lesson Type: <b>${lesson.lesson_type}</b></li><li>Paypal Transaction ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting : <b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(new Date(lesson.time), lesson.offset / 10)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });

    await transporter.sendMail({
      from: env.EMAIL_HOST,
      to: env.EMAIL_HOST,
      subject: `New lesson booked by ${lesson.name}`,
      html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?: <b>${lesson.discord}</b></li><li>What's your Chess.com username or Lichess username?: <b>${lesson.chess}</b></li><li>Lesson Type: <b>${lesson.lesson_type}</b></li><li>Paypal Transaction ID: <b>${lesson.transaction}</b></li><li>Please share anything that will help prepare for our meeting : <b>${lesson.notes ?? ""}</b></li> <h3>When</h3><p>${formatDateWithOffset(new Date(lesson.time), -5)}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${lesson.name}</span></div></body></html>`,
    });

    console.log("Email sent");
  } catch (error) {
    return { message: "Sorry, couldn't send email", success: false, error };
  }

  return { message: "Lesson booked successfully", success: true };
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

  return findAvailableHours(
    realWorkingHours,
    bookedHours.map((x) => {
      return { time: new Date(x.time) };
    }),
  );
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
