export const arrayGenerator = <T extends object>(
  x: number,
  y: number,
  initialValue: T
): T[][] =>
  Array.from({ length: x }).map(() =>
    Array.from({ length: y }).map(() => ({ ...initialValue }))
  );

export const resizeArray = <T>(
  initialArray: T[][],
  targetX: number,
  targetY: number,
  initialValue: T
): T[][] => {
  return initialArray;
};
