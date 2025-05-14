"use client";

import { use } from "react";
import SentimentChartPage from "@/components/dashboard/SentimentChartPage";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

/* TODO: Deal with the caching, so when aspects changed, 
already gotten aspects don't need to be retrieved again. */
const CompanyPage = ({ params }: CompanyPageProps) => {
  // Get data for the current user by looking up the ID in the URL
  const { id: companyName } = use(params);

  return (
    <SentimentChartPage
      heading={`Sentiment Analysis for ${companyName}`}
      backLink="/companies"
      showCompanySelector={false}
      fixedCompany={companyName}
    />
  );
};

export default CompanyPage;
