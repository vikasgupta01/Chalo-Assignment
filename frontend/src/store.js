import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  routeDeleteReducer,
  routeDetailsReducer,
  routeListReducer,
  routeRegisterReducer,
  routeUpdateReducer,
} from "./reducers/routeReducers.js";
import {
  stopDeleteReducer,
  stopDetailsReducer,
  stopListReducer,
  stopRegisterReducer,
  stopUpdateReducer,
} from "./reducers/stopReducers.js";

const reducer = combineReducers({
  stopRegister: stopRegisterReducer,
  stopDetails: stopDetailsReducer,
  stopList: stopListReducer,
  stopDelete: stopDeleteReducer,
  stopUpdate: stopUpdateReducer,
  routeRegister: routeRegisterReducer,
  routeDetails: routeDetailsReducer,
  routeList: routeListReducer,
  routeDelete: routeDeleteReducer,
  routeUpdate: routeUpdateReducer,
});

const initialState = {
  stops: {},
  routes: {},
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
