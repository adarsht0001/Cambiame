/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} exact path="/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
