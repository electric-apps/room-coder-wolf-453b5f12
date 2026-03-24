import { describe, expect, it } from "vitest"
import {
	answerInsertSchema,
	answerSelectSchema,
	categoryInsertSchema,
	categorySelectSchema,
	gameSessionInsertSchema,
	gameSessionSelectSchema,
	questionInsertSchema,
	questionSelectSchema,
} from "@/db/zod-schemas"
import { generateRowWithout, generateValidRow } from "./helpers/schema-test-utils"

describe("category schemas", () => {
	it("validates a valid category row", () => {
		const row = generateValidRow(categorySelectSchema)
		const result = categorySelectSchema.safeParse(row)
		expect(result.success).toBe(true)
	})

	it("rejects a row missing name", () => {
		const row = generateRowWithout(categorySelectSchema, "name")
		const result = categorySelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("rejects a row missing emoji", () => {
		const row = generateRowWithout(categorySelectSchema, "emoji")
		const result = categorySelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("insert schema validates a valid row", () => {
		const row = generateValidRow(categoryInsertSchema)
		const result = categoryInsertSchema.safeParse(row)
		expect(result.success).toBe(true)
	})
})

describe("question schemas", () => {
	it("validates a valid question row", () => {
		const row = generateValidRow(questionSelectSchema)
		const result = questionSelectSchema.safeParse(row)
		expect(result.success).toBe(true)
	})

	it("rejects a row missing question text", () => {
		const row = generateRowWithout(questionSelectSchema, "question")
		const result = questionSelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("rejects a row missing correct_answer", () => {
		const row = generateRowWithout(questionSelectSchema, "correct_answer")
		const result = questionSelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("insert schema validates a valid row", () => {
		const row = generateValidRow(questionInsertSchema)
		const result = questionInsertSchema.safeParse(row)
		expect(result.success).toBe(true)
	})
})

describe("game_session schemas", () => {
	it("validates a valid game session row", () => {
		const row = generateValidRow(gameSessionSelectSchema)
		const result = gameSessionSelectSchema.safeParse(row)
		expect(result.success).toBe(true)
	})

	it("rejects a row missing player_name", () => {
		const row = generateRowWithout(gameSessionSelectSchema, "player_name")
		const result = gameSessionSelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("insert schema validates a valid row", () => {
		const row = generateValidRow(gameSessionInsertSchema)
		const result = gameSessionInsertSchema.safeParse(row)
		expect(result.success).toBe(true)
	})
})

describe("answer schemas", () => {
	it("validates a valid answer row", () => {
		const row = generateValidRow(answerSelectSchema)
		const result = answerSelectSchema.safeParse(row)
		expect(result.success).toBe(true)
	})

	it("rejects a row missing chosen_answer", () => {
		const row = generateRowWithout(answerSelectSchema, "chosen_answer")
		const result = answerSelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("rejects a row missing is_correct", () => {
		const row = generateRowWithout(answerSelectSchema, "is_correct")
		const result = answerSelectSchema.safeParse(row)
		expect(result.success).toBe(false)
	})

	it("insert schema validates a valid row", () => {
		const row = generateValidRow(answerInsertSchema)
		const result = answerInsertSchema.safeParse(row)
		expect(result.success).toBe(true)
	})
})
