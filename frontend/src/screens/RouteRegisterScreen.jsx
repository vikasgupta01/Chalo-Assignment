import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { registerRoute } from "../actions/routeActions";
import { listStops } from "../actions/stopActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ROUTE_REGISTER_RESET } from "../constants/routeConstants";

const RouteRegisterScreen = () => {
  const [name, setName] = useState("");
  const [direction, setDirection] = useState(true);
  const [active, setActive] = useState(true);
  const [listOfStopsInSeq, setListOfStopsInSeq] = useState([]);
  const [availableStops, setAvailableStops] = useState([]);

  const dispatch = useDispatch();
  const history = useNavigate();

  const routeRegister = useSelector((state) => state.routeRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
  } = routeRegister;

  const stopsList = useSelector((state) => state.stopList);
  const { loading: loadingStops, error: errorStops, stops } = stopsList;

  useEffect(() => {
    if (!stops) {
      dispatch(listStops());
    }
    if (successRegister) {
      dispatch({ type: ROUTE_REGISTER_RESET });
      history("/routes");
    }
    // setName(name);
    // setDirection(direction);
    // setActive(active);
    // setListOfStopsInSeq(listOfStopsInSeq);
  }, [dispatch, history, stops, successRegister]);

  useEffect(() => {
    let availableStopsArr = [];
    stops?.forEach((stop) => {
      availableStopsArr.push({ value: stop._id, label: stop.name });
    });
    setAvailableStops(availableStopsArr);
  }, [stops]);

  const submitHandler = (e) => {
    e.preventDefault();
    let listOfStopDetailsInSequence = [];
    listOfStopsInSeq.forEach((stop) => {
      stops.forEach((element) => {
        if (element._id === stop) {
          listOfStopDetailsInSequence.push({
            name: element.name,
            latitude: element.latitude,
            longitude: element.longitude,
            stop: element._id,
          });
        }
      });
    });
    dispatch(
      registerRoute({
        name,
        direction,
        active,
        listOfStopsInSeq: listOfStopDetailsInSequence,
      })
    );
  };

  const updateStops = (e) => {
    let selectedStops = [];
    e.forEach((stop) => {
      selectedStops.push(stop.value);
    });
    setListOfStopsInSeq(selectedStops);
  };

  return (
    <>
      <Link to="/routes" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {loadingRegister && <Loader />}
        {errorRegister && <Message variant="danger">{errorRegister}</Message>}
        <h1>Add Route</h1>
        {errorStops && <Message variant="danger">{errorStops}</Message>}
        {loadingStops ? (
          <Loader />
        ) : errorStops ? (
          <Message variant="danger">{errorStops}</Message>
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
            <Form.Group controlId="direction">
              <Form.Label>Direction</Form.Label>
              <Form.Select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option value={true}>Up</option>
                <option value={false}>Down</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="stops">
              <Form.Label>List of Stops In Sequence</Form.Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                name="stops"
                options={availableStops}
                // defaultValue={listOfStopsInSeq}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={updateStops}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Route
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default RouteRegisterScreen;
