import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { answers, categories, game_sessions, questions } from "./schema";

// categories
export const categorySelectSchema = createSelectSchema(categories, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export const categoryInsertSchema = createInsertSchema(categories, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export type Category = typeof categorySelectSchema._type;
export type NewCategory = typeof categoryInsertSchema._type;

// questions
export const questionSelectSchema = createSelectSchema(questions, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export const questionInsertSchema = createInsertSchema(questions, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export type Question = typeof questionSelectSchema._type;
export type NewQuestion = typeof questionInsertSchema._type;

// game_sessions
export const gameSessionSelectSchema = createSelectSchema(game_sessions, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
	updated_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export const gameSessionInsertSchema = createInsertSchema(game_sessions, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
	updated_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export type GameSession = typeof gameSessionSelectSchema._type;
export type NewGameSession = typeof gameSessionInsertSchema._type;

// answers
export const answerSelectSchema = createSelectSchema(answers, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export const answerInsertSchema = createInsertSchema(answers, {
	created_at: z
		.union([z.string(), z.date()])
		.transform((v) => (typeof v === "string" ? new Date(v) : v)),
});
export type Answer = typeof answerSelectSchema._type;
export type NewAnswer = typeof answerInsertSchema._type;
