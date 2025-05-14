"use client";

import React from "react";
import DataModal from "@/components/data-table/DataModal";
import DataForm from "@/components/companies/DataForm";

const CompanyDataFormModal = () => {
  return (
    <DataModal
      title="Add a company"
      description="Add a company to your company list. You can add a company to your company list by entering the company name."
      ModalForm={DataForm}
    />
  );
};

export default CompanyDataFormModal;
