import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
// import Error from '../Pages/error/Error';

function Router() {
  return (
    <BrowserRouter>
      <UserRoutes />
      <AdminRoutes />
      {/* <Routes>
        <Route path="*" exact element={<Error />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default Router;
