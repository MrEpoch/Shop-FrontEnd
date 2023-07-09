import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./components/shop__page-components/Main__products__shop";
import Cart_context from "./Cart_context";
import Theme_context from "./Theme_context";

function App() {

  return (
    <Theme_context>
        <QueryClientProvider client={queryClient}>
            <Cart_context>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Cart_context>
        </QueryClientProvider>
    </Theme_context>
  );
}

export default App;
