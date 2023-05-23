import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** MUI Imports
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

interface Comment {
  message: string
  time: string
}
interface UserComment {
  id: number
  userId: number
  color: string
  letter: string
  userName: string
  role: string
  updateDate: string
  comments: Comment[]
}

interface CommentSectionProps {
  disable?: boolean
}

const userComments: UserComment[] = [
  {
    id: 1,
    userId: 1,
    color: '#477FFF',
    letter: 'A',
    userName: 'Alejandro Hernández',
    role: 'Admin',
    updateDate: 'Today 1:15 PM',
    comments: []
  }
]

const CommentSection = ({ disable = false }: CommentSectionProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter

  // const [disable, setDisable] = useState(false)
  const [currentComment, setCurrentComment] = useState('')

  const handleSend = () => {
    for (let i = 0; i < userComments.length; i++) {
      if (userComments[i].id === 1) {
        // Solo para el usuario con id = 1

        const formatter = new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        const formattedDate = formatter.format(new Date())

        userComments[i].comments.push({
          message: currentComment,
          time: formattedDate
        })
        userComments[i].updateDate = formattedDate
        break
      }
    }
    setCurrentComment('')
  }

  const handleTextFieldKeyDown = (event: { keyCode: number; shiftKey: boolean; preventDefault: () => void }) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div className='comments' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='off'>
          <div className='title'>Comments</div>
          <div className='comment-wrapper'>
            {userComments.map(user => (
              <>
                {user.comments.length > 0 ? (
                  <div className='comment-view'>
                    <div className='user' key={user.id}>
                      <div className='avatar' style={{ backgroundColor: `${user.color}` }}>
                        {user.letter}
                      </div>
                      <div className='user-role'>
                        <div className='name'>{user.userName}</div>
                        <div className='role'>{user.role}</div>
                      </div>
                    </div>
                    <div className='messages'>
                      {user.comments.map((comment, index) => (
                        <div className='message-globe' key={index}>
                          {comment.message}
                        </div>
                      ))}
                      <div className='message-time'>{user.updateDate} </div>
                    </div>
                  </div>
                ) : (
                  <div className='comment-text'>There are no comments in this account yet.</div>
                )}
              </>
            ))}

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
                onKeyDown={handleTextFieldKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
                      <SendOutlinedIcon onClick={handleSend} />
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
