import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./app-reducer";
import { themeReducer } from "./theme-reducer";


const reducer = combineReducers({
    app: appReducer,
    theme: themeReducer
})

export type RootStateT = ReturnType<typeof reducer>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export type AppDispatchT = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store


export default store