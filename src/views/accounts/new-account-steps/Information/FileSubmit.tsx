import React, { Fragment, useRef, useState } from 'react'

// // ** MUI Imports

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type UserFileProps = {
  userFile: {
    file: File | null
  }
  setUserFile: React.Dispatch<
    React.SetStateAction<{
      file: File | null
    }>
  >
}

const FileSubmit: React.FC<UserFileProps> = ({ setUserFile }) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [showFile, setShowFile] = useState(false)

  const setFilevalues = (uploadFiles: File) => {
    setFile(uploadFiles)
    setShowFile(true)
  }

  const onFileChange = function (e: any) {
    e.preventDefault()
    setFilevalues(e.target.files[0])
    setUserFile({ file: e.target.files[0] })
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handleRemoveFile = (e: any) => {
    e.preventDefault()
    setUserFile({ file: null })
    setShowFile(false)
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
        />
        <label id='label-file-upload' htmlFor='input-file-upload'>
          {showFile ? (
            <div className='file-details'>
              <Icon icon='mdi:file-document-outline' />
              <Typography className='file-name'>{file?.name}</Typography>
              <IconButton onClick={e => handleRemoveFile(e)}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            </div>
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
