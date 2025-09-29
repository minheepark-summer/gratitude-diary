import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "./login";
import { loginApi } from "./login";

// Query Keys
export const authKeys = {
	all: ["auth"] as const,
	user: () => [...authKeys.all, "user"] as const,
};

// 로그인 mutation
export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials: LoginRequest) => loginApi.login(credentials),
		onSuccess: (data) => {
			// 로그인 성공 시 토큰을 localStorage에 저장
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);

			// 사용자 정보를 캐시에 저장
			queryClient.setQueryData(authKeys.user(), data.user);
		},
		onError: (error) => {
			console.error("로그인 실패:", error);
		},
	});
};
