import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from "crypto-js";
import { CartProductType, SandwichType, userType } from "./Types";

export const request_auth_url = "http://localhost:4529/auth-user";

export const request_sandwiches_url = "http://localhost:4527/server";

export const LogIn = async (
  name: string,
  password: string,
): Promise<userType | void> => {
  try {
    const { data } = await axios.post(request_auth_url + "/login", {
      name,
      password,
    });
    const encrypted_refresh_token = encrypt_data(
      data.REFRESH_TOKEN,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    localStorage.setItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
      encrypted_refresh_token,
    );
    return data.user;
  } catch (e) {
    handle_err(e);
    return;
  }
};

export const LogOut = async (): Promise<void> => {
  try {
    const local_token: string | null = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token: string = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    await axios.post(request_auth_url + "/logout", { token: refresh_token });

    localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_NAME);
    return;
  } catch (e) {
    throw new Error("error");
  }
};

export const CreateAccount = async (
  name: string,
  password: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  postalCode: string,
  country: string,
): Promise<userType> => {
  try {
    const { data } = await axios.post(request_auth_url + "/signup", {
      name: name,
      password: password,
      email: email,
      phone: phone,
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
    });

    const encrypted_refresh_token = encrypt_data(
      data.REFRESH_TOKEN,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    localStorage.setItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
      encrypted_refresh_token,
    );
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

export const GetAccount = async () => {
  try {
    const local_token = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    const access_token = await axios.post(request_auth_url + "/token", {
      token: refresh_token,
    });

    const { data } = await axios.get(
      request_sandwiches_url + "/sandwiches/user",
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

export const GetSandwiches = async (): Promise<Array<SandwichType>> => {
  try {
    const { data } = await axios.get(request_sandwiches_url + "/");
    return data;
  } catch (e) {
    throw new Error("error");
  }
};

export const GetSandwich = async (id: string): Promise<SandwichType> => {
  try {
    const { data } = await axios.get(request_sandwiches_url + "/" + id);
    return data;
  } catch (e) {
    throw new Error("error");
  }
};

export const PostComment = async (
  title: string,
  comment: string,
  rating: number,
  sandwichId: string,
): Promise<void> => {
  try {
    const local_token = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    await axios.post(
      request_sandwiches_url + "/sandwiches/comment",
      { title, comment, rating, belongsToSandwichId: sandwichId },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

export const UpdateComment = async (
  title: string,
  comment: string,
  rating: number,
  commentId: string,
): Promise<void> => {
  try {
    const local_token = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });
    await axios.put(
      request_sandwiches_url + "/sandwiches/comment/" + commentId,
      { title, comment, rating },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return;
  } catch (e) {
    handle_err(e);

    throw new Error("error");
  }
};

export const UpdateFavourites = async (favourites: string[]): Promise<void> => {
  try {
    const local_token = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    await axios.put(
      request_sandwiches_url + "/sandwiches/favourites",
      { favourites },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

type Checkout_response = {
    url: string;
}

export async function Checkout_payment(
  order: CartProductType[],
): Promise<void | Checkout_response> {
  try {
    const local_token = localStorage.getItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
    );
    if (!local_token) return;
    const refresh_token = decrypt_data(
      local_token,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    );
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    const { data } = await axios.post(
      request_sandwiches_url + "/sandwiches/checkout",
      { order: order },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
}

async function handle_err(e: any): Promise<void> {
  if (e === undefined || e.response === undefined) return;
  const condition =
    typeof e === "object" && Object.keys(e.response).includes("data");
  switch (true) {
    case condition && e.response.data.message === "TokenExpiredError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.message === "JsonWebTokenError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.message === "NotBeforeError":
      await LogOut();
      window.location.pathname = "/";
      break;
  }
  if (condition && e.response.data.message === "TokenExpiredError") {
    await LogOut();
    window.location.pathname = "/";
  }
  return;
}

function encrypt_data(data: string, key: string): string {
  return CryptoJS.AES.encrypt(data, key).toString();
}

function decrypt_data(data: string, key: string): string {
  return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}
