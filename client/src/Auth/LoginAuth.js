import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = useSelector((state) => state.user);
  console.log(user);
  // const user = localStorage.getItem('user');
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
