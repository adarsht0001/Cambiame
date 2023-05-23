import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

function Router() {
  return (
    <BrowserRouter>
      <UserRoutes />
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default Router;
