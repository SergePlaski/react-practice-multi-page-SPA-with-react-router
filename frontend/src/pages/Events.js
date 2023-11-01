import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
	const { events } = useLoaderData(); // data returned by loader() function specified for this route
	// here we receive data returned by defer() and can destructure it to retrieve the events from it

	return (
		<Suspense fallback={<p className="message-text">Loading...</p>}>
			<Await resolve={events}>
				{(events) => <EventsList events={events} />}
			</Await>
		</Suspense>
	);
}

export default EventsPage;

// deferred data loading
async function deferredLoadEvents() {
	const response = await fetch("http://localhost:8080/events");

	if (!response.ok) {
		// throw new Response(JSON.stringify({ message: 'Could not fetch events data.' }), {status: 500});
		// throw new Error(JSON.stringify({ message: "Could not fetch events data"}), {status: 500 });
		throw json({ message: "Could not fetch events data" }, { status: 500 });
		// json() is the same as new Response(), except no need to stringify and then parse the data
	} else {
		// return response;
		const resData = await response.json();
		return resData.events;
		// we need to extract the events data as expected by defer()
	}
}

// the modified loader function (no longer needs to be async)
// NOTE: defer funcltion must receive a promise
export function loader() {
	return defer({
		events: deferredLoadEvents(),
	});
}
