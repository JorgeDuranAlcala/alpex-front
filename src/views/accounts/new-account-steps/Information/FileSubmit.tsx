import React, { Fragment, useRef, useState } from 'react'

// // ** MUI Imports

import Button from '@mui/material/Button'

// ** Icon Imports
import { IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
}

const FileSubmit: React.FC<UserFileProps> = ({ setUserFile }) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])
  const [showFile, setShowFile] = useState(false)

  const setFilevalues = (uploadFiles: File[]) => {
    setFile(uploadFiles)
    setShowFile(true)
  }

  const onFileChange = function (e: any) {
    e.preventDefault()
    setFilevalues([...e.target.files])
    setUserFile({ file: e.target.files })
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handleRemoveFile = (e: any, index: number) => {
    e.preventDefault()
    file.splice(index, 1)
    setFile([...file])
    file.length < 1 && setShowFile(false)
  }

  return (
    <Fragment>
      <div className='upload-btn'>
        {/* <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}> */}
        <input
          ref={inputRef}
          type='file'
          className='input-file-upload'
          id='input-file-upload'
          accept='image/*'
          onChange={onFileChange}
          multiple
        />
        <label id='label-file-upload' htmlFor='input-file-upload'>
          {showFile ? (
            file.map((fileElement, index) => (
              <div key={index} className='file-details'>
                <Icon icon='mdi:file-document-outline' />
                <Typography className='file-name'>{fileElement?.name}</Typography>
                <IconButton onClick={e => handleRemoveFile(e, index)}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              </div>
            ))
          ) : (
            <Button className='upload-button' onClick={e => onButtonClick(e)} variant='outlined'>
              <div className='btn-icon'>
                <Icon icon='mdi:upload' />
              </div>
              UPLOAD DOCUMENT
            </Button>
          )}
        </label>
        {/* </form> */}
      </div>
    </Fragment>
  )
}
export default FileSubmit
