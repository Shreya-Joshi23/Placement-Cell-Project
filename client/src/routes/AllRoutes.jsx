import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

const AllRoutes = () => {
  return <Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/register" element={<SignUpPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
  </Routes>;
};

export default AllRoutes;
