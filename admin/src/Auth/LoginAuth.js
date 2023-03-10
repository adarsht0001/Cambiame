/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate, Outlet } from 'react-router-dom';

function IsLogged() {
  const user = localStorage.getItem('admin');
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  );
}
function LoggedIn() {
  const user = localStorage.getItem('user');
  return (
    user ? <Navigate to="/" /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
