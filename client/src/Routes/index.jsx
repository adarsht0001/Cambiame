import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import Error from '../Pages/eroor/Error';

function Router() {
  return (
    <BrowserRouter>
      <UserRoutes />
      <AdminRoutes />
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
