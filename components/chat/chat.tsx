'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from './chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState, useRef } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  missingKeys: string[]
}

export const Chat = ({ id, className, missingKeys }: ChatProps) => {
  const [toggleChat, setToggleChat] = useState<boolean>(false)
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const [_, setNewChatId] = useLocalStorage('newChatId', id)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.forEach(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const toggleHandler = () => {
    setToggleChat(prevState => !prevState)
  }

  return (
    <div className="w-full h-full">
      <button
        ref={buttonRef}
        className="z-30 absolute bottom-1 right-4 bg-blue-700 rounded-full p-5 text-white"
        onClick={toggleHandler}
      >
        Chat
      </button>
      {toggleChat && (
        <div
          className="absolute bg-white border rounded-lg shadow-lg p-4 z-30 h-5/6"
          style={{
            bottom: buttonRef.current
              ? `${buttonRef.current.offsetHeight + 10}px`
              : '60px',
            right: '16px'
          }}
        >
          <div
            className="group flex justify-between flex-col h-full w-80   overflow-auto"
            ref={scrollRef}
          >
            <div
              className={cn('pb-[200px] pt-4 md:pt-10', className)}
              ref={messagesRef}
            >
              {messages.length ? (
                <ChatList messages={messages} isShared={false} />
              ) : (
                <EmptyScreen />
              )}
              <div className="w-full h-px" ref={visibilityRef} />
            </div>
            <ChatPanel
              id={id}
              input={input}
              setInput={setInput}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      )}
    </div>
  )
}
