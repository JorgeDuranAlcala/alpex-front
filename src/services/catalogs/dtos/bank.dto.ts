export interface BankDto {
    id: number
    capacity: string;
    bank: string;
    beneficiary: string;
    accountNumber: number;
    swift: string;
    aba: number;
    clabe: number;
    intermediary: string;
    idCCurrency?: {
        id: number;
        code: string;
        name: string;
        active: boolean;
        country: string;
        createdAt: string;
        updatedAt: string;
    } | undefined;
    idCLocation?: {
        id: number;
        name: string;
        createdAt: string;
        active: boolean;
    } | undefined;
    furtherAccountInfo: string;
    active: boolean,
    createdAt: string,
    updatedAt: string,
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
