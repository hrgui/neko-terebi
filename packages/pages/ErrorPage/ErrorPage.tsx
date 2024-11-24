//import { useRouteError } from "@tanstack/react-router";

import { useFocusable } from "@hrgui/react-spatial-navigation";
import { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";

export default function ErrorPage(props: ErrorComponentProps) {
  const { focusSelf, ref, focused } = useFocusable({ onEnterPress: props.reset });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <div
      id="error-page"
      className="overflow-hidden absolute w-full h-full @asvw:pl-[160px] @asvw:pt-[40px]"
    >
      <div className="text-center w-full">
        <h1 className="text-headline-l">Oops!</h1>
        <p className="text-cta">Sorry, an unexpected error has occurred.</p>
        <pre>{JSON.stringify(props)}</pre>
        <button
          className={
            focused
              ? "bg-white/100 text-black/100 text-cta rounded-full @asvw:w-[628px] @asvw:p-[16px]"
              : "bg-gray-800/100 text-white/100 text-cta rounded-full @asvw:w-[628px] @asvw:p-[16px]"
          }
          ref={ref}
          onClick={props.reset}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
