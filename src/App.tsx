import { Provider } from "react-redux";
import { GlobalStyle } from "./styles/global";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Layouts } from "./layouts";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layouts />
        </BrowserRouter>

        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
}
