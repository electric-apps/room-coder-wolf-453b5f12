import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import { answerSelectSchema } from "@/db/zod-schemas";

export const answersCollection = createCollection(
	electricCollectionOptions({
		id: "answers",
		schema: answerSelectSchema,
		getKey: (row) => row.id,
		shapeOptions: {
			url: new URL(
				"/api/answers",
				typeof window !== "undefined"
					? window.location.origin
					: "http://localhost:5173",
			).toString(),
			parser: {
				timestamptz: (date: string) => new Date(date),
			},
		},
		onInsert: async ({ transaction }) => {
			const { modified } = transaction.mutations[0];
			const res = await fetch("/api/mutations/answers", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(modified),
			});
			const data = await res.json();
			return { txid: data.txid };
		},
	}),
);
