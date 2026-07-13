import { Outlet } from "react-router";

import CommonLayout from "./components/layout/CommonLayout";

const App = () => {
  return (
    <CommonLayout>
      <h1 className="text-2xl font-bold text-center mt-10">
        Tour Management System
      </h1>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
