export const formatNumber = (
  number: string,
  expLimit: number,
  outputLimit?: number,
): string => {
  if (number.length <= (outputLimit ? outputLimit : 16)) {
    return number;
  } else {
    return parseFloat(number).toExponential(expLimit);
  }
};
