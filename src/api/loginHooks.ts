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

// 로그아웃 mutation
export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => loginApi.logout(),
		onSuccess: () => {
			// 로그아웃 성공 시 토큰 제거 및 캐시 초기화
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			queryClient.removeQueries({ queryKey: authKeys.all });
		},
		onError: (error) => {
			console.error("로그아웃 API 실패:", error);
			// API 실패해도 로컬 상태는 정리 (토큰이 만료되었을 수 있음)
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			queryClient.removeQueries({ queryKey: authKeys.all });
		},
	});
};
