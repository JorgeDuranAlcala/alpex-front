import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//customed imports
import AddEditModal from '@/views/components/modals/add-edit-modal'
import DeleteModal from '@/views/components/modals/delete-modal'

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

  //Handle Modals
  const [openAddCurrency, setOpenAddCurrency] = useState(false)
  const [openEditCurrency, setOpenEditCurrency] = useState(false)
  const [openDeleteCurrency, setOpenDeleteCurrency] = useState(false)

  const [openAddCountry, setOpenAddCountry] = useState(false)
  const [openEditCountry, setOpenEditCountry] = useState(false)
  const [openDeleteCountry, setOpenDeleteCountry] = useState(false)

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
    setOpenEditCountry(true)
  }


  const handleDeleteCountry = (id: number | undefined) => {
    setCountryToDelete(id);
    setSelectedCountry(null);
    setOpenDeleteCountry(true);
  }

  const handleEditCurrency = (newCurrency: ICurrencies) => {

    setCurrentCurrency(newCurrency)
    setSelectedCurrency(null);
    setOpenEditCurrency(true)
  }


  const handleDeleteCurrency = (id: number | undefined) => {
    setCurrencyToDelete(id);
    setSelectedCurrency(null);
    setOpenDeleteCurrency(true);
  }


  const addCountry = (value: string) => {
    const newCountry = { id: countries.length, name: value }
    setCountries(prevCountries => [...prevCountries, newCountry]);
    setOpenAddCountry(false)
  };

  const editCountry = (value: string) => {
    if (currentCountry) {
      setCountries(prevCountries =>
        prevCountries.map(country => {
          if (country.id === currentCountry.id) {
            return { ...country, name: value };
          }

          return country;
        })
      );
    }
    setOpenEditCountry(false)
  };

  const deleteCountry = () => {
    setCountries(prevCountries =>
      prevCountries.filter(country => country.id !== countryToDelete)
    );
    setOpenDeleteCountry(false)
  };



  const addCurrency = (value: string) => {

    const newCurrency = { id: currencies.length, currency: value }
    setCurrencies(prevCurrencies => [...prevCurrencies, newCurrency]);
    setOpenAddCurrency(false)
  }

  const editCurrency = (value: string) => {
    if (currentCurrency) {
      setCurrencies(prevCurrencies =>
        prevCurrencies.map(currency => {
          if (currency.id === currentCurrency.id) {
            return { ...currency, currency: value };
          }

          return currency;
        })
      );
    }
    setOpenEditCurrency(false)
  }

  const deleteCurrency = () => {
    setCurrencies(prevCurrencies =>
      prevCurrencies.filter(currency => currency.id !== currencyToDelete)
    );

    setOpenDeleteCurrency(false)
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
              <Icon
                icon='mdi:plus-circle'
                onClick={() => {
                  setOpenAddCountry(true)
                }}
              />
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
              <Icon className='icon' icon='solar:dollar-minimalistic-bold' />
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
              <Icon
                icon='mdi:plus-circle'
                onClick={() => {
                  setOpenAddCurrency(true)
                }}
              />
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
        <AddEditModal
          openModal={openAddCurrency}
          onSubmit={addCurrency}
          onClose={() => { setOpenAddCurrency(false) }}
          title="Add new Currency"
          label='New Currency'
          actionBtnText='CREATE'
        />
        <AddEditModal
          openModal={openAddCountry}
          onSubmit={addCountry}
          onClose={() => { setOpenAddCountry(false) }}
          title="Add new Country"
          label='New Country'
          actionBtnText='CREATE'
        />
        <AddEditModal
          openModal={openEditCurrency}
          onSubmit={editCurrency}
          onClose={() => { setOpenEditCurrency(false) }}
          title="Edit Currency"
          label='Type a Currency'
          actionBtnText='EDIT'
        />
        <AddEditModal
          openModal={openEditCountry}
          onSubmit={editCountry}
          onClose={() => { setOpenEditCountry(false) }}
          title="Edit Country"
          label='Type a country'
          actionBtnText='EDIT'
        />


        <DeleteModal
          openModal={openDeleteCurrency}
          onClose={() => {
            setOpenDeleteCurrency(false)
          }}
          onDelete={deleteCurrency}
          textItem='Currency'
        />
        <DeleteModal
          openModal={openDeleteCountry}
          onClose={() => {
            setOpenDeleteCountry(false)
          }}
          onDelete={deleteCountry}
          textItem='Country'
        />

      </div>
    </>
  )
}
export default CountriesCurrencies
