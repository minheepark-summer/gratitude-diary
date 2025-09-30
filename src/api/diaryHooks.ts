import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type DiaryData, diaryApi } from "./diary";

// Query Keys
export const diaryKeys = {
	all: ["diaries"] as const,
	lists: () => [...diaryKeys.all, "list"] as const,
	list: (filters: unknown) => [...diaryKeys.lists(), { filters }] as const,
	details: () => [...diaryKeys.all, "detail"] as const,
	detail: (id: string) => [...diaryKeys.details(), id] as const,
};

// 다이어리 목록 조회 (좋아요 포함)
export const useDiariesWithLikes = (filters?: unknown) => {
	return useQuery({
		queryKey: diaryKeys.list(filters),
		queryFn: () => diaryApi.getDiariesWithLikes(filters || {}),
		staleTime: 5 * 60 * 1000, // 5분
	});
};

// 다이어리 생성 mutation
export const useCreateDiary = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DiaryData) => diaryApi.createDiary(data),
		onSuccess: () => {
			// 다이어리 목록 캐시 무효화
			queryClient.invalidateQueries({ queryKey: diaryKeys.lists() });
		},
		onError: (error) => {
			console.error("다이어리 생성 실패:", error);
		},
	});
};

// 다이어리 수정 mutation
export const useUpdateDiary = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<DiaryData> }) =>
			diaryApi.updateDiary(id, data),
		onSuccess: (_, variables) => {
			// 다이어리 목록 캐시 무효화
			queryClient.invalidateQueries({ queryKey: diaryKeys.lists() });
			// 특정 다이어리 상세 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: diaryKeys.detail(variables.id),
			});
		},
		onError: (error) => {
			console.error("다이어리 수정 실패:", error);
		},
	});
};

// 다이어리 삭제 mutation
export const useDeleteDiary = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => diaryApi.deleteDiary(id),
		onSuccess: (_, id) => {
			// 다이어리 목록 캐시 무효화
			queryClient.invalidateQueries({ queryKey: diaryKeys.lists() });
			// 특정 다이어리 상세 캐시 제거
			queryClient.removeQueries({ queryKey: diaryKeys.detail(id) });
		},
		onError: (error) => {
			console.error("다이어리 삭제 실패:", error);
		},
	});
};

// 다이어리 좋아요 토글 mutation
export const useToggleDiaryLike = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (diaryId: string) => diaryApi.toggleLike(diaryId),
		onSuccess: (_, diaryId) => {
			// 다이어리 목록 캐시 무효화 (좋아요 수 업데이트)
			queryClient.invalidateQueries({ queryKey: diaryKeys.lists() });
			// 특정 다이어리 상세 캐시 무효화
			queryClient.invalidateQueries({ queryKey: diaryKeys.detail(diaryId) });
		},
		onError: (error) => {
			console.error("좋아요 토글 실패:", error);
		},
	});
};
