/**
 [
  '{{repeat(5)}}',
      {
        amount_received: '{{floating(1000000, 99999999, 2)}}',
        currency: '{{random("USD")}}',
        broker: '{{company()}}',
        pmt_date: '{{date(new Date(2018, 0, 1), new Date(), "dd/MM/YYYY")}}',
        account: 'Insured {{company()}}',
        inst: '{{random("1/4", "1/2", "1/3")}}',
        deposit_acc: '000{{index(78435)}}',
        transactionId:  '{{random("DYN", "REC", "INST")}}000{{index(78435)}}',
        user: '{{firstName()}} {{surname()}}'
      }
]
 */

export const overview_receivables_mock = [
  {
    "amount_received": 3183718.16,
    "currency": "undefined",
    "broker": "Idealis",
    "pmt_date": "31/05/2021",
    "account": "Insured Typhonica",
    "inst": "1/3",
    "deposit_acc": 78435,
    "transactionId": "INST00078435",
    "user": "Tamara Jensen"
  },
  {
    "amount_received": 6125580.29,
    "currency": "undefined",
    "broker": "Golistic",
    "pmt_date": "29/12/2022",
    "account": "Insured Pyramis",
    "inst": "1/2",
    "deposit_acc": 78436,
    "transactionId": "REC00078436",
    "user": "Tracy Anthony"
  },
  {
    "amount_received": 31043762.06,
    "currency": "USD",
    "broker": "Isotrack",
    "pmt_date": "14/02/2020",
    "account": "Insured Comvey",
    "inst": "1/3",
    "deposit_acc": 78437,
    "transactionId": "INST00078437",
    "user": "Horne Boyd"
  },
  {
    "amount_received": 93039577.69,
    "currency": "undefined",
    "broker": "Exoblue",
    "pmt_date": "30/05/2018",
    "account": "Insured Twiist",
    "inst": "1/3",
    "deposit_acc": 78438,
    "transactionId": "INST00078438",
    "user": "Mariana Grimes"
  },
  {
    "amount_received": 80393051.19,
    "currency": "undefined",
    "broker": "Printspan",
    "pmt_date": "02/09/2021",
    "account": "Insured Verton",
    "inst": "1/3",
    "deposit_acc": 78439,
    "transactionId": "REC00078439",
    "user": "Mildred Russell"
  }
]
