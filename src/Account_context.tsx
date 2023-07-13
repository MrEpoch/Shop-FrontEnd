import { createContext, useContext, useState, useMemo } from "react";
import { ChildrenProp } from "./Types";

const AccountContext = createContext<any>({});

export function useAccount() {
    const value = useContext(AccountContext);
    if (value === null) return {};
    return value;
}

export default function Account_context({ children }: ChildrenProp) {
   
    const [account, setAccount] = useState<any | object>({});
  
    function Fill_user_account(data: any) {
        setAccount(data);
        return;
    }

    const value = {
        account,
        Fill_user_account
    }; 

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}
