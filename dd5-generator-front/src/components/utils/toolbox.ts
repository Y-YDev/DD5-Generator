export function getRandomElementInArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function isStringEmptyOfUndef(str: string | undefined) {
  return str === '' || str === undefined;
}
