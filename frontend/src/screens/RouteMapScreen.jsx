import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRouteDetails } from "../actions/routeActions";
import Loader from "../components/Loader";

const RouteMapScreen = () => {
  const history = useNavigate();
  const { id } = useParams();
  //   dotenv.config();

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA_oUhsYb3vIsUpBraI_HwZcTkZPofghow",
    // dotenv is not getting loaded properly, so providing the key here itself.
    libraries: ["places"],
  });

  //   const [name, setName] = useState("");
  //   const [direction, setDirection] = useState(true);
  //   const [active, setActive] = useState(true);
  //   const [listOfStopsInSeq, setListOfStopsInSeq] = useState([]);
  //   const [availableStops, setAvailableStops] = useState([]);

  const dispatch = useDispatch();
  const routeDetails = useSelector((state) => state.routeDetails);
  const { loading, error, route } = routeDetails;

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
      listOfRouteStopsInSeq.map((stop) => {
        routeWayPoints.push({ lat: stop.latitude, lng: stop.longitude });
      });
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
      const results = await directionsService.route({
        origin,
        destination,
        // eslint-disable-next-line no-undef
        travelMode: "DRIVING",
        // waypoints: routeWayPoints,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
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
          >
            {route?.listOfStopsInSeq?.map((stop) => (
              <Marker position={{ lat: stop.latitude, lng: stop.longitude }} />
            ))}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default RouteMapScreen;
