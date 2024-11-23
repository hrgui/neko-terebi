//import { useRouteError } from "@tanstack/react-router";

import { useFocusable } from "@hrgui/react-spatial-navigation";
import { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";

export default function ErrorPage(props: ErrorComponentProps) {
  const { focusSelf, ref } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <pre>{JSON.stringify(props)}</pre>
      <button ref={ref}>OK</button>
    </div>
  );
}
