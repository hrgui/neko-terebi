import { AppProvider } from "@hrgui/neko-terebi-react-component-app-provider";
import type { Props } from "@hrgui/neko-terebi-react-component-app-provider";

function App({ router }: { router: Props["router"] }) {
  return <AppProvider router={router} />;
}

export default App;
