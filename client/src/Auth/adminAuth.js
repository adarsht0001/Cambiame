import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminIsLogged() {
  const admin = useSelector((state) => state.admin);
  return (
    admin.adminLogged ? <Outlet /> : <Navigate to="/admin" />
  );
}

function AdminLoggedOut() {
  const admin = useSelector((state) => state.admin);
  return (
    admin.adminLogged ? <Navigate to="/admin/dashboard" /> : <Outlet />
  );
}
export { AdminIsLogged, AdminLoggedOut };
