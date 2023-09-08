/*

https://json-generator.com/#

[
  '{{repeat(50)}}',
      {
        account_id: '{{integer(200, 500)}}',
        capability_id: '{{random(125001, 125002, 125003, 125004, 125005, 125006, 125007, 125008)}}',
        capability_name: function (tags, index) {
          if (this.capability_id === 125001) return 'Broker Jasmine';
          else if (this.capability_id === 125002) return 'Broker Eliot';
          else if (this.capability_id === 125003) return 'Broker ARM SA';
          else if (this.capability_id === 125004) return 'Industires Michiru';
          else if (this.capability_id === 125005) return 'Yamane Corporation';
          else if (this.capability_id === 125006) return 'Roy Campbell';
          else if (this.capability_id === 125007) return 'Broker Evan';
          else if (this.capability_id === 125008) return 'Fernando Herrera';
          else return this.capability_id;

    },
        currency: '{{random("USD", "USD")}}',
        "0_30": '{{random(null, 250000)}}',
        "31_60": function () {
         if (this['0_30'] === null) {
           var random_boolean = Math.random() < 0.5;
           if (random_boolean) {
            return 250000;
           }
         }

          return null;
        },
        "61_90": function () {
         if (this['0_30'] === null && this['31_60'] === null) {
           var random_boolean = Math.random() < 0.5;
           if (random_boolean) {
            return 250000;
           }
         }

          return null;
        },
        "91_120": function () {
         if (this['0_30'] === null && this['31_60'] === null && this['61_90'] === null) {
           var random_boolean = Math.random() < 0.5;
           if (random_boolean) {
            return 250000;
           }
         }

          return null;
        },
        "120": function () {
         if (this['0_30'] === null && this['31_60'] === null && this['61_90'] === null && this['91_120'] === null) {
            return 250000;
         }

          return null;
        },
        total_debt: '{{random("1000000", "2000000", "3500000")}}',
        paid_percent: '{{random( 15, 25, 50, 75, 95)}}'
      }
]


*/

import { ReceivableGrid } from "../receivable/interfaces/ReceivableGrid";

export const receivables_mock: ReceivableGrid['receivableGridList'] = [
  {
    "120": null,
    "account_id": 350,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 343,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 310,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 286,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 466,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 479,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 438,
    "capability_id": 125002,
    "capability_name": "Broker Eliot",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 474,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 322,
    "capability_id": 125006,
    "capability_name": "Roy Campbell",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 373,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 241,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 328,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 343,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 469,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 475,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 274,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 214,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 241,
    "capability_id": 125003,
    "capability_name": "Broker ARM SA",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 315,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 350,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 376,
    "capability_id": 125004,
    "capability_name": "Industires Michiru",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 359,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 211,
    "capability_id": 125003,
    "capability_name": "Broker ARM SA",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 426,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 267,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 245,
    "capability_id": 125001,
    "capability_name": "Broker Jasmine",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 3500000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 482,
    "capability_id": 125006,
    "capability_name": "Roy Campbell",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 373,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 275,
    "capability_id": 125006,
    "capability_name": "Roy Campbell",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 270,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 451,
    "capability_id": 125006,
    "capability_name": "Roy Campbell",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 488,
    "capability_id": 125002,
    "capability_name": "Broker Eliot",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 227,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 278,
    "capability_id": 125004,
    "capability_name": "Industires Michiru",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 421,
    "capability_id": 125002,
    "capability_name": "Broker Eliot",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 478,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 201,
    "capability_id": 125002,
    "capability_name": "Broker Eliot",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 417,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 394,
    "capability_id": 125007,
    "capability_name": "Broker Evan",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 362,
    "capability_id": 125003,
    "capability_name": "Broker ARM SA",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 498,
    "capability_id": 125005,
    "capability_name": "Yamane Corporation",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 467,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 454,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 245,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 393,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 1000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 268,
    "capability_id": 125006,
    "capability_name": "Roy Campbell",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 411,
    "capability_id": 125002,
    "capability_name": "Broker Eliot",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 341,
    "capability_id": 125004,
    "capability_name": "Industires Michiru",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 450,
    "capability_id": 125008,
    "capability_name": "Fernando Herrera",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 215,
    "capability_id": 125003,
    "capability_name": "Broker ARM SA",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 95
  }
]
