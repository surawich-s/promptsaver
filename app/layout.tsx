import './globals.css'
import ThemeProvider from './components/ThemeProviderComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PromptSaver',
  description: 'Manage your prompts in one place',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}