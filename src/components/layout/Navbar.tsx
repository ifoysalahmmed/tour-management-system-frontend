import { Fragment } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import Hamburger from "@/assets/icons/Hamburger";
import Logo from "@/assets/icons/Logo";
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
import { role } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

import { ModeToggle } from "./ModeToggler";

const navigationLinks = [
  { href: "/", label: "Home", role: ["PUBLIC"] },
  { href: "/about", label: "About", role: ["PUBLIC"] },
  { href: "/admin", label: "Dashboard", role: [role.admin, role.superAdmin] },
  { href: "/user", label: "Dashboard", role: [role.user] },
];

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useUserInfoQuery();
  const user = data?.data;

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const result = await logout(undefined).unwrap();

      dispatch(authApi.util.resetApiState());

      toast.success(result?.message || "Logged out successfully");
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="border-b md:px-8">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="group size-8 md:hidden"
              >
                <Hamburger />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-40 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild className="w-full py-2">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => (
                  <Fragment key={link.href}>
                    {link.role.includes("PUBLIC") && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {!!user?.role && link.role.includes(user.role) && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {!isLoading &&
            (user ? (
              <Button
                className="text-sm"
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <Button
                className="text-sm"
                render={() => <Link to="/login">Login</Link>}
              />
            ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
