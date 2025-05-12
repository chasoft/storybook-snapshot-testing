import "./App.css";
import { Button } from "./components/ui/button";

function App() {
	return (
		<>
			<Button>Hello</Button>
			<Button variant="destructive">World</Button>
			<Button variant="ghost">World</Button>
			<Button variant="outline">World</Button>
			<Button variant="secondary">World</Button>
		</>
	);
}

export default App;
