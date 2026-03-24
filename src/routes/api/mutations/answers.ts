import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { answers } from "@/db/schema";
import { generateTxId, parseDates } from "@/db/utils";
import { answerInsertSchema } from "@/db/zod-schemas";

export const Route = createFileRoute("/api/mutations/answers")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const raw = parseDates(await request.json());
				const parsed = answerInsertSchema.safeParse(raw);
				if (!parsed.success) {
					return Response.json({ error: "Invalid input" }, { status: 400 });
				}
				let txid: number;
				await db.transaction(async (tx) => {
					await tx.insert(answers).values(parsed.data);
					txid = await generateTxId(tx);
				});
				return Response.json({ txid: txid! });
			},
		},
	},
});
