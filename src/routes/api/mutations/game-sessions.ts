import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { game_sessions } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

export const Route = createFileRoute("/api/mutations/game-sessions")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = parseDates(await request.json());
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(game_sessions).values(body);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
