//import { useRouteError } from "@tanstack/react-router";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const error = useRouteError() as any;
  // console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
