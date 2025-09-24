import type React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="max-w-md w-full text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					감사 일기에 오신 것을 환영합니다
				</h1>
				<p className="text-lg text-gray-600 mb-8">
					매일의 감사한 순간들을 기록해보세요
				</p>
				<div className="space-y-4">
					<Link
						to="/login"
						className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-block"
					>
						로그인하기
					</Link>
					<button className="w-full bg-white text-indigo-600 py-3 px-6 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors">
						회원가입하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
