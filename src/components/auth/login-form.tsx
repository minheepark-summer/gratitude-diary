import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/api/loginHooks";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginFormData, loginSchema } from "@/lib/schemas";

export function LoginForm() {
	const navigate = useNavigate();
	const loginMutation = useLogin();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await loginMutation.mutateAsync(data);
			navigate("/diary");
		} catch (error) {
			console.error("로그인 실패:", error);
		}
	};

	return (
		<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						감사 일기
					</CardTitle>
					<CardDescription className="text-center">
						계정에 로그인하세요
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{/* 에러 메시지 표시 */}
							{loginMutation.isError && (
								<div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-md">
									로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
								</div>
							)}

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="flex flex-col text-left">
										<FormLabel>이메일</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="이메일을 입력하세요"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="flex flex-col text-left">
										<FormLabel>비밀번호</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="비밀번호를 입력하세요"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full text-black"
								variant="default"
								disabled={loginMutation.isPending}
							>
								{loginMutation.isPending ? "로그인 중..." : "로그인"}
							</Button>

							<div className="text-center">
								<span className="text-sm text-gray-600">
									계정이 없으신가요?
									<Button
										type="button"
										variant="link"
										onClick={() => navigate("/signup")}
									>
										회원가입
									</Button>
								</span>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
