import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCurrentStory, progressStory } from '../redux/storySlice';
import Tracey from './Tracey';
import StoryLoading from './StoryLoading';
import StoryError from './StoryError';
import { createAssistant, createThread, createMessage, createRun, getRunStatus, getMessages } from '../utils/openaiUtils';

const StoryDevelopment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { storyId } = router.query;
  const { currentStory, currentNode } = useSelector((state) => state.story);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assistant, setAssistant] = useState(null);
  const [thread, setThread] = useState(null);

  useEffect(() => {
    const initializeStory = async () => {
      setIsLoading(true);
      try {
        const newAssistant = await createAssistant();
        setAssistant(newAssistant);
        const newThread = await createThread();
        setThread(newThread);
        
        const initialPrompt = `Initialize a story with ID: ${storyId}. Provide a title, an opening scene, and 2-3 choices for the user.`;
        await createMessage(newThread.id, initialPrompt);
        const run = await createRun(newThread.id, newAssistant.id);
        
        const storyContent = await waitForRunCompletion(newThread.id, run.id);
        dispatch(setCurrentStory(storyContent));
      } catch (error) {
        console.error('Failed to initialize story:', error);
        setError('Failed to initialize story. Please try again.');
      }
      setIsLoading(false);
    };

    if (storyId && !currentStory) {
      initializeStory();
    }
  }, [storyId, dispatch, currentStory]);

  const waitForRunCompletion = async (threadId, runId) => {
    let runStatus;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      runStatus = await getRunStatus(threadId, runId);
    } while (runStatus.status === 'in_progress' || runStatus.status === 'queued');

    if (runStatus.status === 'completed') {
      const messages = await getMessages(threadId);
      return parseStoryContent(messages.data[0].content[0].text.value);
    } else {
      throw new Error('Run failed or was cancelled');
    }
  };

  const parseStoryContent = (content) => {
    // Parse the assistant's response to extract title, text, and choices
    // This is a simplified example and might need to be adjusted based on the actual response format
    const lines = content.split('\n');
    const title = lines[0].replace('Title: ', '');
    const text = lines.slice(1, -3).join('\n');
    const choices = lines.slice(-3).map(choice => ({ text: choice.replace('- ', '') }));
    return { title, text, choices };
  };

  const handleChoice = async (choice) => {
    setIsLoading(true);
    try {
      await createMessage(thread.id, `User chose: "${choice.text}". Continue the story based on this choice.`);
      const run = await createRun(thread.id, assistant.id);
      const nextNodeContent = await waitForRunCompletion(thread.id, run.id);
      
      dispatch(progressStory({ nextNode: nextNodeContent, choice }));
    } catch (error) {
      console.error('Failed to progress story:', error);
      setError('Failed to progress story. Please try again.');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <StoryLoading />;
  }

  if (error) {
    return <StoryError message={error} onRetry={() => router.reload()} />;
  }

  if (!currentStory || !currentNode) {
    return <div className="text-center">Failed to load story. Please try again.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{currentStory.title}</h1>
      <Tracey message={currentNode.traceyMessage || "What would you like to do next?"} />
      <p className="mb-4">{currentNode.text}</p>
      <div className="space-y-2">
        {currentNode.choices.map((choice, index) => (
          <button
            key={index}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleChoice(choice)}
            disabled={isLoading}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryDevelopment;