"use client";

import { useState, useEffect } from "react";
import Chart from "@/components/dashboard/Chart";
import CompaniesSelector from "@/components/dashboard/selector/CompanySelector";
import AspectSelector from "@/components/dashboard/selector/AspectSelector";
import BackButton from "@/components/BackButton";
import { useSentimentData } from "@/hooks/useSentimentData";
import { formatSentimentString } from "@/lib/formatter";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

type SentimentChartPageProps = {
  showCompanySelector?: boolean;
  fixedCompany?: string; // e.g., "Google"
  backLink: string;
  heading: string;
};

const SentimentChartPage = ({
  showCompanySelector = true,
  fixedCompany,
  backLink,
  heading,
}: SentimentChartPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the companies and aspects from the URL
  // - Will be used to set the initial state of the companies and aspects
  const urlCompanies =
    searchParams.get("companies")?.split(",") ||
    (fixedCompany ? [fixedCompany] : []);
  const urlAspects = searchParams.get("aspects")?.split(",") || [];

  // Fetch the sentiment data based on the companies and aspect selected
  const [companies, setCompanies] = useState<string[]>(urlCompanies);
  const [aspects, setAspects] = useState<string[]>(urlAspects);

  // Update the URL when the companies or aspects change
  useEffect(() => {
    const params = new URLSearchParams();

    if (companies.length > 0) {
      params.set("companies", companies.join(","));
    }

    if (aspects.length > 0) {
      params.set("aspects", aspects.join(","));
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [companies, aspects]);

  // Fetch the sentiment data based on the companies and aspect selected
  const {
    data: sentimentData,
    isLoading,
    error,
  } = useSentimentData({
    companies,
    aspect: aspects[0] || "",
    timeframe: "90d",
  });

  return (
    <div className="flex flex-col gap-4">
      <BackButton text="Go Back" link={backLink} />
      <h1>{heading}</h1>

      <div className="flex gap-6">
        {showCompanySelector && (
          <CompaniesSelector
            companies={companies}
            handleCompaniesChange={setCompanies}
          />
        )}
        <AspectSelector aspects={aspects} handleAspectsChange={setAspects} />
      </div>

      {companies.length === 0 || aspects.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Please select at least one company and one aspect.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading data.</p>
        </div>
      ) : sentimentData ? (
        <Chart
          data={sentimentData.data}
          labels={companies}
          title={formatSentimentString(companies)}
          description={companies.join(", ")}
        />
      ) : null}
    </div>
  );
};

export default SentimentChartPage;
