import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Trash2 } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import {
	useCreateDiary,
	useDeleteDiary,
	useDiariesWithLikes,
} from "@/api/diaryHooks";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { diarySchema } from "@/lib/schemas";

const Diary: React.FC = () => {
	// 다이어리 목록 조회
	const { data: diariesData, isLoading, error } = useDiariesWithLikes();
	const createDiaryMutation = useCreateDiary();
	const deleteDiaryMutation = useDeleteDiary();

	// 폼 설정
	const form = useForm({
		resolver: zodResolver(diarySchema),
		defaultValues: {
			title: "",
			content: "",
			tags: "",
		},
	});

	// 다이어리 생성
	const onSubmit = (data: { title: string; content: string; tags: string }) => {
		const tags = data.tags
			? data.tags.split(",").map((tag: string) => tag.trim())
			: [];
		createDiaryMutation.mutate(
			{
				title: data.title,
				content: data.content,
				tags,
			},
			{
				onSuccess: () => {
					form.reset();
				},
			},
		);
	};

	// 다이어리 삭제
	const handleDelete = (id: string) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deleteDiaryMutation.mutate(id);
		}
	};

	return (
		<div className="min-h-screen">
			<Header />
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					{/* 헤더 */}
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-gray-900 mb-6">
							다이어리 리스트
						</h1>

						{/* 다이어리 작성 폼 */}
						<Card className="mb-6">
							<CardHeader>
								<CardTitle>새 다이어리 작성</CardTitle>
								<CardDescription>
									오늘의 감사한 일을 기록해보세요.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<div className=" gap-4">
										<div className="space-y-2">
											<Label htmlFor="title">제목</Label>
											<Input
												id="title"
												placeholder="제목을 입력하세요"
												{...form.register("title")}
											/>
											{form.formState.errors.title && (
												<p className="text-sm text-red-500">
													{form.formState.errors.title.message}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="content">내용</Label>
										<Textarea
											id="content"
											placeholder="감사한 일을 적어보세요"
											className="min-h-[100px]"
											{...form.register("content")}
										/>
										{form.formState.errors.content && (
											<p className="text-sm text-red-500">
												{form.formState.errors.content.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="tags">태그 (쉼표로 구분)</Label>
										<Input
											id="tags"
											placeholder="예: 감사, 행복, 건강"
											{...form.register("tags")}
										/>
										{form.formState.errors.tags && (
											<p className="text-sm text-red-500">
												{form.formState.errors.tags.message}
											</p>
										)}
									</div>

									<div className="flex justify-end">
										<Button
											type="submit"
											variant="outline"
											disabled={createDiaryMutation.isPending}
										>
											{createDiaryMutation.isPending ? "저장 중..." : "저장"}
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* 에러 처리 */}
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
							데이터를 불러오는 중 오류가 발생했습니다.
						</div>
					)}

					{/* 로딩 상태 */}
					{isLoading && (
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<Card key={i}>
									<CardHeader>
										<Skeleton className="h-4 w-[250px]" />
										<Skeleton className="h-4 w-[200px]" />
									</CardHeader>
									<CardContent>
										<Skeleton className="h-20 w-full" />
									</CardContent>
								</Card>
							))}
						</div>
					)}

					{/* 다이어리 목록 */}
					{!isLoading && diariesData && (
						<div className="space-y-4">
							{diariesData.length === 0 ? (
								<Card>
									<CardContent className="py-10 text-center text-gray-500">
										아직 작성된 다이어리가 없습니다.
										<br />새 다이어리를 작성해보세요!
									</CardContent>
								</Card>
							) : (
								diariesData.map((diary) => (
									<Card
										key={diary.id}
										className="hover:shadow-lg transition-shadow"
									>
										<CardHeader>
											<div className="flex justify-between items-start">
												<div className="flex-1">
													<CardTitle>{diary.title}</CardTitle>
													<CardDescription>
														{new Date(diary.created_at).toLocaleDateString(
															"ko-KR",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)}
													</CardDescription>
												</div>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDelete(diary.id)}
													disabled={deleteDiaryMutation.isPending}
												>
													<Trash2 className="h-4 w-4 text-red-500" />
												</Button>
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-gray-700 mb-4">{diary.content}</p>
											<div className="flex items-center justify-between">
												<div className="flex flex-wrap gap-2">
													{diary.tags?.map((tag, index) => (
														<Badge key={index} variant="secondary">
															{tag}
														</Badge>
													))}
												</div>
												<div className="flex items-center gap-1 text-sm text-gray-500">
													<Heart className="h-4 w-4" />
													<span>{diary.likes_count}</span>
												</div>
											</div>
										</CardContent>
									</Card>
								))
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Diary;
