import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// API 응답 타입
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

// Axios 클라이언트 생성 함수
const createApiClient = (baseURL: string): AxiosInstance => {
	const client = axios.create({
		baseURL,
		headers: {
			"Content-Type": "application/json",
			apikey: SUPABASE_ANON_KEY || "",
			Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		},
	});

	// 요청 인터셉터 (디버깅용)
	client.interceptors.request.use(
		(config) => {
			console.log("🚀 API 요청:", {
				url: config.url,
				method: config.method,
				headers: config.headers,
				data: config.data,
			});
			return config;
		},
		(error) => {
			console.error("❌ 요청 에러:", error);
			return Promise.reject(error);
		},
	);

	// 응답 인터셉터
	client.interceptors.response.use(
		(response) => {
			console.log("✅ API 응답:", {
				status: response.status,
				data: response.data,
			});
			return response;
		},
		(error) => {
			console.error("❌ 응답 에러:", {
				status: error.response?.status,
				message: error.response?.data?.message || error.message,
				data: error.response?.data,
			});
			return Promise.reject(error);
		},
	);

	return client;
};

// API 클라이언트 인스턴스
const axiosClient = createApiClient(SUPABASE_URL);

// API 함수들
export const api = {
	async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await axiosClient.get(endpoint, config);
		return response.data;
	},

	async post<T>(
		endpoint: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response: AxiosResponse<T> = await axiosClient.post(
			endpoint,
			data,
			config,
		);
		return response.data;
	},

	async put<T>(
		endpoint: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response: AxiosResponse<T> = await axiosClient.put(
			endpoint,
			data,
			config,
		);
		return response.data;
	},

	async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await axiosClient.delete(
			endpoint,
			config,
		);
		return response.data;
	},
};

// 기존 호환성을 위한 export
export const apiClient = api;
