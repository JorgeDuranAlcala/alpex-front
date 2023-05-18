import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

export interface ICountries {
  id: number
  name: string
}

export interface ICurrencies {
  id: number
  currency: string
}

const CountriesCurrencies = () => {

  // Handle Data
  const [countries, setCountries] = useState<ICountries[]>([])
  const [selectedCountry, setSelectedCountry] = useState<ICountries | null>(null);
  const [currentCountry, setCurrentCountry] = useState<ICountries | null>(null);
  const [countryToDelete, setCountryToDelete] = useState<number | undefined>(0)

  const [currencies, setCurrencies] = useState<ICurrencies[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrencies | null>(null);
  const [currentCurrency, setCurrentCurrency] = useState<ICurrencies | null>(null);
  const [currencyToDelete, setCurrencyToDelete] = useState<number | undefined>(0)

  const getCountries = () => { //Call to edit broker service
    const data: ICountries[] = [
      { id: 1, name: 'México' },
      { id: 2, name: 'United States' },
      { id: 3, name: 'Dominican Republic' },
      { id: 4, name: 'Brazil' },
    ]

    return data
  }

  const getCurrencies = () => { //Call to edit broker service
    const data: ICurrencies[] = [
      { id: 1, currency: 'MX' },
      { id: 2, currency: 'USD' },
      { id: 3, currency: 'DOP' },
      { id: 4, currency: 'BRL' },
    ]

    return data
  }

  const handleEditCountry = (country: ICountries) => {

    setCurrentCountry(country)
    setSelectedCountry(null);

    // setOpenEdit(true)
  }


  const handleDeleteCountry = (id: number | undefined) => {
    setCountryToDelete(id);
    setSelectedCountry(null);

    // setOpenDelete(true);
  }

  const handleEditCurrency = (newCurrency: ICurrencies) => {

    setCurrentCurrency(newCurrency)
    setSelectedCurrency(null);

    // setOpenEdit(true)
  }


  const handleDeleteCurrency = (id: number | undefined) => {
    setCurrencyToDelete(id);
    setSelectedCurrency(null);

    // setOpenDelete(true);
  }



  const editCountry = () => {

    console.log(currentCountry)
  }

  const deleteCountry = () => {
    console.log(countryToDelete)
  }

  const editCurrency = () => {

    console.log(currentCurrency)
  }

  const deleteCurrency = () => {

    console.log(currencyToDelete)
  }


  // const getCurrencies = () => { //Call to add broker service
  //   console.log("call add reinsurer service", newReinsurer.id)
  //   setIsReinsurerSaved(true)
  // }

  useEffect(() => {
    setCountries(getCountries)
    setCurrencies(getCurrencies)

    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='country-currencies-wrapper'>
        <div className="inner-container">
          <div className="header-block">
            <div className='header-icon'>
              <Icon className='icon' icon='mdi:map-marker' />
            </div>
            <div className='content'>
              <div className='title'>
                Countries ({countries.length})
              </div>
              <div className='description'>
                You can add a country by clicking the plus button.
              </div>
            </div>
            <div className='add-btn'>
              <Icon icon='mdi:plus-circle' />
            </div>
          </div>
          <div className="block-list">
            {countries.map((country) => {
              const showActions = country === selectedCountry;

              return (
                <>

                  <div className="list-item">
                    <div className="item-name" key={country.id}>
                      {country.name}
                    </div>
                    <div className="item-menu" onClick={() => {
                      if (showActions) {
                        setSelectedCountry(null);
                      } else {
                        setSelectedCountry(country);
                      }
                    }}
                    >
                      <Icon icon='mdi:dots-vertical' />
                      {showActions &&
                        <div className='actions-menu'>
                          <div className='menu-option' onClick={() => handleEditCountry(country)}>
                            Edit
                          </div>
                          <div className='menu-option' onClick={() => handleDeleteCountry(country.id)}>
                            Delete
                          </div>
                        </div>}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="inner-container">
          <div className="header-block">
            <div className='header-icon'>
              <Icon  className='icon' icon='solar:dollar-minimalistic-bold' />
            </div>
            <div className='content'>
              <div className='title'>
                Currencies ({currencies.length})
              </div>
              <div className='description'>
                You can add a currency by clicking the plus button.
              </div>
            </div>
            <div className='add-btn'>
              <Icon icon='mdi:plus-circle' />
            </div>
          </div>
          <div className="block-list">
            {currencies.map((currency) => {
              const showActions = currency === selectedCurrency;

              return (
                <>

                  <div className="list-item">
                    <div className="item-name" key={currency.id}>
                      {currency.currency}
                    </div>
                    <div className="item-menu" onClick={() => {
                      if (showActions) {
                        setSelectedCurrency(null);
                      } else {
                        setSelectedCurrency(currency);
                      }
                    }}
                    >
                      <Icon icon='mdi:dots-vertical' />
                      {showActions &&
                        <div className='actions-menu'>
                          <div className='menu-option' onClick={() => handleEditCurrency(currency)}>
                            Edit
                          </div>
                          <div className='menu-option' onClick={() => handleDeleteCurrency(currency.id)}>
                            Delete
                          </div>
                        </div>}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>


      </div>
    </>
  )
}
export default CountriesCurrencies
