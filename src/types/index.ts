// 사용자 관련 타입
export interface User {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
}

// 감사 일기 관련 타입
export interface GratitudeEntry {
	id: string;
	userId: string;
	content: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
}

// 로그인 폼 타입
export interface LoginForm {
	email: string;
	password: string;
}

// 회원가입 폼 타입
export interface SignupForm {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
}

// API 응답 타입
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}
