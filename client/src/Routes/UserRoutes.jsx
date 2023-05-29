import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import LoadingPost from '../Components/post/Skeleton';

function UserRoutes() {
  return (
    <Routes>
      <Route element={<IsLogged />}>
        <Route element={<Layout />}>
          <Route element={<Home />} exact path="/" />
          <Route element={<Profile />} exact path="/profile/:username" />
          <Route element={<PostDetails />} exact path="/post/:id" />
          <Route element={<Conversation />} exact path="/chat" />
          <Route element={<Message />} exact path="/chat/:id" />
          <Route element={<LoadingPost />} exact path="/cd" />
        </Route>
      </Route>
      <Route element={<LoggedIn />}>
        <Route element={<Resetpass />} path="/resetpassword/:id/:token" />
        <Route element={<VerifyEmail />} path="/verifyemail/:id/:token" />
        <Route element={<Signup />} exact path="/signup" />
        <Route element={<Login />} exact path="/login" />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
