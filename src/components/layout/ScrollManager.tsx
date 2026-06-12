"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable automatic browser scroll restoration
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Immediately scroll to the top of the window
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);

      // Fallback scroll jump to override any smooth-scroll behaviors during routing
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
