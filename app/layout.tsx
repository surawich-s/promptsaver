import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Prompt Manager</title>
        <meta name="description" content="A simple prompt management application" />
      </head>
      <body>{children}</body>
    </html>
  )
}