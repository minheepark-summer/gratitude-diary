import { z } from "zod";

// 로그인 폼 스키마
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "이메일을 입력해주세요")
		.email("올바른 이메일 형식이 아닙니다"),
	password: z
		.string()
		.min(1, "비밀번호를 입력해주세요")
		.min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 회원가입 폼 스키마
export const registerSchema = z
	.object({
		name: z.string().min(1, "이름을 입력해주세요"),
		email: z
			.string()
			.min(1, "이메일을 입력해주세요")
			.email("올바른 이메일 형식이 아닙니다"),
		password: z
			.string()
			.min(1, "비밀번호를 입력해주세요")
			.min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
		confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;

// 다이어리 폼 스키마
export const diarySchema = z.object({
	title: z.string().min(1, "제목을 입력해주세요"),
	content: z.string().min(1, "내용을 입력해주세요"),
	tags: z.string().default(""),
	is_public: z.boolean().default(false),
});

export type DiaryFormData = z.infer<typeof diarySchema>;
