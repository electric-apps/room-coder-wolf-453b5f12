import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import { categorySelectSchema } from "@/db/zod-schemas";

export const categoriesCollection = createCollection(
	electricCollectionOptions({
		id: "categories",
		schema: categorySelectSchema,
		getKey: (row) => row.id,
		shapeOptions: {
			url: new URL(
				"/api/categories",
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
			const res = await fetch("/api/mutations/categories", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(modified),
			});
			const data = await res.json();
			return { txid: data.txid };
		},
	}),
);
