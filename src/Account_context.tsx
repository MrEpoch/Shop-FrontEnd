import React, { useContext, useState, useMemo } from "react";
import { ChildrenProp, OrderType, userType } from "./Types";
import { GetAccount, LogOut, UpdateFavourites } from "./API_requests";
import { useMutation, useQuery } from "react-query";
import { AccountContext } from "./Context_definitions";


export function useAccount() {
  const value = useContext(AccountContext);
  if (value === null) return {};
  return value;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Account_context({
  children,
}: ChildrenProp): React.JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<string[] | []>([]);
  const [orders, setOrders] = useState<OrderType[] | []>([]);

  const { isLoading, error, data } = useQuery<userType, Error>({
    queryKey: ["account"],
    queryFn: () => wait(1000).then(() => GetAccount()),
  });

  type initialAccountType = {
    favouritesId: string[];
    orders: OrderType[];
  };

  const initialAccount: initialAccountType = {
    favouritesId: [],
    orders: [],
  };
  const [account, setAccount] = useState<userType | initialAccountType>(
    initialAccount,
  );

  const handleLogout = (): void => {
    setLoggedIn(false);
    setFavourites([]);
    setOrders([]);
    LogOut();
    return;
  };

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return Update_account_favourites(id);
    },
  });

  function Fill_user_account(data: userType): void {
    setAccount(data);
    return;
  }

  async function Update_account_favourites(id: string): Promise<void> {
    if (loggedIn && Object.keys(account).includes("favouritesId")) {
      if (!account.favouritesId) return;
      if (account.favouritesId && account.favouritesId.includes(id)) {
        const index = account.favouritesId.indexOf(id);
        setAccount((prev: userType | initialAccountType) => ({
          ...prev,
          favouritesId: prev.favouritesId.splice(index, 1),
        }));
        setFavourites((prev: string[]) => prev.splice(index, 1));
        await UpdateFavourites([...account.favouritesId.splice(index, 1)]);
        return;
      } else {
        account.favouritesId.push(id);
        setFavourites((prev: string[]) => [...prev, id]);
        await UpdateFavourites([...account.favouritesId, id]);
        setAccount(account);
        return;
      }
    }
  }

  useMemo(() => {
    if (Object.keys(account).length > 3) {
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
    orders,
    Update_account_favourites,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
