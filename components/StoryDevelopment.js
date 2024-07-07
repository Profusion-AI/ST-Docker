'use client';

import React, { useState, useEffect } from 'react';
import Tracey from './Tracey';

const StoryDevelopment = ({ storyId }) => {
  const [storyContent, setStoryContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryContent = async () => {
      try {
        const response = await fetch('/api/story/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storyId }),
        });

        if (!response.ok) throw new Error('Failed to initialize story');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let content = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          content += decoder.decode(value);
          setStoryContent(parseStoryContent(content));
        }

        setIsLoading(false);
      } catch (error) {
        setError('Failed to initialize story. Please try again.');
        setIsLoading(false);
      }
    };

    fetchStoryContent();
  }, [storyId]);

  const parseStoryContent = (content) => {
    // Implement your parsing logic here
    // This is a placeholder implementation
    const lines = content.split('\n');
    const title = lines.find(line => line.startsWith('**Title:'))?.replace('**Title:', '').trim() || '';
    const traceyMessage = lines.find(line => line.startsWith('Tracey:'))?.replace('Tracey:', '').trim() || '';
    const storyText = lines.filter(line => !line.startsWith('**') && !line.startsWith('Tracey:') && !line.match(/^\d+\./)).join('\n').trim();
    const choices = lines.filter(line => line.match(/^\d+\./)).map(choice => ({
      text: choice.replace(/^\d+\.\s*\*\*(.*?)\*\*:/, '$1').trim()
    }));

    return { title, traceyMessage, storyText, choices };
  };

  if (isLoading) return <div className="container py-8 text-center">Loading your adventure...</div>;
  if (error) return <div className="container py-8 text-center text-red-500">{error}</div>;
  if (!storyContent) return null;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">{storyContent.title}</h1>
      <Tracey message={storyContent.traceyMessage} />
      <div className="card mb-8">
        <p className="text-lg leading-relaxed">{storyContent.storyText}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {storyContent.choices.map((choice, index) => (
          <button key={index} className="btn btn-primary" onClick={() => handleChoice(choice)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryDevelopment;