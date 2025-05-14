"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggler from "@/components/ThemeToggler";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearUser } from "@/redux/slices/user";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout.mutateAsync();

      // Clear user state in Redux store
      dispatch(clearUser());

      router.push("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex sticky top-0 z-10 w-full h-[--header-height] bg-primary dark:bg-slate-700 py-4 px-5 justify-between text-white">
      <Link href="/">
        <Image src={logo} alt="Sentigraph" width={40} className="rounded-xl" />
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Profile Image"
              />
              <AvatarFallback className="text-black">P</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Conditionally render menu depending on login status */}
            {user.email ? (
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            ) : (
              // <DropdownMenuItem>
              //   <Link href="/profile">Profile</Link>
              // </DropdownMenuItem>

              <>
                <DropdownMenuItem>
                  <Link href="/auth">Login/Register</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
