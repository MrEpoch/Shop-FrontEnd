import { createContext, useContext, useState, useMemo } from "react";
import { ChildrenProp } from "./Types";
import { GetAccount, UpdateFavourites } from "./API_requests";
import { useQuery } from "react-query";

const AccountContext = createContext<any>({});

export function useAccount() {
  const value = useContext(AccountContext);
  if (value === null) return {};
  return value;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Account_context({ children }: ChildrenProp) {
  const [account, setAccount] = useState<any | object>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const { isLoading, error, data } = useQuery<any[], Error>({
    queryKey: ["account"],
    queryFn: () => wait(1000).then(() => GetAccount()),
  });

  function Fill_user_account(data: any) {
    setAccount(data);
    return;
  }

  async function Update_account_favourites(id: string) {
    if (loggedIn) {
      if (account.favorites.includes(id)) {
        const index = account.favorites.indexOf(id);
        setAccount((prev: any) => ({
          ...prev,
          favorites: prev.favorites.splice(index, 1),
        }));
        setFavourites((prev: any) => prev.splice(index, 1));
        await UpdateFavourites([...account.favorites.splice(index, 1)]);
        return;
      } else {
        account.favorites.push(id);
        setFavourites((prev: any) => [...prev, id]);
        await UpdateFavourites([...account.favorites, id]);
        setAccount(account);
        return;
      }
    }
  }

  useMemo(() => {
    if (Object.keys(account).length > 0) {
      setLoggedIn(true);
      setFavourites(account.favorites);
      setOrders(account.orders);
    } else {
      setLoggedIn(false);
      setFavourites([]);
      setOrders([]);
    }
  }, [account]);

  useMemo(() => {
    if (data) {
      setAccount(data);
    }
  }, [data]);

  const value = {
    account,
    error,
    isLoading,
    favourites,
    Fill_user_account,
    loggedIn,
    Update_account_favourites,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
