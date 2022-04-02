import {
  STOP_DELETE_FAIL,
  STOP_DELETE_REQUEST,
  STOP_DELETE_SUCCESS,
  STOP_DETAILS_FAIL,
  STOP_DETAILS_REQUEST,
  STOP_DETAILS_RESET,
  STOP_DETAILS_SUCCESS,
  STOP_LIST_FAIL,
  STOP_LIST_REQUEST,
  STOP_LIST_RESET,
  STOP_LIST_SUCCESS,
  STOP_REGISTER_FAIL,
  STOP_REGISTER_REQUEST,
  STOP_REGISTER_SUCCESS,
  STOP_UPDATE_FAIL,
  STOP_UPDATE_REQUEST,
  STOP_UPDATE_RESET,
  STOP_UPDATE_SUCCESS,
} from "../constants/stopConstants";

export const stopRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STOP_REGISTER_REQUEST:
      return { loading: true };
    case STOP_REGISTER_SUCCESS:
      return { loading: false, stopInfo: action.payload };
    case STOP_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stopDetailsReducer = (state = { stop: {} }, action) => {
  switch (action.type) {
    case STOP_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STOP_DETAILS_SUCCESS:
      return { loading: false, stop: action.payload };
    case STOP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STOP_DETAILS_RESET:
      return { stop: {} };
    default:
      return state;
  }
};

export const stopListReducer = (state = { stops: [] }, action) => {
  switch (action.type) {
    case STOP_LIST_REQUEST:
      return { loading: true };
    case STOP_LIST_SUCCESS:
      return { loading: false, stops: action.payload };
    case STOP_LIST_FAIL:
      return { loading: false, error: action.payload };
    case STOP_LIST_RESET:
      return { stops: [] };
    default:
      return state;
  }
};

export const stopDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STOP_DELETE_REQUEST:
      return { loading: true };
    case STOP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STOP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stopUpdateReducer = (state = { stop: {} }, action) => {
  switch (action.type) {
    case STOP_UPDATE_REQUEST:
      return { loading: true };
    case STOP_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case STOP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STOP_UPDATE_RESET:
      return { stop: {} };
    default:
      return state;
  }
};
