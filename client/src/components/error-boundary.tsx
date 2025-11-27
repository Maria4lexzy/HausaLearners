import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                <p className="text-muted-foreground">
                  An error occurred while rendering this page. Please try again.
                </p>
              </div>

              {this.state.error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                  <p className="text-sm font-mono text-destructive break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = "/"}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                  data-testid="button-home"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-4 py-2 border border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 rounded-md transition-colors font-medium"
                  data-testid="button-back"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
