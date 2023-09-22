
/*
[
  '{{repeat(5)}}',
      {
        amount_received: '{{floating(1000000, 99999999, 2)}}',
        currency: '{{random("USD")}}',
        capability_name: '{{company()}}',
        pmt_date: '{{date(new Date(2018, 0, 1), new Date(), "dd/MM/YYYY")}}',
        account: 'Insured {{company()}}',
        origin_acct: '000{{index(78435)}}',
        deposit_acct: '000{{index(78435)}}',
        transactionId:  '{{random("DYN", "REC", "INST")}}000{{index(78435)}}',
        user: '{{firstName()}} {{surname()}}'
      }
]
*/

import { DifferenceGrid } from "../overview/interfaces/overview/DifferenceGrid";

export const overview_differences_mock: DifferenceGrid['differenceGridList'] = [
  {
    "amount_received": 5704389.47,
    "currency": "USD",
    "capability_name": "Aquafire",
    "pmt_date": "10/06/2020",
    "account": "Insured Intradisk",
    "origin_acct": 78435,
    "deposit_acct": 78435,
    "transactionId": "REC00078435",
    "user": "Debbie Joyner"
  },
  {
    "amount_received": 28877553.93,
    "currency": "USD",
    "capability_name": "Zanity",
    "pmt_date": "27/03/2022",
    "account": "Insured Klugger",
    "origin_acct": 78436,
    "deposit_acct": 78436,
    "transactionId": "DYN00078436",
    "user": "Angelita Hutchinson"
  },
  {
    "amount_received": 86823231.67,
    "currency": "USD",
    "capability_name": "Kindaloo",
    "pmt_date": "08/01/2019",
    "account": "Insured Enersave",
    "origin_acct": 78437,
    "deposit_acct": 78437,
    "transactionId": "REC00078437",
    "user": "Freeman Durham"
  },
  {
    "amount_received": 3790542.03,
    "currency": "USD",
    "capability_name": "Cormoran",
    "pmt_date": "06/07/2023",
    "account": "Insured Digifad",
    "origin_acct": 78438,
    "deposit_acct": 78438,
    "transactionId": "INST00078438",
    "user": "Lorena Benton"
  },
  {
    "amount_received": 39835765.35,
    "currency": "USD",
    "capability_name": "Sybixtex",
    "pmt_date": "21/07/2019",
    "account": "Insured Applidec",
    "origin_acct": 78439,
    "deposit_acct": 78439,
    "transactionId": "DYN00078439",
    "user": "Livingston Johns"
  }
]
