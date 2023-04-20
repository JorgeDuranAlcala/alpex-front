
// ** MUI Imports
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

// ** Components

// ** Third Party Imports


const CommentSection = () => {
  const userComments = [
    {
      id: 1,
      userId: 1,
      color: "#477FFF",
      letter:"A",
      userName: "Alejando Noseque",
      role:"Admin",
      updateDate: " ",
      chat: [
        {
          message: "Message 1",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        },
        {
          message: 'Thanks, From our official site  😇',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
        },
        {
          message: 'I will purchase it for sure. 👍',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
        }
      ]
    }
  ]


  const handleSend = () => {
    console.log("comment sent")
  };

  return (
    <>
      <div className='comments'>
        <form noValidate autoComplete='off'>
          <div className="title">Comments</div>
          <div className="comment-wrapper">

            <div className="comment-view">
              <div className="user">

                <div className="avatar" style={{ backgroundColor: `${userComments[0].color}` }}>{userComments[0].letter}</div>
                <div className="user-role">
                  <div className="name">{userComments[0].userName}</div>
                  <div className="role">{userComments[0].role}</div>
                </div>
              </div>
              <div className='messages'>
                <div className="message-globe">Hey John, I am looking for the best admin template.
                  Could you please help me ?</div>
                <div className="message-globe">It should be MUI v5 compatible.</div>
                <div className="message-time">Today 1:15 PM </div>
              </div>

            </div>

            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

              <TextField
                multiline
                variant='filled'
                id='textarea-filled'
                placeholder='Placeholder'
                label='Type your message here...'
                className="comment-area"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{ cursor: "pointer" }}>
                      <SendOutlinedIcon onClick={handleSend} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  marginBottom: "0",
                  '& .MuiFormControl-root': {
                    marginBottom: "0px !important",
                  },

                  '& .MuiFilledInput-root:before': {
                    borderBottom: "none",
                  },
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

