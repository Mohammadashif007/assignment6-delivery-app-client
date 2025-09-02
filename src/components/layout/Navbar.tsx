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
import Logo from "@/assets/logo/Logo";
import { ModeToggle } from "./mode.toggle";
import {
    useLogoutMutation,
    useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/baseApi";

// Navigation links array
const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch user info
    const { data, isLoading, isSuccess, refetch } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();

    
    const user = isSuccess ? data?.data.email : null;

    // Logout handler
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(baseApi.util.resetApiState()); // clears cache
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };

    return (
        <header className="border-b">
            <div className="container mx-auto flex justify-between h-16 items-center gap-4 px-6">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
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
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
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
                    {/* Main nav */}
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-6">
                        {/* Desktop navigation menu */}
                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink
                                            asChild
                                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                        >
                                            <Link to={link.to}>
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    
                    {isLoading ? (
                        
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
                    ) : user ? (
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            size="sm"
                            className="text-white bg-black border border-black transition-colors duration-300 ease-in-out
                hover:bg-white hover:text-black
                dark:text-black dark:bg-white dark:border-white dark:hover:bg-black dark:hover:text-white"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-white bg-black border border-black transition-colors duration-300 ease-in-out
                hover:bg-white hover:text-black
                dark:text-black dark:bg-white dark:border-white dark:hover:bg-black dark:hover:text-white"
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                    )}

                    {/* Dark mode toggle */}
                    <div className="relative z-50">

                    <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
