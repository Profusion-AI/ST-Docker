import axios from 'axios';

const LLM_API_ENDPOINT = process.env.NEXT_PUBLIC_LLM_API_ENDPOINT;

export const generateStoryContent = async (prompt, context) => {
  try {
    const response = await axios.post(LLM_API_ENDPOINT, {
      prompt,
      context,
      // Add any other necessary parameters
    });
    return response.data;
  } catch (error) {
    console.error('Error generating story content:', error);
    throw error;
  }
};

export const generateTraceyResponse = async (userChoice, storyContext) => {
  try {
    const response = await axios.post(LLM_API_ENDPOINT, {
      prompt: `Generate Tracey's response to the user's choice: "${userChoice}"`,
      context: storyContext,
      // Add any other necessary parameters
    });
    return response.data.traceyResponse;
  } catch (error) {
    console.error('Error generating Tracey response:', error);
    throw error;
  }
};