import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export type AuthUser = { id: string; username: string; role: "admin" | "farmer" } | null;

export function useAuth() {
	const qc = useQueryClient();
	const meQuery = useQuery<AuthUser>({ queryKey: ["/api", "auth", "me" ] });

	const login = useMutation({
		mutationFn: async (input: { username: string; password: string; role: "admin" | "farmer" }) => {
			const res = await apiRequest("POST", "/api/auth/login", input);
			return await res.json();
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["/api", "auth", "me"] });
		},
	});

	const logout = useMutation({
		mutationFn: async () => {
			const res = await apiRequest("POST", "/api/auth/logout");
			return await res.json();
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["/api", "auth", "me"] });
		},
	});

	return { me: meQuery.data ?? null, isLoading: meQuery.isLoading, login, logout };
}
