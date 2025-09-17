export function randomOrder(n, start) {
  const arr = Array.from({ length: n }, (_, i) => i + start);

  // Fisher–Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }

  return arr;
}
