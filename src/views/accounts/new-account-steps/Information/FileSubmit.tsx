import React, { Fragment, useEffect, useRef, useState } from 'react'

// // ** MUI Imports
import {
  Button,
  IconButton,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'

interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
  setUserFileToDelete: React.Dispatch<React.SetStateAction<any>>
  changeTitle: (change: boolean) => void
}

const FileSubmit: React.FC<UserFileProps> = ({ setUserFile, userFile, setUserFileToDelete, changeTitle }) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // saves the row wehen user click on actions button

  // const [openMenu, setOpenMenu] = useState(false)
  const onFileChange = function (e: any) {
    e.preventDefault()
    const rawFiles = e.target.files

    setFile([...file, ...rawFiles])
    setUserFile([...file, ...rawFiles])
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handlePreview = (e: any, index: number) => {
    e.preventDefault
    const fileToPreview = file[index];
  const previewUrl = URL.createObjectURL(fileToPreview);
  window.open(previewUrl, '_blank');
    setSelectedFile(null)
  }

  const handleDownload = (e: any, index: number) => {
    e.preventDefault
    const fileToDownload = file[index];
    const downloadUrl = URL.createObjectURL(fileToDownload);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileToDownload.name;
    link.click();
    setSelectedFile(null)
  }

  const handleRemoveFile = (e: any, index: number) => {
    e.preventDefault
    const deletedFile = file.splice(index, 1)
    setFile([...file])
    setUserFile([...file])
    setUserFileToDelete && setUserFileToDelete(deletedFile[0])
    setSelectedFile(null)
  }

  useEffect(() => {
    if (userFile.length > 0) {
      setFile([...userFile])
    }
  }, [userFile])

  useEffect(() => {
    if(file.length > 0){
      changeTitle(true)
    }else{
      changeTitle(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[file])

  return (
    <Fragment>
      <div className='upload-btn'>
        {/* <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}> */}
        <input
          ref={inputRef}
          type='file'
          className='input-file-upload'
          id='input-file-upload'
          onChange={onFileChange}
          multiple
        />

        {file.length > 0 &&
          <div className='uploaded-files'>
            {file.map((fileElement, index) => {
              const openMenu = fileElement === selectedFile

              return (
                <div key={index} className='file-details'>
                  <Typography className='file-name'>{fileElement?.name}</Typography>
                  <div className='menu-btn'>
                    <IconButton onClick={() => {
                      if (openMenu) {
                        setSelectedFile(null)
                      } else {
                        setSelectedFile(fileElement)
                      }
                    }}>
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
                        <div className='option' onClick={e => handleRemoveFile(e, index)}>
                          Delete
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>}

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
