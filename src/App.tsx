import { Provider } from "react-redux";
import { GlobalStyle } from "./styles/global";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Layouts } from "./layouts";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layouts />
      </BrowserRouter>

      <GlobalStyle />
    </Provider>
  );
}
