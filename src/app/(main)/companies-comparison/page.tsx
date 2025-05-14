"use client";

import SentimentChartPage from "@/components/dashboard/SentimentChartPage";
import { Suspense } from "react";

const CompanyComparisonPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SentimentChartPage
        heading="Companies Sentiment Comparison"
        backLink="/"
        showCompanySelector={true}
      />
    </Suspense>
  );
};

export default CompanyComparisonPage;
