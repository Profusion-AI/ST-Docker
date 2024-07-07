'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function StartJourney() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    genre: '',
    protagonist: '',
    setting: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/story?genre=${formData.genre}&protagonist=${formData.protagonist}&setting=${formData.setting}`)
  }

  return (
    <div className="container">
      <header>
        <h1>Begin Your StoryTaxi Journey</h1>
        <p>Customize your adventure and let Tracey guide you through an unforgettable narrative experience.</p>
      </header>

      <div className="story-options">
        <form onSubmit={handleSubmit}>
          <div className="option-group">
            <label htmlFor="genre">Choose your genre:</label>
            <select id="genre" name="genre" required value={formData.genre} onChange={handleChange}>
              <option value="">Select a genre</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Science Fiction</option>
              {/* Add other options */}
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="protagonist">Name your protagonist:</label>
            <input 
              type="text" 
              id="protagonist" 
              name="protagonist" 
              placeholder="Enter a name" 
              required 
              value={formData.protagonist} 
              onChange={handleChange}
            />
          </div>

          <div className="option-group">
            <label htmlFor="setting">Choose your setting:</label>
            <select id="setting" name="setting" required value={formData.setting} onChange={handleChange}>
              <option value="">Select a setting</option>
              <option value="urban">Urban Metropolis</option>
              <option value="medieval">Medieval Kingdom</option>
              {/* Add other options */}
            </select>
          </div>

          <button type="submit" className="start-button">Begin Your Adventure</button>
        </form>
      </div>

      <div className="ai-assistant">
        <Image src="/images/tracey-avatar.png" alt="Tracey AI Assistant" width={100} height={100} />
        <p>"Hello! I'm Tracey, your AI storytelling companion. I'm excited to create a unique adventure tailored just for you. Let's begin this journey together!"</p>
      </div>
    </div>
  )
}