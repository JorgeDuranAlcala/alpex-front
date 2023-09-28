export interface GetPayableReinsuredIdResponseDto {
    ReinsurerInfo: ReinsurerInfo[];
}

export interface ReinsurerInfo {
    logourl:             string;
    name:                string;
    address:             string;
    phone:               string;
    email:               string;
    AccountingStructure: AccountingStructure;
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