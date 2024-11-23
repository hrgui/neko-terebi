import { AppProvider } from "@hrgui/neko-terebi-react-component-app-provider";
import type { Props } from "@hrgui/neko-terebi-react-component-app-provider";

function App({ routerProvider }: { routerProvider: Props["routerProvider"] }) {
  return <AppProvider routerProvider={routerProvider} />;
}

export default App;
