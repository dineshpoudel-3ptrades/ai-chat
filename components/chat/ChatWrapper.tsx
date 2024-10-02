import { Chat } from './chat'
import { AI } from '@/lib/chat/actions'

const ChatWrapper = ({ chatId, chatMessages, session, missingKeys }: any) => {
  return (
    <AI initialAIState={{ chatId, messages: chatMessages }}>
      <Chat
        id={chatId}
        initialMessages={chatMessages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}

export default ChatWrapper
