import dynamic from 'next/dynamic'

// import WidgetChat from '@/layouts/components/widgetChat'

const WidgetBot = dynamic(() => import('@/layouts/components/widgetChat'), { ssr: false })

function ChatBot() {
  return (
    <>
      <WidgetBot />
    </>
  )
}

export default ChatBot
