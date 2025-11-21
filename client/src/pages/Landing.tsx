import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Calendar, Clock, ShieldCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Apple className="h-6 w-6 text-primary" data-testid="icon-logo" />
            <h1 className="text-xl font-bold" data-testid="text-app-title">FreshGuard</h1>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/auth/google">Log In</a>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-hero-title">
            Track Your Food, Reduce Waste
          </h2>
          <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
            Never let food go to waste again. FreshGuard helps you monitor expiration dates and keep your kitchen organized.
          </p>
          <Button size="lg" asChild data-testid="button-get-started">
            <a href="/api/auth/google">Get Started with Google</a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card data-testid="card-feature-1">
            <CardHeader>
              <Calendar className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Smart Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically calculate expiration dates based on food category with color-coded alerts
              </CardDescription>
            </CardContent>
          </Card>

          <Card data-testid="card-feature-2">
            <CardHeader>
              <Clock className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Expiration Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visual indicators show when food is fresh, expiring soon, or urgent with clear time remaining
              </CardDescription>
            </CardContent>
          </Card>

          <Card data-testid="card-feature-3">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Barcode Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quickly add items by scanning barcodes and automatically fetch product information
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer">© 2025 FreshGuard. Reduce food waste, one item at a time.</p>
        </div>
      </footer>
    </div>
  );
}
