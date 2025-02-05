"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/context/useContext"; // Import UserContext
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react"; // Import useState to manage loading state
import { Loader2 } from "lucide-react"; // Import the loader icon from Lucide React

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const [successMessage,setSuccessMessage]=useState("")
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const { setUser } = useUser(); // Access the setUser function to store user data

  async function onSubmit(values) {
    const { email, password } = values;

    setLoading(true); // Start loading when the form is submitted
    setError(null); // Reset error message

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials:"include"
      });
      const data = await response.json();
      if (!response.ok) {
       return setError(data.message); // Set error if login fails
      }
      setSuccessMessage(data.message);
      setUser(data.user); // Store user data in context
      router.replace("/"); // Redirect to home
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        disabled={loading} // Disable input when loading
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
                        disabled={loading} // Disable input when loading
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
                {loading && (
                  <Loader2 className="ml-2 animate-spin h-5 w-5 text-primary" />
                )}
              </div>
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
               {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
            </form>
          </Form>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
