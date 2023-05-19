import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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

    // setOpenEdit(true)
  }


  const handleDeleteType = (id: number | undefined) => {
    setTypeToDelete(id);
    setSelectedType(null);

    // setOpenDelete(true);
  }

  const editCountry = () => {

    console.log(currentType)
  }

  const deleteCountry = () => {
    console.log(typeToDelete)
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
              <Icon icon='mdi:plus-circle' />
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

      </div>
    </>
  )
}
export default TypesOFLimit
