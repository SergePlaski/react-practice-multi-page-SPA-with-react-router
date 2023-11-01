import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

function RootLayout() {
	return (
		<Fragment>
			<MainNavigation />
			<main className={classes.content}>
				<Outlet /> {/* children route elements are rendered  here */}
			</main>
		</Fragment>
	);
}

export default RootLayout;
