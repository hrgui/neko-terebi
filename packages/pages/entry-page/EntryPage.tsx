import { useFocusable } from "@hrgui/react-spatial-navigation";
import { useLoaderData } from "@tanstack/react-router";

const EntryPage = () => {
  const loaderData = useLoaderData({ from: "/welcome" });
  const { ref } = useFocusable();

  return <div ref={ref}>{JSON.stringify(loaderData)}</div>;
};

export default EntryPage;
