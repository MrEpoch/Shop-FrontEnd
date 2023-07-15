import { createContext, useContext, useState, useMemo } from "react";
import { ChildrenProp } from "./Types";
import { GetAccount, LogOut, UpdateFavourites } from "./API_requests";
import { useMutation, useQuery } from "react-query";

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

  const { isLoading, error, data } = useQuery<any, Error>({
    queryKey: ["account"],
    queryFn: () => wait(1000).then(() => GetAccount()),
  });

  const handleLogout = () => {
    setAccount({});
    setLoggedIn(false);
    setFavourites([]);
    setOrders([]);
    LogOut();
  };

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return Update_account_favourites(id);
    },
  });

  function Fill_user_account(data: any) {
    console.log(data);
    setAccount(data);
    return;
  }

  async function Update_account_favourites(id: string) {
    if (loggedIn) {
      if (account.favouritesId.includes(id)) {
        const index = account.favouritesId.indexOf(id);
        setAccount((prev: any) => ({
          ...prev,
          favouritesId: prev.favouritesId.splice(index, 1),
        }));
        setFavourites((prev: any) => prev.splice(index, 1));
        await UpdateFavourites([...account.favouritesId.splice(index, 1)]);
        return;
      } else {
        account.favouritesId.push(id);
        setFavourites((prev: any) => [...prev, id]);
        await UpdateFavourites([...account.favouritesId, id]);
        setAccount(account);
        return;
      }
    }
  }

  useMemo(() => {
    if (Object.keys(account).length > 0) {
      setLoggedIn(true);
      setFavourites(account.favouritesId);
      setOrders(account.orders);
    } else {
      setLoggedIn(false);
      setFavourites([]);
      setOrders([]);
    }
  }, [account]);

  useMemo(() => {
    if (data) {
      if (Array.isArray(data)) {
        console.log(data[0]);
        Fill_user_account(data[0]);
      } else {
          Fill_user_account(data);
      }
    }
  }, [data]);

  const value = {
    account,
    error,
    handleLogout,
    isLoading,
    favourites,
    mutate,
    Fill_user_account,
    loggedIn,
    Update_account_favourites,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
