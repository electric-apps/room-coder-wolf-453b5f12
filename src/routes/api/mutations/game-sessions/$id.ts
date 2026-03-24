import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { game_sessions } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

export const Route = createFileRoute("/api/mutations/game-sessions/$id")({
	server: {
		handlers: {
			PATCH: async ({ request, params }) => {
				const body = parseDates(await request.json());
				const { id, created_at, ...updateData } = body as Record<
					string,
					unknown
				>;
				let txid: number;
				await db.transaction(async (tx) => {
					await tx
						.update(game_sessions)
						.set({ ...updateData, updated_at: new Date() })
						.where(eq(game_sessions.id, params.id));
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
