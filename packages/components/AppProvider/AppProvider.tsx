import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../queries/QueryClient/queryClient";

export type Props = {
  children?: React.ReactNode;
  routerProvider: any;
};

export function AppProvider({ children, routerProvider }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {routerProvider}
      {children}
    </QueryClientProvider>
  );
}
