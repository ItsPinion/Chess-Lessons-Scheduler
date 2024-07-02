import type { LessonSelect } from "~/server/db/schema";
import { getUnnotifiedLessons, updateNotified } from "~/server/lesson";
import { Resend } from "resend";
import { env } from "~/env";

export async function GET() {
  const resend = new Resend(env.RESEND_EMAIL_TOKEN);

  let newLessons: LessonSelect[];
  try {
    newLessons = await getUnnotifiedLessons();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to access the database",
      },
      {
        status: 500,
      },
    );
  }

  for (const lesson of newLessons) {
    try {
      const date = formatDateWithOffset(lesson.time, lesson.offset);
      const student = lesson.name;
      const discord = lesson.discord;
      const chess = lesson.chess;
      const note = lesson.notes ?? "";
      const email = lesson.email;

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Hello World",
        html: `<html><head></head><body><div style="padding: 2rem; border: 1px solid black; border-radius: 0.5rem; box-shadow: 0 0 10px rgba(0, 0, 0, 1)"><h1>Private lesson with Jonathan Peterson</h1><li>What's your Discord username?:<b>${discord}</b></li><li>What's your Chess.com username or Lichess username?:<b>${chess}</b></li><li>Please share anything that will help prepare for our meeting.:<b>${note}</b></li> <h3>When</h3><p>${date}</p><h3>Guests</h3><span>Jonathan Peterson</span><br><span>${student}</span></div></body></html>`,
      });
    } catch (error) {
      console.log(error);
      return Response.json(
        {
          success: false,
          message: "Couldn't send email",
        },
        {
          status: 500,
        },
      );
    }

    try {
      await updateNotified(lesson.id);
    } catch (error) {
      console.log(error);
      return Response.json(
        {
          success: false,
          message: "Failed to access the database",
        },
        {
          status: 500,
        },
      );
    }
  }

  return Response.json(
    {
      success: true,
      message: "All lessons notified successfully",
      lessonsNotified: newLessons.length,
      lessons: newLessons,
    },
    {
      status: 200,
    },
  );
}

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
