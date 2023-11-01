import {
	Form,
	useNavigate,
	useNavigation,
	useActionData,
	json,
	redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

// method and event args are passed from parent component: <NewEvent> or <EditEvent>
function EventForm({ method, event }) {
	const navigate = useNavigate();
	const navigation = useNavigation();
	// helper variable that indicates the current transition state
	const isSubmitting = navigation.state === "submitting";

	// action returned data:
	// defined on backend as an object {message, errors[]}
	const actionData = useActionData();

	function cancelHandler() {
		console.log("cancel clicked");
		navigate("..");
	}

	// in the JSX code below, use action data to conditionally display
	// the results of server-side validation.
	// NOTE: to properly test this, remove required attributes in the inputs.

	return (
		<Form method={method} className={classes.form}>
			{actionData && actionData.errors && (
				<ul>
					{Object.values(actionData.errors).map((err) => (
						<li key={err}>{err}</li>
					))}
				</ul>
			)}
			<p>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					required
					defaultValue={event ? event.title : ""}
				/>
			</p>
			<p>
				<label htmlFor='image'>Image</label>
				<input
					id='image'
					type='url'
					name='image'
					required
					defaultValue={event ? event.image : ""}
				/>
			</p>
			<p>
				<label htmlFor='date'>Date</label>
				<input
					id='date'
					type='date'
					name='date'
					required
					defaultValue={event ? event.date : ""}
				/>
			</p>
			<p>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					rows='5'
					required
					defaultValue={event ? event.description : ""}
				/>
			</p>
			<div className={classes.actions}>
				<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
					Cancel
				</button>
				<button disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Save"}
				</button>
			</div>
		</Form>
	);
}

export default EventForm;

// action for adding/editing an Event:
// just like loader() function, this code executes client-side
// and automatically gets an argument object
// which provides request and params
export async function action({ request, params }) {
	// extract form data from the request object
	const data = await request.formData();
	// get individual form values (get by using name values):
	const eventData = {
		title: data.get("title"),
		image: data.get("image"),
		date: data.get("date"),
		description: data.get("description"),
	};

	// construct the appropriate request based on the arguments sent from the parent component
	// (NewEvent or EditEvent)
	let url = "http://localhost:8080/events";

	if (request.method === "PATCH") {
		// NOTE: passed as 'patch', translated by React
		const eventId = params.eventId;
		url += `/${eventId}`;
	}

	const response = await fetch(url, {
		method: request.method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(eventData), // make sure to supply valid JSON data
	});

	// handling errors from server-side form validation:
	// status code 422 is programmed on backend if some of the fields
	// do not pass validation
	// By returning the response to the component, we get a chance
	// to extract the details and show them to the user
	if (response.status === 422) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: "Could not send event data." }, { status: 500 });
	}

	// at this point, if not failed, the submission is successful
	// we can redirect to the updated list of events
	return redirect("/events");
}
