'use client'

import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <div 
      className="taxi-icon" 
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      🚕
    </div>
  )
}