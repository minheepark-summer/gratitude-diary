import { apiClient } from "./client";

// 로그인 요청 타입
export interface LoginRequest {
	email: string;
	password: string;
}

// 로그인 응답 타입 (Supabase 형식에 맞게)
export interface LoginResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	user: {
		id: string;
		email: string;
		user_metadata: Record<string, unknown>;
		app_metadata: Record<string, unknown>;
	};
}

// 로그인 API 함수들
export const loginApi = {
	// 로그인
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		return apiClient.post("/auth/v1/token?grant_type=password", credentials);
	},
};
