import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "./navItems";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const title = navItems.find((i) => i.to === pathname)?.label ?? "Not found";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background px-4 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
