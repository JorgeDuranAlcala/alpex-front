// import { Widget, addResponseMessage } from 'react-chat-widget-2';

import { useEffect } from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget-2'
import { useConversationalBot } from '../../../hooks/chatbot/conversationalBot'

// import { chatOpenAI } from './services/chatOpenAI.service'
import 'react-chat-widget-2/lib/styles.css'

// import '../../../../styles/widgetChat.css'

// import logo from './rocket_logo.svg';

const WidgetChat = () => {
  const { sendMessage } = useConversationalBot()
  useEffect(() => {
    const userAgent = window.navigator.userAgent
    const iphone = /iP(hone|od|ad)/.test(userAgent)
    console.log('Iphone', iphone)
    const divChat = document.getElementById('chatbotDiv')
    if (iphone && divChat !== null) {
      divChat.classList.add('isIphone')
    } else {
      divChat?.classList.remove('isIphone')
    }
  }, [])

  const handleNewUserMessage = async (newMessage: string) => {
    const responseAI = await sendMessage({
      userMessage: newMessage,
      idSession: Number(sessionStorage.getItem('idSession')) || undefined
    })
    addResponseMessage(responseAI)
  }

  return (
    <div id='chatbotDiv' className='Chat'>
      <Widget
        title='Alpy'
        subtitle='How can I help you?'
        handleNewUserMessage={handleNewUserMessage}
        senderPlaceHolder='Type your message here...'
      />
    </div>
  )
}

export default WidgetChat
