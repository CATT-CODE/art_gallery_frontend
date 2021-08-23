import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { reduxStore } from "./redux-state/store";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/HashLoader";

const NavBar = React.lazy(() => import("./components/NavBar"));
const HomePage = React.lazy(() => import("./components/HomePage"));
const ExhibitPage = React.lazy(() => import("./components/ExhibitPage"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const SignIn = React.lazy(() => import("./components/SignIn"));

const override = css`
	display: block;
	margin: 0 auto;
	margin-top: 25%;
	border-color: #ffffff;
`;

export default function MainRouter() {
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("#ffffff");
	return (
		<React.Suspense fallback={
			<div className="sweet-loading">
			<CircleLoader
			color={color}
								loading={loading}
								css={override}
								size={150}
			/>
			</div>
		}>
			<div>
				{/* <Provider store={reduxStore}> */}
					<NavBar />
					<Switch>
						<Route exact path="/exhibit/:departmentID/:departmentName" component={ExhibitPage} />
					<Route exact path="/" component={HomePage} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/login" component={SignIn} />
					</Switch>
				{/* </Provider> */}
			</div>
		</React.Suspense>
	);
}
	