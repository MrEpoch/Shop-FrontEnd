import "./App.css";
import { createContext, useContext, useMemo, useState } from "react";
import { ChildrenProp } from "./Types";
import { GetSandwiches } from "./API_requests";
import { useQuery } from "react-query";

const SandwichContext = createContext<any>({});

export function useSandwich() {
  const value = useContext(SandwichContext);
  if (value === null) return {};
  return value;
}

export default function Sandwich_context({ children }: ChildrenProp) {
  const [sandwich, setSandwich] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery<any[], Error>(
    "sandwiches",
    GetSandwiches,
    {
      staleTime: 1000 * 60 * 60,
    },
  );

  useMemo(() => {
    console.log("again");
    if (data) {
      setSandwich(data);
    }
  }, [data]);

  const value = {
    sandwich,
    isLoading,
    error,
  };
  return (
    <SandwichContext.Provider value={value}>
      {children}
    </SandwichContext.Provider>
  );
}
