export const removePropertyEmpty = (data: Record<string, unknown>) => {
  return Object.entries(data).reduce(
    (result, [key, value]) => (!!value ? { ...result, [key]: value } : result),
    {},
  );
};
