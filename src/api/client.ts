const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// API 응답 타입
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

// 기본 fetch 클라이언트
class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const config: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				apikey: SUPABASE_ANON_KEY || "",
				...options.headers,
			},
			...options,
		};

		// 디버깅을 위한 콘솔 로그
		console.log("API Key:", SUPABASE_ANON_KEY);
		console.log("Request URL:", url);
		console.log("Headers:", config.headers);

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.msg || `HTTP error! status: ${response.status}`,
				);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("API 요청 실패:", error);
			throw error;
		}
	}

	async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}

	async post<T>(
		endpoint: string,
		data?: any,
		options?: RequestInit,
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
}

// API 클라이언트 인스턴스 생성
export const apiClient = new ApiClient(SUPABASE_URL);
