export async function fetchSentimentData({
  companies,
  aspect,
  timeframe,
}: {
  companies: string[];
  aspect: string;
  timeframe: string;
}) {
  const params = new URLSearchParams();
  companies.forEach((company) => params.append("companies", company));
  params.append("aspect", aspect);
  params.append("timeframe", timeframe);

  /* TODO: Replace local host with something else when deploying */
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_HOST
    }/api/sentiment/sentiments/?${params.toString()}`
  );

  if (!res.ok) throw new Error("Failed to fetch sentiment data");

  const data = await res.json();
  console.log("Fetched sentiment data:", data);

  return data;
}
