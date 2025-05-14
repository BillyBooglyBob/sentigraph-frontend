import {
  handleLoginAddCookies,
  handleLogOutClearCookies,
} from "../action";
import { getAuthHeaders } from "./getAuthHeader";

/* 
Only use (credentials: "include") if you need to send cookies with the request.
*/

export async function registerUser(data: {
  email: string;
  password1: string;
  password2: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    const resData = await res.json();
    handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);
    return resData;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    const resData = await res.json();
    handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);
    return resData;
  } catch (err) {
    throw err;
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/logout/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Only use if you need to send cookies
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    const resData = await res.json();
    handleLogOutClearCookies();
    return resData;
  } catch (err) {
    throw err;
  }
}

export async function getUserInformation(data: { email: string }) {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user/${data.email}/`,
      {
        method: "GET",
        headers,
        credentials: "include", // Only use if you need to send cookies
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
