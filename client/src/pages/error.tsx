import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { AlertCircle } from "lucide-react";

export default function Error() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-1" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
              <p className="text-muted-foreground">
                An error occurred while loading this page. Please try navigating back or returning to home.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setLocation("/")}
              className="w-full"
              data-testid="button-home"
            >
              Go to Home
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
              data-testid="button-back"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
