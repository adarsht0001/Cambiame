import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Home from '../Pages/Home/Home';
import ServerModal from '../Components/test';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Home />} exact path="/" />
        </Route>
        <Route element={<LoggedIn />}>
          <Route element={<Signup />} exact path="/signup" />
          <Route element={<Login />} exact path="/login" />
          <Route element={<ServerModal />} exact path="/test" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
