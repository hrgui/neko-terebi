import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

type Props = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {children}
    </QueryClientProvider>
  );
}
