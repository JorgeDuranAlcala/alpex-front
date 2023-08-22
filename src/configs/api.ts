// ==== ROLES
export enum ROLES {
  ADMIN = 1,
  LEAD_UNDERWRITER = 2,
  UNDERWRITER = 3,
  TECHNICAL_ASSISTANT = 4
}

// ==== AUTH
export enum AUTH_ROUTES {
  LOGIN = '/auth',
  AUTH_ME = '/auth/me',
  REFRESH_JWT = '/auth/refresh-jwt'
}

// ==== ACCOUNT
export enum ACCOUNT_ROUTES {
  GET_BY_ID = 'account',
  GET_ALL = 'account/all',
  DELETE = 'account/delete',
  DUPLICATE = 'account/duplicate',
  UPDATE_STATUS = 'account/update-status',
  GET_LAST_BY_ID_BROKER = 'account/broker',
  UPDATE_TYPE_LOGO = 'account/update-typelogo'
}

//Comentario
export enum ACCOUNT_COMMENTS {
  ADD = 'account/comment',
  GET_ALL = 'account/comments'
}

//Account History Log
export enum ACCOUNT_HISTORY_LOG_ROUTES {
  GET_BY_ID_ACCOUNT = 'accountHistoryLog'
}

//Discounts
export enum ACCOUNT_DISCOUNT_ROUTERS {
  ADD = 'account/discount/add',
  GET_ALL = 'account/discount',
  UPDATE = 'account/discount',
  DELETE = 'account/discount'
}

export enum ACCOUNT_INFORMATION_ROUTES {
  ADD = 'account/information/add',
  GET = 'account/information',
  UPDATE = 'account/information',
  UPLOAD_FILE = 'account/information/upload-file',
  DELETE_FILE = 'account/information/delete-file',
  GET_FILES = 'account/information/all-doctos',
  GET_FILES_BY_TYPE = 'account/information/doctosByType'
}

export enum ACCOUNT_SECURITY_ROUTES {
  ADD = 'account/security/add',
  GET_BY_ID_ACCOUNT = 'account/security',
  UPDATE = 'account/security/update'
}

export enum ACCOUNT_SECURITY_TOTAL_ROUTES {
  ADD = 'account/securityTotal/add',
  GET_BY_ID_ACCOUNT = 'account/securityTotal',
  UPDATE = 'account/securityTotal/update'
}

export enum ACCOUNT_SUBLIMIT_ROUTES {
  ADD = 'account/sublimit/add',
  GET_BY_ID_ACCOUNT = 'account/sublimit',
  UPDATE = 'account/sublimit/update',
  DELETE = 'account/sublimit/delete'
}

export enum ACCOUNT_STEP_FORM_DELETE_ROUTES {
  DEL = 'account/deleteInfo'
}

// ==== CATALOGS
export enum BROKER_ROUTES {
  GET_ALL = 'catalogs/broker/all',
  GET_BY_ID = 'catalogs/broker',
  ADD = 'catalogs/broker/add',
  UPDATE = 'catalogs/broker',
  GET = 'catalogs/broker',
  DELETE = 'catalogs/broker/delete'
}

export enum CEDANT_ROUTERS {
  GET_ALL = 'catalogs/cedant/all',
  GET_BY_ID = 'catalogs/cedant',
  ADD = 'catalogs/cedant/add',
  UPDATE = 'catalogs/cedant',
  GET = 'catalogs/cedant',
  DELETE = 'catalogs/cedant/delete'
}

export enum BROKER_CONTACT_ROUTERS {
  GET_ALL = 'catalogs/broker-contact/all',
  GET_BY_ID = 'catalogs/broker-contact',
  ADD = 'catalogs/broker-contact/add',
  UPDATE = 'catalogs/broker-contact',
  GET_BY_ID_BROKER = 'catalogs/broker-contact/broker',
  GET = 'catalogs/broker-contact/pagination/broker',
  DELETE = 'catalogs/broker-contact/delete'
}

