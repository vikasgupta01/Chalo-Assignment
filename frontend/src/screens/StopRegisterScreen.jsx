import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerStop } from "../actions/stopActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { STOP_REGISTER_RESET } from "../constants/stopConstants";

const StopRegisterScreen = () => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const dispatch = useDispatch();
  const history = useNavigate();

  const stopRegister = useSelector((state) => state.stopRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
  } = stopRegister;

  useEffect(() => {
    if (successRegister) {
      dispatch({ type: STOP_REGISTER_RESET });
      history("/stops");
    }
  }, [dispatch, history, successRegister]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("name: ", name);
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    dispatch(
      registerStop({
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
        {loadingRegister && <Loader />}
        {errorRegister && <Message variant="danger">{errorRegister}</Message>}
        <h1>Add Stop</h1>
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
            Add Stop
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default StopRegisterScreen;
