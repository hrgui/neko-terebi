import { AppProvider } from "./AppProvider";
import type { Props } from "./AppProvider";

function App({ router }: { router: Props["router"] }) {
  return <AppProvider router={router} />;
}

export default App;
