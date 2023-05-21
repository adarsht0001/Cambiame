import {
  Navigate, Outlet, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

let path;
function IsLogged() {
  const location = useLocation();
  path = location.pathname;
  const user = useSelector((state) => state.user);
  return (
    user.loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
}
function LoggedIn() {
  const user = useSelector((state) => state.user);
  return (
    user.loggedIn ? <Navigate to={path || '/'} /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
