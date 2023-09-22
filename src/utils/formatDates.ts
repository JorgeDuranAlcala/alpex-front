export const timestampToOnlyDate = (date: string): string | undefined => {
  if (date) {
    return date.split('T')[0]
  }
}

export const formatDateTemplate = (date: string): string => {
  const dateWithoutTime = date.split('T')[0]
  const dateSplitted = dateWithoutTime.split('-')

  return `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`
}

export const formatDateAmericanTemplate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
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

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (remainingSeconds <= 0 && minutes <= 0) {
    return '00:00'
  }

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const delayMs = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export const isValidDate = (input: string): boolean => {
  const parsedDate = Date.parse(input)

  return !isNaN(parsedDate)
}
