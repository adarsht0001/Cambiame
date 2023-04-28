import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/user/Login';
import Signup from '../Pages/Signup/Signup';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Resetpass from '../Pages/ResetPassword/Resetpass';
import VerifyEmail from '../Pages/verifyMail/verifyEmail';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import Layout from '../Pages/Layout/user/Layout';
import SocialMediaAccordion from '../Components/Home/main/comments';
import Search from '../Pages/Search/Search';
import Viewprofile from '../Pages/viewprofile/Viewprofile';
import AdminLogin from '../Pages/Login/admin/Adminlogin';
import SidebarAdmin from '../Pages/Layout/admin/AdminLayout';
import UserTables from '../Pages/adminUsers/userTable';
import Dashboard from '../Pages/adminDashboard/Dashboard';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLogin />} path="/admin" />
        <Route element={<SidebarAdmin />}>
          <Route element={<UserTables />} path="/admin/user" />
          <Route element={<Dashboard />} path="/admin/dashboard" />
        </Route>
        <Route element={<IsLogged />}>
          <Route element={<Layout />}>
            <Route element={<Home />} exact path="/" />
            <Route element={<Viewprofile />} exact path="/:username" />
            <Route element={<Profile />} exact path="/profile" />
            <Route element={<Search />} exact path="/search" />
          </Route>
        </Route>
        <Route element={<SocialMediaAccordion />} path="/tesing" />
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
