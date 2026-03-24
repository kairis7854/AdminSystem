import { createBrowserRouter } from 'react-router-dom'
import Login from "../pages/Login/Login"
import Layout from "../layout/layout"
import ProtectedRoute from "../components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    HydrateFallback: () => <div>Loading Page...</div>,
    children: [
      { index: true, element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: "dashboard",
                lazy: () => import("../pages/Dashboard/Dashboard.jsx")
              },
              {
                path: "product/mobile",
                lazy: () => import("../pages/Product/Mobile/Mobile.jsx")
              },
              {
                path: "product/computer",
                lazy: () => import("../pages/Product/Computer/Computer.jsx")
              },
            ]
          }
        ],
      },
    ],
  },
]);

export default router