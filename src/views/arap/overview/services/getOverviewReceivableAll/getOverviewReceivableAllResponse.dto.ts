export interface GetOverviewReceivableAllResponseDto {
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
    amountReceived: string;
    currency:       string;
    broker:         string;
    pmtDate:        Date;
    account:        string;
    inst:           string;
    depositAcc:     string;
    transactionId:  string;
    user:           string;
}
