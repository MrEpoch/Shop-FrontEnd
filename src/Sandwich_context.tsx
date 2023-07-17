import "./App.css";
import { useContext, useMemo, useState } from "react";
import { ChildrenProp, SandwichType } from "./Types";
import { GetSandwiches } from "./API_requests";
import { useQuery } from "react-query";
import { SandwichContext } from "./Context_definitions";

export function useSandwich() {
  const value = useContext(SandwichContext);
  if (value === null) return {};
  return value;
}

export default function Sandwich_context({ children }: ChildrenProp) {
  const [sandwich, setSandwich] = useState<SandwichType[] | []>([]);

  const { isLoading, error, data } = useQuery<SandwichType[], Error>(
    "sandwiches",
    GetSandwiches,
    {
      staleTime: 1000 * 60 * 60,
    },
  );
  
  useMemo(() => {
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
