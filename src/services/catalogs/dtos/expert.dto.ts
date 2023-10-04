export interface ExpertDto {
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