import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { AgeGate } from "@/components/AgeGate";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-onyx italic">404</h1>
        <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">Page not found</p>
        <a href="/" className="mt-6 inline-block bg-onyx text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Something poured wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">We're decanting a fix. Please try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 bg-onyx text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-onyx transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SipHub — Premium Spirits Delivered in Nairobi" },
      { name: "description", content: "Kenya's premier online liquor store. Whiskies, wines, champagne and more — delivered to your door in under 45 minutes." },
      { name: "author", content: "SipHub" },
      { property: "og:title", content: "SipHub — Premium Spirits Delivered in Nairobi" },
      { property: "og:description", content: "Kenya's premier online liquor store. Whiskies, wines, champagne and more — delivered to your door in under 45 minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SipHub — Premium Spirits Delivered in Nairobi" },
      { name: "twitter:description", content: "Kenya's premier online liquor store. Whiskies, wines, champagne and more — delivered to your door in under 45 minutes." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7195f40b-2072-4977-b84f-cae9967bbaaa" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7195f40b-2072-4977-b84f-cae9967bbaaa" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <AgeGate />
        <Toaster />
        <FloatingWhatsApp />
      </CartProvider>
    </QueryClientProvider>
  );
}
