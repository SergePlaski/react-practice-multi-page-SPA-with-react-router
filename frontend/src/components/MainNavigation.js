import { NavLink } from "react-router-dom";

import NewsletterSignup from "./NewsletterSignup";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
	// important! end attribute in Home NavLink prevents Home link always being active
	return (
		<header className={classes.header}>
			<nav>
				<ul className={classes.list}>
					<li>
						<NavLink
							to='/'
							end
							className={({ isActive }) => (isActive ? classes.active : "")}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/events'
							className={({ isActive }) => (isActive ? classes.active : "")}
						>
							Events
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/newsletter'
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Newsletter
						</NavLink>
					</li>
				</ul>
			</nav>
			<NewsletterSignup />
		</header>
	);
}

export default MainNavigation;
