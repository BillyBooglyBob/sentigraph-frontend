"use client";

import Selector from "@/components/dashboard/selector/Selector";

interface CompaniesSelectorProps {
  companies: string[];
  handleCompaniesChange: (
    selectedOrUpdater: string[] | ((prev: string[]) => string[])
  ) => void;
}

const CompaniesSelector = ({
  companies,
  handleCompaniesChange,
}: CompaniesSelectorProps) => {
  return (
    <Selector
      label="company"
      limit={3}
      selectors={companies}
      handleSelectorChange={handleCompaniesChange}
    />
  );
};

export default CompaniesSelector;
