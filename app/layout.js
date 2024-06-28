import '../styles/globals.css'

export const metadata = {
  title: 'StoryTaxi',
  description: 'Interactive storytelling adventures',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}