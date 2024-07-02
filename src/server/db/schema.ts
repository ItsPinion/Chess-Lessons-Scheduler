// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `chess_lessons_scheduler_${name}`,
);

export const lessonSchema = createTable("lesson", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
  user_id: text("user_id", { length: 256 }).notNull(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull(),
  discord: text("discord", { length: 256 }).notNull(),
  chess: text("chess", { length: 256 }).notNull(),
  notes: text("notes", { length: 256 }),
  date: text("date", { length: 256 }).notNull(),
  time: int("time", { mode: "timestamp" }).notNull().unique(),
  offset: int("offset", { mode: "number" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  notified: int("notified", { mode: "number" }).default(0).notNull(),
});

export type LessonInsert = typeof lessonSchema.$inferInsert;
export type LessonSelect = typeof lessonSchema.$inferSelect
