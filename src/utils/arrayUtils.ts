export const twoDimArrayGenerator = <T>(
  x: number,
  y: number,
  initialValue: T
): T[][] =>
  Array.from({ length: x }).map(() =>
    Array.from({ length: y }).map(() =>
      typeof initialValue === "object" ? { ...initialValue } : initialValue
    )
  );

export const resizeTwoDimArray = <T>(
  initialArray: T[][],
  targetX: number,
  targetY: number,
  initialValue: T
): T[][] => {
  return twoDimArrayGenerator(targetX, targetY, initialValue).map(
    (row, rowIndex) =>
      row.map((item, itemIndex) => {
        return initialArray[rowIndex] && initialArray[rowIndex][itemIndex]
          ? initialArray[rowIndex][itemIndex]
          : item;
      })
  );
};
