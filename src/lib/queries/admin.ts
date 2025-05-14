import { getAuthHeaders } from "./getAuthHeader";

export async function getAllUsers() {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/users/`,
    {
      method: "GET",
      headers,
      credentials: "include",
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function createUser(
  email: string,
  password1: string,
  password2: string
) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/users/`,
    {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password1,
        password2,
      }),
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateUser(
  user_id: string,
  email: string,
  password1: string,
  password2: string
) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/users/${user_id}/`,
    {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password1,
        password2,
      }),
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function removeUser(user_id: string) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/admin/users/${user_id}/`,
    {
      method: "DELETE",
      headers,
      credentials: "include",
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}
