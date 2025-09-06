import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import ReceiverLayout from "@/components/layout/ReceiverLayout";
import SenderLayout from "@/components/layout/SenderLayout";
import About from "@/pages/About";
import AddParcel from "@/pages/AddParcel";
import ParcelPage from "@/pages/admin/parcel/ParcelPage";
import UsersPage from "@/pages/admin/user/UsersPage";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/RegisterPage";
import CreateParcel from "@/pages/Sender/CreateParcel";
import SenderDashboardHome from "@/pages/Sender/SenderDashboardHome";
import ServicesPage from "@/pages/Service";
import Unauthorized from "@/pages/Unauthorized";
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
        children: [
            {
                path: "create-parcel",
                Component: CreateParcel,
            },
            {
                path: "dashboard",
                Component: SenderDashboardHome,
            },
        ],
    },
    {
        Component: ReceiverLayout,
        path: "/receiver",
    },
    {
        Component: AdminLayout,
        path: "/admin",
        children: [
            {
                path: "users",
                Component: UsersPage,
            },
            {
                path: "parcels",
                Component: ParcelPage,
            },
        ],
    },
]);
