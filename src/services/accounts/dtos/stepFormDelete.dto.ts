export enum TypeForms {
  information = 'information',
  security = 'security',
  securityTotal = 'securityTotal',
  installment = 'installment',
  sublimitDB = 'sublimit'
}

export interface StepFormDeleteDto {
  readonly idAccount: number
  readonly formsToDelete: TypeForms[]
}

export interface StepFormDeleteResponse {
  message: string
}
