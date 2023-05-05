// ** React Imports

// ** MUI Imports
import { GridRowId } from '@mui/x-data-grid'

// // ** Context

/* !! Estas 2 importaciones no son reales por que aun no se ha
 creado la carpeta context/catalogues ni sus archivos !!*/
// import EBrokersTableActionTypes from 'src/context/catalogues/Table/actionTypes'
// import BrokersTableContext from 'src/context/catalogues/Table/reducer'

// ** Services
import brokersService from 'src/services/catalogues/brokers.service'

// ** Custom utilities

const useAccountTable = () => {
  // const { dispatch } = useContext(BrokersTableContext)

  const getAccounts = async () => {
    try {
      const response = await brokersService.getAccounts()

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBroker = async (id: GridRowId) => {
    try {
    console.log("Delete Broker", id)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getAccounts,
    deleteBroker,
  }
}

export default useAccountTable
