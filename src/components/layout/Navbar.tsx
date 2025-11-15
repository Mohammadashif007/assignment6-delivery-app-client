import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "./mode.toggle";
import {
    useLogoutMutation,
    useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/baseApi";
import MainLogo from "../MainLogo/MainLogo";

const navigationLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/service", label: "Service" },
    { to: "/add-parcel", label: "Add Parcel" },
    { to: "/contact", label: "Contract" },
    { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isSuccess } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();

    const user = isSuccess ? data?.data.email : null;
    const role = isSuccess ? data?.data.role : null;

    // Dashboard path based on role
    const dashboardPath =
        role === "ADMIN"
            ? "/admin"
            : role === "SENDER"
            ? "/sender"
            : role === "RECEIVER"
            ? "/receiver"
            : null;

    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
            dispatch(baseApi.util.resetApiState());
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };

    return (
        <header className="border-b">
            <div className="container mx-auto flex justify-between h-16 items-center gap-4 px-6">
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4 5h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 19h16" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-36 p-1 md:hidden"
                        >
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                            className="w-full"
                                        >
                                            <NavigationMenuLink className="py-1.5">
                                                <Link to={link.to}>
                                                    {link.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>

                    <Link to="/">
                        <MainLogo />
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <NavigationMenu className="max-md:hidden">
                        <NavigationMenuList className="gap-2">
                            {navigationLinks.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                    >
                                        <Link to={link.to}>{link.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* DASHBOARD BUTTON */}
                    {role && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border border-black dark:border-white"
                        >
                            <Link to={dashboardPath as string}>Dashboard</Link>
                        </Button>
                    )}

                    {isLoading ? (
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
                    ) : user ? (
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            size="sm"
                            className="text-white bg-black border border-black hover:bg-white hover:text-black"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-white bg-black border border-black hover:bg-white hover:text-black"
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                    )}

                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
