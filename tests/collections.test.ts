import { describe, expect, it } from "vitest"
import {
	answerInsertSchema,
	categoryInsertSchema,
	gameSessionInsertSchema,
	questionInsertSchema,
} from "@/db/zod-schemas"
import { generateValidRow } from "./helpers/schema-test-utils"
import { parseDates } from "./helpers/schema-test-utils"

describe("collections insert validation with JSON round-trip", () => {
	it("category insert: survives JSON round-trip", () => {
		const row = generateValidRow(categoryInsertSchema)
		const roundTripped = parseDates(JSON.parse(JSON.stringify(row)))
		const result = categoryInsertSchema.safeParse(roundTripped)
		expect(result.success).toBe(true)
	})

	it("question insert: survives JSON round-trip", () => {
		const row = generateValidRow(questionInsertSchema)
		const roundTripped = parseDates(JSON.parse(JSON.stringify(row)))
		const result = questionInsertSchema.safeParse(roundTripped)
		expect(result.success).toBe(true)
	})

	it("game_session insert: survives JSON round-trip", () => {
		const row = generateValidRow(gameSessionInsertSchema)
		const roundTripped = parseDates(JSON.parse(JSON.stringify(row)))
		const result = gameSessionInsertSchema.safeParse(roundTripped)
		expect(result.success).toBe(true)
	})

	it("answer insert: survives JSON round-trip", () => {
		const row = generateValidRow(answerInsertSchema)
		const roundTripped = parseDates(JSON.parse(JSON.stringify(row)))
		const result = answerInsertSchema.safeParse(roundTripped)
		expect(result.success).toBe(true)
	})
})
