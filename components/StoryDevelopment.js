'use client'

import React, { useState, useEffect } from 'react';
import Tracey from './Tracey';

const StoryDevelopment = ({ initialStoryData, threadId, assistantId }) => {
  const [storyContent, setStoryContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryContent = async () => {
      try {
        const response = await fetch('/api/story/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storyId: 'your-story-id' }),
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
  }, []);

  const parseStoryContent = (content) => {
    // Implement your parsing logic here
    // This should handle partial content as it streams in
    // You might need to adjust this based on how the content is structured
    const lines = content.split('\n');
    const title = lines.find(line => line.startsWith('**Title:'))?.replace('**Title:', '').trim() || '';
    const traceyMessage = lines.find(line => line.startsWith('Tracey:'))?.replace('Tracey:', '').trim() || '';
    const storyText = lines.filter(line => !line.startsWith('**') && !line.startsWith('Tracey:') && !line.match(/^\d+\./)).join('\n').trim();
    const choices = lines.filter(line => line.match(/^\d+\./)).map(choice => ({
      text: choice.replace(/^\d+\.\s*\*\*(.*?)\*\*:/, '$1').trim()
    }));

    return { title, traceyMessage, storyText, choices };
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{storyContent.title}</h1>
      <Tracey message={storyContent.traceyMessage} />
      <p>{storyContent.storyText}</p>
      {storyContent.choices.map((choice, index) => (
        <button key={index} onClick={() => handleChoice(choice)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default StoryDevelopment;