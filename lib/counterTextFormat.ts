export const counterTextFormat = (counters: number): string => {
  if (counters < 10_000_000) {
    return counters.toLocaleString();
  } else if (counters < 1_000_000_000) {
    return abbreviatedNumber(counters, 1_000_000, "Mil");
  } else if (counters < 1_000_000_000_000) {
    return abbreviatedNumber(counters, 1_000_000_000, "Bil");
  } else {
    return "∞";
  }
};

const abbreviatedNumber = (number: number, divisor: number, suffix: string) => {
  const dividedString = (number / divisor).toString();
  let [whole, decimal] = dividedString.split(".");
  if (Number(decimal) === 0) {
    return whole + suffix;
  } else if (decimal.length > 1) {
    decimal = decimal.slice(0, 1);
  }
  return `${whole}.${decimal} ${suffix}`;
};
