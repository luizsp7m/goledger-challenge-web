export function getArraySlice<T>(data: T[], sliceSize: number): T[] {
  if (sliceSize <= 0) return data;

  return data.slice(0, sliceSize)
}