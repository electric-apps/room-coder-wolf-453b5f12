import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	emoji: text().notNull(),
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const questions = pgTable("questions", {
	id: uuid().primaryKey().defaultRandom(),
	category_id: uuid()
		.notNull()
		.references(() => categories.id, { onDelete: "cascade" }),
	question: text().notNull(),
	option_a: text().notNull(),
	option_b: text().notNull(),
	option_c: text().notNull(),
	option_d: text().notNull(),
	correct_answer: text().notNull(), // "a" | "b" | "c" | "d"
	difficulty: text().notNull(), // "easy" | "medium" | "hard"
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const game_sessions = pgTable("game_sessions", {
	id: uuid().primaryKey().defaultRandom(),
	player_name: text().notNull(),
	category_id: uuid().references(() => categories.id, { onDelete: "set null" }),
	difficulty: text(),
	score: integer().notNull().default(0),
	questions_answered: integer().notNull().default(0),
	questions_correct: integer().notNull().default(0),
	status: text().notNull().default("active"), // "active" | "completed"
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
	updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const answers = pgTable("answers", {
	id: uuid().primaryKey().defaultRandom(),
	session_id: uuid()
		.notNull()
		.references(() => game_sessions.id, { onDelete: "cascade" }),
	question_id: uuid()
		.notNull()
		.references(() => questions.id, { onDelete: "cascade" }),
	chosen_answer: text().notNull(), // "a" | "b" | "c" | "d"
	is_correct: boolean().notNull(),
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
