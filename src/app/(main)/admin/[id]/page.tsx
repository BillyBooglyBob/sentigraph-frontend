"use client";

import { use } from "react";
import EditUserForm from "@/components/user/EditUserForm";
import BackButton from "@/components/BackButton";
import { useUpdateUser, useUserInformation } from "@/hooks/useAdmin";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/redux/hook";

interface AdminEditPageProps {
  params: Promise<{ id: string }>;
}

const AdminEditUserPage = ({ params }: AdminEditPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: userEmail } = use(params);
  const { data: user, isLoading } = useUserInformation(userEmail);

  // API call to update user
  const updateUser = useUpdateUser();
  function handleUpdate(
    user_id: string,
    email: string,
    password1: string,
    password2: string
  ) {
    updateUser.mutate({ user_id, email, password1, password2 });
  }

  return (
    <>
      <BackButton text="Go Back" link="/admin" />
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <EditUserForm user={user.data} handleSubmitHelper={handleUpdate} />
      )}
    </>
  );
};

export default AdminEditUserPage;
