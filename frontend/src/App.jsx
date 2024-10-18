import { useState } from "react";
import "./App.css";

import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
		<Toaster expand={true} richColors closeButton={true} />
			<Outlet/>
		</>
	);
}

export default App;
