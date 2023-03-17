import { Navigate, Outlet } from 'react-router-dom';

function IsLogged() {
  const user = localStorage.getItem('user');
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
