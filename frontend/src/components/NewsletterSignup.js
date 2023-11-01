import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
	const emailInput = useRef();

	const fetcher = useFetcher();
	const { data, state } = fetcher; // get returned action data and state from the hook

useEffect(() => {
	if (state === 'idle' && data?.message ) {
		emailInput.current.value = ''; // reset the input
		window.alert(data.message);
	}
}, [data, state])

	return (
		// using fetcher prevents route transition after the form action is triggered
		<fetcher.Form
			method='post'
			action='/newsletter'
			className={classes.newsletter}
		>
			<input
				ref={emailInput}
				id='email'
				name='email'
				type='email'
				placeholder='Sign up for newsletter...'
				aria-label='Sign up for newsletter'
			/>
			<button>Sign up</button>
		</fetcher.Form>
	);
}

export default NewsletterSignup;
