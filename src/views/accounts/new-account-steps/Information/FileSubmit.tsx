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
  TextField,
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
import { useRenameFolder } from '@/hooks/documents/renameFolder'
import { useUploadFile } from '@/hooks/documents/uploadFile'
import { useAddFolder } from '@/hooks/documents/useAddFolder'
import { responseFile } from '@/services/documents/dtos/documents.dto'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ }) => ({
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
  foldersAccountClick?: any
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
  // setUserFile,
  userFile,

  // urls,
  // setUserFileToDelete,
  changeTitle,
  isPayments,
  idAccountInit

  // foldersAccountClick
}) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // saves the row wehen user click on actions button
  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRoot, setOpenDeleteRoot] = useState(false)
  const [fileIdToDelete, setFileIdToDelete] = useState<number>() //State with currend id selected to delete.
  const [openList, setOpenList] = useState<boolean>(false)

  // Menu management
  const [openItemMenu, setOpenItemMenu] = useState<number | null>(null);
  const [currentFile, setCurrentFile] = useState<responseFile | null>(null) // saves the row wehen user click on actions button


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reloadInfo, setReloadInfo] = useState<any>()
  const [openRename, setOpenRename] = useState(false)
  const [renameValue, setRenameValue] = useState<string>('')
  const [idFolderRename, setIdFolderRename] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [idFolderDelete, setIdFolderDelete] = useState<string | undefined>(undefined)
  const [optionValue, setOptionValue] = useState<string | undefined>('')
  const router = useRouter()
  const { folders, createFolder, successAddFolder, setSuccessAddFolder } = useAddFolder()
  const { foldersAccount, setIdUser, findById } = useGetFolders()
  const { uploadFile, setUpload, successUploadFolder, setSuccessUploadFolder } = useUploadFile()
  const { removeFile, setRemove, successDeleteFile, setSuccessDeleteFile } = useRemoveFile()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { moveFile, setmoveToFolder, successMoveFile, setSuccessMoveFile } = useMoveFile()
  const { removeFolder, setRemoveF, successDeleteFolder, setSuccessDeletefolder } = useRemoveFolder()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { renameFolder, setRename, successRenameFolder, setSuccessRenameFolder } = useRenameFolder()

  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const onFileChange = function (e: any) {
    e.preventDefault()
    const rawFiles = e.target.files
    const fileSize = rawFiles?.[0]?.size
    const fileName = rawFiles?.[0]?.name
    const maxFileSize = 5 * 1024 * 1024 // 5MB (example maximum file size)
    console.log('sizes')
    console.log(fileSize)
    console.log(maxFileSize)
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

      // setUserFile([...file, ...rawFiles])

      const folderRoot = foldersAccount.find(folder => folder.folderName.split('_')[0] === 'root')
      if (folderRoot) {
        // debugger

        handleInfoToFolder(e, [...file, ...rawFiles].length - 1, 'General', folderRoot.folderId, rawFiles)
      }
    }
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("on add file click")
    console.log(idAccountInit)
    e.preventDefault()
    console.log(e)
    if (inputRef.current !== null) {
      inputRef.current.click()
      console.log(inputRef.current.files)
    }
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRemoveFileRoot = async (e: any) => {
    const idFileRemove = JSON.stringify(fileIdToDelete)
    await setRemove({ filesId: [Number(idFileRemove)] })
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessDeleteFile(true)
    setOpenDeleteRoot(false)
    if (currentFile)
      toggleMenu(currentFile)
  }

  const handleRemoveFile = async (e: any, file: responseFile) => {
    e.preventDefault
    console.log(e.target)
    const idFileRemove = JSON.stringify(file.fileId)
    console.log(idFileRemove)
    console.log(file)
    await setRemove({ filesId: [Number(idFileRemove)] })
    console.log(removeFile)
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessDeleteFile(true)
    setOpenDelete(false)
  }

  useEffect(() => {
    if (successDeleteFile) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessDeleteFile(false))
    }
  }, [successDeleteFile])

  const handleMoveFolderInto = (e: any, pathId: string | null) => {
    e.preventDefault
    setOpenList(true)
    console.log(pathId)
  }


  const toggleMenu = (file: responseFile) => {

    if (openItemMenu === file.fileId) {
      setOpenItemMenu(null); // Si el menú está abierto, ciérralo
    } else {
      setOpenItemMenu(file.fileId); // Si el menú está cerrado, ábrelo
      setCurrentFile(file || null);
      const idOptions = 'options-f-' + file.fileId
      const menuOptions = document.getElementById(idOptions)
      setIdFolderDelete(idOptions)
      setOptionValue(menuOptions?.id)
      console.log('optionvalue', optionValue)
    }
  };

  // const clickOpenOptions = (file: responseFile) => {
  //   console.log(file)
  //   const idOptions = 'options-f-' + file.fileId
  //   const menuOptions = document.getElementById(idOptions)
  //   console.log(menuOptions?.id)

  //   setIdFolderDelete(idOptions)
  //   console.log('folderdelete', idFolderDelete)
  //   if (menuOptions) {
  //     if (menuOptions?.style.display === 'none') {
  //       menuOptions.style.display = 'block'
  //     } else {
  //       menuOptions.style.display = 'none'
  //     }
  //   }
  // }

  const handleInfoToFolder = async (
    e: any,
    index: number,
    type: string,
    idFolder: number,
    selectedFileParam?: File[]
  ) => {
    e.preventDefault
    const fileB64: any = await fileToBase64(selectedFileParam ? selectedFileParam[0] : selectedFile)
    const nameFile = selectedFileParam ? selectedFileParam[0].name : selectedFile?.name
    setUpload({
      accountId: idAccountInit || Number(router.query.idAccount),
      folderId: idFolder,
      documentType: 'General',
      document: { type: selectedFile?.type, name: nameFile, base64: fileB64.split(',')[1] }
    })
    console.log(uploadFile)
    if (file.length > 0) {
      file.splice(index, 1)
      setFile([...file])
    }

    setSelectedFile(null)

    // setOpenFolder(false)
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessUploadFolder(true)
  }

  useEffect(() => {
    if (successUploadFolder) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessUploadFolder(false))
    }
  }, [successUploadFolder])

  const handleMoveFileToFolder = async (e: any, file: responseFile, idFolder: number) => {
    e.preventDefault
    const idFileMove = JSON.stringify(file.fileId)
    setmoveToFolder({ destinationFolderId: idFolder, fileId: Number(idFileMove) })

    // console.log(moveFile)

    // setOpen(false)
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessMoveFile(true)
    setOpenList(false)

    // console.log(reloadInfo)
  }

  useEffect(() => {
    if (successMoveFile) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessMoveFile(false))
    }
  }, [successMoveFile])

  useEffect(() => {
    setIdUser(idAccountInit || Number(localStorage.getItem('idAccount')))
    if (idAccountInit)
      findById(idAccountInit)
    setReloadInfo(foldersAccount)
    console.log('🚀 ~ file: FileSubmit.tsx:304 ~ useEffect ~ foldersAccount:', foldersAccount)
  }, [router.query.idAccount, idAccountInit])

  const onAddFolder = (e: any) => {
    e.preventDefault
    const nameFolder = 'New Folder ' + foldersAccount.length
    createFolder({ folderName: nameFolder, accountId: Number(localStorage.getItem('idAccount')) })
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessAddFolder(true)
  }

  useEffect(() => {
    if (successAddFolder) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessAddFolder(false))
    }
  }, [successAddFolder, folders])

  useEffect(() => {
    console.log(foldersAccount)
  }, [foldersAccount])

  useEffect(() => {
    if (userFile.length > 0) {
      setFile([...userFile])
    }
  }, [userFile])

  const [expanded, setExpanded] = useState<string | false>('panel0')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const clickDots = (e: any) => {
    const menuId = e.target.id + '-menu'
    const menu = document.getElementsByClassName(menuId)
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      if (menu[i].classList.value.indexOf('menu-dots-open') >= 0) {
        menu[i].classList.remove('menu-dots-open')
        menu[i].classList.add('menu-dots-none')
      } else {
        menu[i].classList.remove('menu-dots-none')
        menu[i].classList.add('menu-dots-open')
      }
    }
  }

  const renameFolderFunction = (folder: any, index: any) => {
    const menuId = index + '-dots-menu'
    const menu = document.getElementsByClassName(menuId)
    setIdFolderRename(folder.folderId)
    setOpenRename(true)
    setRenameValue(folder.folderName.split('_')[0])
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      menu[i].classList.remove('menu-dots-open')
      menu[i].classList.add('menu-dots-none')
    }
  }

  const deleteFolder = (folder: any, index: any) => {
    const menuId = index + '-dots-menu'
    const menu = document.getElementsByClassName(menuId)
    setRemoveF({ folderId: Number(folder.folderId) })
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i].classList)
      menu[i].classList.remove('menu-dots-open')
      menu[i].classList.add('menu-dots-none')
    }
    console.log(removeFolder)
    findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessDeletefolder(true)
  }

  useEffect(() => {
    if (successDeleteFolder) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessDeletefolder(false))
    }
  }, [successDeleteFolder])

  const handleRenameFolder = async (e: any, folder: any) => {
    setOpenRename(false)
    const newNameFolder = renameValue
    console.log(folder)
    await setRename({ folderId: idFolderRename, newFolderName: newNameFolder })
    await findById(idAccountInit || Number(localStorage.getItem('idAccount')))
    setSuccessRenameFolder(true)
    setRenameValue('')
    setIdFolderRename(null)
  }

  useEffect(() => {
    if (successRenameFolder) {
      findById(idAccountInit || Number(localStorage.getItem('idAccount'))).then(() => setSuccessRenameFolder(false))
    }
  }, [successRenameFolder])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setRenameValue(value)
  }

  useEffect(() => {
    console.log('idaccouninit cambio')
    console.log(idAccountInit)
  }, [idAccountInit])

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
        {foldersAccount &&
          foldersAccount.length > 0 &&
          foldersAccount
            .filter(folder => folder.folderName.split('_')[0] === 'root')
            .map(folder => (
              <div key={'up-f'} className='uploaded-files'>
                {' '}
                {folder.files.map((fileElement, index) => {
                  changeTitle(true)

                  return (
                    <div key={index} className='file-details'>
                      <Typography className='file-name'>{fileElement.name.split('.')[0]}</Typography>
                      <div className='menu-btn'>
                        <IconButton
                          onClick={() => {
                            toggleMenu(fileElement)
                          }}
                        >
                          <Icon icon='mdi:dots-vertical' fontSize={20} />
                        </IconButton>

                        {openItemMenu === fileElement.fileId && (
                          <div
                            className='menu-options'
                            id={'options-f-' + fileElement.fileId.toString()}
                          >
                            <div className='option' onClick={e => handlePreview(e, fileElement.filePath)}>
                              Preview
                              <Icon icon={'ic:outline-remove-red-eye'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                            </div>
                            <div className='option' onClick={e => handleMoveFolderInto(e, fileElement.filePath)}>
                              Move to Folder
                              <Icon icon={'ic:baseline-drive-file-move'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                            </div>
                            <div className='option' onClick={e => handleDownload(e, index, fileElement)}>
                              Download
                              <Icon icon={'mdi:download'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                            </div>
                            <div className='option' onClick={() => {
                              setFileIdToDelete(fileElement.fileId)
                              setOpenDeleteRoot(true)
                            }
                            }>
                              Delete
                              <Icon icon={'ic:outline-delete'} fontSize={24} color='rgba(87, 90, 111, 0.54)' />
                            </div>
                            <div
                              style={openList ? { display: 'block' } : { display: 'none' }}
                              className='menu-options'
                              id={'folder-' + fileElement.filePath}
                            >
                              {foldersAccount.map((folder, index) => {
                                return (
                                  folder.folderName.split('_')[0] !== 'root' && <div
                                    id={'option-' + index}
                                    key={'option-' + index}
                                    className='option'
                                    onClick={e => handleMoveFileToFolder(e, fileElement, folder.folderId)}
                                  >
                                    { folder.folderName.split('_')[0]}
                                  </div>
                                )
                              })}
                            </div>
                            <Modal
                              className='delete-modal'
                              open={openDeleteRoot}
                              onClose={() => {
                                setOpenDeleteRoot(false)
                              }}
                            >
                              <Box className='modal-wrapper'>
                                <HeaderTitleModal>
                                  <Typography variant='h6'>Are you sure you want to delete this file?</Typography>
                                  <ButtonClose
                                    onClick={() => {
                                      setOpenDeleteRoot(false)
                                    }}
                                  >
                                    <CloseIcon />
                                  </ButtonClose>
                                </HeaderTitleModal>
                                <div className='delete-modal-text'>This action can’t be undone.</div>
                                <Button
                                  className='header-modal-btn'
                                  variant='contained'
                                  onClick={e => {
                                    handleRemoveFileRoot(e)
                                  }}
                                >
                                  DELETE
                                </Button>
                                <Button
                                  className='close-modal header-modal-btn'
                                  onClick={() => {
                                    setOpenDeleteRoot(false)
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
            ))}

        {/* Buttoms files, render de folders creados */}
        <div>
          {foldersAccount && foldersAccount.length > 0
            ? foldersAccount
              .filter(folder => folder.folderName.split('_')[0] !== 'root')
              .map(
                (
                  folder: {
                    folderName: string
                    files: any[]
                  },
                  index
                ) => {
                  return (
                    <div key={'folder' + index}>
                      <List component='nav'>
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
                              renameFolderFunction(folder, index)
                            }}
                          >
                            Rename
                          </div>
                          <div
                            key='eliminar'
                            className='language'
                            onClick={() => {
                              deleteFolder(folder, index)
                            }}
                          >
                            Delete
                          </div>
                        </div>
                        <Modal
                          className='delete-modal'
                          open={openRename}
                          onClose={() => {
                            setOpenRename(false)
                          }}
                        >
                          <Box className='modal-wrapper'>
                            <HeaderTitleModal>
                              <Typography variant='h6'>New folder name</Typography>
                              <ButtonClose
                                onClick={() => {
                                  setOpenRename(false)
                                }}
                              >
                                <CloseIcon />
                              </ButtonClose>
                            </HeaderTitleModal>
                            <TextField
                              fullWidth
                              autoFocus
                              value={renameValue}
                              defaultValue=''
                              onChange={handleInputChange}
                              label='Rename folder'
                              id={'rename-folder-' + index}
                            />
                            <Button
                              style={{ marginTop: '24px' }}
                              className='header-modal-btn'
                              variant='contained'
                              onClick={e => handleRenameFolder(e, folder)}
                            >
                              RENAME
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
                              <Typography sx={{ color: '#FFF' }}>{folder.folderName.split('_')[0]} </Typography>
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
                                const currentFolder = folder.folderName.split('_')[0]

                                return (
                                  <div key={index} className='file-details'>
                                    <Typography className='file-name'>{fileElement.name}</Typography>
                                    <div className='menu-btn'>
                                      <IconButton
                                        onClick={() => {
                                          // clickOpenOptions(fileElement)
                                          toggleMenu(fileElement)
                                        }}
                                      >
                                        <Icon icon='mdi:dots-vertical' fontSize={20} />
                                      </IconButton>
                                      {openItemMenu === fileElement.fileId && (
                                        <div
                                          className='menu-options'
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
                                                folder.folderName.split('_')[0] !== currentFolder &&
                                                <div
                                                  id={'option-' + index}
                                                  className='option'
                                                  onClick={e => handleMoveFileToFolder(e, fileElement, folder.folderId)}
                                                >
                                                  {folder.folderName.split('_')[0]}
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
                                                id={'delete-folder-' + fileElement.fileId}
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
                                      )}

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
            <IconButton className="disabled" onClick={e => onButtonClick(e)} >
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
