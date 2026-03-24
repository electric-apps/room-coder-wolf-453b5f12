import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";

export const Route = createFileRoute("/api/mutations/categories")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = parseDates(await request.json());
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(categories).values(body);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
