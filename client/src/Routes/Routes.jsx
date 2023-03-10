import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} exact path="/login" />
        <Route element={<Signup />} exact path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
