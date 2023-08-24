
/*
[
  '{{repeat(25, 40)}}',
      {
        transactionId:  '{{random("DYN", "REC", "INST")}}000{{index(78435)}}',
        capabilityName: '{{random("Broker", "Reinsurer")}}',
        status: '{{random("pending", "unpaid", "paid")}}',
        transaction: '{{random("claim", "reinsurer pay", "broker pay")}}',
        amount: '{{floating(1000000, 99999999, 2)}}',
        currency: '{{random("USD", "MXN", "BR")}}',
        transactionDate: '{{date(new Date(2018, 0, 1), new Date(), "dd/MM/YYYY")}}'
      }
]
*/

import { PaymentsGrid } from "../overview/interfaces/payments/PaymentsGrid";

export const payments_mock: PaymentsGrid['paymentsGridList'] = [
  {
    "transactionId": "DYN00078435",
    "capabilityName": "Broker",
    "status": "pending",
    "transaction": "reinsurer pay",
    "amount": 81299341.89,
    "currency": "BR",
    "transactionDate": "01/12/2021"
  },
  {
    "transactionId": "DYN00078436",
    "capabilityName": "Broker",
    "status": "pending",
    "transaction": "broker pay",
    "amount": 54797577.31,
    "currency": "BR",
    "transactionDate": "31/12/2019"
  },
  {
    "transactionId": "INST00078437",
    "capabilityName": "Broker",
    "status": "pending",
    "transaction": "broker pay",
    "amount": 32262480.3,
    "currency": "USD",
    "transactionDate": "21/08/2023"
  },
  {
    "transactionId": "INST00078438",
    "capabilityName": "Reinsurer",
    "status": "paid",
    "transaction": "claim",
    "amount": 59073954.29,
    "currency": "BR",
    "transactionDate": "21/01/2021"
  },
  {
    "transactionId": "REC00078439",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "reinsurer pay",
    "amount": 33661294.72,
    "currency": "USD",
    "transactionDate": "11/02/2023"
  },
  {
    "transactionId": "INST00078440",
    "capabilityName": "Broker",
    "status": "pending",
    "transaction": "claim",
    "amount": 61511353.01,
    "currency": "MXN",
    "transactionDate": "02/12/2019"
  },
  {
    "transactionId": "REC00078441",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "claim",
    "amount": 5090977.43,
    "currency": "USD",
    "transactionDate": "23/08/2023"
  },
  {
    "transactionId": "REC00078442",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "broker pay",
    "amount": 23722705.31,
    "currency": "USD",
    "transactionDate": "17/03/2020"
  },
  {
    "transactionId": "REC00078443",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "broker pay",
    "amount": 65450414.5,
    "currency": "USD",
    "transactionDate": "06/02/2020"
  },
  {
    "transactionId": "DYN00078444",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "broker pay",
    "amount": 11873582.74,
    "currency": "BR",
    "transactionDate": "10/09/2019"
  },
  {
    "transactionId": "REC00078445",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "reinsurer pay",
    "amount": 20137756.5,
    "currency": "USD",
    "transactionDate": "29/08/2022"
  },
  {
    "transactionId": "INST00078446",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "reinsurer pay",
    "amount": 44155482.01,
    "currency": "MXN",
    "transactionDate": "21/05/2020"
  },
  {
    "transactionId": "INST00078447",
    "capabilityName": "Broker",
    "status": "unpaid",
    "transaction": "claim",
    "amount": 77197796.13,
    "currency": "USD",
    "transactionDate": "02/08/2022"
  },
  {
    "transactionId": "DYN00078448",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "broker pay",
    "amount": 21702226.72,
    "currency": "MXN",
    "transactionDate": "03/09/2019"
  },
  {
    "transactionId": "INST00078449",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "broker pay",
    "amount": 14832878.22,
    "currency": "USD",
    "transactionDate": "13/11/2020"
  },
  {
    "transactionId": "DYN00078450",
    "capabilityName": "Broker",
    "status": "unpaid",
    "transaction": "claim",
    "amount": 51223830.78,
    "currency": "MXN",
    "transactionDate": "10/03/2021"
  },
  {
    "transactionId": "DYN00078451",
    "capabilityName": "Broker",
    "status": "paid",
    "transaction": "broker pay",
    "amount": 72199841.59,
    "currency": "USD",
    "transactionDate": "19/07/2023"
  },
  {
    "transactionId": "DYN00078452",
    "capabilityName": "Broker",
    "status": "unpaid",
    "transaction": "claim",
    "amount": 25117837.43,
    "currency": "USD",
    "transactionDate": "13/09/2020"
  },
  {
    "transactionId": "DYN00078453",
    "capabilityName": "Reinsurer",
    "status": "pending",
    "transaction": "claim",
    "amount": 74154240.76,
    "currency": "BR",
    "transactionDate": "24/04/2018"
  },
  {
    "transactionId": "DYN00078454",
    "capabilityName": "Broker",
    "status": "paid",
    "transaction": "reinsurer pay",
    "amount": 77872322.23,
    "currency": "MXN",
    "transactionDate": "17/12/2019"
  },
  {
    "transactionId": "REC00078455",
    "capabilityName": "Broker",
    "status": "pending",
    "transaction": "claim",
    "amount": 9323529.84,
    "currency": "MXN",
    "transactionDate": "25/12/2019"
  },
  {
    "transactionId": "REC00078456",
    "capabilityName": "Broker",
    "status": "paid",
    "transaction": "claim",
    "amount": 13771110.46,
    "currency": "MXN",
    "transactionDate": "28/11/2019"
  },
  {
    "transactionId": "INST00078457",
    "capabilityName": "Broker",
    "status": "paid",
    "transaction": "broker pay",
    "amount": 55205729.4,
    "currency": "USD",
    "transactionDate": "08/03/2023"
  },
  {
    "transactionId": "DYN00078458",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "reinsurer pay",
    "amount": 2011218.29,
    "currency": "BR",
    "transactionDate": "18/11/2022"
  },
  {
    "transactionId": "DYN00078459",
    "capabilityName": "Reinsurer",
    "status": "paid",
    "transaction": "claim",
    "amount": 32625230.07,
    "currency": "MXN",
    "transactionDate": "16/05/2022"
  },
  {
    "transactionId": "INST00078460",
    "capabilityName": "Broker",
    "status": "paid",
    "transaction": "broker pay",
    "amount": 38753844.86,
    "currency": "USD",
    "transactionDate": "24/08/2019"
  },
  {
    "transactionId": "INST00078461",
    "capabilityName": "Reinsurer",
    "status": "unpaid",
    "transaction": "broker pay",
    "amount": 2501157.26,
    "currency": "BR",
    "transactionDate": "05/11/2020"
  }
]
