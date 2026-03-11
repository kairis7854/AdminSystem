import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}