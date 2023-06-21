import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Customed imports
import { useAddTypeOfLimit, useGetAllTypeOfLimit, useUpdateTypeOfLimit } from '@/hooks/catalogs/typeOfLimit'
import { useDeleteTypeOfLimit } from '@/hooks/catalogs/typeOfLimit/useDelete'
import AddEditModal from '@/views/components/modals/add-edit-modal'
import DeleteModal from '@/views/components/modals/delete-modal'

export interface ITypes {
  id: number
  name: string
}

const TypesOFLimit = () => {
  // Handle Data
  const [selectedType, setSelectedType] = useState<ITypes | null>(null)
  const [currentType, setCurrentType] = useState<ITypes | null>(null)
  const [typeToDelete, setTypeToDelete] = useState<number>(0)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  //Hooks
  const { deleteTypeOfLimit: deleteTypeOfLimitById } = useDeleteTypeOfLimit()
  const { addTypeOfLimit: saveTypeOfLimit } = useAddTypeOfLimit()
  const { typesOfLimits: types, getAllTypeOfLimit } = useGetAllTypeOfLimit()
  const { updateTypeOfLimit } = useUpdateTypeOfLimit()

  // Handle Alerts
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //edit modal
  const [value, setValue] = useState('')

  const triggerAlert = (type: string, text: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText(text)
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error-alert':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn-alert':
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

  const handleEditType = (type: ITypes) => {
    setCurrentType(type)
    setValue(type.name)
    setSelectedType(null)
    setOpenEdit(true)
  }

  const handleDeleteType = (id: number) => {
    setTypeToDelete(id)
    setSelectedType(null)
    setOpenDelete(true)
  }

  const addTypeOfLimit = async (value: string) => {
    const result = await saveTypeOfLimit({
      name: value
    })
    if (result) {
      triggerAlert('success', 'NEW TYPE ADDED')
      getAllTypeOfLimit()
    }
    setOpenAdd(false)
  }

  const editTypeOfLimit = async (value: string) => {
    if (currentType) {
      const result = await updateTypeOfLimit(currentType.id, {
        name: value
      })
      if (result) {
        triggerAlert('success', 'CHANGES SAVED')
        getAllTypeOfLimit()
      }
    }
    setOpenEdit(false)
  }

  const deleteTypeOfLimit = async () => {
    const result = await deleteTypeOfLimitById(typeToDelete)
    if (result) {
      triggerAlert('success', 'DELETED')
      getAllTypeOfLimit()
    }
    setOpenDelete(false)
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
        <div className='inner-container-long'>
          <div className='header-block'>
            <div className='header-icon'>
              <Icon className='icon' icon='material-symbols:bar-chart' />
            </div>
            <div className='content'>
              <div className='title'>Types of limit ({types.length})</div>
              <div className='description'>You can add a type by clicking the plus button.</div>
            </div>
            <div className='add-btn'>
              <Icon
                icon='mdi:plus-circle'
                onClick={() => {
                  setOpenAdd(true)
                }}
              />
            </div>
          </div>
          <div className='block-list'>
            {types.map(type => {
              const showActions = type === selectedType

              return (
                <div className='list-item' key={type.id}>
                  <div className='item-name'>{type.name}</div>
                  <div
                    className='item-menu'
                    onClick={() => {
                      if (showActions) {
                        setSelectedType(null)
                      } else {
                        setSelectedType(type)
                      }
                    }}
                  >
                    <Icon icon='mdi:dots-vertical' />
                    {showActions && (
                      <div className='actions-menu'>
                        <div className='menu-option' onClick={() => handleEditType(type)}>
                          Edit
                        </div>
                        <div className='menu-option' onClick={() => handleDeleteType(type.id)}>
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
          openModal={openAdd}
          onSubmit={addTypeOfLimit}
          onClose={() => {
            setOpenAdd(false)
          }}
          title='Add Type of limit'
          label='Type of limit'
          actionBtnText='CREATE'
          value={value}
          setValue={setValue}
        />

        <AddEditModal
          openModal={openEdit}
          onSubmit={editTypeOfLimit}
          onClose={() => {
            setOpenEdit(false)
          }}
          title='Edit Type of limit'
          label='Type of limit'
          actionBtnText='EDIT'
          value={value}
          setValue={setValue}
        />

        <DeleteModal
          openModal={openDelete}
          onCloseModal={() => {
            setOpenDelete(false)
          }}
          onDelete={deleteTypeOfLimit}
          textItem='Type of limit'
        />
      </div>
    </>
  )
}
export default TypesOFLimit
