import ConversationalBot from '@/services/chat/chat.service'
import { ISendChatBot } from '@/services/chat/dtos/ChatDto'
export const useConversationalBot = () => {
  const conversationalBot = new ConversationalBot()
  const sendMessage = async (data: ISendChatBot) => {
    return await conversationalBot.chatbot(data)
  }

  return {
    sendMessage
  }
}
