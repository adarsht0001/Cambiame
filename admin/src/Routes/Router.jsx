/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Dashboard />} path="/admin" />
          <Route element={<Dashboard />} exact path="/user" />
        </Route>
        <Route element={<LoggedIn />}>
          <Route element={<Login />} exact path="/login" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
