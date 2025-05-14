import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserCompanies,
  addCompanyToUser,
  removeCompanyFromUser,
} from "@/lib/queries/company";

export function useUserCompanies(email: string) {
  return useQuery({
    queryKey: ["userCompanies", email],
    queryFn: () => getUserCompanies(email).then((res) => res.data),
  });
}

export function useAddCompany(email: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyName: string) => addCompanyToUser(email, companyName),
    onSuccess: () => {
      // Invalidate the query to refetch the user companies
      // Prevents stale data
      queryClient.invalidateQueries({ queryKey: ["userCompanies", email] });
    },
  });
}

export function useRemoveCompany(email: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId: string) => removeCompanyFromUser(email, companyId),
    onSuccess: () => {
      // Invalidate the query to refetch the user companies
      // Prevents stale data
      queryClient.invalidateQueries({ queryKey: ["userCompanies", email] });
    },
  });
}
