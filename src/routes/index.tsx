import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import ReceiverLayout from "@/components/layout/ReceiverLayout";
import SenderLayout from "@/components/layout/SenderLayout";
import { ParcelStatistics } from "@/components/modules/Parcel/ParcelStatistics";
import About from "@/pages/About";
import AddParcel from "@/pages/AddParcel";
import ParcelPage from "@/pages/admin/parcel/ParcelPage";
import UsersPage from "@/pages/admin/user/UsersPage";
import ContactPage from "@/pages/ContactPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import DeliveryHistoryPage from "@/pages/receiver/DeliveryHistoryPage";
import ReceiverParcelPage from "@/pages/receiver/ReceiverParcelPage";
import RegisterPage from "@/pages/RegisterPage";
import CreateParcel from "@/pages/Sender/CreateParcel";
import SenderDashboardHome from "@/pages/Sender/SenderDashboardHome";
import ServicesPage from "@/pages/Service";
import TrackParcelPage from "@/pages/TrackParcelPage";
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
                Component: withAuth(AddParcel),
                path: "add-parcel",
            },
            {
                Component: TrackParcelPage,
                path: "trackParcel",
            },
            {
                Component: ContactPage,
                path: "contact",
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
                index: true,
                Component: SenderDashboardHome,
            },
            {
                path: "shipments",
                Component: SenderDashboardHome,
            },
        ],
    },
    {
        Component: ReceiverLayout,
        path: "/receiver",
        children: [
            {
                path: "parcel/history",
                Component: DeliveryHistoryPage,
            },
            {
                index: true,
                Component: ReceiverParcelPage,
            },
            {
                path: "tracking",
                Component: TrackParcelPage,
            },
        ],
    },
    {
        Component: AdminLayout,
        path: "/admin",
        children: [
            {
                index: true,
                Component: ParcelStatistics,
            },
            {
                path: "users",
                Component: UsersPage,
            },
            {
                path: "parcels",
                Component: ParcelPage,
            },
            {
                index: true,
                path: "dashboard",
                Component: ParcelStatistics,
            },
        ],
    },
]);
