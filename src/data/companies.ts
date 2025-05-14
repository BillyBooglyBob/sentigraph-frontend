import { Company } from "@/types/company";

const companies: Company[] = [
  {
    id: "1",
    name: "Amazon",
    posts: 1200,
    overall_sentiment_label: "positive",
    overall_sentiment_value: 0.75,
  },
  {
    id: "2",
    name: "Google",
    posts: 950,
    overall_sentiment_label: "neutral",
    overall_sentiment_value: 0.5,
  },
  {
    id: "3",
    name: "Microsoft",
    posts: 800,
    overall_sentiment_label: "negative",
    overall_sentiment_value: 0.25,
  },
  {
    id: "4",
    name: "Apple",
    posts: 1100,
    overall_sentiment_label: "positive",
    overall_sentiment_value: 0.8,
  },
  {
    id: "5",
    name: "Meta",
    posts: 600,
    overall_sentiment_label: "neutral",
    overall_sentiment_value: 0.55,
  },
  {
    id: "6",
    name: "Tesla",
    posts: 900,
    overall_sentiment_label: "negative",
    overall_sentiment_value: 0.4,
  },
  {
    id: "7",
    name: "Netflix",
    posts: 700,
    overall_sentiment_label: "positive",
    overall_sentiment_value: 0.65,
  },
];

export default companies;
