import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import ChatWrapper from '@/components/chat/ChatWrapper'

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <ChatWrapper
      chatId={id}
      chatMessages={[]}
      session={session}
      missingKeys={missingKeys}
    />
  )
}
