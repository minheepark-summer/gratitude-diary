import type React from "react";
import { Header } from "@/components/layout/header";

const Profile: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<h1 className="text-3xl font-bold text-gray-900 mb-6">
						내 정보 조회
					</h1>

					<div className="bg-white shadow rounded-lg p-6">
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									이메일
								</label>
								<p className="mt-1 text-sm text-gray-900">user@example.com</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									이름
								</label>
								<p className="mt-1 text-sm text-gray-900">사용자</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									가입일
								</label>
								<p className="mt-1 text-sm text-gray-900">2024년 1월 1일</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
