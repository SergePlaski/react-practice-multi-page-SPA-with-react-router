import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
	const routeError = useRouteError();
	// console.log(routeError);

	let status = 404;
	let title = "Error";
	let message = "An error occured!";

	if (routeError) {
		switch (routeError.status) {
			case 404: 
			  title = "Not Found";
			  message = "Could not find resource or page";
			  break;
			case 500: 
			  status = 500;
			  title = "Network Error";
			// const errorData = JSON.parse(routeError.data);
			// message = errorData?.message || message;
			  message = routeError.data?.message || message; // no need to parse data when using json()
			  break;
			default:
		}
	}

	return (
		<Fragment>
			<MainNavigation />
			<PageContent title={title}>
				<p>{status}: {message}</p>
			</PageContent>
		</Fragment>
	);
}

export default ErrorPage;
