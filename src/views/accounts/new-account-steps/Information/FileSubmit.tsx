import React, { Fragment, useEffect, useRef, useState } from 'react'

// // ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

import CustomAlert, { IAlert } from '@/views/custom/alerts'
import Icon from 'src/@core/components/icon'

interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
  setUserFileToDelete: React.Dispatch<React.SetStateAction<any>>
  changeTitle: (change: boolean) => void
  urls: string[]
}

const FileSubmit: React.FC<UserFileProps> = ({ setUserFile, userFile, urls, setUserFileToDelete, changeTitle }) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // saves the row wehen user click on actions button
  const [openDelete, setOpenDelete] = useState(false)
  const fileUrls: string[] = urls

  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

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
        />

        {file.length > 0 && (
          <div className='uploaded-files'>
            {file.map((fileElement, index) => {
              const openMenu = fileElement === selectedFile

              return (
                <div key={index} className='file-details'>
                  <Typography className='file-name'>{fileElement?.name}</Typography>
                  <div className='menu-btn'>
                    <IconButton
                      onClick={() => {
                        if (openMenu) {
                          setSelectedFile(null)
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
                        </div>
                        <div className='option' onClick={e => handleDownload(e, index)}>
                          Download
                        </div>
                        <div className='option' onClick={() => setOpenDelete(true)}>
                          Delete
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

        <label id='label-file-upload' htmlFor='input-file-upload'>
          <Button className='upload-button' onClick={e => onButtonClick(e)} variant='outlined'>
            <div className='btn-icon'>
              <Icon icon='mdi:upload' />
            </div>
            UPLOAD DOCUMENT
          </Button>
        </label>
        {/* </form> */}
      </div>
    </Fragment>
  )
}
export default FileSubmit
