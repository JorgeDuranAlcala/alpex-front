export interface AdjusterDto {
    id: number;
    acronym: string;
    businessName: string;
    provider: 'Ajustador';
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


export interface AdjustersDeleteDto {
    idDeleteList: number[]
}

export interface AdjusterInfoDto {
    count: number
    page: number
    take: number
    pages: number
    next: string
    prev: string
}

export type AdjusterFiltersDto = {
    type: string
    value: string
    subtype?: string
    text?: string
    unDeleteable?: boolean
}

export interface AdjusterPaginationDto {
    filters: AdjusterFiltersDto[]
    info: AdjusterInfoDto
}