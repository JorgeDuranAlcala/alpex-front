export const timestampToOnlyDate = (date: string): string | undefined => {
  if (date) {
    return date.split('T')[0]
  }
}

export const setDateFilterQuery = (rawFilter: any, filtersArray: any[], nameDate: string) => {
  if (rawFilter.subtype === 'fulldate') {
    filtersArray.push({
      ...rawFilter,
      type: `${nameDate}`
    })
  } else if (rawFilter.subtype === 'month') {
    filtersArray.push({
      ...rawFilter,
      type: `${nameDate}Month`
    })
  } else if (rawFilter.subtype === 'year') {
    filtersArray.push({
      ...rawFilter,
      type: `${nameDate}Year`
    })
  }
}
