function stats(values) {
  const sorted = [...values].sort((a, b) => a - b);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const middle = sorted.length / 2;

  const median =
    sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[Math.floor(middle)];

  return {
    min,
    median,
    max
  };
}


// Replace these with your real measurements

const human = [
  18, 14, 20, 13, 17,
  15, 19, 16, 14, 18
];

const hit = [
  4, 3, 5, 4, 3,
  4, 6, 3, 5, 4
];

const miss = [
  1100, 980, 1250, 1400, 1150,
  1300, 1050, 1210, 1500, 1180
];


console.log("Human:", stats(human));
console.log("HIT:", stats(hit));
console.log("MISS:", stats(miss));