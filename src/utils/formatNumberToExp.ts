interface numberToExpParams {
  number: number;
  expLimit: number;
  outputLimit?: number;
}

export const formatNumberToExp = ({
  number,
  outputLimit,
  expLimit,
}: numberToExpParams): number | string => {
  const tempLimit = outputLimit ? outputLimit : 16;

  if (String(number).length <= tempLimit) {
    return number;
  } else {
    return number.toExponential(expLimit);
  }
};
