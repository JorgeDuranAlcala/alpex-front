export function fromStateToAbbr(state: string): string {
  const states = new Map([
    ['Aguascalientes', 'AGU'],
    ['Baja California', 'BCN'],
    ['Baja California Sur', 'BCS'],
    ['Campeche', 'CAM'],
    ['Chiapas', 'CHP'],
    ['Chihuahua', 'CHH'],
    ['Ciudad de México', 'CMX'],
    ['Coahuila de Zaragoza', 'COA'],
    ['Colima', 'COL'],
    ['Durango', 'DUR'],
    ['Guanajuato', 'GUA'],
    ['Guerrero', 'GRO'],
    ['Hidalgo', 'HID'],
    ['Jalisco', 'JAL'],
    ['México', 'MEX'],
    ['Michoacán de Ocampo', 'MIC'],
    ['Morelos', 'MOR'],
    ['Nayarit', 'NAY'],
    ['Nuevo León', 'NLE'],
    ['Oaxaca', ' OAX'],
    ['Puebla', 'PUE'],
    ['Querétaro', 'QUE'],
    ['Quintana Roo', 'ROO'],
    ['San Luis Potosí', 'SLP'],
    ['Sinaloa', 'SIN'],
    ['Sonora', 'SON'],
    ['Tabasco', 'TAB'],
    ['Tamaulipas', 'TAM'],
    ['Tlaxcala', 'TLA'],
    ['Veracruz de Ignacio de la Llave', 'VER'],
    ['Yucatán', 'YUC'],
    ['Zacatecas', 'ZAC']
  ])

  const abbreviations = states.get(state) || ''

  return abbreviations
}