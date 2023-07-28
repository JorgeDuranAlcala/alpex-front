import { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** MUI Imports
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

//hooks
import { useAddComment, useGetCommentsByIdAccount } from '@/hooks/accounts/comments'
import { CommentDto } from '@/services/accounts/dtos/comment.dto'

interface CommentSectionProps {
  disable?: boolean
  step: number
}

interface Comment {
  comment: string
}

interface CommentGroup {
  name: string
  role: string
  createdAt: Date
  comments: Comment[]
}

const CommentSection = ({ disable = false, step }: CommentSectionProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter

  // const [disable, setDisable] = useState(false)
  const [currentComment, setCurrentComment] = useState('')
  const { getComments } = useGetCommentsByIdAccount()
  const { addComment } = useAddComment()
  const [commentGroups, setCommentGroup] = useState<CommentGroup[]>([])

  //disable buttons
  const [disableSaveCommentBtn, setDisableSaveCommentBtn] = useState<boolean>(false)

  const isToday = (commentDate: Date, today: Date) => {
    return (
      commentDate.getFullYear() === today.getFullYear() &&
      commentDate.getMonth() === today.getMonth() &&
      commentDate.getDate() === today.getDate()
    )
  }

  const isYesterDay = (commentDate: Date, today: Date) => {
    return (
      commentDate.getFullYear() === today.getFullYear() &&
      commentDate.getMonth() === today.getMonth() &&
      commentDate.getDate() === today.getDate() - 1
    )
  }
  const isSameTime = (comment: Date, nextComment: Date) => {
    const date1 = new Date(comment)
    const date2 = new Date(nextComment)

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
    )
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const commentDate = new Date(date)
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    const formattedDate = formatter.format(commentDate)

    if (isToday(commentDate, today)) {
      const splitDate = formattedDate.split(',')
      const dataWithoutSlash = splitDate.filter((s, index) => index !== 1)
      dataWithoutSlash[0] = 'Today'

      return dataWithoutSlash.join(', ')
    }

    if (isYesterDay(commentDate, today)) {
      const splitDate = formattedDate.split(',')
      const dataWithoutSlash = splitDate.filter((s, index) => index !== 1)
      dataWithoutSlash[0] = 'Yesterday'

      return dataWithoutSlash.join(', ')
    }

    return formattedDate
  }

  const handleSend = async () => {
    setDisableSaveCommentBtn(true)
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    if (currentComment !== '') {
      await addComment({
        accountId: idAccountCache,
        comment: currentComment
      })
      setCurrentComment('')
      const data = await getComments(idAccountCache)
      groupComments(data)
    }
    setDisableSaveCommentBtn(false)
  }

  const handleTextFieldKeyDown = (event: { keyCode: number; shiftKey: boolean; preventDefault: () => void }) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault()
      handleSend()
    }
  }

  const groupComments = (comments: CommentDto[]) => {
    setCommentGroup([])
    const commentGroupsTemp: CommentGroup[] = []
    for (const comment of comments) {
      const existingGroup = commentGroupsTemp.find(
        group => group.name === comment.name && isSameTime(comment.createdAt, group.createdAt)
      )
      if (existingGroup) {
        existingGroup.comments.push({ comment: comment.comment })
      } else {
        commentGroupsTemp.push({
          name: comment.name,
          role: comment.role,
          createdAt: new Date(comment.createdAt),
          comments: [{ comment: comment.comment }]
        })
      }
    }

    setCommentGroup([...commentGroupsTemp])
  }

  const getAccountComments = async () => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    if (idAccountCache) {
      const data = await getComments(idAccountCache)
      groupComments(data)
    }
  }

  useEffect(() => {
    getAccountComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAccountComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <>
      <div className='comments' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='off'>
          <div className='title'>Comments</div>
          <div className='comment-wrapper'>
            {commentGroups.length > 0 ? (
              commentGroups.map((group, index) => {
                return (
                  <div className='comment-view' key={index}>
                    <div className='user'>
                      <div className='avatar' style={{ backgroundColor: `#477FFF` }}>
                        {group.name.charAt(0).toLocaleUpperCase()}
                      </div>
                      <div className='user-role'>
                        <div className='name'>{group.name}</div>
                        <div className='role'>{group.role}</div>
                      </div>
                    </div>
                    <div className='messages'>
                      {group.comments.length > 0
                        ? group.comments.map((comment, index) => {
                            return (
                              <div className='message-globe' key={index}>
                                {comment.comment}
                              </div>
                            )
                          })
                        : null}
                      <div className='message-time'>{formatDate(group.createdAt)} </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='comment-text'>There are no comments in this account yet.</div>
            )}
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                value={currentComment}
                multiline
                disabled={disable}
                variant='filled'
                id='textarea-filled'
                placeholder=''
                label='Type your message here...'
                className='comment-area'
                onChange={e => setCurrentComment(e.target.value)}
                onKeyDown={event => {
                  if (!disableSaveCommentBtn) {
                    handleTextFieldKeyDown(event)
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
                      <SendOutlinedIcon
                        onClick={() => {
                          if (!disableSaveCommentBtn) {
                            handleSend()
                          }
                        }}
                        sx={!disableSaveCommentBtn ? {} : { fill: '#575A6F42 !important' }}
                      />
                    </InputAdornment>
                  )
                }}
                sx={{
                  marginBottom: '0',
                  '& .MuiFilledInput-root': {
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px'
                  },

                  '& .MuiFilledInput-root:before': {
                    borderBottom: 'none'
                  }
                }}
              />
            </FormControl>
          </div>
        </form>
      </div>
    </>
  )
}

export default CommentSection
