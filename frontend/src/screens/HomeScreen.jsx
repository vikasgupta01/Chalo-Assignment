import React from "react";
import { Button } from "react-bootstrap";

const HomeScreen = () => {
  const buttonClick = () => {
    console.log("Chal Rhe...");
  };
  return (
    <div>
      <h1>Challo</h1>
      <Button onClick={buttonClick}>Chale?</Button>
    </div>
  );
};

export default HomeScreen;
