import { CHAT_BOT } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway';
import { ISendChatBot } from './dtos/ChatDto'

class ConversationalBot {
  async chatbot({ userMessage, idSession }: ISendChatBot) {
    try {
      const resp = await AppAlpexApiGateWay.post(`${CHAT_BOT.CHAT}`, {
        userMessage, idSession
    })
      sessionStorage.setItem('idSession', resp?.data.sessionId)
      return resp?.data.responseAI;
    } catch (error) {
      return 'Ocurrio un error vuelve intentar mas tarde'
    }
  }
}

export default ConversationalBot
