import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgentHub – AI Workforce for SMBs (Mock)',
  description: 'Marketplace + Team + Chat + Competitors + Trends + Calendar + Library',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
