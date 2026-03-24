import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { questions } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

export const Route = createFileRoute("/api/mutations/questions")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = parseDates(await request.json());
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(questions).values(body);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
