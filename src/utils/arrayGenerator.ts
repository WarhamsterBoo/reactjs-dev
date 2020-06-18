export const arrayGenerator = <T extends object>(
  x: number,
  y: number,
  initialValue: T
): T[][] =>
  Array.from({ length: x }).map(() =>
    Array.from({ length: y }).map(() => ({ ...initialValue }))
  );
