export function formatSentimentString(items: string[]): string {
  if (items.length === 0) return "Sentiment for";
  if (items.length === 1) return `Sentiment for ${items[0]}`;
  const allButLast = items.slice(0, -1).join(", ");
  const last = items[items.length - 1];
  return `Sentiment for ${allButLast} & ${last}`;
}
