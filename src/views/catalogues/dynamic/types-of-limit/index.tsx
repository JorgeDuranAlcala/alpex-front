import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Customed imports
import AddEditModal from '@/views/components/modals/add-edit-modal'
import DeleteModal from '@/views/components/modals/delete-modal'

export interface ITypes {
  id: number
  name: string
}


const TypesOFLimit = () => {

  // Handle Data
  const [types, setTypes] = useState<ITypes[]>([])
  const [selectedType, setSelectedType] = useState<ITypes | null>(null);
  const [currentType, setCurrentType] = useState<ITypes | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<number | undefined>(0)
  const [openAdd,setOpenAdd]= useState(false)
  const [openEdit,setOpenEdit]= useState(false)
  const [openDelete,setOpenDelete]= useState(false)

  const getTypes = () => { //Call to edit broker service
    const data: ITypes[] = [
      { id: 1, name: 'Type of Limit' },
      { id: 2, name: 'Type of Limit' },
      { id: 3, name: 'Type of Limit' },
      { id: 4, name: 'Type of Limit' },
    ]

    return data
  }

  const handleEditType = (type: ITypes) => {

    setCurrentType(type)
    setSelectedType(null);
    setOpenEdit(true)
  }


  const handleDeleteType = (id: number | undefined) => {
    setTypeToDelete(id);
    setSelectedType(null);
    setOpenDelete(true);
  }

  const addTypeOfLimit = (value: string) => {
    const newType = { id: types.length, name: value }
    setTypes(prevTypes => [...prevTypes, newType]);
    setOpenAdd(false)
  }

  const editTypeOfLimit = (value: string) => {
    if (currentType) {
      setTypes(prevCountries =>
        prevCountries.map(type => {
          if (type.id ===currentType.id) {
            return { ...type, name: value };
          }

          return type;
        })
      );
    }
    setOpenEdit(false)
  }

  const deleteTypeOfLimit = () => {
    setTypes(prevTypes =>
      prevTypes.filter(type => type.id !== typeToDelete)
    );
    setOpenDelete(false)
  }



  // const getCurrencies = () => { //Call to add broker service
  //   console.log("call add reinsurer service", newReinsurer.id)
  //   setIsReinsurerSaved(true)
  // }

  useEffect(() => {
    setTypes(getTypes)

    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='country-currencies-wrapper'>
        <div className="inner-container-long">
          <div className="header-block">
            <div className='header-icon'>
              <Icon  className='icon' icon='material-symbols:bar-chart' />
            </div>
            <div className='content'>
              <div className='title'>
                Types of limit   ({types.length})
              </div>
              <div className='description'>
                You can add a type by clicking the plus button.
              </div>
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
          <div className="block-list">
            {types.map((type) => {
              const showActions = type === selectedType;

              return (
                <>

                  <div className="list-item">
                    <div className="item-name" key={type.id}>
                      {type.name}
                    </div>
                    <div className="item-menu" onClick={() => {
                      if (showActions) {
                        setSelectedType(null);
                      } else {
                        setSelectedType(type);
                      }
                    }}
                    >
                      <Icon icon='mdi:dots-vertical' />
                      {showActions &&
                        <div className='actions-menu'>
                          <div className='menu-option' onClick={() => handleEditType(type)}>
                            Edit
                          </div>
                          <div className='menu-option' onClick={() => handleDeleteType(type.id)}>
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
          openModal={openAdd}
          onSubmit={addTypeOfLimit}
          onClose={() => { setOpenAdd(false) }}
          title="Add Type of limit"
          label='Type of limit'
          actionBtnText='CREATE'
        />

        <AddEditModal
          openModal={openEdit}
          onSubmit={editTypeOfLimit}
          onClose={() => { setOpenEdit(false) }}
          title="Edit Type of limit"
          label='Type of limit'
          actionBtnText='EDIT'
        />


        <DeleteModal
          openModal={openDelete}
          onClose={() => {
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
