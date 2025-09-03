// src/pages/Login.tsx
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

import { Facebook, Twitter } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/logo/Logo";
import { Link, useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import {
    useLoginMutation,
    useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { config } from "@/config";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
    const [login, { isLoading }] = useLoginMutation();
    const { data: userInfo } = useUserInfoQuery(undefined);
    console.log(userInfo);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await login(values).unwrap();
            if (result.success) {
                toast.success(result.message);
                const role = result.data.user.role;
                if (role === "ADMIN") navigate("/admin");
                else if (role === "SENDER") navigate("/sender");
                else if (role === "RECEIVER") navigate("/receiver");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                        <Logo></Logo>
                    </div>
                    {/* Welcome Text */}
                    <CardTitle className="text-xl font-semibold">
                        Welcome Back
                    </CardTitle>
                    {/* Register Link */}
                    <p className="text-sm text-muted-foreground mt-1">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardHeader>

                <CardContent>
                    {/* Form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Logging in...
                                    </div>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Separator */}
                    <div className="flex items-center gap-2 my-6">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                            OR
                        </span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="w-full">
                            <Facebook className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button
                            onClick={() =>
                                window.open(`${config.baseUrl}/auth/google`)
                            }
                            variant="outline"
                            className="w-full"
                        >
                            <FcGoogle className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Twitter className="h-5 w-5 text-sky-500" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
