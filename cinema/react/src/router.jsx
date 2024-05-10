import { Navigate, createBrowserRouter } from "react-router-dom";
// Layouts
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
// Admins
import Dashboard from "./views/admin/Dashboard";
import Movies from "./views/admin/Movies";
import Halls from "./views/admin/Halls";
import Types from "./views/admin/Types";
import Config from "./views/admin/Config";
import Prices from "./views/admin/Prices";
import Sessions from "./views/admin/Sessions";
import Users from "./views/admin/Users";
// Guests
import Index from "./views/guest/Index";
import Session from "./views/guest/Session";
import Ticket from "./views/guest/Ticket";
// Auth
import Signin from "./views/auth/Signin";
import Signup from "./views/auth/Signup";


const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/admin/movies",
                element: <Movies />,
            },
            {
                path: "/admin/halls",
                element: <Halls />,
            },
            {
                path: "/admin/types",
                element: <Types />,
            },
            {
                path: "/admin/config",
                element: <Config />,
            },
            {
                path: "/admin/prices",
                element: <Prices />,
            },
            {
                path: "/admin/sessions",
                element: <Sessions />,
            },
            {
                path: "/admin/users",
                element: <Users />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Index />,
            },
            {
                path: "/session/:id/:selectedDate",
                element: <Session />,
            },
            {
                path: "/ticket/:uuid",
                element: <Ticket />,
            },
        ],
    },

    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/signin",
                element: <Signin />,
            },
            {
                path: "/auth/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
