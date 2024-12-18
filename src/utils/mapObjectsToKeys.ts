export function mapObjectsToKeys<T extends { id: string }>(
  items: T[]
): { [key: string]: T } {
  return items.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr,
    };
  }, {});
}
