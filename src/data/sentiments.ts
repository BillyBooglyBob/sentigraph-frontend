import { Sentiment } from "@/types/sentiment";

function randomDateWithinLast3Years() {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 3);
  const date = new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  );
  return date.toISOString().split("T")[0];
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const companies = ["Amazon", "Google", "Microsoft"];
const labels = ["positive", "negative", "neutral"];

let idCounter = 1;

const sentiments: Sentiment[] = [];

for (const company of companies) {
  for (let i = 0; i < 30; i++) {
    sentiments.push({
      id: `${idCounter++}`,
      company,
      label: getRandomItem(labels),
      value: parseFloat(Math.random().toFixed(2)),
      date: randomDateWithinLast3Years(),
    });
  }
}

export default sentiments;
