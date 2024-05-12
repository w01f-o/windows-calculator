export const formatNullToEmptyString = (
  value: number | string | null,
): number | string => {
  return value === null ? "" : value;
};
