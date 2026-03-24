import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";
import { categoryInsertSchema } from "@/db/zod-schemas";

export const Route = createFileRoute("/api/mutations/categories")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const raw = parseDates(await request.json());
				const parsed = categoryInsertSchema.safeParse(raw);
				if (!parsed.success) {
					return Response.json({ error: "Invalid input" }, { status: 400 });
				}
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(categories).values(parsed.data);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
