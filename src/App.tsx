import Layout from "./layout";

import { Provider } from "react-redux";
import { GlobalStyle } from "./styles/global";
import { store } from "./store";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LoadingPage } from "./components/shared-components/LoadingPage";

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <Layout>
              <Routes />
            </Layout>
          </Suspense>
        </BrowserRouter>

        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
}
