import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Diary from "./pages/Diary";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client outside of the component
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5분
			retry: 1,
		},
	},
});

function App() {
	console.log("📀", import.meta.env.VITE_NODE_ENV);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Navigate to="/login" replace />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/diary" element={<Diary />} />
						<Route path="*" element={<Navigate to="/login" replace />} />
					</Routes>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
