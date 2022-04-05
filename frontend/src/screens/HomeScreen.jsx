import React from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="float-container">
      <div className="float-child">
        <Image
          src="https://chalo.com/assets/images/mock.png"
          alt="Chalo App"
          fluid
        />
      </div>
      <div className="float-child">
        <h3>The New Way Of Bus Travel</h3>
        <h1>In Your City</h1>
        <p>
          Chalo is India’s #1 bus transport technology company. Live track your
          bus on the Chalo App and get digital bus tickets on the Chalo Card.
          Your one stop solution for a convenient and hassle-free travel
          experience.
        </p>
        <Button className="btn btn-light my-3" href="https://chalo.com/app/">
          Try Chalo
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
