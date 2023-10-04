export interface GetPayableReinsuredIdResponseDto {
    ReinsurerInfo: ReinsurerInfo[];
    ReinsurerEstructureInfo: ReinsurerEstructureInfo[];
}

export interface ReinsurerInfo {
    logourl:             string;
    name:                string;
    address:             string;
    phone:               string;
    email:               string;
  }
  
  export interface ReinsurerEstructureInfo {
    insuredId:           number;
    insuredName:         string;
    AccountingStructure: AccountingStructureResponseDto;
}
export interface AccountingStructureResponseDto {
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