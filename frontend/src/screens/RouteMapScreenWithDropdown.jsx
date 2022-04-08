// import dotenv from "dotenv";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
// import dotenv from "dotenv";
import React, { useEffect, useMemo, useState } from "react";
import { FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { listStops } from "../actions/stopActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ROUTE_DETAILS_RESET } from "../constants/routeConstants";

const RouteMapScreenWithDropdown = () => {
  //   dotenv.config();

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [originIndex, setOriginIndex] = useState(null);
  const [destinationIndex, setDestinationIndex] = useState(null);

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // dotenv is not getting loaded properly, so providing the key here itself.
    // This api key will be deleted later.
    googleMapsApiKey: "AIzaSyA_oUhsYb3vIsUpBraI_HwZcTkZPofghow",
    libraries: ["places"],
  });

  const dispatch = useDispatch();
  const {
    loading: loadingStops,
    stops,
    error: errorStops,
  } = useSelector((state) => state.stopList);

  const clearRoute = () => {
    setDirectionsResponse(null);
    setOriginIndex(null);
    setDestinationIndex(null);
    dispatch({
      type: ROUTE_DETAILS_RESET,
    });
  };

  useEffect(() => {
    dispatch(listStops());
  }, [dispatch]);

  const availableStopsArr = useMemo(() => {
    let availableStopsArrInner = [];
    stops?.map((stop, index) =>
      availableStopsArrInner.push({
        value: index,
        label: stop.name,
        _id: stop._id,
        name: stop.name,
        latitude: stop.latitude,
        longitude: stop.longitude,
      })
    );
    setOriginIndex(0);
    setDestinationIndex(1);
    return availableStopsArrInner;
  }, [stops]);

  useEffect(() => {
    const calculateRoute = async () => {
      if (
        !stops ||
        stops?.length < 2 ||
        !availableStopsArr ||
        availableStopsArr?.length < 2
      ) {
        return;
      }
      const origin = {
        lat: availableStopsArr[originIndex]?.latitude,
        lng: availableStopsArr[originIndex]?.longitude,
      };
      const destination = {
        lat: availableStopsArr[destinationIndex]?.latitude,
        lng: availableStopsArr[destinationIndex]?.longitude,
      };
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      try {
        const results = await directionsService.route({
          origin,
          destination,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
      } catch (error) {
        window.alert(error.message);
      }
    };
    calculateRoute();
  }, [originIndex, destinationIndex, stops, availableStopsArr]);

  //   const routeList = useSelector((state) => state.routeList);
  //   const { loading, error, routes } = routeList;

  return (
    <>
      <Link to="/routes" className="btn btn-light my-3" onClick={clearRoute}>
        Go Back
      </Link>
      <h3>Route With Dropdowns</h3>
      <>
        {errorStops && <Message variant="danger">{errorStops}</Message>}
        {loadingStops ? (
          <Loader />
        ) : (
          <>
            <div className="float-container">
              <div className="float-child">
                <FormLabel>Origin</FormLabel>
                <Select
                  options={availableStopsArr}
                  defaultValue={availableStopsArr[0]}
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={loadingStops}
                  isClearable={false}
                  isSearchable={true}
                  onChange={(e) => setOriginIndex(e.value)}
                ></Select>
              </div>
              <div className="float-child">
                <FormLabel>Destination</FormLabel>
                <Select
                  options={availableStopsArr}
                  defaultValue={availableStopsArr[1]}
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={loadingStops}
                  isClearable={false}
                  isSearchable={true}
                  onChange={(e) => setDestinationIndex(e.value)}
                ></Select>
              </div>
            </div>
            {!isLoaded ? (
              <Loader />
            ) : (
              <div className="map">
                <GoogleMap
                  center={{
                    lat: originIndex
                      ? availableStopsArr[originIndex].latitude
                      : availableStopsArr[0].latitude,
                    lng: originIndex
                      ? availableStopsArr[originIndex].longitude
                      : availableStopsArr[0].longitude,
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
                    stops.map((stop) => (
                      <Marker
                        position={{ lat: stop.latitude, lng: stop.longitude }}
                      />
                    ))
                  )}
                </GoogleMap>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};

export default RouteMapScreenWithDropdown;
