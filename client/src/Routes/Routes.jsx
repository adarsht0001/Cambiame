import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Home from '../Pages/Home/Home';
import Resetpass from '../Pages/ResetPassword/Resetpass';
import VerifyEmail from '../Pages/verifyMail/verifyEmail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Home />} exact path="/" />
        </Route>
        <Route element={<LoggedIn />}>
          <Route element={<Resetpass />} path="/resetpassword/:id/:token" />
          <Route element={<VerifyEmail />} path="/verifyemail/:id/:token" />
          <Route element={<Signup />} exact path="/signup" />
          <Route element={<Login />} exact path="/login" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
