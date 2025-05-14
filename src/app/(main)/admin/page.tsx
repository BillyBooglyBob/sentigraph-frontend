"use client";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/data-table/DataTable";
import { DataTableColumns } from "@/components/admin/DataTableColumns";
import UserDataFormModal from "@/components/admin/DataFormModal";
import { Loader2 } from "lucide-react";
import { useAllUsers, useRemoveUser } from "@/hooks/useAdmin";

const AdminPage = () => {
  // Fetch user companies
  const { data: users, isLoading, error } = useAllUsers();

  // Handle delete company
  const removeUser = useRemoveUser();
  const handleDelete = (userId: string) => {
    removeUser.mutate(userId);
  };

  return (
    <>
      <BackButton text="Go Back" link="/" />
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading data.</p>
        </div>
      ) : (
        <DataTable
          columns={DataTableColumns}
          data={users}
          DataModal={UserDataFormModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default AdminPage;
