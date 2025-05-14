"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/slices/user";
import { getUserInformation } from "@/lib/queries/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).min(1, {
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

const LoginForm = () => {
  // For redirecting to another page after login
  const router = useRouter();

  // For sending login request to the server
  const { login } = useAuth();

  // Redux state
  const dispatch = useAppDispatch();

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login.mutateAsync({
        email: data.email,
        password: data.password,
      });

      // Retrieve and save user data in redux
      const userInfo = await getUserInformation({ email: data.email });

      dispatch(
        setUser({
          id: userInfo.data.id,
          email: userInfo.data.email,
          is_staff: userInfo.data.is_staff,
          is_superuser: userInfo.data.is_superuser,
          companies: userInfo.data.companies,
        })
      );

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log into your account with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                      placeholder="Enter the email"
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
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="bg-slate-100 dark:bg-slate-500 border-0 
                    focus-visible:ring-0 text-black dark:text-white 
                    focus-visible:ring-offset-0"
                        placeholder="Enter the password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {login.error && (
              <p className="text-red-500 text-sm">
                {(login.error as any)?.email?.[0] ||
                  (login.error as any)?.password?.[0] ||
                  (login.error as any)?.non_field_errors?.[0] ||
                  "Login failed."}
              </p>
            )}
            <Button className="w-full">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
