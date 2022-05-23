import "./App.css";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import Warehouse from "./routes/warehouse";
import Inventory from "./routes/inventory";
// import Docs from "./routes/docs";

function App() {
	const { url, path } = useRouteMatch();
	return (
		<div style={{ padding: "1rem 0" }}>
			<h1>Inventory Management</h1>
			<nav
				style={{
					borderBottom: "solid 1px",
					paddingBottom: "1rem",
				}}
			>
				<Link to={`/warehouses`}>Warehouses</Link> |{" "}
				<Link to={`/inventory`}>Inventory</Link>
			</nav>

			<Switch>
				<Route path={`${path}warehouses`}>
					<Warehouse />
				</Route>
				<Route path={`${path}inventory`}>
					<Inventory />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
