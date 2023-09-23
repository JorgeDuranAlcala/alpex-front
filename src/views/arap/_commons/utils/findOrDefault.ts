interface FindOrDefaultProps {
  items: { [key: string]: any }[]
  key: string
  value: string
  match: string
  defaultValue: any
}
export const findOrDefault = ({ items, key, match, value, defaultValue }: FindOrDefaultProps) => {
  return items.find(items => items[key] === match)?.[value] || defaultValue
}
