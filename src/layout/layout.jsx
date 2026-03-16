import { Outlet } from "react-router-dom";
import Nav from './Nav/Nav'
import Banner from './Banner/Banner'
import './layout.scss'
export default function Layout() {
  return (
    <div className="layout">
      <Nav />
      <div className="content">
        <Banner />
        <Outlet />
      </div>
    </div>
  );
}