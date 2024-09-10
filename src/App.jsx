import logo from './logo.svg';
import './App.css';

import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

const Register = lazy(() => import("./auth/Register"));
const Login = lazy(() => import("./auth/Login"));

function App() {
  return (
    <>
    <Suspense>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
    </>
  );
}

export default App;
