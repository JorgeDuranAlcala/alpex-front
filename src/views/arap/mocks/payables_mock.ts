/*

[
  '{{repeat(50)}}',
      {
        account_id: '{{integer(200, 500)}}',
        capability_id: '{{random(125001, 125002, 125003, 125004, 125005, 125006, 125007, 125008)}}',
        capability_name: function (tags, index) {
          if (this.capability_id === 125001) return 'Everest';
          else if (this.capability_id === 125002) return 'Orion';
          else if (this.capability_id === 125003) return 'Delta RE';
          else if (this.capability_id === 125004) return 'Mercantil';
          else if (this.capability_id === 125005) return 'KEHMA';
          else if (this.capability_id === 125006) return 'Risiko';
          else if (this.capability_id === 125007) return 'Alpine';
          else if (this.capability_id === 125008) return 'Nest';
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

import { PayableGrid } from "@/views/arap/payable/interfaces/PayableGrid";

export const payables_mock: PayableGrid['payableGridList'] = [
  {
    "120": null,
    "account_id": 301,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 248,
    "capability_id": 125003,
    "capability_name": "Delta RE",
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
    "account_id": 430,
    "capability_id": 125008,
    "capability_name": "Nest",
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
    "account_id": 354,
    "capability_id": 125007,
    "capability_name": "Alpine",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 297,
    "capability_id": 125007,
    "capability_name": "Alpine",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 406,
    "capability_id": 125005,
    "capability_name": "KEHMA",
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
    "account_id": 267,
    "capability_id": 125003,
    "capability_name": "Delta RE",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 350,
    "capability_id": 125005,
    "capability_name": "KEHMA",
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
    "account_id": 399,
    "capability_id": 125006,
    "capability_name": "Risiko",
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
    "account_id": 276,
    "capability_id": 125008,
    "capability_name": "Nest",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 25
  },
  {
    "120": null,
    "account_id": 209,
    "capability_id": 125007,
    "capability_name": "Alpine",
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
    "account_id": 337,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 472,
    "capability_id": 125001,
    "capability_name": "Everest",
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
    "account_id": 240,
    "capability_id": 125005,
    "capability_name": "KEHMA",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": 250000,
    "total_debt": 2000000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 324,
    "capability_id": 125005,
    "capability_name": "KEHMA",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 462,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 483,
    "capability_id": 125005,
    "capability_name": "KEHMA",
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
    "account_id": 291,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 295,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 240,
    "capability_id": 125008,
    "capability_name": "Nest",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 337,
    "capability_id": 125008,
    "capability_name": "Nest",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": 250000,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 254,
    "capability_id": 125001,
    "capability_name": "Everest",
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
    "account_id": 321,
    "capability_id": 125003,
    "capability_name": "Delta RE",
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
    "account_id": 263,
    "capability_id": 125004,
    "capability_name": "Mercantil",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 394,
    "capability_id": 125006,
    "capability_name": "Risiko",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 289,
    "capability_id": 125001,
    "capability_name": "Everest",
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
    "account_id": 330,
    "capability_id": 125006,
    "capability_name": "Risiko",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 467,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 204,
    "capability_id": 125005,
    "capability_name": "KEHMA",
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
    "account_id": 370,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 441,
    "capability_id": 125008,
    "capability_name": "Nest",
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
    "account_id": 428,
    "capability_id": 125006,
    "capability_name": "Risiko",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 50
  },
  {
    "120": null,
    "account_id": 468,
    "capability_id": 125007,
    "capability_name": "Alpine",
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
    "account_id": 223,
    "capability_id": 125003,
    "capability_name": "Delta RE",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 366,
    "capability_id": 125008,
    "capability_name": "Nest",
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
    "account_id": 387,
    "capability_id": 125003,
    "capability_name": "Delta RE",
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
    "account_id": 225,
    "capability_id": 125002,
    "capability_name": "Orion",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 1000000,
    "paid_percent": 75
  },
  {
    "120": null,
    "account_id": 274,
    "capability_id": 125006,
    "capability_name": "Risiko",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 244,
    "capability_id": 125008,
    "capability_name": "Nest",
    "currency": "USD",
    "0_30": null,
    "31_60": 250000,
    "61_90": null,
    "91_120": null,
    "total_debt": 2000000,
    "paid_percent": 15
  },
  {
    "120": null,
    "account_id": 422,
    "capability_id": 125003,
    "capability_name": "Delta RE",
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
    "account_id": 383,
    "capability_id": 125001,
    "capability_name": "Everest",
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
    "account_id": 482,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 446,
    "capability_id": 125003,
    "capability_name": "Delta RE",
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
    "account_id": 442,
    "capability_id": 125008,
    "capability_name": "Nest",
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
    "account_id": 269,
    "capability_id": 125004,
    "capability_name": "Mercantil",
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
    "account_id": 473,
    "capability_id": 125002,
    "capability_name": "Orion",
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
    "account_id": 218,
    "capability_id": 125008,
    "capability_name": "Nest",
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
    "account_id": 233,
    "capability_id": 125001,
    "capability_name": "Everest",
    "currency": "USD",
    "0_30": 250000,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 95
  },
  {
    "120": null,
    "account_id": 271,
    "capability_id": 125005,
    "capability_name": "KEHMA",
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
    "account_id": 485,
    "capability_id": 125002,
    "capability_name": "Orion",
    "currency": "USD",
    "0_30": null,
    "31_60": null,
    "61_90": null,
    "91_120": null,
    "total_debt": 3500000,
    "paid_percent": 50
  }
]
