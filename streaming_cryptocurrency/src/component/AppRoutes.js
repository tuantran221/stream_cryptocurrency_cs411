import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Chart from "../component/Chart"
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Coins/detail/:id" element={<Chart />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
