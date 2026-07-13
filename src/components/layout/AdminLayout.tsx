import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <h1>Welcome to the AdminLayout component</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
