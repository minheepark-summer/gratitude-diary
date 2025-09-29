import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// 환경변수 로드
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [tailwindcss(), react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			port: parseInt(env.VITE_DEV_PORT) || 5173,
			strictPort: false, // 포트가 사용 중이면 다른 포트 자동 선택
			proxy: {
				"/api": {
					target: env.VITE_SUPABASE_URL,
					changeOrigin: true,
					secure: false, // 자체 서명된 인증서 허용
					rejectUnauthorized: false, // SSL 인증서 검증 비활성화
				},
			},
		},
		define: {
			__APP_ENV__: JSON.stringify(env.VITE_ENV),
		},
	};
});
