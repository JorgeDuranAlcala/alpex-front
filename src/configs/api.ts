// ==== ROLES
export enum ROLES {
  ADMIN = 5,
  LEAD_UNDERWRITER = 6,
  UNDERWRITER = 8,
  TECHNICAL_ASSISTANT = 9
}

// ==== AUTH
export enum AUTH_ROUTES {
  LOGIN = '/auth',
  AUTH_ME = '/auth/me/'
}

// ==== ACCOUNT
export enum ACCOUNT_ROUTES {
  GET_BY_ID = 'account',
  GET_ALL = 'account/all'
}

export enum ACCOUNT_INFORMATION_ROUTES {
  ADD = 'account/information/add',
  GET = 'account/Information',
  UPDATE = 'account/Information'
}

export enum ACCOUNT_SECURITY_ROUTES {
  ADD = 'account/security/add',
  GET_BY_ID_ACCOUNT = 'account/security',
  UPDATE = 'account/security/update'
}

export enum ACCOUNT_SECURITY_TOTAL_ROUTES {
  ADD = 'account/securityTotal/add',
  GET_BY_ID_ACCOUNT = 'account/securityTotal',
  UPDATE = 'account/securityTotal'
}

export enum ACCOUNT_SUBLIMIT_ROUTES {
  ADD = 'account/sublimit/add',
  GET_BY_ID_ACCOUNT = 'account/sublimit',
  UPDATE = 'account/sublimit/update'
}

export enum ACCOUNT_STEP_FORM_DELETE_ROUTES {
  DEL = 'account/deleteInfo'
}

// ==== CATALOGS
export enum BROKER_ROUTES {
  GET_ALL = 'catalogs/broker/all',
  GET_BY_ID = 'catalogs/broker',
  ADD = 'catalogs/broker/add',
  UPDATE = 'catalogs/broker'
}

export enum CEDANT_ROUTERS {
  GET_ALL = 'catalogs/cedant/all',
  GET_BY_ID = 'catalogs/cedant',
  ADD = 'catalogs/cedant/add',
  UPDATE = 'catalogs/cedant'
}

export enum BROKER_CONTACT_ROUTERS {
  GET_ALL = 'catalogs/broker-contact/all',
  GET_BY_ID = 'catalogs/broker-contact',
  ADD = 'catalogs/broker-contact/add',
  UPDATE = 'catalogs/broker-contact',
  GET_BY_ID_BROKER = 'catalogs/broker-contact/broker'
}

export enum CEDANT_CONTACT_ROUTERS {
  GET_ALL = 'catalogs/cedant-contact/all',
  GET_BY_ID = 'catalogs/cedant-contact',
  ADD = 'catalogs/cedant-contact/add',
  UPDATE = 'catalogs/cedant-contact',
  GET_BY_ID_CEDANT = 'catalogs/cedant-contact/cedant'
}

export enum COUNTRY_ROUTERS {
  GET_ALL = 'catalogs/country/all',
  GET_BY_ID = 'catalogs/country',
  ADD = 'catalogs/country/add',
  UPDATE = `catalogs/country`
}

export enum LINE_OF_BUSSINES_ROUTES {
  GET_ALL = 'catalogs/lineOfBussines/all',
  GET_BY_ID = 'catalogs/lineOfBussines',
  ADD = 'catalogs/lineOfBussines/add',
  UPDATE = 'catalogs/lineOfBussines'
}

export enum TYPE_OF_LIMIT_ROUTES {
  GET_ALL = 'catalogs/typeOfLimit/all',
  GET_BY_ID = 'catalogs/typeOfLimit',
  ADD = 'catalogs/typeOfLimit/add',
  UPDATE = 'catalogs/typeOfLimit'
}

export enum CURRENCY_ROUTES {
  GET_ALL = 'catalogs/currency/all',
  GET_BY_ID = 'catalogs/currency',
  ADD = 'catalogs/currency/add',
  UPDATE = 'catalogs/currency'
}

export enum RISK_ACTIVITY_ROUTES {
  GET_ALL = 'catalogs/risk-activity/all',
  GET_BY_ID = 'catalogs/risk-activity/',
  ADD = 'catalogs/risk-activity/add',
  UPDATE = 'catalogs/risk-activity/'
}

export enum REINSURANCE_COMPANY_ROUTES {
  GET_ALL = 'catalogs/reinsuranceCompany/all',
  GET_BY_ID = 'catalogs/reinsuranceCompany',
  ADD = 'catalogs/reinsuranceCompany/add',
  UPDATE = 'catalogs/reinsuranceCompany'
}

export enum COMPANY_ROUTES {
  GET_ALL = 'catalogs/Company/all',
  GET_BY_ID = 'catalogs/Company',
  ADD = 'catalogs/Company/add',
  UPDATE = 'catalogs/Company',
  ROLES = 'catalogs/role/all'
}

export enum RETRO_CEDANT_ROUTES {
  GET_ALL = 'catalogs/retroCedant/all',
  GET_BY_ID = 'catalogs/retroCedant',
  ADD = 'catalogs/retroCedant/add',
  UPDATE = 'catalogs/retroCedant'
}

export enum INSTALLMENT_ROUTERS {
  GET_ALL = 'account/installment/',
  ADD = 'account/installment/add',
  UPDATE = 'account/installment/update'
}

export enum ACCOUNT_STATUS_ROUTERS {
  GET_ALL = 'account/account-status/all',
  GET_BY_ID = 'account/account-status/'
}

// ==== USER
export enum USERS_ROUTES {
  GET = 'user',
  ADD = 'user',
  UPDATE = 'user',
  DELETE = 'user'
}
