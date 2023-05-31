import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IsLogged, LoggedIn } from '../Auth/LoginAuth';
import Layout from '../Pages/Layout/user/Layout';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile/Profile';
import PostDetails from '../Components/post/PostDetails';
import Conversation from '../Pages/Chat/Converstaion';
import Message from '../Pages/Chat/Chat';
import Login from '../Pages/Login/user/Login';
import Signup from '../Pages/Signup/Signup';
import Resetpass from '../Pages/ResetPassword/Resetpass';
import VerifyEmail from '../Pages/verifyMail/verifyEmail';
import Error from '../Pages/error/Error';
import AdminLogin from '../Pages/Login/admin/Adminlogin';
import SidebarAdmin from '../Pages/Layout/admin/AdminLayout';
import UserTables from '../Pages/adminUsers/userTable';
import Dashboard from '../Pages/adminDashboard/Dashboard';
import ReportPost from '../Pages/adminReport/ReportPost';
import AdminPost from '../Pages/adminPost/AdminPost';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route element={<Layout />}>
            <Route element={<Home />} exact path="/" />
            <Route element={<Profile />} exact path="/profile/:username" />
            <Route element={<PostDetails />} exact path="/post/:id" />
            <Route element={<Conversation />} exact path="/chat" />
            <Route element={<Message />} exact path="/chat/:id" />
          </Route>
        </Route>
        <Route element={<LoggedIn />}>
          <Route element={<Resetpass />} path="/resetpassword/:id/:token" />
          <Route element={<VerifyEmail />} path="/verifyemail/:id/:token" />
          <Route element={<Signup />} exact path="/signup" />
          <Route element={<Login />} exact path="/login" />
        </Route>
        <Route element={<AdminLogin />} path="/admin" />
        <Route element={<SidebarAdmin />}>
          <Route element={<UserTables />} path="/admin/user" />
          <Route element={<Dashboard />} path="/admin/dashboard" />
          <Route element={<ReportPost />} path="/admin/post" />
          <Route element={<AdminPost />} path="/admin/post/:id" />
        </Route>
        <Route path="*" exact element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
