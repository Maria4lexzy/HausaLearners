import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/lib/user-context";
import { ErrorBoundary } from "@/components/error-boundary";
import Home from "@/pages/home";
import Learn from "@/pages/learn";
import Vocabulary from "@/pages/vocabulary";
import Leaderboard from "@/pages/leaderboard";
import Contribute from "@/pages/contribute";
import Admin from "@/pages/admin";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Error from "@/pages/error";
import NotFound from "@/pages/not-found";
import { useCurrentUser } from "@/lib/user-context";
import { Redirect } from "wouter";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  return <Component />;
}

function AuthRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/auth/login">
        <AuthRoute component={Login} />
      </Route>
      <Route path="/auth/register">
        <AuthRoute component={Register} />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
      <Route path="/">
        <ErrorBoundary>
          <ProtectedRoute component={Home} />
        </ErrorBoundary>
      </Route>
      <Route path="/learn">
        <ErrorBoundary>
          <ProtectedRoute component={Learn} />
        </ErrorBoundary>
      </Route>
      <Route path="/vocabulary">
        <ErrorBoundary>
          <ProtectedRoute component={Vocabulary} />
        </ErrorBoundary>
      </Route>
      <Route path="/leaderboard">
        <ErrorBoundary>
          <ProtectedRoute component={Leaderboard} />
        </ErrorBoundary>
      </Route>
      <Route path="/contribute">
        <ErrorBoundary>
          <ProtectedRoute component={Contribute} />
        </ErrorBoundary>
      </Route>
      <Route path="/admin">
        <ErrorBoundary>
          <ProtectedRoute component={Admin} />
        </ErrorBoundary>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { user, isLoading } = useCurrentUser();
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Router />
        <Toaster />
      </div>
    );
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Router />
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <UserProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
