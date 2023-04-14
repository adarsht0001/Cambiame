import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Resetpass from '../Pages/ResetPassword/Resetpass';
import VerifyEmail from '../Pages/verifyMail/verifyEmail';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import Layout from '../Pages/Layout/Layout';
import LongMenu from '../Components/Home/main/postactions';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Layout />}>
            <Route element={<Home />} exact path="/" />
            <Route element={<Profile />} exact path="/profile" />
          </Route>
        </Route>
        <Route element={<LongMenu />} path="/tesing" />
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
