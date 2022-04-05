import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { deleteStop, listStops } from "../actions/stopActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const StopsListScreen = () => {
  const dispatch = useDispatch();

  const stopsList = useSelector((state) => state.stopList);
  const { loading, error, stops } = stopsList;

  const stopDelete = useSelector((state) => state.stopDelete);
  const { success: successDelete } = stopDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteStop(id));
    }
  };

  useEffect(() => {
    dispatch(listStops());
  }, [dispatch, successDelete]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Stops</h1>
        </Col>
        <Col className="text-end">
          <Link to="/stop/create" className="btn btn-light my-3">
            Create Stop
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>LATITUDE</th>
              <th>LONGITUDE</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop) => (
              <tr key={stop._id}>
                <td>{stop._id}</td>
                <td>{stop.name}</td>
                <td>{stop.latitude}</td>
                <td>{stop.longitude}</td>
                <td>
                  <LinkContainer to={`/stop/${stop._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(stop._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default StopsListScreen;
