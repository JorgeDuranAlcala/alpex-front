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
  LOGIN = '/auth'
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
