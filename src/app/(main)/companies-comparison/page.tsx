"use client";

import SentimentChartPage from "@/components/dashboard/SentimentChartPage";

const CompanyComparisonPage = () => {
  return (
    <SentimentChartPage
      heading="Companies Sentiment Comparison"
      backLink="/"
      showCompanySelector={true}
    />
  );
};

export default CompanyComparisonPage;
