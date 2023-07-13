import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./components/shop__page-components/Main__products__shop";
import Cart_context from "./Cart_context";
import Theme_context from "./Theme_context";
import Sandwich_context from "./Sandwich_context";
import Account_context from "./Account_context";

function App() {
  return (
    <Theme_context>
      <QueryClientProvider client={queryClient}>
        <Account_context>
          <Sandwich_context>
            <Cart_context>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Cart_context>
          </Sandwich_context>
        </Account_context>
      </QueryClientProvider>
    </Theme_context>
  );
}

export default App;
