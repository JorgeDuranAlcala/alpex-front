import React, { Fragment, useEffect, useRef, useState } from 'react'

// // ** MUI Imports
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
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
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

import { useGetFolders } from '@/hooks/documents/getFoldersById'
import { useMoveFile } from '@/hooks/documents/moveFile'
import { useRemoveFile } from '@/hooks/documents/removeFile'
import { useRemoveFolder } from '@/hooks/documents/removeFolder'
import { useUploadFile } from '@/hooks/documents/uploadFile'
import { useAddFolder } from '@/hooks/documents/useAddFolder'
import { responseFile } from '@/services/documents/dtos/documents.dto'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({}) => ({
    border: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(() => ({
  backgroundColor: '#FFFFFF',
  borderStyle: 'none',
  boxShadow: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '0'
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0'
}))
interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
  setUserFileToDelete: React.Dispatch<React.SetStateAction<any>>
  changeTitle: (change: boolean) => void
  urls: string[]
  isPayments: boolean
  idAccountInit?: number | null
}

export const fileToBase64 = (file: any) => {
  console.log(file)
  const data = new Promise(resolve => {
    let baseURL: any = ''
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      baseURL = reader.result
      resolve(baseURL)
    }
  })

  return data
}

const FileSubmit: React.FC<UserFileProps> = ({
  setUserFile,
  userFile,
  urls,
  setUserFileToDelete,
  changeTitle,
  isPayments,
  idAccountInit
}) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // saves the row wehen user click on actions button
  const [openDelete, setOpenDelete] = useState(false)
  const fileUrls: string[] = urls

  const [open, setOpen] = useState<boolean>(false)
  const [openList, setOpenList] = useState<boolean>(false)

  // const [openOptions, setOpenOptions] = useState(false)
  // const [createFolderInit, setCreateFolderInit] = useState(false)
  const [numFolder, setNumFolder] = useState(0)
  const [openFolders, setOpenFolder] = useState(false)

  // const [deleteChecks, setDeleteChecks] = useState(false)
  const [reloadInfo, setReloadInfo] = useState<any>()

  const router = useRouter()
  const { setdctoUser } = useAddFolder()
  const { foldersAccount, setIdUser } = useGetFolders()
  const { uploadFile, setUpload } = useUploadFile()
  const { removeFile, setRemove } = useRemoveFile()
  const { moveFile, setmoveToFolder } = useMoveFile()
  const { removeFolder, setRemoveF } = useRemoveFolder()

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
      console.log(file)
      setFile([...file, ...rawFiles])
      setUserFile([...file, ...rawFiles])
    }
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(e)
    if (inputRef.current !== null) {
      inputRef.current.click()
      console.log(inputRef.current.files)
    }
  }

  function removeUrl(index: number): void {
    if (index < 0 || index >= fileUrls.length) {
      return
    }

    fileUrls.splice(index, 1)
  }

  const handlePreview = (e: any, path: string) => {
    e.preventDefault
    window.open(path, '_blank')
    setSelectedFile(null)
  }

  const handleDownload = (e: any, index: number, file: responseFile) => {
    e.preventDefault

    // const fileToDownload = file
    window.open(file.filePath, '_blank')
    setSelectedFile(null)
  }

  const handleRemoveFilePrev = (e: any, index: number) => {
    e.preventDefault
    const deletedFile = file.splice(index, 1)
    setFile([...file])
    setUserFile([...file])
    setUserFileToDelete && setUserFileToDelete(deletedFile[0])
    removeUrl(index) // cambiamos la lista de urls cuando se ha borrado sin guardar
    setSelectedFile(null)
    setOpenDelete(false)
    setIdUser(Number(router.query.idAccount))
    setReloadInfo(foldersAccount)
  }

  const handleRemoveFile = async (e: any, file: responseFile) => {
    e.preventDefault
    console.log('id', file)
    const idFileRemove = JSON.stringify(file.fileId)
    console.log(idFileRemove)
    await setRemove({ fileId: Number(idFileRemove) })
    console.log(removeFile)
    setOpenDelete(false)
    await setIdUser(Number(router.query.idAccount))
    setReloadInfo(foldersAccount)
  }

  const handleMoveFolder = (e: any) => {
    e.preventDefault
    console.log(e)
    setOpenFolder(true)
  }

  const handleMoveFolderInto = (e: any, pathId: string | null) => {
    e.preventDefault
    console.log(e)
    setOpenList(true)
    console.log(pathId)

    // const stringId = 'folder-' + pathId
    // const idElement = document.getElementById(stringId)
    // if (idElement !== null) {
    //   idElement.style.display = 'block'
    // }
  }

  const clickOpenOptions = (file: responseFile) => {
    console.log('File', file)

    // const stringId = 'options-f-' + file.fileId
    // const idElement = document.getElementById(stringId)
    // console.log(stringId)
    // console.log(idElement)
    handleClick()

    // if (openOptions && idElement) {
    //   setOpenOptions(false)

    //   // setSelectedFile(null)
    //   // idElement!.style.display = 'none'
    //   idElement.classList.add("menu-none");
    // } else {
    //   setOpenOptions(true)
    //   idElement.classList.add("menu-block");
    // }
  }

  const handleInfoToFolder = async (e: any, index: number, type: string, idFolder: number) => {
    e.preventDefault
    const fileB64 = await fileToBase64(selectedFile)
    setUpload({
      accountId: Number(router.query.idAccount),
      folderId: idFolder,
      documentType: 'General',
      document: { type: selectedFile?.type, name: selectedFile?.name, base64: fileB64 }
    })
    console.log(type, uploadFile)
    file.splice(index, 1)
    setFile([...file])
    setSelectedFile(null)
    setOpenFolder(false)
    setIdUser(Number(router.query.idAccount))
    setReloadInfo(foldersAccount)
  }

  const handleMoveFileToFolder = async (e: any, file: responseFile, idFolder: number) => {
    e.preventDefault
    console.log(idFolder)
    console.log(file)
    const idFileMove = JSON.stringify(file.fileId)
    console.log(idFileMove)
    setmoveToFolder({ filesId: [idFolder, Number(idFileMove)] })
    console.log(moveFile)
    setOpen(false)
    setIdUser(Number(router.query.idAccount))
    setReloadInfo(foldersAccount)
    setOpenList(false)
  }

  useEffect(() => {
    setIdUser(idAccountInit || Number(router.query.idAccount))
    console.log(foldersAccount)
    setReloadInfo(foldersAccount)
  }, [router.query.idAccount, idAccountInit])

  const onAddFolder = (e: any) => {
    e.preventDefault
    const nameFolder = 'New Folder ' + numFolder
    setdctoUser({ folderName: nameFolder, accountId: Number(localStorage.getItem('idAccount')) })
    const newNum = numFolder + 1
    setNumFolder(newNum)
  }

  // const onDeleteFiles = (e: any) => {
  //   e.preventDefault
  //   if (!deleteChecks) {
  //     setDeleteChecks(true)
  //   } else {
  //     console.log('ELIMINAR')
  //   }
  // }

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

  const [expanded, setExpanded] = useState<string | false>('panel0')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
    setOpen(false)
  }

  const clickDots = (e: any) => {
    console.log(e)
    const idElemento = e.target.id
    console.log(idElemento)
    const elemento = document.getElementById(idElemento)
    console.log(elemento)
    const menuId = e.target.id + '-menu'
    console.log(menuId)
    const menu = document.getElementsByClassName(menuId)
    console.log(menu)
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      menu[i].classList.remove('menu-dots-none')
      menu[i].classList.add('menu-dots-open')
    }
  }

  const renameFolder = (folder: any, index: any) => {
    console.log(folder)
    console.log(index)
    const menuId = index + '-dots-menu'
    console.log(menuId)
    const menu = document.getElementsByClassName(menuId)
    console.log(menu)
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      menu[i].classList.remove('menu-dots-open')
      menu[i].classList.add('menu-dots-none')
    }
    console.log(menu)
  }

  const deleteFolder = (folder: any, index: any) => {
    console.log(folder.folderId)
    const menuId = index + '-dots-menu'
    console.log(menuId)
    const menu = document.getElementsByClassName(menuId)
    console.log(menu)
    setRemoveF({ folderId: Number(folder.folderId) })
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      menu[i].classList.remove('menu-dots-open')
      menu[i].classList.add('menu-dots-none')
    }
    console.log(menu)
    console.log(removeFolder)
  }

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
                  {/* {deleteChecks && (
                    <input
                      id={'check-' + index}
                      type='checkbox'
                      className='tw-appearance-none tw-indeterminate:bg-gray-300 ...'
                    />
                  )} */}
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
                        {/* <div className='option' onClick={e => handlePreview(e, index)}>
                          Preview
                          <Icon icon={'ic:outline-remove-red-eye'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div> */}
                        <div className='option' onClick={e => handleMoveFolder(e)}>
                          Move to Folder
                          <Icon icon={'ic:baseline-drive-file-move'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        {/* <div className='option' onClick={e => handleDownload(e, index)}>
                          Download
                          <Icon icon={'mdi:download'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div> */}
                        <div className='option' onClick={() => setOpenDelete(true)}>
                          Delete
                          <Icon icon={'ic:outline-delete'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                        </div>
                        {openFolders && (
                          <div className='menu-options'>
                            {foldersAccount.map((folder, index) => {
                              return (
                                <div
                                  id={'option-' + index}
                                  key={'option-' + index}
                                  className='option'
                                  onClick={e => handleInfoToFolder(e, index, 'new', folder.folderId)}
                                >
                                  {folder.folderName}
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
                              onClick={e => handleRemoveFilePrev(e, index)}
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

        {/* Buttoms files, render de folders creados */}
        <div>
          {reloadInfo && reloadInfo.length > 0
            ? reloadInfo.map(
                (
                  folder: {
                    folderName: string
                    files: any[]
                  },
                  index: string
                ) => {
                  return (
                    <div key={'folder' + index}>
                      <List component='nav'>
                        {/* <ListItem disablePadding className='final-slip'>
                          <ListItemButton
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                          >
                            <Icon
                              onClick={handleClick}
                              icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                              color='#FFFFFF'
                            />
                            <Typography sx={{ color: '#FFF' }}>{folder.folderName}</Typography>
                            <Icon icon='mi:options-vertical' color='#FFFFFF' />
                          </ListItemButton>
                        </ListItem> */}
                        <Icon
                          icon='mi:options-vertical'
                          className='icon-dots'
                          color='#FFFFFF'
                          id={index + '-dots'}
                          onClick={e => clickDots(e)}
                        />
                        <div className={`${index}-dots-menu print-options menu-dots-none`}>
                          <div
                            key='renombrar'
                            className='language'
                            onClick={() => {
                              renameFolder(folder, index)
                            }}
                          >
                            Renombrar
                          </div>
                          <div
                            key='eliminar'
                            className='language'
                            onClick={() => {
                              deleteFolder(folder, index)
                            }}
                          >
                            Eliminar
                          </div>
                        </div>
                        <Accordion
                          expanded={expanded === 'panel' + index}
                          onChange={handleChange('panel' + index)}
                          style={{ boxShadow: 'none', borderTop: 'none' }}
                        >
                          <AccordionSummary
                            aria-controls={'panel' + index + 'd-content'}
                            id={'panel' + index + 'd-header'}
                            style={{ padding: '0' }}
                            className='final-slip'
                          >
                            <ListItemButton
                              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                            >
                              <Typography sx={{ color: '#FFF' }}>{folder.folderName.replace('_402', '')}</Typography>
                            </ListItemButton>
                          </AccordionSummary>
                          <AccordionDetails>
                            {folder.files.length <= 0 && (
                              <List component='div' disablePadding>
                                <ListItem disablePadding>
                                  <ListItemButton sx={{ pl: 8 }}>
                                    <ListItemIcon sx={{ mr: 4 }}></ListItemIcon>
                                    <ListItemText primary='Scheduled' />
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            )}
                            <div className='uploaded-files'>
                              {folder.files.map((fileElement, index) => {
                                return (
                                  <div key={index} className='file-details'>
                                    {/* {deleteChecks && (
                                      <input
                                        id={'check-' + index}
                                        type='checkbox'
                                        className='tw-appearance-none tw-indeterminate:bg-gray-300 ...'
                                      />
                                    )} */}
                                    <Typography className='file-name'>{fileElement.name}</Typography>
                                    <div className='menu-btn'>
                                      <IconButton
                                        onClick={() => {
                                          clickOpenOptions(fileElement)
                                        }}
                                      >
                                        <Icon icon='mdi:dots-vertical' fontSize={20} />
                                      </IconButton>
                                      <div
                                        className='menu-options'
                                        style={open ? { display: 'block' } : { display: 'none' }}
                                        id={'options-f-' + fileElement.fileId.toString()}
                                      >
                                        <div className='option' onClick={e => handlePreview(e, fileElement.filePath)}>
                                          Preview
                                          <Icon
                                            icon={'ic:outline-remove-red-eye'}
                                            fontSize={24}
                                            color='rgba(87, 90, 111, 0.54)'
                                          />
                                        </div>
                                        <div
                                          className='option'
                                          onClick={e => handleMoveFolderInto(e, fileElement.filePath)}
                                        >
                                          Move to Folder
                                          <Icon
                                            icon={'ic:baseline-drive-file-move'}
                                            fontSize={24}
                                            color='rgba(87, 90, 111, 0.54)'
                                          />
                                        </div>
                                        <div className='option' onClick={e => handleDownload(e, index, fileElement)}>
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
                                        <div
                                          style={openList ? { display: 'block' } : { display: 'none' }}
                                          className='menu-options'
                                          id={'folder-' + fileElement.filePath}
                                        >
                                          {foldersAccount.map((folder, index) => {
                                            return (
                                              <div
                                                id={'option-' + index}
                                                key={'option-' + index}
                                                className='option'
                                                onClick={e => handleMoveFileToFolder(e, fileElement, folder.folderId)}
                                              >
                                                {folder.folderName}
                                              </div>
                                            )
                                          })}
                                        </div>
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
                                              onClick={e => handleRemoveFile(e, fileElement)}
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
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </AccordionDetails>
                        </Accordion>

                        {/* <Collapse key={'coll-' + index} in={open} timeout='auto' unmountOnExit></Collapse> */}
                      </List>
                    </div>
                  )
                }
              )
            : null}
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
          {/* {isPayments ? null : (
            <Tooltip title='Delete'>
              <IconButton onClick={e => onDeleteFiles(e)}>
                <Icon icon={'ic:outline-delete'} color={'#2535A8'} />
              </IconButton>
            </Tooltip>
          )} */}
        </div>
        {/* </form> */}
      </div>
    </Fragment>
  )
}
export default FileSubmit
