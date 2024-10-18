import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { createHashRouter, RouterProvider } from "react-router-dom";

export type Props = {
  children?: React.ReactNode;
  router: ReturnType<typeof createHashRouter>;
};

export function AppProvider({ children, router }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {children}
    </QueryClientProvider>
  );
}
