/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IsLogged } from '../Auth/LoginAuth';
import MiniDrawer from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';
import User from '../Pages/userpage/User';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} exact path="/login" />
        <Route element={<MiniDrawer />} exact path="/admin" />
        <Route element={<IsLogged />}>
          <Route element={<User />} exact path="/user" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
