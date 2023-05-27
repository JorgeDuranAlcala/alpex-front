export const timestampToOnlyDate = (date: string): string | undefined => {
  if (date) {
    return date.split('T')[0]
  }
}
