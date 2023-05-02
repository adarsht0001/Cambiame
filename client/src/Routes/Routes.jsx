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
import Search from '../Pages/Search/Search';
import Viewprofile from '../Pages/viewprofile/Viewprofile';
import AdminLogin from '../Pages/Login/admin/Adminlogin';
import SidebarAdmin from '../Pages/Layout/admin/AdminLayout';
import UserTables from '../Pages/adminUsers/userTable';
import Dashboard from '../Pages/adminDashboard/Dashboard';
import ReportPost from '../Pages/adminReport/ReportPost';
import AdminPost from '../Pages/adminPost/AdminPost';
import LoadingLazy from '../Components/LoadingLazy';
import UserGraph from '../Pages/chart';
// import UserGraph from '../Pages/adminDashboard/Charts';
// import LineChart from '../Pages/chart';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLogin />} path="/admin" />
        <Route element={<SidebarAdmin />}>
          <Route element={<UserTables />} path="/admin/user" />
          <Route element={<Dashboard />} path="/admin/dashboard" />
          <Route element={<ReportPost />} path="/admin/post" />
          <Route element={<Viewprofile />} exact path="/:username" />
          <Route element={<AdminPost />} path="/admin/post/:id" />
        </Route>
        {/* <Route element={<LineChart />} path="/admin/chart" /> */}
        <Route element={<UserGraph />} path="/admin/chart" />
        <Route element={<IsLogged />}>
          <Route element={<Layout />}>
            <Route element={<Home />} exact path="/" />
            <Route element={<Viewprofile />} exact path="/:username" />
            <Route element={<Profile />} exact path="/profile" />
            <Route element={<Search />} exact path="/search" />
          </Route>
        </Route>

        <Route element={<LoggedIn />}>
          <Route element={<Resetpass />} path="/resetpassword/:id/:token" />
          <Route element={<VerifyEmail />} path="/verifyemail/:id/:token" />
          <Route element={<Signup />} exact path="/signup" />
          <Route element={<Login />} exact path="/login" />
        </Route>
        <Route element={<LoadingLazy />} path="/testing" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
