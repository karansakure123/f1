
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/dashboard"); // Added redirect query param
    }
  }, [user, loading, router]);

  if (loading || (!user && typeof window !== 'undefined')) { // keep showing loader until redirect is effective
    return (
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center"> {/* Adjusted height */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If user is available, render children
  if(user) {
    return <>{children}</>;
  }

  // Fallback for server-side rendering or if redirect hasn't happened yet
  return null; 
}
