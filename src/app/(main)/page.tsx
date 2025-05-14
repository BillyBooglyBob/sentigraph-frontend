import DashboardCard from "@/components/dashboard/DashboardCard";

import DataTable from "@/components/data-table/DataTable";
import { CompanyDataTableColumns } from "@/components/companies/DataTableColumns";
import companies from "@/data/companies";

import AnalyticsChart from "@/components/dashboard/Chart";
import CompanyDataFormModal from "@/components/companies/DataFormModal";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
        <DashboardCard
          title="Sentiment Value"
          value={0.38}
          date="20 June 2001 - 12 April 2023"
        />
        <DashboardCard
          title="Posts Analysed"
          value={3290}
          date="20 June 2001 - 12 April 2023"
        />
      </div>
      <div>
        {/* <AnalyticsChart /> */}
      </div>
      <div>
        <DataTable
          columns={CompanyDataTableColumns}
          data={companies}
          DataModal={CompanyDataFormModal}
        />
      </div>
    </div>
  );
}
