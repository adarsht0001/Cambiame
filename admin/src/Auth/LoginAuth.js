/* eslint-disable import/no-extraneous-dependencies */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = useSelector((state) => state.user);
  return (
    user.email ? <Outlet /> : <Navigate to="/login" />
  );
}
function LoggedIn() {
  const user = useSelector((state) => state.user);
  return (
    user.email ? <Navigate to="/admin" /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
