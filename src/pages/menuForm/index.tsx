import { useDeleteInformationDocument, useGetInfoDoctosByIdAccount } from '@/hooks/accounts/information'
import { useAppSelector } from '@/store'
import { getFileFromUrl } from '@/utils/formatDoctos'
import FileSubmit from '@/views/accounts/new-account-steps/Information/FileSubmit'
import CommentSection from '@/views/components/new-accounts/CommentSection'
import { Box, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'

// interface IMenuFrom {
//   handleSidebarMenu?: () => void
//   sidebar: boolean
// }

const MenuForm = () => {
  //store
  const idAccount = useAppSelector(state => state.accounts?.formsData?.form1?.id)

  //Custom Hooks
  const { getInfoDoctosByIdAccount } = useGetInfoDoctosByIdAccount()
  const { deleteInformationDocument } = useDeleteInformationDocument()
  const theme = useTheme()

  //States
  const [doctoIdByName, setDoctoIdByName] = useState({})
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [disableComments] = useState(false)
  const [activeStep] = useState(1)
  const [userFile, setUserFile] = useState<File[]>([])
  const [fileUrls, setFileUrls] = useState<string[]>([])
  const [userFileToDelete, setUserFileToDelete] = useState<File>()
  const [changeTitle, setChangeTitle] = useState(false)

  const handleSidebarMenu = () => {
    setSidebar(!sidebar)
    console.log('Hola')
  }

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

  // const uploadDoctos = async (idAccount: number) => {
  //   const formatedDoctos = await formatInformationDoctos(userFile, idAccount, 1, doctoIdByName)
  //   const newDoctoIdByName: any = {}

  //   await delayMs(1000)
  //   if (formatedDoctos.length === 0) {
  //     setBadgeData({
  //       message: '',
  //       status: undefined,
  //       icon: undefined,
  //       open: false
  //     })

  //     return
  //   }

  //   setBadgeData({
  //     message: `UPDATING DOCUMENTS`,
  //     status: 'secondary',
  //     open: true,
  //     icon: <CircularProgress size={20} color='primary' />,
  //     backgroundColor: '#828597',
  //     theme: 'info',
  //     disableAutoHide: true
  //   })

  //   for (const docto of formatedDoctos) {
  //     const res = await uploadInformationDocument(docto)
  //     const createdDoctoData = res?.createdDoctoDB
  //     if (createdDoctoData) {
  //       newDoctoIdByName[createdDoctoData.name] = createdDoctoData.id
  //     }

  //     if (!res) {
  //       setBadgeData({
  //         message: `ERROR UPDATING DOCUMENT: ${docto.name}`,
  //         theme: 'error',
  //         open: true,
  //         status: 'error',
  //         icon: (
  //           <Icon
  //             style={{
  //               color: '#FF4D49',
  //               marginTop: '-1px'
  //             }}
  //             icon='jam:alert'
  //           />
  //         ),
  //         disableAutoHide: true
  //       })
  //     } else {
  //       setBadgeData({
  //         message: `DOC: "${docto.name.toUpperCase()}", SAVED SUCCESSFULLY`,
  //         status: 'success',
  //         open: true,
  //         icon: <Icon icon='ic:baseline-check-circle' />,
  //         theme: 'success',
  //         disableAutoHide: true
  //       })
  //     }

  //     await delayMs(800)
  //   }

  //   setBadgeData({
  //     message: '',
  //     status: undefined,
  //     icon: undefined,
  //     open: false
  //   })

  //   setDoctoIdByName({
  //     ...doctoIdByName,
  //     ...newDoctoIdByName
  //   })
  // }

  return (
    <>
      <nav className={sidebar ? 'container-sideBar' : 'containerHold-sideBar'}>
        <div className='container-arrow' onClick={handleSidebarMenu}>
          <Box
            width={22}
            fill='none'
            height={22}
            component='svg'
            viewBox='0 0 22 22'
            xmlns='http://www.w3.org/2000/svg'
            sx={{
              transform: sidebar ? `rotate(${0}deg)` : `rotate(${180}deg)`,
              transition: 'transform .25s ease-in-out .35s'
            }}
          >
            <path
              fill={theme.palette.text.secondary}
              d='M11.4854 4.88844C11.0082 4.41121 10.2344 4.41121 9.75716 4.88844L4.51029 10.1353C4.03299 10.6126 4.03299 11.3865 4.51029 11.8638L9.75716 17.1107C10.2344 17.5879 11.0082 17.5879 11.4854 17.1107C11.9626 16.6334 11.9626 15.8597 11.4854 15.3824L7.96674 11.8638C7.48943 11.3865 7.48943 10.6126 7.96674 10.1353L11.4854 6.61667C11.9626 6.13943 11.9626 5.36568 11.4854 4.88844Z'
            />
            <path
              fill={theme.palette.text.disabled}
              d='M15.8683 4.88844L10.6214 10.1353C10.1441 10.6126 10.1441 11.3865 10.6214 11.8638L15.8683 17.1107C16.3455 17.5879 17.1193 17.5879 17.5965 17.1107C18.0737 16.6334 18.0737 15.8597 17.5965 15.3824L14.0779 11.8638C13.6005 11.3865 13.6005 10.6126 14.0779 10.1353L17.5965 6.61667C18.0737 6.13943 18.0737 5.36568 17.5965 4.88844C17.1193 4.41121 16.3455 4.41121 15.8683 4.88844Z'
            />
          </Box>
        </div>

        <div className='container-divider'>
          <Divider textAlign='center' variant='middle' sx={{ width: sidebar ? '11px' : '90%' }} />
        </div>

        <div className='container-docs' style={{ paddingLeft: sidebar ? '0px' : '8px' }}>
          <Icon icon={'mdi:folder-outline'} fontSize={24} color='#4D5062' />
        </div>
        <div
          style={{
            height: 'auto',
            display: sidebar ? 'none' : 'block'
          }}
        >
          <div className='title-documents'>{changeTitle ? 'Documents' : 'Documents'}</div>
          <FileSubmit
            userFile={userFile}
            urls={fileUrls}
            setUserFile={setUserFile}
            setUserFileToDelete={setUserFileToDelete}
            changeTitle={onSubmittedFiles}
          />
        </div>
        <div className='container-divider'>
          <Divider textAlign='center' variant='middle' sx={{ width: sidebar ? '11px' : '90%' }} />
        </div>
        <div className='container-comments' style={{ paddingLeft: sidebar ? '0px' : '8px' }}>
          <Icon icon={'material-symbols:chat-bubble-outline'} fontSize={24} color='#4D5062' />
        </div>

        <div
          style={{
            height: 'auto',
            display: sidebar ? 'none' : 'block'
          }}
        >
          <CommentSection disable={disableComments} step={activeStep} />
        </div>
      </nav>
    </>
  )
}

export default MenuForm
