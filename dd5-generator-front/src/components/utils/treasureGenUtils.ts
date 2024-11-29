export function extractNumberFromCoin(coinString: string) {
  const match = coinString.match(/^(\d+)/); // Match the number at the start of the string
  return match ? parseInt(match[1], 10) : null; // Return the number or null if no match
}
