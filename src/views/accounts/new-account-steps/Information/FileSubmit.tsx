import React, { Fragment, useEffect, useRef, useState } from 'react'

// // ** MUI Imports

import Button from '@mui/material/Button'

// ** Icon Imports
import { IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

interface UserFileProps {
  userFile: any
  setUserFile: React.Dispatch<React.SetStateAction<any>>
}

const FileSubmit: React.FC<UserFileProps> = ({ setUserFile, userFile }) => {
  // ** State
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File[]>([])

  const onFileChange = function (e: any) {
    e.preventDefault()
    const rawFiles = e.target.files

    setUserFile([...file, ...rawFiles])
  }

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handleRemoveFile = (e: any, index: number) => {
    e.preventDefault + file.splice(index, 1)
    setUserFile([...file])
  }

  useEffect(() => {
    if (userFile.length > 0) {
      setFile([...userFile])
    }
  }, [userFile])

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
          file.map((fileElement, index) => (
            <div key={index} className='file-details'>
              <Icon icon='mdi:file-document-outline' />
              <Typography className='file-name'>{fileElement?.name}</Typography>
              <IconButton onClick={e => handleRemoveFile(e, index)}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            </div>
          ))}
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
