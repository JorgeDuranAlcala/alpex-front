import { useDeleteInformationDocument, useGetInfoDoctosByIdAccount } from '@/hooks/accounts/information'
import { useAppSelector } from '@/store'
import { getFileFromUrl } from '@/utils/formatDoctos'
import FileSubmit from '@/views/accounts/new-account-steps/Information/FileSubmit'
import CommentSection from '@/views/components/new-accounts/CommentSection'
import { Divider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const DigitalCenter = () => {
  //store
  const idAccount = useAppSelector(state => state.accounts?.formsData?.form1?.id)

  //Custom Hooks
  const { getInfoDoctosByIdAccount } = useGetInfoDoctosByIdAccount()
  const { deleteInformationDocument } = useDeleteInformationDocument()

  //States
  const [doctoIdByName, setDoctoIdByName] = useState({})
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [disableComments] = useState(false)
  const [activeStep] = useState(1)
  const [userFile, setUserFile] = useState<File[]>([])
  const [fileUrls, setFileUrls] = useState<string[]>([])
  const [userFileToDelete, setUserFileToDelete] = useState<File>()
  const [changeTitle, setChangeTitle] = useState(false)

  const onSubmittedFiles = (change: boolean) => {
    setChangeTitle(change)
  }

  useEffect(() => {
    setSidebar(!sidebar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrls])

  useEffect(() => {
    const getFiles = async () => {
      const idAccountCache = Number(localStorage.getItem('idAccount'))
      if (idAccountCache) {
        const res = await getInfoDoctosByIdAccount(idAccountCache)
        const newDoctoIdByName: any = {}
        const newUserFiles: File[] = []

        if (res.length > 0) {
          const urls: string[] = []
          for (const docto of res) {
            newDoctoIdByName[docto.name] = docto.id
            urls.push(docto.url)
            const newFile = await getFileFromUrl(docto.url, docto.name)
            if (newFile) {
              newUserFiles.push(newFile)
            }
          }

          setFileUrls(urls)
          setUserFile(newUserFiles)

          setDoctoIdByName({
            ...doctoIdByName,
            ...newDoctoIdByName
          })
        }
      }
    }
    getFiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const deleteFile = async (userFileToDelete: File) => {
      const fileName = String(userFileToDelete.name)
      const idDocto = doctoIdByName[fileName as keyof typeof doctoIdByName]

      if (idDocto) {
        const bodyToDelete = {
          idAccount: idAccount,
          idDocto,
          fileName: fileName
        }
        await deleteInformationDocument(bodyToDelete)
        delete doctoIdByName[fileName as keyof typeof doctoIdByName]
      }
    }

    if (userFileToDelete && idAccount) {
      deleteFile(userFileToDelete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFileToDelete])

  return (
    <>
      <nav>
        <div
          style={{
            height: 'auto',
            display: 'block'
          }}
        >
          <div>
            <div className='title-documents'>History</div>
            <div className='mtop'>
              <Typography component='span' sx={{ fontWeight: 'bold' }}>
                Alejandro Hernández
              </Typography>
              <Typography component='span'> sent email to mail@mail.com</Typography>
              <br />
              <Typography component='p' sx={{ color: '#4D506261', fontSize: '13px' }}>
                Today 1:15PM
              </Typography>
            </div>
          </div>
          <Divider textAlign='center' variant='middle' sx={{ width: '90%' }} />
          <div className='documents-payments'>
            <div className='title-documents'>Documents</div>
            {!changeTitle ? (
              <div className='no-documentsText'>
                <Typography variant='body1' sx={{ fontSize: '16px' }}>
                  There are no documents in this account yet.
                </Typography>
              </div>
            ) : null}
            <FileSubmit
              userFile={userFile}
              urls={fileUrls}
              setUserFile={setUserFile}
              setUserFileToDelete={setUserFileToDelete}
              changeTitle={onSubmittedFiles}
              isPayments
            />
          </div>
        </div>
        <Divider textAlign='center' variant='middle' sx={{ width: '90%' }} />
        <div
          style={{
            height: 'auto',
            display: 'block'
          }}
        >
          <CommentSection disable={disableComments} step={activeStep} />
        </div>
      </nav>
    </>
  )
}

export default DigitalCenter
