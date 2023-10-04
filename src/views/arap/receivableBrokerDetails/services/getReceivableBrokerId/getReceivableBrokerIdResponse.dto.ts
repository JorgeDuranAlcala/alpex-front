export interface GetReceivableBrokerIdResponseDto {
    BrokerInfo: BrokerInfo[];
    BrokerEstructureInfo: BrokerEstructureInfo[];
}

export interface BrokerInfo {
    logourl:             string;
    name:                string;
    address:             string;
    phone:               string;
    email:               string;
}

export interface BrokerEstructureInfo {
    insuredId:           number;
    insuredName:         string;
    AccountingStructure: AccountingStructureResponseDto;
    infoInstallment:     PaymentInstallmentResponseDto[];
}

export interface AccountingStructureResponseDto {
    date:                        Date;
    netPremium:                  string;
    taxesAmount:                 string;
    taxesPercent:                string;
    reinsuranceBrokerageAmount:  string;
    reinsuranceBrokeragePercent: string;
    frontingFeeAmount:           string;
    frontingFeePercent:          string;
    discountsAmount:             string;
    discountsPercent:            string;
    
    netPremiumReinsurance?:       string;
    dynamicCommissionAmount?:     string;
    dynamicCommissionPercent?:    string;
}

export interface PaymentInstallmentResponseDto {
    id:                     number;
    balanceDue:             string;
    paymentPercentage:      number;
    settlementDueDate:      Date;
    premiumPaymentWarranty: number;
    createdAt:              Date;
    updatedAt:              Date;
    active:                 boolean;
}
