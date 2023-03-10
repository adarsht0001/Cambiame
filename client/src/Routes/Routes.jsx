/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buttons from '../Components/button/Button';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import { IsLogged } from '../Auth/LoginAuth';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Buttons />} exact path="/" />
        </Route>
        <Route element={<Signup />} exact path="/signup" />
        <Route element={<Login />} exact path="/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
