export function isNil<Value>(
  value: Value,
): value is Extract<Value, null | undefined> {
  return value === null || value === undefined
}
