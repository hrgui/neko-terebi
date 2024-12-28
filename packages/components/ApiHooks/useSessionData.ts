import { useLoaderData } from "@tanstack/react-router";

export function useSessionData() {
  return useLoaderData({ from: "__root__" });
}
