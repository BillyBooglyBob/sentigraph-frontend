import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  createUser,
  updateUser,
  removeUser,
} from "@/lib/queries/admin";
import { getUserInformation } from "@/lib/queries/auth";

export function useUserInformation(email: string) {
  return useQuery({
    queryKey: ["userInformation", email],
    queryFn: () => getUserInformation({ email }),
    enabled: !!email, // only run if email is truthy
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["useUsers"],
    queryFn: getAllUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      email,
      password1,
      password2,
    }: {
      email: string;
      password1: string;
      password2: string;
    }) => createUser(email, password1, password2),
    onSuccess: () => {
      // Invalidate the query to refetch the user companies
      // Prevents stale data
      queryClient.invalidateQueries({ queryKey: ["useUsers"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      user_id,
      email,
      password1,
      password2,
    }: {
      user_id: string;
      email: string;
      password1: string;
      password2: string;
    }) => updateUser(user_id, email, password1, password2),
    onSuccess: () => {
      // Invalidate the query to refetch the user companies
      // Prevents stale data
      queryClient.invalidateQueries({ queryKey: ["useUsers"] });
    },
  });
}

export function useRemoveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: string) => removeUser(user_id),
    onSuccess: () => {
      // Invalidate the query to refetch the user companies
      // Prevents stale data
      queryClient.invalidateQueries({ queryKey: ["useUsers"] });
    },
  });
}
