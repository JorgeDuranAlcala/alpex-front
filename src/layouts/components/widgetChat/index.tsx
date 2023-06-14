// import { Widget, addResponseMessage } from 'react-chat-widget-2';

import { useEffect } from 'react'
import { Widget } from 'react-chat-widget-2'

// import { chatOpenAI } from './services/chatOpenAI.service'
import 'react-chat-widget-2/lib/styles.css'

// import '../../../../styles/widgetChat.css'

// import logo from './rocket_logo.svg';

const WidgetChat = () => {
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
    console.log(`New message incoming! ${newMessage}`)

    // Now send the message throught the backend API
    // const chatOpenAIResponse = await chatOpenAI(newMessage);
    // addResponseMessage(chatOpenAIResponse);
  }

  return (
    <div id='chatbotDiv' className='Chat'>
      <Widget
        value={'Hwlo'}
        title='The Rocket Code'
        subtitle='How can I help you?'
        handleNewUserMessage={handleNewUserMessage('Hola')}
        senderPlaceHolder='Type your message here...'
      />
    </div>
  )
}

export default WidgetChat
