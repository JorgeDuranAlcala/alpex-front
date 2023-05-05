export function queryBuilder(data: any, route: string) {
  const query = Object.keys(data)
    .map(function (key) {
      return [key, data[key]].map(encodeURIComponent).join('=')
    })
    .join('&')

  return route + '?' + query
}
