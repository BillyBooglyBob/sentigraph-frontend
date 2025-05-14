import { getTokenFromCookies } from "../action";

export async function getAuthHeaders() {
  const { accessToken } = await getTokenFromCookies();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken?.value}`,
  };
}
