
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/90 transition-colors">
      <BarChart3 className="h-7 w-7" />
      <span>Info Central</span>
    </Link>
  );
}
