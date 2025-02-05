"use client";
import { Loader, LogOut, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/useContext";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {user} = useUser(); // This should be replaced with your actual user context

  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      if (response.ok) {
        router.replace("/auth/login");
        toast.success("Logged out successfully");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <div className="md:hidden">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ET
            </h1>
          </div>
        </div>

        {/* User Profile and Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-medium">
              {user.username}
            </span>
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onLogout}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ):(
              <LogOut className="h-4 w-4" />

            )}
                <span className="hidden sm:inline">Logout</span>
            
          </Button>
        </div>
      </div>
    </header>
  );
}