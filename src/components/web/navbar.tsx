"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "../ui/button";
import { ForesightLink } from "./ForeSightLink";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center justify-center gap-8">
        <ForesightLink href={"/"}>
          <h1 className="text-3xl font-bold">
            Next
            <span className="text-primary">Pro</span>
          </h1>
        </ForesightLink>
        <div className="flex items-center gap-2">
          <ForesightLink
            href={"/home"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Home
          </ForesightLink>
          <ForesightLink
            href={"/blog"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Blog
          </ForesightLink>
          <ForesightLink
            href={"/create"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Create
          </ForesightLink>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged Out Successfully");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <ForesightLink
              href={"/auth/sign-up"}
              className={buttonVariants({ variant: "default" })}
            >
              Sign up
            </ForesightLink>
            <ForesightLink
              href={"/auth/login"}
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </ForesightLink>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
