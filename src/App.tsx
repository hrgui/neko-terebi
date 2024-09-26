import "./App.css";
import { AppProvider } from "./AppProvider";
import Pokemon from "./Pokemon";

function App() {
  return (
    <AppProvider>
      <Pokemon id={1} />
      <Pokemon id={2} />
    </AppProvider>
  );
}

export default App;
