import { sql } from "drizzle-orm";
import {
	boolean,
	check,
	integer,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	emoji: text().notNull(),
	created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const questions = pgTable(
	"questions",
	{
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
	},
	(t) => [
		check(
			"correct_answer_check",
			sql`${t.correct_answer} IN ('a', 'b', 'c', 'd')`,
		),
		check(
			"difficulty_check",
			sql`${t.difficulty} IN ('easy', 'medium', 'hard')`,
		),
	],
);

export const game_sessions = pgTable(
	"game_sessions",
	{
		id: uuid().primaryKey().defaultRandom(),
		player_name: text().notNull(),
		category_id: uuid().references(() => categories.id, {
			onDelete: "set null",
		}),
		difficulty: text(),
		score: integer().notNull().default(0),
		questions_answered: integer().notNull().default(0),
		questions_correct: integer().notNull().default(0),
		status: text().notNull().default("active"), // "active" | "completed"
		created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
		updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
	},
	(t) => [
		check(
			"game_session_status_check",
			sql`${t.status} IN ('active', 'completed')`,
		),
	],
);

export const answers = pgTable(
	"answers",
	{
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
	},
	(t) => [
		unique("answers_session_question_unique").on(t.session_id, t.question_id),
		check(
			"chosen_answer_check",
			sql`${t.chosen_answer} IN ('a', 'b', 'c', 'd')`,
		),
	],
);
