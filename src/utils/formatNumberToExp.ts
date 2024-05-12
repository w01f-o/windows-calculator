interface params {
  number: number;
  expLimit: number;
  outputLimit?: number;
}

export const formatNumberToExp = ({
  number,
  outputLimit,
  expLimit,
}: params): number | string => {
  const tempLimit = outputLimit ? outputLimit : 16;

  if (String(number).length <= tempLimit) {
    return number;
  } else {
    return number.toExponential(expLimit);
  }
};
