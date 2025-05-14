"use client";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/data-table/DataTable";
import { CompanyDataTableColumns } from "@/components/companies/DataTableColumns";
import CompanyDataFormModal from "@/components/companies/DataFormModal";
import { useRemoveCompany, useUserCompanies } from "@/hooks/useCompanies";
import { useAppSelector } from "@/redux/hook";
import { Loader2 } from "lucide-react";

const CompaniesPage = () => {
  const userEmail = useAppSelector((state) => state.user.email);

  // Fetch user companies
  const { data: companies, isLoading, error } = useUserCompanies(userEmail);

  // Handle delete company
  const removeCompany = useRemoveCompany(userEmail);
  const handleDelete = (companyId: string) => {
    removeCompany.mutate(companyId);
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
          columns={CompanyDataTableColumns}
          data={companies}
          DataModal={CompanyDataFormModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CompaniesPage;
