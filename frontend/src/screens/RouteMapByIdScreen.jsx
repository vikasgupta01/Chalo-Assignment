import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
// import dotenv from "dotenv";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRouteDetails } from "../actions/routeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ROUTE_DETAILS_RESET } from "../constants/routeConstants";

const RouteMapScreen = () => {
  const { id } = useParams();
  //   dotenv.config();

  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // dotenv is not getting loaded properly, so providing the key here itself.
    // This api key will be deleted later.
    googleMapsApiKey: "AIzaSyA_oUhsYb3vIsUpBraI_HwZcTkZPofghow",
    libraries: ["places"],
  });

  const dispatch = useDispatch();
  const routeDetails = useSelector((state) => state.routeDetails);
  const { loading, error, route } = routeDetails;

  const clearRoute = () => {
    setDirectionsResponse(null);
    dispatch({
      type: ROUTE_DETAILS_RESET,
    });
  };

  useEffect(() => {
    dispatch(getRouteDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const calculateRoute = async () => {
      if (
        route?.listOfStopsInSeq?.length < 2 ||
        route?.listOfStopsInSeq === undefined
      ) {
        return;
      }
      const listOfRouteStopsInSeq = JSON.parse(
        JSON.stringify(route?.listOfStopsInSeq)
      );
      listOfRouteStopsInSeq.shift();
      listOfRouteStopsInSeq.pop();
      const routeWayPoints = [];
      listOfRouteStopsInSeq.map((stop) =>
        routeWayPoints.push({
          location: { lat: stop.latitude, lng: stop.longitude },
          // stopover: false,
        })
      );
      console.log("route waypoints in MapScreen: ", routeWayPoints);
      const origin = {
        lat: route?.listOfStopsInSeq[0]?.latitude,
        lng: route?.listOfStopsInSeq[0]?.longitude,
      };
      const destination = {
        lat: route?.listOfStopsInSeq[route?.listOfStopsInSeq?.length - 1]
          ?.latitude,
        lng: route?.listOfStopsInSeq[route?.listOfStopsInSeq?.length - 1]
          ?.longitude,
      };
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      try {
        const results = await directionsService.route({
          origin,
          destination,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: routeWayPoints,
        });
        console.log("results in useEffect calculateRoute: ", results);
        setDirectionsResponse(results);
      } catch (error) {
        window.alert(error.message);
      }
    };
    calculateRoute();
  }, [route]);

  //   const routeList = useSelector((state) => state.routeList);
  //   const { loading, error, routes } = routeList;

  return (
    <>
      <Link to="/routes" className="btn btn-light my-3" onClick={clearRoute}>
        Go Back
      </Link>
      <h1>Route</h1>
      {error && <Message variant="danger">{error}</Message>}
      {!isLoaded || loading ? (
        <Loader />
      ) : (
        <div className="map">
          <GoogleMap
            center={{
              lat: route?.listOfStopsInSeq[0].latitude,
              lng: route?.listOfStopsInSeq[0].longitude,
            }}
            zoom={15}
            mapContainerStyle={{
              width: "100%",
              height: "700px",
              position: "relative",
            }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
            mapContainerClassName="map-container"
          >
            {directionsResponse ? (
              <DirectionsRenderer directions={directionsResponse} />
            ) : (
              route?.listOfStopsInSeq?.map((stop) => (
                <Marker
                  position={{ lat: stop.latitude, lng: stop.longitude }}
                />
              ))
            )}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default RouteMapScreen;
