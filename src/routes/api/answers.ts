import { createFileRoute } from "@tanstack/react-router";
import { proxyElectricRequest } from "@/lib/electric-proxy";

export const Route = createFileRoute("/api/answers")({
	server: {
		handlers: {
			GET: ({ request }) => proxyElectricRequest(request, "answers"),
		},
	},
});
