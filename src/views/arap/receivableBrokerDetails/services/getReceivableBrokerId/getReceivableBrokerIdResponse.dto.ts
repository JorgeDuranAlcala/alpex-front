export interface GetReceivableBrokerIdResponseDto {
    BrokerInfo: BrokerInfo[];
}

export interface BrokerInfo {
    logourl:             string;
    name:                string;
    address:             string;
    phone:               string;
    email:               string;
    AccountingStructure: AccountingStructure;
    infoInstallment:     InfoInstallment;
}

export interface AccountingStructure {
    date:                        Date;
    netPremiumReinsurance:       string;
    netPremium:                  string;
    taxesAmount:                 string;
    taxesPercent:                string;
    reinsuranceBrokerageAmount:  string;
    reinsuranceBrokeragePercent: string;
    frontingFeeAmount:           string;
    frontingFeePercent:          string;
    discountsAmount:             string;
    discountsPercent:            string;
    dynamicCommissionAmount:     string;
    dynamicCommissionPercent:    string;
}

export interface InfoInstallment {
    premiumPaymentWarranty: number;
    payment:                string;
    balanceDue:             string;
    settlementDueDate:      Date;
}
