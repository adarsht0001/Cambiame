import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../Pages/Login/admin/Adminlogin';
import SidebarAdmin from '../Pages/Layout/admin/AdminLayout';
import UserTables from '../Pages/adminUsers/userTable';
import Dashboard from '../Pages/adminDashboard/Dashboard';
import ReportPost from '../Pages/adminReport/ReportPost';
import AdminPost from '../Pages/adminPost/AdminPost';

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLogin />} path="/admin" />
      <Route element={<SidebarAdmin />}>
        <Route element={<UserTables />} path="/admin/user" />
        <Route element={<Dashboard />} path="/admin/dashboard" />
        <Route element={<ReportPost />} path="/admin/post" />
        <Route element={<AdminPost />} path="/admin/post/:id" />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
