export const arrayGenerator = <T>(
  x: number,
  y: number,
  initialValue: T
): T[][] =>
  Array.from({ length: x }).map(() =>
    Array.from({ length: y }).map(() =>
      typeof initialValue === "object" ? { ...initialValue } : initialValue
    )
  );

export const resizeArray = <T>(
  initialArray: T[][],
  targetX: number,
  targetY: number,
  initialValue: T
): T[][] => {
  return arrayGenerator(targetX, targetY, initialValue).map((row, rowIndex) =>
    row.map((item, itemIndex) => {
      return initialArray[rowIndex] && initialArray[rowIndex][itemIndex]
        ? initialArray[rowIndex][itemIndex]
        : item;
    })
  );
};
