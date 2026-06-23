import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import React, { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { AgeGate } from "@/components/AgeGate";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";

const HeadContentWithChildren = HeadContent as React.ComponentType<
  React.PropsWithChildren<{}>
>;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContentWithChildren>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SipHub - Premium Spirits Delivery</title>
        <link rel="stylesheet" href={appCss} />
        <link rel="icon" href="/favicon.ico" />
      </HeadContentWithChildren>
      <AgeGate />
      <CartProvider>
        <Outlet />
        <FloatingWhatsApp />
      </CartProvider>
      <Toaster />
      <Scripts />
    </>
  );
}

function NotFoundComponent() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-onyx italic">404</h1>
        <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">Page not found</p>
        <button
          onClick={() => { router.invalidate(); }}
          className="mt-6 inline-block bg-onyx text-white px-8 py-3 text-xs uppercase tracking-widest"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">We are looking into it.</p>
      </div>
    </div>
  );
}
