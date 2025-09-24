import type React from "react";

const Dashboard: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<h1 className="text-3xl font-bold text-gray-900 mb-6">
						감사 일기 대시보드
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-5">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
											<span className="text-white text-sm font-medium">📝</span>
										</div>
									</div>
									<div className="ml-5 w-0 flex-1">
										<dl>
											<dt className="text-sm font-medium text-gray-500 truncate">
												오늘의 감사 일기
											</dt>
											<dd className="text-lg font-medium text-gray-900">
												작성하기
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-5">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
											<span className="text-white text-sm font-medium">📊</span>
										</div>
									</div>
									<div className="ml-5 w-0 flex-1">
										<dl>
											<dt className="text-sm font-medium text-gray-500 truncate">
												이번 주 감사 일기
											</dt>
											<dd className="text-lg font-medium text-gray-900">5개</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-5">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
											<span className="text-white text-sm font-medium">📈</span>
										</div>
									</div>
									<div className="ml-5 w-0 flex-1">
										<dl>
											<dt className="text-sm font-medium text-gray-500 truncate">
												연속 작성일
											</dt>
											<dd className="text-lg font-medium text-gray-900">7일</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-8">
						<div className="bg-white shadow rounded-lg p-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								최근 감사 일기
							</h2>
							<div className="space-y-4">
								<div className="border-l-4 border-indigo-500 pl-4">
									<p className="text-gray-600">
										오늘 아침에 맛있는 커피를 마실 수 있어서 감사했습니다.
									</p>
									<p className="text-sm text-gray-500 mt-1">2024년 1월 15일</p>
								</div>
								<div className="border-l-4 border-green-500 pl-4">
									<p className="text-gray-600">
										친구와의 좋은 대화로 하루가 즐거웠습니다.
									</p>
									<p className="text-sm text-gray-500 mt-1">2024년 1월 14일</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
