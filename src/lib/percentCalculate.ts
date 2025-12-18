export function calculatePercentageChange(
  oldVal: number,
  newVal: number
): number {
  if (oldVal === 0) return 0;

  const percentChange = ((newVal - oldVal) / oldVal) * 100;

  return Math.abs(percentChange) < 1
    ? Number(percentChange.toFixed(2))
    : Math.trunc(percentChange);
}
