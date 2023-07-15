import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from "crypto-js";

export const request_auth_url = "http://localhost:4529/auth-user";

export const request_sandwiches_url = "http://localhost:4527/server";

export const LogIn = async (name: string, password: string) => {
  try {
    const { data } = await axios.post(request_auth_url + "/login", {
      name,
      password,
    });
    const encrypted_refresh_token = CryptoJS.AES.encrypt(
      data.REFRESH_TOKEN,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString();
    localStorage.setItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
      encrypted_refresh_token,
    );
    return data.user;
  } catch (e: any) {
    handle_err(e);
  }
};

export const LogOut = async () => {
  try {
    const refresh_token = CryptoJS.AES.decrypt(
      localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME),
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
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
) => {
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

    const encrypted_refresh_token = CryptoJS.AES.encrypt(
      data.REFRESH_TOKEN,
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString();
    localStorage.setItem(
      import.meta.env.VITE_REFRESH_TOKEN_NAME,
      encrypted_refresh_token,
    );
    return data.user;
  } catch (e: any) {
        handle_err(e);
    throw new Error("error");
  }
};

export const GetAccount = async () => {
  try {
    if (!localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME)) return;
    const refresh_token = CryptoJS.AES.decrypt(
      localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME),
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
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
  } catch (e: any) {
        handle_err(e);
    throw new Error("error");
  }
};

export const GetSandwiches = async () => {
  try {
    const { data } = await axios.get(request_sandwiches_url + "/");
    return data;
  } catch (e) {
    throw new Error("error");
  }
};

export const GetSandwich = async (id: string) => {
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
) => {
  try {
    const refresh_token = CryptoJS.AES.decrypt(
      localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME),
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    const { data } = await axios.post(
      request_sandwiches_url + "/sandwiches/comment",
      { title, comment, rating, belongsToSandwichId: sandwichId },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e: any) {
    handle_err(e); 
    throw new Error("error");
  }
};

export const UpdateComment = async (
  title: string,
  comment: string,
  rating: number,
  commentId: string,
) => {
  try {
    const refresh_token = CryptoJS.AES.decrypt(
      localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME),
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    const { data } = await axios.put(
      request_sandwiches_url + "/sandwiches/comment/" + commentId,
      { title, comment, rating },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e: any) {
    
    handle_err(e);

    throw new Error("error");
  }
};

export const UpdateFavourites = async (favourites: string[]) => {
  try {
    const refresh_token = CryptoJS.AES.decrypt(
      localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME),
      import.meta.env.VITE_TEMPORARY_TOKEN_HASHER_SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    const access_token = await axios.post(request_auth_url + "/token/", {
      token: refresh_token,
    });

    const { data } = await axios.put(
      request_sandwiches_url + "/sandwiches/favourites",
      { favourites },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e: any) {
    handle_err(e);
    throw new Error("error");
  }
};


async function handle_err(e: any) {
if (
      typeof e === "object" &&
      Object.keys(e.response).includes("data") &&
      e.response.data.message === "TokenExpiredError"
    ) {
      await LogOut();
      window.location.pathname = "/";
    }
}
