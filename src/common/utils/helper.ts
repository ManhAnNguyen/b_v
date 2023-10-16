export function removePropertyEmpty<T extends object>(data: T) {
  return Object.entries(data).reduce(
    (result, [key, value]) => (!!value ? { ...result, [key]: value } : result),
    {},
  );
}
