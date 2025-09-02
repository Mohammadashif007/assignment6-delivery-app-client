import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import Analytics from "@/pages/Analytics";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/RegisterPage";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                index: true,
                Component: Home,
                path: "/home"
            },
        ],
    },
    {
        Component: AdminLayout,
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
]);
