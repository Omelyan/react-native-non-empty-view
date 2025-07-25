/**
 * Converts a value into an array.
 * If the value is null or undefined, returns an empty array.
 */
export function toArray<T>(arg: T | T[] | null | undefined) {
  return Array.isArray(arg)
    ? arg
    : arg === null || arg === undefined
    ? []
    : [arg];
}
