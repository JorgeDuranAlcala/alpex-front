const mockData = [
  {
    id: "06003_1",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  },
  {
    id: "06003_2",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  },
  {
    id: "06003_3",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  },
  {
    id: "06003_4",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  },
  {
    id: "06003_5",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  },
  {
    id: "06003_6",
    valfis: "000,000,000.00",
    nomEnt:"9",
    nomMun:"14",
    type:"Propiedad Federal",
    typology: 'Oficinas en General',
    surface: '26,356.09 m2',
    zonacresta: "10"
  }
];

export const getPropertiesMockFunc = async () => {

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { data: mockData };
};
