export interface BankDto {
    id: string
    capacity: string;
    location: string;
    bank: string;
    beneficiary: string;
    accountNumber: string;
    swift: string;
    aba: string;
    clabe: string;
    currency: string;
    intermediary: string;
    furtherAccountInfo: string;
}


export interface BankDeleteDto {
    idDeleteList: number[]
}

export interface BankInfoDto {
    count: number
    page: number
    take: number
    pages: number
    next: string
    prev: string
}

export type BankFiltersDto = {
    type: string
    value: string
    subtype?: string
    text?: string
    unDeleteable?: boolean
}

export interface BankPaginationDto {
    filters: BankFiltersDto[]
    info: BankInfoDto
}