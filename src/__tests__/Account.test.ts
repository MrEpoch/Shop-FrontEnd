import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { useAccount } from "../Account_context";
import { AccountContextType } from "../Types";
import { AccountContext } from "../Context_definitions.ts";

test("Check account", async () => {
  const Account_c = render() 
  const { account } = useAccount() as AccountContextType;

  expect(account).toBeTypeOf("object");
});
