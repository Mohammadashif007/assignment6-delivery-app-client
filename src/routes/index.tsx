import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import ReceiverLayout from "@/components/layout/ReceiverLayout";
import SenderDashboardPage from "@/components/layout/sender/SenderDashboardPage";
import SenderLayout from "@/components/layout/SenderLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import AddParcel from "@/pages/AddParcel";
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
            {
                Component: AddParcel,
                path: "add-parcel",
            },
        ],
    },
    // {
    //     Component: withAuth(AdminLayout, role.admin as TRole),
    //     path: "/admin",
    //     children: [
    //         {
    //             index: true,
    //             Component: Analytics,
    //             path: "analytics",
    //         },
    //     ],
    // },
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
        path: "/unauthorized",
    },
    {
        Component: SenderLayout,
        path: "/sender",
    },
    {
        Component: ReceiverLayout,
        path: "/receiver",
    },
    {
        Component: AdminLayout,
        path: "/admin"
    }
]);
