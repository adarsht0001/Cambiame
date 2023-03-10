// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate, Outlet } from 'react-router-dom';

function IsLogged() {
  const user = localStorage.getItem('user');
  return (
    user ? <Navigate to="/login" /> : <Outlet />
  );
}
function loggedIn() {
  const heelo = false;
  return (
    heelo.name ? <Navigate to="/login" /> : <Outlet />
  );
}

export { IsLogged, loggedIn };
