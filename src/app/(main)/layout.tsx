import { Sidebar } from '@/components/layout/sidebar'
import { ChatWidget } from '@/features/chatbot/components/ChatWidget'
import { TourProvider } from '@/components/onboarding'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TourProvider>
      <div
        className="min-h-screen"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
      >
        <Sidebar />
        <main className="ml-64 min-h-screen">
          {children}
        </main>
        <ChatWidget />
      </div>
    </TourProvider>
  )
}
