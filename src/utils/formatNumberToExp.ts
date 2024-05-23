interface numberToExpParams {
  number: number | string;
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
    return Number(number).toExponential(expLimit);
  }
};
