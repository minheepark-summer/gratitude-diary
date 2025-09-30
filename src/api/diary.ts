import { apiClient } from "./client";

// 다이어리 데이터 타입
export interface DiaryData {
	title: string;
	content: string;
	tags?: string[];
	is_public: boolean;
}

// 다이어리 응답 타입
export interface DiaryResponse {
	id: string;
	title: string;
	content: string;
	user_id: string;
	tags: string[] | null;
	is_public: boolean;
	views_count: number;
	created_at: string;
	updated_at: string;
	likes_count: number;
	is_liked_by_current_user: boolean;
}

// 다이어리 목록 응답 타입
export type DiariesWithLikesResponse = DiaryResponse[];

// 다이어리 API 함수들
export const diaryApi = {
	// 다이어리 목록 조회 (좋아요 포함)
	getDiariesWithLikes: async (
		data: unknown,
	): Promise<DiariesWithLikesResponse> => {
		return apiClient.get("/rest/v1/diaries_with_likes", {
			params: data,
		});
	},

	// 다이어리 생성
	createDiary: async (data: DiaryData): Promise<DiaryResponse> => {
		return apiClient.post("/rest/v1/diaries", data);
	},

	// 다이어리 삭제
	deleteDiary: async (id: string): Promise<void> => {
		return apiClient.delete(`/rest/v1/diaries?id=eq.${id}`);
	},

	// 다이어리 수정
	updateDiary: async (
		id: string,
		data: Partial<DiaryData>,
	): Promise<DiaryResponse> => {
		return apiClient.put(`/rest/v1/diaries?id=${id}`, data);
	},

	// 다이어리 좋아요 토글
	toggleLike: async (diaryId: string): Promise<void> => {
		return apiClient.post("/rest/v1/diary_likes", {
			diary_id: diaryId,
		});
	},
	// 다이어리 좋아요 취소 토글
	toggleDisLike: async (diaryId: string): Promise<void> => {
		return apiClient.delete("/rest/v1/diary_likes", {
			params: {
				diary_id: diaryId,
			},
		});
	},
};
