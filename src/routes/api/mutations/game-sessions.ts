import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { game_sessions } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";
import { gameSessionInsertSchema } from "@/db/zod-schemas";

export const Route = createFileRoute("/api/mutations/game-sessions")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const raw = parseDates(await request.json());
				const parsed = gameSessionInsertSchema.safeParse(raw);
				if (!parsed.success) {
					return Response.json({ error: "Invalid input" }, { status: 400 });
				}
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(game_sessions).values(parsed.data);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
