import { createStore, compose } from "redux";
import { reducer } from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
	user: null,
};

export const reduxStore = createStore(
	reducer,
	initialState,
	composeEnhancers()
);
