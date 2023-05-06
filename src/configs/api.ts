export enum ACCOUNT_INFORMATION_ROUTES {
  ADD = 'account/information/add',
  GET = 'account/Information',
  UPDATE = 'account/Information'
}

export enum ACCOUNT_ROUTES {
  GET_BY_ID = 'account',
  GET_ALL = 'account/all'
}

export enum AUTH_ROUTES {
  LOGIN = '/auth',
  AUTH_ME = '/auth/me/'
}

const CATALOGS = 'catalogs'

export enum BROKER_ROUTES {
  GET_ALL = `/${CATALOGS}/broker/all`,
  GET_BY_ID = `/${CATALOGS}/broker/`,
  ADD = `/${CATALOGS}/broker/add`,
  UPDATE = `/${CATALOGS}/broker/`
}

export enum CEDANT_ROUTERS {
  GET_ALL = `/${CATALOGS}/cedant/all`,
  GET_BY_ID = `/${CATALOGS}/cedant/`,
  ADD = `/${CATALOGS}/cedant/add`,
  UPDATE = `/${CATALOGS}/cedant/`
}

export enum BROKER_CONTACT_ROUTERS {
  GET_ALL = `/${CATALOGS}/broker-contact/all`,
  GET_BY_ID = `/${CATALOGS}//broker-contact/`,
  ADD = `/${CATALOGS}/broker-contact/add`,
  UPDATE = `/${CATALOGS}/broker-contact/`,
  GET_BY_ID_BROKER = `/${CATALOGS}/broker-contact/broker/`
}

export enum CEDANT_CONTACT_ROUTERS {
  GET_ALL = `/${CATALOGS}/cedant-contact/all`,
  GET_BY_ID = `/${CATALOGS}/cedant-contact/`,
  ADD = `/${CATALOGS}/cedant-contact/add`,
  UPDATE = `/${CATALOGS}/cedant-contact/`,
  GET_BY_ID_CEDANT = `/${CATALOGS}/cedant-contact/cedant/`
}

export enum USERS_ROUTES {
  GET = 'user'
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
