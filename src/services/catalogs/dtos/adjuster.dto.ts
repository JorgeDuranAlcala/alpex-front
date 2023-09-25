

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