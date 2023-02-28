import React, { useState, useEffect } from "react";
import DogList from "../DogList/DogList.jsx";
import "./HomePage.css";

const HomePage = () => {


  return (
    <div className="HomePage">
      <h2>All the dogs</h2>
      <DogList />
    </div>
  );
}

export default HomePage;