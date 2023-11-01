# SPA that implements multi-page functionality with React Router

##APP DESCRIPTION:
This is a practice React project: SPA (single-page-app) that implements multi-page functionality with React Router (react-router-dom lib).
The app maintains a list of events, with ability to add, edit, and delete events. 

The following aspects are practiced: 
- Dynamic rootes
- Nested routes
- Index path and relative paths
- Layout elements
- Error element
- Fetching data with loader functions & useLoaderData() hook
- Submitting data with action functions
- Imperative (programmatic) navigation with useNavigate() hook
- Handling routing transition state with useNavigation() hook
- Route-specific loader: useRouteLoaderData()
- Executing a request programmatically with useSubmit()
- Handling server-side form validation with useActionData() hook
- Re-using an action for two different request methods (POST and PATCH)
- Using other route's action without route transition with useFetcher()
- Rendering a component before the data is loaded with defer()
- Loading multiple requests/components on the same page using defer()


##HOW TO USE AND BUILD THE APP:

This project actually contains two projects:
- A React.js application (i.e., the frontend SPA)
- A dummy backend API to which the React app can "talk" (to send + fetch data)

You must run "npm install" in both project folders.

Thereafter, you can start the dummy backend API server via "npm start" (inside the "backend-api" folder).
The React app dev server is then also started via "npm start" (though inside the "react-frontend" folder).

You MUST have both servers (backend + frontend) up and running for the projects to work.

The dummy backend API does not use any external database - instead the dummy data is saved to an "events.json" file inside the project folder.