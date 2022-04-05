import axios from "axios";
// import { ORDER_LIST_USER_RESET } from "../constants/orderConstants";
import {
  ROUTE_DELETE_FAIL,
  ROUTE_DELETE_REQUEST,
  ROUTE_DELETE_SUCCESS,
  ROUTE_DETAILS_REQUEST,
  ROUTE_DETAILS_SUCCESS,
  ROUTE_DETAILS_FAIL,
  ROUTE_LIST_FAIL,
  ROUTE_LIST_REQUEST,
  ROUTE_LIST_SUCCESS,
  ROUTE_REGISTER_FAIL,
  ROUTE_REGISTER_REQUEST,
  ROUTE_REGISTER_SUCCESS,
  ROUTE_UPDATE_FAIL,
  ROUTE_UPDATE_REQUEST,
  ROUTE_UPDATE_SUCCESS,
} from "../constants/routeConstants";

export const registerRoute = (route) => async (dispatch) => {
  try {
    dispatch({
      type: ROUTE_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/routes", route, config);

    dispatch({
      type: ROUTE_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROUTE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRoutes = (route) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROUTE_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/routes", config);

    dispatch({
      type: ROUTE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROUTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRouteDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROUTE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/routes/${id}`);

    dispatch({ type: ROUTE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ROUTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRoute = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROUTE_DELETE_REQUEST,
    });

    await axios.delete(`/api/routes/${id}`);

    dispatch({
      type: ROUTE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ROUTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRoute = (route) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROUTE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/routes/${route._id}`, route, config);

    dispatch({
      type: ROUTE_UPDATE_SUCCESS,
    });
    dispatch({
      type: ROUTE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROUTE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
