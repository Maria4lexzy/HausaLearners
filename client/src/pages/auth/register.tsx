import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/lib/user-context";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, UserPlus, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { refetchUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      await refetchUser();

      toast({
        title: "Account created!",
        description: "Welcome to LingoQuest. Let's start learning!",
      });

      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Username or email already exists",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Join LingoQuest and start your language learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Replit Auth - OAuth registration with Google, GitHub, Apple, X */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = "/api/login"}
                data-testid="button-replit-register"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Continue with Replit
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Sign up with Google, GitHub, Apple, X, or email
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or create account with password
                </span>
              </div>
            </div>

            {/* Traditional password registration */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Choose a username"
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        data-testid="input-email"
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
                        {...field}
                        type="password"
                        placeholder="Create a password"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        data-testid="input-confirm-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-register"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create account
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setLocation("/auth/login")}
                  data-testid="link-login"
                >
                  Sign in
                </button>
              </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
