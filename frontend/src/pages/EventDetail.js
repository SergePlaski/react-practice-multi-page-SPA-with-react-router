import { useRouteLoaderData, json, redirect } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
	const eventData = useRouteLoaderData('event-detail');

	return (
		<EventItem event={eventData.event} />
	);
}

export default EventDetailPage; 

// named export: the loader function for EventDetail
// request and params are always sent as part as arg object by the router
export async function loader({request, params}) {
	const id = params.eventId;
	// console.log(request);

	const response = await fetch('http://localhost:8080/events/' + id);

	if (!response.ok) {
		throw json({message: 'Could not fetch detail for selected event.'}, {status: 500});
	} else {
		return response;
	}
}

// named export: the action function for deleting the current event
// perhaps it would be a good idea to name it deleteAction to distinguish
// from other actions like Edit 
export async function action({params, request}) {
	const eventId = params.eventId;
	const response = await fetch('http://localhost:8080/events/' + eventId, {
		method: request.method // method: 'DELETE' can also be hard-coded
	});

		if (!response.ok) {
			throw json(
				{ message: "Could not delete the selected event." },
				{ status: 500 }
			);
		}

		// if we are here then the request is successful
		console.log(await response.json());
		
		return redirect('/events'); // show the updated list of events
}
