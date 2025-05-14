import { getAuthHeaders } from "./getAuthHeader";

export async function getUserCompanies(email: string) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user/${email}/companies/`,
    {
      method: "GET",
      headers,
      credentials: "include", // optional
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function addCompanyToUser(email: string, companyName: string) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user/${email}/companies/${companyName}/`,
    {
      method: "POST",
      headers,
      credentials: "include",
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function removeCompanyFromUser(email: string, companyId: string) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user/${email}/companies/${companyId}/`,
    {
      method: "DELETE",
      headers,
      credentials: "include",
    }
  );

  if (!res.ok) throw await res.json();
  return res.json();
}
