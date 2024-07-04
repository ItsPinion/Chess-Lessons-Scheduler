// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

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
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  user_id: text("user_id", { length: 256 }).notNull(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull(),
  discord: text("discord", { length: 256 }).notNull(),
  chess: text("chess", { length: 256 }).notNull(),
  notes: text("notes", { length: 256 }),
  date: text("date", { length: 256 }).notNull(),
  time: integer("time", { mode: "timestamp" }).notNull().unique(),
  offset: integer("offset", { mode: "number" }).notNull(),
  transaction: text("transaction", { length: 256 }).notNull().unique(),
});

export type LessonInsert = typeof lessonSchema.$inferInsert;
export type LessonSelect = typeof lessonSchema.$inferSelect;