export enum CEDANT_CONTACT_ROUTERS {
  GET_ALL = 'catalogs/cedant-contact/all',
  GET_BY_ID = 'catalogs/cedant-contact',
  ADD = 'catalogs/cedant-contact/add',
  UPDATE = 'catalogs/cedant-contact',
  GET_BY_ID_CEDANT = 'catalogs/cedant-contact/cedant',
  GET = 'catalogs/cedant-contact/pagination/cedant',
  DELETE = 'catalogs/cedant-contact/delete'
}

export enum COUNTRY_ROUTERS {
  GET_ALL = 'catalogs/country/all',
  GET_BY_ID = 'catalogs/country',
  ADD = 'catalogs/country/add',
  UPDATE = `catalogs/country`,
  DELETE = 'catalogs/country'
}

export enum SUBSCRIPTION_TYPE_ROUTERS {
  GET_ALL = 'catalogs/subscriptionType/all',
  GET_BY_ID = 'catalogs/subscriptionType',
  ADD = 'catalogs/subscriptionType/add',
  UPDATE = `catalogs/subscriptionType`,
  DELETE = 'catalogs/subscriptionType'
}

export enum LANGUAGE_ROUTERS {
  GET_ALL = 'catalogs/language/all',
  GET_BY_ID = 'catalogs/language',
  ADD = 'catalogs/language/add',
  UPDATE = `catalogs/language`,
  DELETE = 'catalogs/language'
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
  UPDATE = 'catalogs/typeOfLimit',
  DELETE = 'catalogs/typeOfLimit'
}

export enum CURRENCY_ROUTES {
  GET_ALL = 'catalogs/currency/all',
  GET_BY_ID = 'catalogs/currency',
  ADD = 'catalogs/currency/add',
  UPDATE = 'catalogs/currency',
  DELETE = 'catalogs/currency'
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
  UPDATE = 'catalogs/reinsuranceCompany',
  GET = 'catalogs/reinsuranceCompany',
  DELETE = 'catalogs/reinsuranceCompany/delete'
}

export enum REINSURANCE_COMPANY_CONTACT_ROUTES {
  GET_ALL = 'catalogs/reinsuranceCompanyContact/all',
  GET_BY_ID = 'catalogs/reinsuranceCompanyContact',
  ADD = 'catalogs/reinsuranceCompanyContact/add',
  UPDATE = 'catalogs/reinsuranceCompanyContact',
  GET_BY_ID_REINSURANCE_COMPANY = 'catalogs/reinsuranceCompanyContact/reinsuranceCompany',
  GET = 'catalogs/reinsuranceCompanyContact/pagination/reinsuranceCompany',
  DELETE = 'catalogs/reinsuranceCompanyContact/delete'
}

export enum REINSURANCE_COMPANY_BINDER_ROUTES {
  GET_ALL = 'catalogs/reinsuranceCompanyBinder/all',
  GET_BY_ID = 'catalogs/reinsuranceCompanyBinder',
  ADD = 'catalogs/reinsuranceCompanyBinder/add',
  UPDATE = 'catalogs/reinsuranceCompanyBinder',
  GET_BY_ID_REINSURANCE_COMPANY = 'catalogs/reinsuranceCompanyBinder/reinsuranceCompany',
  GET = 'catalogs/reinsuranceCompanyBinder/pagination/reinsuranceCompany',
  DELETE = 'catalogs/reinsuranceCompanyBinder/delete'
}

export enum COMPANY_ROUTES {
  GET_ALL = 'catalogs/Company/all',
  GET_BY_ID = 'catalogs/Company',
  ADD = 'catalogs/Company/add',
  UPDATE = 'catalogs/Company',
  ROLES = 'catalogs/role/all'
}

export enum ACCOUNT_TYPE_ROUTES {
  GET_ALL = 'catalogs/account-type/all'
}

