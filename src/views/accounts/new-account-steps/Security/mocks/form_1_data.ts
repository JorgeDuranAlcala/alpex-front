
export interface MockBasicInfo {
  insured: string,
  country: string,
  broker: string,
  brokerContact: string,
  brokerContactEmail: string,
  brokerContactPhone: string,
  brokerContactCountry: string,
  cedant: string,
  cedantContact: string,
  cedantContactEmail: string,
  cedantContactPhone: string,
  cedantContactCountry: string,
  lineOfBusiness: string,
  underwriter: string,
  leadUnderwriter: string,
  technicalAssistant: string
  industryCode: string,
  riskActivity: string,
  riskClass: string,
  receptionDate: string | null,
  effectiveDate: string | null,
  expirationDate: string | null
}

export interface MockPlacementStructure {
  currency: string,
  typeOfLimit: string,
  exchangeRate: number,
  attachmentPoint: number,
  frontingFee: number,
  grossPremium: number,
  limit: number,
  netPremium: number,
  reinsuranceBrokerage: number,
  sir: number,
  taxes: number,
  total: number,
  reinsuranceBrokerageP: number,
  taxesP: number,
  frontingFeeP: number,


}

export interface MockFormData {
  form1: {
    basicInfo: MockBasicInfo,
    placementStructure: MockPlacementStructure,
    userFile: File[],
    id: number,
  }
}

const form1: MockFormData = {
  form1: {
    basicInfo: {
      insured: "Nombre del asegurado",
      country: "País",
      broker: "Nombre del broker",
      brokerContact: "Contacto del broker",
      brokerContactEmail: "correo@broker.com",
      brokerContactPhone: "+1234567890",
      brokerContactCountry: "País del broker",
      cedant: "Nombre del cedente",
      cedantContact: "Contacto del cedente",
      cedantContactEmail: "correo@cedente.com",
      cedantContactPhone: "+9876543210",
      cedantContactCountry: "País del cedente",
      lineOfBusiness: "Línea de negocio",
      underwriter: "Suscriptor",
      leadUnderwriter: "Suscriptor principal",
      technicalAssistant: "Asistente técnico",
      industryCode: "Código de la industria",
      riskActivity: "Actividad de riesgo",
      riskClass: "Clase de riesgo",
      receptionDate: "2023-06-25",
      effectiveDate: "2023-07-01",
      expirationDate: "2024-06-30"
    },
    placementStructure: {
      currency: "Moneda",
      typeOfLimit: "Tipo de límite",
      exchangeRate: 1.2,
      attachmentPoint: 100000,
      frontingFee: 5000,
      grossPremium: 20000,
      limit: 500000,
      netPremium: 15000,
      reinsuranceBrokerage: 1000,
      sir: 50000,
      taxes: 1500,
      total: 25000,
      reinsuranceBrokerageP: 0.05,
      taxesP: 0.1,
      frontingFeeP: 0.025
    },
    userFile: [/* Array de archivos si corresponde */],
    id: 1
  }
};

const mockFilters = [
  {
    type: "Type 1",
    value: "Value 1",
    subtype: "Subtype 1",
    text: "Text 1",
    unDeleteable: true
  },
  {
    type: "Type 2",
    value: "Value 2",
    subtype: "Subtype 2",
    text: "Text 2",
    unDeleteable: false
  }
];

const mockInformation: {
  insured: string;
  idLineOfBussines: {
    lineOfBussines: string;
  };
  effectiveDate: string;
  expirationDate: string;
}[] = [
    {
      insured: "Insured 1",
      idLineOfBussines: {
        lineOfBussines: "Line of Business 1"
      },
      effectiveDate: "2023-06-25",
      expirationDate: "2023-12-31"
    },
    {
      insured: "Insured 2",
      idLineOfBussines: {
        lineOfBussines: "Line of Business 2"
      },
      effectiveDate: "2023-07-01",
      expirationDate: "2023-12-31"
    }
  ];

const mockAccounts = [
  {
    accounts: [],
    loading: false,
    filters: mockFilters,
    formsData: null,
    id: 1,
    idAccountStatus: {
      status: "Active"
    },
    informations: mockInformation
  },
  {
    accounts: [],
    loading: true,
    filters: [],
    formsData: null,
    id: 2,
    idAccountStatus: {
      status: "Inactive"
    },
    informations: []
  }
];

const mockAccountsInfo = {
  count: 2,
  page: 1,
  take: 10,
  pages: 1,
  next: "",
  prev: ""
};

export const mockAccountsState = {
  formsData: form1,
  current: null,
  accounts: mockAccounts,
  loading: false,
  filters: mockFilters,
  info: mockAccountsInfo,
  temporalFilters: []
};
