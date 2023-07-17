import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router";
import { QueryClientProvider, QueryClient } from "react-query";
import Cart_context from "./Cart_context";
import Theme_context from "./Theme_context";
import Sandwich_context from "./Sandwich_context";
import Account_context from "./Account_context";
import React from "react";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
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
