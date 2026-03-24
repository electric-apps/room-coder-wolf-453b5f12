import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { answers } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

export const Route = createFileRoute("/api/mutations/answers")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = parseDates(await request.json());
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(answers).values(body);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
