import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//customed imports
import { useAddCountry, useDeleteCountry, useGetAllCountries, useUpdateById } from '@/hooks/catalogs/country'
import { useAddCurrency, useDeleteCurrency, useGetAllCurrencies, useUpdateCurrency } from '@/hooks/catalogs/currency'
import AddEditModal from '@/views/components/modals/add-edit-modal'
import DeleteModal from '@/views/components/modals/delete-modal'

export interface ICountries {
  id: number
  name: string
}

export interface ICurrencies {
  id: number
  name: string
}

const CountriesCurrencies = () => {
  // Handle Data
  const [selectedCountry, setSelectedCountry] = useState<ICountries | null>(null)
  const [currentCountry, setCurrentCountry] = useState<ICountries | null>(null)
  const [countryToDelete, setCountryToDelete] = useState<number>(0)

  //const [currencies, setCurrencies] = useState<ICurrencies[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrencies | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState<ICurrencies | null>(null)
  const [currencyToDelete, setCurrencyToDelete] = useState<number>(0)

  //Handle Modals
  const [openAddCurrency, setOpenAddCurrency] = useState(false)
  const [openEditCurrency, setOpenEditCurrency] = useState(false)
  const [openDeleteCurrency, setOpenDeleteCurrency] = useState(false)

  const [openAddCountry, setOpenAddCountry] = useState(false)
  const [openEditCountry, setOpenEditCountry] = useState(false)
  const [openDeleteCountry, setOpenDeleteCountry] = useState(false)

  // Handle Alerts
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //Country hooks
  const { deleteCountry: deleteCountryById } = useDeleteCountry()
  const { saveCountry } = useAddCountry()
  const { countries, getAllCountries } = useGetAllCountries()
  const { update } = useUpdateById()

  //Currency hooks
  const { deleteCurrency: deleteCurrencyById } = useDeleteCurrency()
  const { addCurrency: saveCurrency } = useAddCurrency()
  const { currencies, getAllCurrencies } = useGetAllCurrencies()
  const { updateCurrency } = useUpdateCurrency()

  const triggerAlert = (type: string, text: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText(text)
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break
      default:
        break
    }

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  const handleEditCountry = (country: ICountries) => {
    setCurrentCountry(country)
    setSelectedCountry(null)
    setOpenEditCountry(true)
  }

  const handleDeleteCountry = (id: number) => {
    setCountryToDelete(id)
    setSelectedCountry(null)
    setOpenDeleteCountry(true)
    console.log('delete country')
  }

  const handleEditCurrency = (newCurrency: ICurrencies) => {
    setCurrentCurrency(newCurrency)
    setSelectedCurrency(null)
    setOpenEditCurrency(true)
  }

  const handleDeleteCurrency = (id: number) => {
    setCurrencyToDelete(id)
    setSelectedCurrency(null)
    setOpenDeleteCurrency(true)
  }

  const addCountry = async (value: string) => {
    const result = await saveCountry({
      name: value
    })
    if (result) {
      triggerAlert('success', 'NEW COUNTRY ADDED')
      getAllCountries()
    }
    setOpenAddCountry(false)
  }

  const editCountry = async (value: string) => {
    if (currentCountry) {
      const result = await update(currentCountry.id, {
        name: value
      })
      if (result) {
        triggerAlert('success', 'CHANGES SAVED')
        getAllCountries()
      }
    }
    setOpenEditCountry(false)
  }

  const deleteCountry = async () => {
    const result = await deleteCountryById(countryToDelete)
    if (result) {
      //it needs an alert o message
      console.log('success')
      getAllCountries()
    }
    setOpenDeleteCountry(false)
  }

  const addCurrency = async (value: string) => {
    const result = await saveCurrency({
      name: value
    })
    if (result) {
      triggerAlert('success', 'NEW CURRENCY ADDED')
      getAllCurrencies()
    }
    setOpenAddCurrency(false)
  }

  const editCurrency = async (value: string) => {
    if (currentCurrency) {
      const result = await updateCurrency(currentCurrency.id, {
        name: value
      })
      if (result) {
        triggerAlert('success', 'CHANGES SAVED')
        getAllCurrencies()
      }
    }
    setOpenEditCurrency(false)
  }

  const deleteCurrency = async () => {
    const result = await deleteCurrencyById(currencyToDelete)
    if (result) {
      //it needs an alert o message
      console.log('success')
      getAllCurrencies()
    }
    setOpenDeleteCurrency(false)
  }

  return (
    <>
      <div className='country-currencies-wrapper'>
        {/* TODO:  */}
        {showAlert && (
          <div className={`${alertType} catalogue-item-alert`}>
            <div className='btn-icon'>
              <Icon icon={alertIcon} />
            </div>
            {alertText}
          </div>
        )}
        <div className='inner-container'>
          <div className='header-block'>
            <div className='header-icon'>
              <Icon className='icon' icon='mdi:map-marker' />
            </div>
            <div className='content'>
              <div className='title'>Countries ({countries.length})</div>
              <div className='description'>You can add a country by clicking the plus button.</div>
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
          <div className='block-list'>
            {countries.map(country => {
              const showActions = country === selectedCountry

              return (
                <div className='list-item' key={country.id}>
                  <div className='item-name'>{country.name}</div>
                  <div
                    className='item-menu'
                    onClick={() => {
                      if (showActions) {
                        setSelectedCountry(null)
                      } else {
                        setSelectedCountry(country)
                      }
                    }}
                  >
                    <Icon icon='mdi:dots-vertical' />
                    {showActions && (
                      <div className='actions-menu'>
                        <div className='menu-option' onClick={() => handleEditCountry(country)}>
                          Edit
                        </div>
                        <div className='menu-option' onClick={() => handleDeleteCountry(country.id)}>
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='inner-container'>
          <div className='header-block'>
            <div className='header-icon'>
              <Icon className='icon' icon='solar:dollar-minimalistic-bold' />
            </div>
            <div className='content'>
              <div className='title'>Currencies ({currencies.length})</div>
              <div className='description'>You can add a currency by clicking the plus button.</div>
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
          <div className='block-list'>
            {currencies.map(currency => {
              const showActions = currency === selectedCurrency

              return (
                <div className='list-item' key={currency.id}>
                  <div className='item-name'>{currency.name}</div>
                  <div
                    className='item-menu'
                    onClick={() => {
                      if (showActions) {
                        setSelectedCurrency(null)
                      } else {
                        setSelectedCurrency(currency)
                      }
                    }}
                  >
                    <Icon icon='mdi:dots-vertical' />
                    {showActions && (
                      <div className='actions-menu'>
                        <div className='menu-option' onClick={() => handleEditCurrency(currency)}>
                          Edit
                        </div>
                        <div className='menu-option' onClick={() => handleDeleteCurrency(currency.id)}>
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <AddEditModal
          openModal={openAddCurrency}
          onSubmit={addCurrency}
          onClose={() => {
            setOpenAddCurrency(false)
          }}
          title='Add new Currency'
          label='New Currency'
          actionBtnText='CREATE'
        />
        <AddEditModal
          openModal={openAddCountry}
          onSubmit={addCountry}
          onClose={() => {
            setOpenAddCountry(false)
          }}
          title='Add new Country'
          label='New Country'
          actionBtnText='CREATE'
        />
        <AddEditModal
          openModal={openEditCurrency}
          onSubmit={editCurrency}
          onClose={() => {
            setOpenEditCurrency(false)
          }}
          title='Edit Currency'
          label='Type a Currency'
          actionBtnText='EDIT'
        />
        <AddEditModal
          openModal={openEditCountry}
          onSubmit={editCountry}
          onClose={() => {
            setOpenEditCountry(false)
          }}
          title='Edit Country'
          label='Type a country'
          actionBtnText='EDIT'
        />

        <DeleteModal
          openModal={openDeleteCurrency}
          onCloseModal={() => {
            setOpenDeleteCountry(false)
          }}
          onDelete={deleteCurrency}
          textItem='Currency'
        />
        <DeleteModal
          openModal={openDeleteCountry}
          onCloseModal={() => {
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
