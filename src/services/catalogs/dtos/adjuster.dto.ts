export interface AdjusterDto {
    id: string;
    siglas: string;
    razonSocial: string;
    proveedor: string;
    estado: string;
    rfc: string;
    calle: string;
    noExterior: number;
    noInterior: number;
    colonia: string;
    municipio: string;
    cp: number;
    telefono: string;
    correoContacto: string;
    nombreContacto: string;
    contactoReporte: string;
    fechaContrato: string;
    observaciones: string;
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