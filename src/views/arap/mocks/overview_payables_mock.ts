/*
[
  '{{repeat(5)}}',
  {
    amount_paid: '{{floating(1000000, 99999999, 2)}}',
    currency: '{{random("USD")}}',
    capability_name: '{{company()}}',
    pmt_date: '{{date(new Date(2018, 0, 1), new Date(), "dd/MM/YYYY")}}',
    account: 'Insured {{company()}}',
    origin_acct: '000{{index(78435)}}',
    transactionId: '{{random("DYN", "REC", "INST")}}000{{index(78435)}}',
    user: '{{firstName()}} {{surname()}}'
  }
]
*/

import { PayableGrid } from "../overview/interfaces/overview/PayableGrid";

export const overview_payables_mock: PayableGrid['payableGridList'] = [
  {
    "amount_paid": 45272562.1,
    "currency": "USD",
    "capability_name": "Zytrek",
    "pmt_date": "05/07/2023",
    "account": "Insured Techade",
    "origin_acct": 78435,
    "transactionId": "DYN00078435",
    "user": "Oneill Carver"
  },
  {
    "amount_paid": 26502993.79,
    "currency": "USD",
    "capability_name": "Geekular",
    "pmt_date": "01/08/2023",
    "account": "Insured Ultrimax",
    "origin_acct": 78436,
    "transactionId": "INST00078436",
    "user": "Herring Bates"
  },
  {
    "amount_paid": 4737477.77,
    "currency": "USD",
    "capability_name": "Medalert",
    "pmt_date": "07/08/2021",
    "account": "Insured Acusage",
    "origin_acct": 78437,
    "transactionId": "DYN00078437",
    "user": "Shields Clayton"
  },
  {
    "amount_paid": 6828172.61,
    "currency": "USD",
    "capability_name": "Genesynk",
    "pmt_date": "01/05/2019",
    "account": "Insured Exotechno",
    "origin_acct": 78438,
    "transactionId": "INST00078438",
    "user": "Brianna Shaffer"
  },
  {
    "amount_paid": 81762993.88,
    "currency": "USD",
    "capability_name": "Ziggles",
    "pmt_date": "07/09/2022",
    "account": "Insured Optyk",
    "origin_acct": 78439,
    "transactionId": "INST00078439",
    "user": "Jenifer Salinas"
  }
]
