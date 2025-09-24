import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";

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
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</div>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
