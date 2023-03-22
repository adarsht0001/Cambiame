import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = useSelector((state) => state.user);
  return (
    user.loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
}
function LoggedIn() {
  const user = useSelector((state) => state.user);
  return (
    user.loggedIn ? <Navigate to="/" /> : <Outlet />
  );
}

export { IsLogged, LoggedIn };
