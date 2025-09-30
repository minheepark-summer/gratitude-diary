import { useNavigate } from "react-router-dom";
import { useLogout } from "@/api/loginHooks";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
	const navigate = useNavigate();
	const logoutMutation = useLogout();

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await logoutMutation.mutateAsync();
			navigate("/login");
		} catch (error) {
			console.error("로그아웃 실패:", error);
		}
	};

	return (
		<header className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16 gap-2">
					{/* 로고 */}
					<div className="flex items-center">
						<Button
							variant="ghost"
							className="text-xl font-bold "
							onClick={() => navigate("/dashboard")}
						>
							📝 감사 일기
						</Button>
					</div>

					{/* 사용자 메뉴 */}
					<div className="flex items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full flex items-center justify-center"
								>
									🍔
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">사용자</p>
										<p className="text-xs leading-none text-muted-foreground">
											user@example.com
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => navigate("/profile")}
									className="cursor-pointer"
								>
									내 정보 조회
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => navigate("/diary")}
									className="cursor-pointer"
								>
									다이어리 리스트
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={(e) =>
										handleLogout(
											e as unknown as React.MouseEvent<HTMLButtonElement>,
										)
									}
									className="cursor-pointer text-red-600 focus:text-red-600"
									disabled={logoutMutation.isPending}
								>
									{logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
