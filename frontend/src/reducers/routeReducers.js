import {
  ROUTE_DELETE_FAIL,
  ROUTE_DELETE_REQUEST,
  ROUTE_DELETE_SUCCESS,
  ROUTE_DETAILS_FAIL,
  ROUTE_DETAILS_REQUEST,
  ROUTE_DETAILS_RESET,
  ROUTE_DETAILS_SUCCESS,
  ROUTE_LIST_FAIL,
  ROUTE_LIST_REQUEST,
  ROUTE_LIST_RESET,
  ROUTE_LIST_SUCCESS,
  ROUTE_REGISTER_FAIL,
  ROUTE_REGISTER_REQUEST,
  ROUTE_REGISTER_RESET,
  ROUTE_REGISTER_SUCCESS,
  ROUTE_UPDATE_FAIL,
  ROUTE_UPDATE_REQUEST,
  ROUTE_UPDATE_RESET,
  ROUTE_UPDATE_SUCCESS,
} from "../constants/routeConstants";

export const routeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ROUTE_REGISTER_REQUEST:
      return { loading: true };
    case ROUTE_REGISTER_SUCCESS:
      return { loading: false, routeInfo: action.payload, success: true };
    case ROUTE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const routeDetailsReducer = (state = { route: {} }, action) => {
  switch (action.type) {
    case ROUTE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ROUTE_DETAILS_SUCCESS:
      return { loading: false, route: action.payload };
    case ROUTE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_DETAILS_RESET:
      return { route: {} };
    default:
      return state;
  }
};

export const routeListReducer = (state = { routes: [] }, action) => {
  switch (action.type) {
    case ROUTE_LIST_REQUEST:
      return { loading: true };
    case ROUTE_LIST_SUCCESS:
      return { loading: false, routes: action.payload };
    case ROUTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_LIST_RESET:
      return { routes: [] };
    default:
      return state;
  }
};

export const routeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROUTE_DELETE_REQUEST:
      return { loading: true };
    case ROUTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ROUTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const routeUpdateReducer = (state = { route: {} }, action) => {
  switch (action.type) {
    case ROUTE_UPDATE_REQUEST:
      return { loading: true };
    case ROUTE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ROUTE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_UPDATE_RESET:
      return { route: {} };
    default:
      return state;
  }
};
