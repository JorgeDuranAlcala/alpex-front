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

export const formatUTC = (dateIn: string | Date | null, addOffset = false) => {
  const date = !dateIn ? new Date() : new Date(dateIn)
  if (typeof dateIn === 'string') {
    return date
  } else if (dateIn) {
    const offset = addOffset ? date.getTimezoneOffset() : -date.getTimezoneOffset()
    const offsetDate = new Date()
    offsetDate.setTime(date.getTime() + offset * 60000)

    return offsetDate
  } else {
    return dateIn
  }
}
