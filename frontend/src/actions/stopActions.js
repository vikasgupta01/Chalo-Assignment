import axios from "axios";
// import { ORDER_LIST_USER_RESET } from "../constants/orderConstants";
import {
  STOP_DELETE_FAIL,
  STOP_DELETE_REQUEST,
  STOP_DELETE_SUCCESS,
  STOP_DETAILS_REQUEST,
  STOP_DETAILS_SUCCESS,
  STOP_DETAILS_FAIL,
  STOP_DETAILS_RESET,
  STOP_LIST_FAIL,
  STOP_LIST_REQUEST,
  STOP_LIST_SUCCESS,
  STOP_REGISTER_FAIL,
  STOP_REGISTER_REQUEST,
  STOP_REGISTER_SUCCESS,
  STOP_UPDATE_FAIL,
  STOP_UPDATE_REQUEST,
  STOP_UPDATE_SUCCESS,
} from "../constants/stopConstants";

export const register = (name, latitude, longitude) => async (dispatch) => {
  try {
    dispatch({
      type: STOP_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/stops",
      { name, latitude, longitude },
      config
    );

    dispatch({
      type: STOP_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOP_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStops = (stop) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOP_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/stops", config);

    dispatch({
      type: STOP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOP_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/stops/${id}`);

    dispatch({ type: STOP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStop = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOP_DELETE_REQUEST,
    });

    await axios.delete(`/api/stops/${id}`);

    dispatch({
      type: STOP_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STOP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStop = (stop) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOP_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/stops/${stop._id}`, stop, config);

    dispatch({
      type: STOP_UPDATE_SUCCESS,
    });
    dispatch({
      type: STOP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
