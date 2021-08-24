import { LOGIN, LOGOUT, SET_USER } from "./actions";
import Axios from "../components/lib/axios/Axios";

export const reducer = (state, action) => {
	if (action.type === LOGOUT) {
		console.log(action);
		localStorage.removeItem("jwtToken");
		return {
			...state,
			user: null,
		};
	}
	if (action.type === LOGIN) {
		console.log(action);
		Axios.post("/users/login", {
			email: action.email,
			password: action.password,
		})
			.then((res) => {
				console.log(res);
				console.log(res.data);
				console.log("hello");
				localStorage.setItem("jwtToken", res.data.jwtToken);
			})
			.catch(function (error) {
				console.log(error);
			});
		return {
			...state,
			user: action.email,
		};
	}
	if (action.type === SET_USER) {
		console.log(state);
		return {
			...state,
			user: action.email,
		};
	}
	return state;
};
