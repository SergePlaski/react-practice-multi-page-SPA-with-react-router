import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();

  function itemDeleteHandler() {
    // vanilla JS function:
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' }); 
      // the first argument is data we submit with the request; null for DELETE
      
      // the second argument is an object that defines the same data that we 
      // normally set on the form (method, action, etc.)

      // if we want to specify action other that the default one, we can do it here
      // action='/some-other-route-path'
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={itemDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
