import { useFocusable } from "@hrgui/react-spatial-navigation";
import { useLoaderData } from "@tanstack/react-router";
import { useEffect } from "react";

const EntryPage = () => {
  const loaderData = useLoaderData({ from: "/welcome" });
  const { ref, focusSelf } = useFocusable();

  useEffect(() => {
    throw new Error("wat");
  }, [focusSelf]);

  return <div ref={ref}>{JSON.stringify(loaderData)}</div>;
};

export default EntryPage;