export enum RETRO_CEDANT_ROUTES {
  GET_ALL = 'catalogs/retroCedant/all',
  GET_BY_ID = 'catalogs/retroCedant',
  ADD = 'catalogs/retroCedant/add',
  UPDATE = 'catalogs/retroCedant',
  GET = 'catalogs/retroCedant',
  DELETE = 'catalogs/retroCedant/delete'
}

export enum RETRO_CEDANT_CONTACT_ROUTES {
  GET_ALL = 'catalogs/retroCedantContact/all',
  GET_BY_ID = 'catalogs/retroCedantContact',
  ADD = 'catalogs/retroCedantContact/add',
  GET_BY_ID_RETROCEDANT = 'catalogs/retroCedantContact/retroCedant',
  UPDATE = 'catalogs/retroCedantContact',
  GET = 'catalogs/retroCedantContact/pagination/retroCedant',
  DELETE = 'catalogs/retroCedantContact/delete'
}

export enum COVERAGE_ROUTES {
  GET_ALL = 'catalogs/coverage/all',
  CREATE = 'catalogs/coverage/create'
}

export enum INSTALLMENT_ROUTERS {
  GET_ALL = 'account/installment/',
  ADD = 'account/installment/add',
  UPDATE = 'account/installment/update',
  DELETE = 'account/installment/delete'
}

export enum ACCOUNT_STATUS_ROUTERS {
  GET_ALL = 'catalogs/account-status/all',
  GET_BY_ID = 'catalogs/account-status/'
}

export enum ENDORSEMENT_TYPE_ROUTES {
  GET_ALL = 'catalogs/endorsementType/all'
}

export enum ECONOMIC_SECTOR_ROUTES {
  GET_ALL = 'catalogs/economic-sector/all'
}

// ==== USER
export enum USERS_ROUTES {
  GET = 'user',
  ADD = 'user',
  UPDATE = 'user',
  DELETE = 'user/delete'
}

// ==== RECOVERY PASSWORD
export enum RECOVER_PASSWORD_ROUTES {
  NOTIFICATION = 'notification/recovery-password',
  UPDATE = 'user/update-password'
}

//EXCHANGE-RATE
export enum EXCHANGE_RATE {
  PAIR = 'exchange-rate/pair'
}

export enum CHAT_BOT {
  CHAT = 'ai/chat'
}

// ==== ENDORSEMENT
export enum ENDORSEMENT_ROUTES {
  GET_BY_ID_ACCOUNT = 'endorsement/history',
  GET_BY_ID = 'endorsement',
  ADD = 'endorsement/add'
}

// ==== REPORTS
export enum PRINT_ACCOUNT_ROUTES {
  GET_BY_ID_ACCOUNT_LANGUAGE = 'reports/print-report'
}

export enum BOURDEROU_ROUTES {
  DOWNLOAD = 'reports/bourderau/download'
}

export enum REPORTS_ROUTES {
  DOWNLOAD = 'reports/allAccounts'
}

export enum DEBIT_NOTE_ROUTES {
  DOWNLOAD = 'reports/debit-note'
}

// ==== DYNAMIC DATA

export enum DATA_DASHBOARD_ROUTES {
  GET_PRIORITY_PROPERTIES = 'buildings/all',
  GET_CAPACITY_PER_STATES='buildings/top-five'
}

export enum DATA_MAPS_ROUTES {
  GET_ALL_PROPERTIES = 'buildings/all',
}

// ==== ACCOUNT
export enum DATA_PROPERTIES_ROUTES {
  GET_BY_ID = 'buildings/data/get-property-details',
}



// ====

export enum DOCUMENTS_ROUTES {
  GETBYACCOUNTID = 'documents/get/byAccountId',
  MOVEFILE = 'documents/move/file',
  RENAMEFOLDER = 'documents/rename/folder',
  DELETEFILE = 'documents/delete/file',
  DELETEFOLDER = 'documents/delete/folder',
  UPLOADFILE = 'documents/upload',
  CREATEFOLDER = 'documents/create/folder'
}
