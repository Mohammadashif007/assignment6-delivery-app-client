import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/RegisterPage";
import ServicesPage from "@/pages/Service";
import Unauthorized from "@/pages/Unauthorized";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                Component: Home,
                path: "home",
            },
            {
                Component: withAuth(About),
                path: "about",
            },
            {
                Component: ServicesPage,
                path: "service",
            },
        ],
    },
    {
        Component: withAuth(AdminLayout, role.admin as TRole),
        path: "/admin",
        children: [
            {
                Component: Analytics,
                path: "analytics",
            },
        ],
    },
    {
        Component: Login,
        path: "/login",
    },
    {
        Component: RegisterPage,
        path: "/register",
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    }
]);
