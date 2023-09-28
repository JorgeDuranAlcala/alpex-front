export const notNull = (data: number | string | null): string | null => {

  if (data && data !== 'null') {
    return data.toString();
  }

  return null
}