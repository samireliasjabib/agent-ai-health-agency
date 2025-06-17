import { Link } from "@remix-run/react";
import { Building2 } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/remix";
import { ModeToggle } from "~/components/mode-toggle";

interface SharedHeaderProps {
  showUserControls?: boolean;
}

export function SharedHeader({ showUserControls = true }: SharedHeaderProps) {
  return (
    <header className="border-b fixed w-full border-border/40 backdrop-blur-sm bg-background/80 top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">ArcticGrey</h1>
              <p className="text-xs text-muted-foreground">AI Intelligence Platform</p>
            </div>
          </Link>
          
          {showUserControls && (
            <div className="flex items-center gap-4">
              <ModeToggle />
              <SignedIn>
                <UserButton afterSwitchSessionUrl="/" />
              </SignedIn>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 