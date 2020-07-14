export const matrixGenerator = <T>(
  x: number,
  y: number,
  initialValue: T
): T[][] =>
  Array.from({ length: x }).map(() =>
    Array.from({ length: y }).map(() =>
      typeof initialValue === "object" ? { ...initialValue } : initialValue
    )
  );

export const resizeMatrix = <T>(
  initialMatrix: T[][],
  targetX: number,
  targetY: number,
  initialValue: T
): T[][] => {
  return matrixGenerator(targetX, targetY, initialValue).map((row, rowIndex) =>
    row.map((item, itemIndex) => {
      return initialMatrix[rowIndex] && initialMatrix[rowIndex][itemIndex]
        ? typeof initialMatrix[rowIndex][itemIndex] === "object"
          ? { ...initialMatrix[rowIndex][itemIndex] }
          : initialMatrix[rowIndex][itemIndex]
        : item;
    })
  );
};
