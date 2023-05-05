export function queryBuilder(data: any, route: string) {
  const query = Object.keys(data)
    .map(function (key) {
      return [data[key].type, data[key].value].map(encodeURIComponent).join('=')
    })
    .join('&')

  return route + '?' + query
}
