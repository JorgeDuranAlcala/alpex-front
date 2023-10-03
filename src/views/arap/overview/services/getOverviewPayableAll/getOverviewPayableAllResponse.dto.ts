export interface GetOverviewPayableAllResponseDto {
    results: Result[];
    info:    Info;
}

export interface Info {
    count: number;
    page:  number;
    take:  number;
    pages: number;
    next:  null;
    prev:  null;
}

export interface Result {
    amountPaid:     string;
    currency:       string;
    capabilityName: string;
    pmtDate:        Date;
    account:        string;
    originAcct:     string;
    transactionId:  string;
    user:           string;
}