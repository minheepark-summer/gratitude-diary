import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 로그인 로직 구현
		console.log("로그인 시도:", { email, password });
		// 임시로 대시보드로 이동
		navigate("/dashboard");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						감사 일기
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						계정에 로그인하세요
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								이메일 주소
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="이메일 주소"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								비밀번호
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="비밀번호"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900"
							>
								로그인 상태 유지
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								비밀번호를 잊으셨나요?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							로그인
						</button>
					</div>

					<div className="text-center">
						<span className="text-sm text-gray-600">
							계정이 없으신가요?{" "}
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								회원가입
							</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
