import { IAccount } from "src/views/accounts/Table"

const possibleStatuses = ['pending', 'declined', 'bound', 'notMaterialized', 'notTakenUp']

const getRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * possibleStatuses.length)
  
return possibleStatuses[randomIndex]
}

const possibleLob = ['Property', 'Financial Lines', 'Other option']

const getRandomLob = () => {
  const randomIndex = Math.floor(Math.random() * possibleLob.length)
  
    return possibleLob[randomIndex]
}

const getRandomDateInRange = (startDate:any, endDate:any) => {
    const startMillis = startDate.getTime()
    const endMillis = endDate.getTime()
    const randomMillis = startMillis + Math.random() * (endMillis - startMillis)
    
    return new Date(randomMillis)
}

const getFormattedDate = (date:any) => {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    return date.toLocaleDateString('en-EU', options);
};

const addYearsToDate = (date: any, years:any) => {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + years)

    return newDate;
};

const data: IAccount[] = []

for (let index = 1; index <= 200; index++) {
  const id = index.toString().padStart(4, '0')
  const startDate = new Date('2022-01-01')
  const endDate = new Date('2023-12-31')
  const effectiveDate = getRandomDateInRange(startDate, endDate)
  const expirationDate = addYearsToDate(effectiveDate, 1)

  data.push({
    id,
    status: getRandomStatus(),
    insured: 'Jordan Stevenson',
    lob: getRandomLob(),
    effectiveDate: getFormattedDate(effectiveDate),
    expirationDate: getFormattedDate(expirationDate),
  })
}


class AccountService {
  async getAccounts() {
    return data
  }
}

export default new AccountService()