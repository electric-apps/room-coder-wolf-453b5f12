import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";
import { gameSessionSelectSchema } from "@/db/zod-schemas";

export const gameSessionsCollection = createCollection(
	electricCollectionOptions({
		id: "game_sessions",
		schema: gameSessionSelectSchema,
		getKey: (row) => row.id,
		shapeOptions: {
			url: new URL(
				"/api/game-sessions",
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
			const res = await fetch("/api/mutations/game-sessions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(modified),
			});
			const data = await res.json();
			return { txid: data.txid };
		},
		onUpdate: async ({ transaction }) => {
			const { modified } = transaction.mutations[0];
			const res = await fetch(`/api/mutations/game-sessions/${modified.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(modified),
			});
			const data = await res.json();
			return { txid: data.txid };
		},
	}),
);
