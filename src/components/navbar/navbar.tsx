"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, BarChart3, Send, Plus, Tags } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const navItems = [
    { href: "/", label: "Inicio", icon: Wallet },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/transactions", label: "Transacciones", icon: Send },
    { href: "/transactions/new", label: "Nueva", icon: Plus },
    { href: "/categories", label: "Categorías", icon: Tags },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span>Finance</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive(href) ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"}`}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
