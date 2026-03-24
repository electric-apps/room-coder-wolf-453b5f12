import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import { db } from "@/db";
import { game_sessions } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

const patchSchema = z.object({
	score: z.number().int().min(0).optional(),
	questions_answered: z.number().int().min(0).optional(),
	questions_correct: z.number().int().min(0).optional(),
	status: z.enum(["active", "completed"]).optional(),
});

export const Route = createFileRoute("/api/mutations/game-sessions/$id")({
	server: {
		handlers: {
			PATCH: async ({ request, params }) => {
				const raw = parseDates(await request.json());
				const parsed = patchSchema.safeParse(raw);
				if (!parsed.success) {
					return Response.json({ error: "Invalid input" }, { status: 400 });
				}
				let txid: number;
				await db.transaction(async (tx) => {
					await tx
						.update(game_sessions)
						.set({ ...parsed.data, updated_at: new Date() })
						.where(eq(game_sessions.id, params.id));
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
