import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStopDetails, updateStop } from "../actions/stopActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { STOP_UPDATE_RESET } from "../constants/stopConstants";

const StopEditScreen = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const dispatch = useDispatch();

  const stopDetails = useSelector((state) => state.stopDetails);
  const { loading, error, stop } = stopDetails;

  const stopUpdate = useSelector((state) => state.stopUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = stopUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STOP_UPDATE_RESET });
      history("/stops");
    } else {
      if (!stop.name || stop._id !== id) {
        dispatch(getStopDetails(id));
      } else {
        setName(stop.name);
        setLatitude(stop.latitude);
        setLongitude(stop.longitude);
      }
    }
  }, [dispatch, history, stop, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStop({
        _id: id,
        name,
        latitude,
        longitude,
      })
    );
  };

  return (
    <>
      <Link to="/stops" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Stop</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default StopEditScreen;
