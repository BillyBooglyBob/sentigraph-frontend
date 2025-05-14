import { useQuery } from "@tanstack/react-query";
import { fetchSentimentData } from "@/lib/queries/sentiment";

export function useSentimentData({
  companies,
  aspect,
  timeframe,
}: {
  companies: string[];
  aspect: string;
  timeframe: string;
}) {
  return useQuery({
    queryKey: ["sentimentData", companies, aspect, timeframe],
    queryFn: () => fetchSentimentData({ companies, aspect, timeframe }),
    enabled: companies.length > 0 && aspect.trim() !== "",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
