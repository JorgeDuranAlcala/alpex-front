import React, { Fragment, useEffect, useRef, useState } from 'react'

// // ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Tooltip,
  Typography
} from '@mui/material'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

import CustomAlert, { IAlert } from '@/views/custom/alerts'
import Icon from 'src/@core/components/icon'

interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
  setUserFileToDelete: React.Dispatch<React.SetStateAction<any>>
  changeTitle: (change: boolean) => void
  urls: string[]
  isPayments: boolean
}

const FileSubmit: React.FC<UserFileProps> = ({
  setUserFile,
  userFile,
  urls,
  setUserFileToDelete,
  changeTitle,
  isPayments
}) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // saves the row wehen user click on actions button
  const [openDelete, setOpenDelete] = useState(false)
  const fileUrls: string[] = urls
  const [open, setOpen] = useState<boolean>(false)
  const [folderDefault, setFolderDefault] = useState<File[] | null>([])
  const [folders, setFolders] = useState([] as any)
  const [numFolder, setNumFolder] = useState(0)
  const [openFolders, setOpenFolder] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('')
  const [deleteChecks, setDeleteChecks] = useState(false)

  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const handleClick = () => {
    setOpen(!open)
  }

  // const [openMenu, setOpenMenu] = useState(false)
  const onFileChange = function (e: any) {
    e.preventDefault()
    const rawFiles = e.target.files
    const fileSize = rawFiles?.[0]?.size
    const fileName = rawFiles?.[0]?.name
    const maxFileSize = 5 * 1024 * 1024 // 5MB (example maximum file size)

    if (fileSize > maxFileSize) {
      setTimeout(() => {
        setBadgeData({
          message: `FILE "${fileName.toUpperCase()}" EXCEEDS SIZE LIMIT (5MB).`,
          status: 'error',
          theme: 'error',
          open: true,
          icon: (
            <Icon
              style={{
                color: '#FF4D49',
                marginTop: '-1px'
              }}
              icon='jam:alert'
            />
          )
        })
        setTimeout(() => {
          setBadgeData({
            message: '',
            status: undefined,
            icon: undefined
          })
        }, 3000)
      }, 500)
    } else {
      setFile([...file, ...rawFiles])
      setUserFile([...file, ...rawFiles])
    }
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  function removeUrl(index: number): void {
    if (index < 0 || index >= fileUrls.length) {
      return
    }

    fileUrls.splice(index, 1)
  }

  const handlePreview = (e: any, index: number) => {
    e.preventDefault
    const fileToPreview = userFile[index]
    const previewUrl = fileUrls[index] || URL.createObjectURL(fileToPreview)
    window.open(previewUrl, '_blank')
    setSelectedFile(null)
  }

  const handleDownload = (e: any, index: number) => {
    e.preventDefault
    const fileToDownload = file[index]
    const downloadUrl = URL.createObjectURL(fileToDownload)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileToDownload.name
    link.click()
    setSelectedFile(null)
  }

  const handleRemoveFile = (e: any, index: number) => {
    e.preventDefault
    const deletedFile = file.splice(index, 1)
    setFile([...file])
    setUserFile([...file])
    setUserFileToDelete && setUserFileToDelete(deletedFile[0])
    removeUrl(index) // cambiamos la lista de urls cuando se ha borrado sin guardar
    setSelectedFile(null)
    setOpenDelete(false)
  }

  const handleMoveFolder = (e: any) => {
    e.preventDefault
    setOpenFolder(true)
  }

  const handleMoveFolderI = (e: any, folderName: string) => {
    e.preventDefault
    setOpenFolder(true)
    setSelectedFolder(folderName)
  }

  const handleInfo = (e: any, index: number, type: string) => {
    e.preventDefault
    const inner = e.target.innerText
    if (type === 'new') {
      if (inner === 'Final Slip' && folderDefault !== null) {
        folderDefault.push(file[index])
        setFolderDefault([...folderDefault])
      } else {
        const filter = folders.findIndex((x: { name: string }) => x.name === inner)
        folders[filter].files.push(file[index])
        setFolders([...folders])
      }
      file.splice(index, 1)
      setFile([...file])
      setSelectedFile(null)
      setOpenFolder(false)
    } else if (type === 'default') {
      if (inner === 'Final Slip' && folderDefault !== null) {
        folderDefault.push(file[index])
        setFolderDefault([...folderDefault])
      } else {
        const filter = folders.findIndex((x: { name: string }) => x.name === inner)
        folders[filter].files.push(folderDefault![index])
        setFolders([...folders])
      }
      folderDefault!.splice(index, 1)
      setFolderDefault([...folderDefault!])
      setSelectedFile(null)
      setOpenFolder(false)
    } else if (type === 'folders') {
      if (inner === 'Final Slip' && folderDefault !== null) {
        folderDefault.push(selectedFile!)
        setFolderDefault([...folderDefault])
      } else {
        const filter = folders.findIndex((x: { name: string }) => x.name === inner)
        folders[filter].files.push(selectedFile)
      }
      const find = folders.find((y: { name: string }) => y.name === selectedFolder)
      find.files!.splice(index, 1)
      setFolders([...folders])
      setSelectedFile(null)
      setOpenFolder(false)
      setSelectedFolder('')
    }
  }

  const onAddFolder = (e: any) => {
    e.preventDefault
    const nameFolder = 'Folder ' + numFolder
    const idFolder = numFolder
    const addFolder = { id: idFolder, name: nameFolder, files: [] }
    folders.push(addFolder)
    setFolders([...folders])
    const newNum = numFolder + 1
    setNumFolder(newNum)
    console.log(folders)
  }

  const onDeleteFiles = (e: any) => {
    e.preventDefault
    if (!deleteChecks) {
      setDeleteChecks(true)
    } else {
      console.log('ELIMINAR')
    }
  }

  useEffect(() => {
    if (userFile.length > 0) {
      setFile([...userFile])
    }
  }, [userFile])

  useEffect(() => {
    if (file.length > 0) {
      changeTitle(true)
    } else {
      changeTitle(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <Fragment>
      <CustomAlert {...badgeData} />
      <div className='upload-btn'>
        {/* <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}> */}
        <input
          ref={inputRef}
          type='file'
          className='input-file-upload'
          id='input-file-upload'
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        {/* file, render de archivos subidos */}
        {file.length > 0 && (
          <div className='uploaded-files'>
            {file.map((fileElement, index) => {
              const openMenu = fileElement === selectedFile

              return (
                <div key={index} className='file-details'>
                  {deleteChecks && (
                    <input
                      id={'check-' + index}
                      type='checkbox'
                      className='tw-appearance-none tw-indeterminate:bg-gray-300 ...'
                    />
                  )}
                  <Typography className='file-name'>{fileElement?.name}</Typography>
                  <div className='menu-btn'>
                    <IconButton
                      onClick={() => {
                        if (openMenu) {
                          setSelectedFile(null)
                          setOpenFolder(false)
                        } else {
                          setSelectedFile(fileElement)
                        }
                      }}
                    >
                      <Icon icon='mdi:dots-vertical' fontSize={20} />
                    </IconButton>
                    {openMenu && (
                      <div className='menu-options'>
                        <div className='option' onClick={e => handlePreview(e, index)}>
                          Preview
                          <Icon icon={'ic:outline-remove-red-eye'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        <div className='option' onClick={e => handleMoveFolder(e)}>
                          Move to Folder
                          <Icon icon={'ic:baseline-drive-file-move'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        <div className='option' onClick={e => handleDownload(e, index)}>
                          Download
                          <Icon icon={'mdi:download'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        <div className='option' onClick={() => setOpenDelete(true)}>
                          Delete
                          <Icon icon={'ic:outline-delete'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        {openFolders && (
                          <div className='menu-options'>
                            <div key={'option-def'} className='option' onClick={e => handleInfo(e, index, 'new')}>
                              Final Slip
                            </div>
                            {folders.map((folder: { name: string; id: any }) => {
                              return (
                                <div
                                  key={'option-' + folder.id}
                                  className='option'
                                  onClick={e => handleInfo(e, index, 'new')}
                                >
                                  {folder.name}
                                </div>
                              )
                            })}
                          </div>
                        )}
                        <Modal
                          className='delete-modal'
                          open={openDelete}
                          onClose={() => {
                            setOpenDelete(false)
                          }}
                        >
                          <Box className='modal-wrapper'>
                            <HeaderTitleModal>
                              <Typography variant='h6'>Are you sure you want to delete this file?</Typography>
                              <ButtonClose
                                onClick={() => {
                                  setOpenDelete(false)
                                }}
                              >
                                <CloseIcon />
                              </ButtonClose>
                            </HeaderTitleModal>
                            <div className='delete-modal-text'>This action can’t be undone.</div>
                            <Button
                              className='header-modal-btn'
                              variant='contained'
                              onClick={e => handleRemoveFile(e, index)}
                            >
                              DELETE
                            </Button>
                            <Button
                              className='close-modal header-modal-btn'
                              onClick={() => {
                                setOpenDelete(false)
                              }}
                            >
                              CANCEL
                            </Button>
                          </Box>
                        </Modal>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* <label id='label-file-upload' htmlFor='input-file-upload'>
          <Button className='upload-button' onClick={e => onButtonClick(e)} variant='outlined'>
            <div className='btn-icon'>
              <Icon icon='mdi:upload' />
            </div>
            UPLOAD DOCUMENT
          </Button>
        </label> */}
        {/* Buttom file, render de folder default */}
        <div>
          <List component='nav'>
            <ListItem disablePadding className='final-slip'>
              <ListItemButton
                onClick={handleClick}
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Typography sx={{ color: '#FFF' }}>Final Slip</Typography>
                <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} color='#FFFFFF' />
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              {folderDefault && folderDefault.length <= 0 && (
                <List component='div' disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 8 }}>
                      <ListItemIcon sx={{ mr: 4 }}></ListItemIcon>
                      <ListItemText primary='Scheduled' />
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
              {folderDefault && folderDefault.length > 0 && (
                <div className='uploaded-files'>
                  {folderDefault.map((fileElement, index) => {
                    const openMenu = fileElement === selectedFile

                    return (
                      <div key={index} className='file-details'>
                        {deleteChecks && (
                          <input
                            id={'check-' + index}
                            type='checkbox'
                            className='tw-appearance-none tw-indeterminate:bg-gray-300 ...'
                          />
                        )}
                        <Typography className='file-name'>{fileElement?.name}</Typography>
                        <div className='menu-btn'>
                          <IconButton
                            onClick={() => {
                              if (openMenu) {
                                setSelectedFile(null)
                                setOpenFolder(false)
                              } else {
                                setSelectedFile(fileElement)
                              }
                            }}
                          >
                            <Icon icon='mdi:dots-vertical' fontSize={20} />
                          </IconButton>
                          {openMenu && (
                            <div className='menu-options'>
                              <div className='option' onClick={e => handlePreview(e, index)}>
                                Preview
                                <Icon
                                  icon={'ic:outline-remove-red-eye'}
                                  fontSize={24}
                                  color='rgba(87, 90, 111, 0.54)'
                                />
                              </div>
                              <div className='option' onClick={e => handleMoveFolder(e)}>
                                Move to Folder
                                <Icon
                                  icon={'ic:baseline-drive-file-move'}
                                  fontSize={24}
                                  color='rgba(87, 90, 111, 0.54)'
                                />
                              </div>
                              <div className='option' onClick={e => handleDownload(e, index)}>
                                Download
                                <Icon icon={'mdi:download'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                              </div>
                              <div className='option' onClick={() => setOpenDelete(true)}>
                                Delete
                                <Icon icon={'ic:outline-delete'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                              </div>
                              {openFolders && (
                                <div className='menu-options'>
                                  <div
                                    key={'option-def'}
                                    className='option'
                                    onClick={e => handleInfo(e, index, 'default')}
                                  >
                                    Final Slip
                                  </div>
                                  {folders.map((folder: { name: string; id: any }) => {
                                    return (
                                      <div
                                        key={'option-' + folder.id}
                                        className='option'
                                        onClick={e => handleInfo(e, index, 'default')}
                                      >
                                        {folder.name}
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                              <Modal
                                className='delete-modal'
                                open={openDelete}
                                onClose={() => {
                                  setOpenDelete(false)
                                }}
                              >
                                <Box className='modal-wrapper'>
                                  <HeaderTitleModal>
                                    <Typography variant='h6'>Are you sure you want to delete this file?</Typography>
                                    <ButtonClose
                                      onClick={() => {
                                        setOpenDelete(false)
                                      }}
                                    >
                                      <CloseIcon />
                                    </ButtonClose>
                                  </HeaderTitleModal>
                                  <div className='delete-modal-text'>This action can’t be undone.</div>
                                  <Button
                                    className='header-modal-btn'
                                    variant='contained'
                                    onClick={e => handleRemoveFile(e, index)}
                                  >
                                    DELETE
                                  </Button>
                                  <Button
                                    className='close-modal header-modal-btn'
                                    onClick={() => {
                                      setOpenDelete(false)
                                    }}
                                  >
                                    CANCEL
                                  </Button>
                                </Box>
                              </Modal>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Collapse>
          </List>
        </div>
        {/* Buttoms files, render de folders creados */}
        <div>
          {numFolder > 0 &&
            folders.map((folder: { name: string; id: any; files: [] }) => {
              return (
                <div key={'folder' + folder.id}>
                  <List component='nav'>
                    <ListItem disablePadding className='final-slip'>
                      <ListItemButton
                        onClick={handleClick}
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                      >
                        <Typography sx={{ color: '#FFF' }}>{folder.name}</Typography>
                        <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} color='#FFFFFF' />
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      {folder.files && folder.files.length <= 0 && (
                        <List component='div' disablePadding>
                          <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 8 }}>
                              <ListItemIcon sx={{ mr: 4 }}></ListItemIcon>
                              <ListItemText primary='Scheduled' />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      )}
                      {folder.files && folder.files.length > 0 && (
                        <div className='uploaded-files'>
                          {folder.files.map((fileElement: any, index) => {
                            const openMenu = fileElement === selectedFile

                            return (
                              <div key={index} className='file-details'>
                                {deleteChecks && (
                                  <input
                                    id={'check-' + index}
                                    type='checkbox'
                                    className='tw-appearance-none tw-indeterminate:bg-gray-300 ...'
                                  />
                                )}
                                <Typography className='file-name'>{fileElement?.name}</Typography>
                                <div className='menu-btn'>
                                  <IconButton
                                    onClick={() => {
                                      if (openMenu) {
                                        setSelectedFile(null)
                                        setOpenFolder(false)
                                      } else {
                                        setSelectedFile(fileElement)
                                      }
                                    }}
                                  >
                                    <Icon icon='mdi:dots-vertical' fontSize={20} />
                                  </IconButton>
                                  {openMenu && (
                                    <div className='menu-options'>
                                      <div className='option' onClick={e => handlePreview(e, index)}>
                                        Preview
                                        <Icon
                                          icon={'ic:outline-remove-red-eye'}
                                          fontSize={24}
                                          color='rgba(87, 90, 111, 0.54)'
                                        />
                                      </div>
                                      <div className='option' onClick={e => handleMoveFolderI(e, folder.name)}>
                                        Move to Folder
                                        <Icon
                                          icon={'ic:baseline-drive-file-move'}
                                          fontSize={24}
                                          color='rgba(87, 90, 111, 0.54)'
                                        />
                                      </div>
                                      <div className='option' onClick={e => handleDownload(e, index)}>
                                        Download
                                        <Icon icon={'mdi:download'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                                      </div>
                                      <div className='option' onClick={() => setOpenDelete(true)}>
                                        Delete
                                        <Icon
                                          icon={'ic:outline-delete'}
                                          fontSize={24}
                                          color='rgba(87, 90, 111, 0.54)'
                                        />
                                      </div>
                                      {openFolders && (
                                        <div className='menu-options'>
                                          <div
                                            key={'option-def'}
                                            className='option'
                                            onClick={e => handleInfo(e, index, 'folders')}
                                          >
                                            Final Slip
                                          </div>
                                          {folders.map((folder: { name: string; id: any }) => {
                                            return (
                                              <div
                                                key={'option-' + folder.id}
                                                className='option'
                                                onClick={e => handleInfo(e, index, 'folders')}
                                              >
                                                {folder.name}
                                              </div>
                                            )
                                          })}
                                        </div>
                                      )}
                                      <Modal
                                        className='delete-modal'
                                        open={openDelete}
                                        onClose={() => {
                                          setOpenDelete(false)
                                        }}
                                      >
                                        <Box className='modal-wrapper'>
                                          <HeaderTitleModal>
                                            <Typography variant='h6'>
                                              Are you sure you want to delete this file?
                                            </Typography>
                                            <ButtonClose
                                              onClick={() => {
                                                setOpenDelete(false)
                                              }}
                                            >
                                              <CloseIcon />
                                            </ButtonClose>
                                          </HeaderTitleModal>
                                          <div className='delete-modal-text'>This action can’t be undone.</div>
                                          <Button
                                            className='header-modal-btn'
                                            variant='contained'
                                            onClick={e => handleRemoveFile(e, index)}
                                          >
                                            DELETE
                                          </Button>
                                          <Button
                                            className='close-modal header-modal-btn'
                                            onClick={() => {
                                              setOpenDelete(false)
                                            }}
                                          >
                                            CANCEL
                                          </Button>
                                        </Box>
                                      </Modal>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </Collapse>
                  </List>
                </div>
              )
            })}
        </div>
        {/* Buttom actions, render de actions */}
        <div className='actions-icons' style={isPayments ? { marginLeft: '0' } : {}}>
          <Tooltip title='Upload'>
            <IconButton onClick={e => onButtonClick(e)}>
              <Icon icon='mdi:upload' color={'#2535A8'} />
            </IconButton>
          </Tooltip>
          <Tooltip title='New folder'>
            <IconButton onClick={e => onAddFolder(e)}>
              <Icon icon={'ic:round-create-new-folder'} color={'#2535A8'} />
            </IconButton>
          </Tooltip>
          {isPayments ? null : (
            <Tooltip title='Delete'>
              <IconButton onClick={e => onDeleteFiles(e)}>
                <Icon icon={'ic:outline-delete'} color={'#2535A8'} />
              </IconButton>
            </Tooltip>
          )}
        </div>
        {/* </form> */}
      </div>
    </Fragment>
  )
}
export default FileSubmit
