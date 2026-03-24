import { createFileRoute } from "@tanstack/react-router";
import { proxyElectricRequest } from "@/lib/electric-proxy";

export const Route = createFileRoute("/api/game-sessions")({
	server: {
		handlers: {
			GET: ({ request }) => proxyElectricRequest(request, "game_sessions"),
		},
	},
});
