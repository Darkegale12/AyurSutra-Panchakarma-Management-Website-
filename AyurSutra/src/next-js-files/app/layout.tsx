import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AyurSutra - Authentic Panchakarma Management',
  description: 'Preserve health of the healthy and cure diseases of the sick through authentic Panchakarma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
        {children}
      </body>
    </html>
  )
}