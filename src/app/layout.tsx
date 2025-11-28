"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="max-w-5xl mx-auto py-8 px-4 flex-1 w-full">{children}</div>
          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white mt-12">
            <div className="max-w-5xl mx-auto px-4 py-8 text-center">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Finance Tracker. Gestiona tus finanzas con facilidad.</p>
            </div>
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}
