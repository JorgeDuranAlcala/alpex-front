export interface ExpertDto {
    id: number;
    acronym: string;
    businessName: string;
    provider: 'Experto';
    rfc: string;
    street: string;
    numExt: string;
    numInt: string;
    suburb: string;
    municipality: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    mainContactEmail: string;
    contactName: string;
    claimsContact: string;
    contractDate: null | string;
    observations: null | string;
}

export interface ExpertsDeleteDto {
    idDeleteList: number[]
}

export interface ExpertsInfoDto {
    count: number
    page: number
    take: number
    pages: number
    next: string
    prev: string
}

export type ExpertsFiltersDto = {
    type: string
    value: string
    subtype?: string
    text?: string
    unDeleteable?: boolean
}

export interface ExpertPaginationDto {
    filters: ExpertsFiltersDto[]
    info: ExpertsInfoDto
}