import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation";

function EventsRootLayout() {
	return (
		<Fragment>
			<EventsNavigation />
			<Outlet /> {/* children route elements are rendered  here */}
		</Fragment>
	);
}

export default EventsRootLayout;
