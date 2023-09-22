

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