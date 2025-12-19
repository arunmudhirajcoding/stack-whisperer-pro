import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 blur-lg transition-opacity group-hover:opacity-50" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Stack<span className="text-gradient-primary">Path</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              size="sm"
            >
              Home
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="hero" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
