import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteRoute, listRoutes } from "../actions/routeActions";
// import { deleteRoute, listRoutes } from "../actions/routeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RoutesListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const routeList = useSelector((state) => state.routeList);
  const { loading, error, routes } = routeList;

  const routeDelete = useSelector((state) => state.routeDelete);
  const { success: successDelete } = routeDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteRoute(id));
    }
  };

  useEffect(() => {
    dispatch(listRoutes());
  }, [dispatch, successDelete]);

  return (
    <>
      <h1>Routes</h1>
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
              <th>DIRECTION</th>
              <th>STATUS</th>
              <th>STOPS</th>
              <th>VIEW/EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td>{route._id}</td>
                <td>{route.name}</td>
                <td>{route.direction ? "Up" : "Down"}</td>
                <td>{route.active ? "Active" : "Inactive"}</td>
                <td>
                  {route.listOfStopsInSeq.map((stop) => ` - ${stop.name} - `)}
                </td>
                <td>
                  <LinkContainer to={`/route/${route._id}/view`}>
                    <Button variant="success" className="btn-sm">
                      View
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/route/${route._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(route._id);
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

export default RoutesListScreen;
