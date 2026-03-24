import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import { questionSelectSchema } from "@/db/zod-schemas";

export const questionsCollection = createCollection(
	electricCollectionOptions({
		id: "questions",
		schema: questionSelectSchema,
		getKey: (row) => row.id,
		shapeOptions: {
			url: new URL(
				"/api/questions",
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
			const res = await fetch("/api/mutations/questions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(modified),
			});
			const data = await res.json();
			return { txid: data.txid };
		},
	}),
);
