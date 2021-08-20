import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { reduxStore } from "./redux-state/store";

const NavBar = React.lazy(() => import("./components/NavBar"));
const HomePage = React.lazy(() => import("./components/HomePage"));
const ExhibitPage = React.lazy(() => import("./components/ExhibitPage"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const SignIn = React.lazy(() => import("./components/SignIn"));

export default function MainRouter() {
	return (
		<React.Suspense fallback="Loading">
			<div>
				{/* <Provider store={reduxStore}> */}
					<NavBar />
					<Switch>
						<Route exact path="/exhibit/:departmentID" component={ExhibitPage} />
					<Route exact path="/" component={HomePage} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/login" component={SignIn} />
					</Switch>
				{/* </Provider> */}
			</div>
		</React.Suspense>
	);
}
	