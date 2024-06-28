import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { threadId, assistantId, choice } = await req.json();

  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: `User chose: "${choice}". Continue the story based on this choice. Provide:
      1. An updated title prefixed with "**Title:"
      2. A new contextual message from Tracey prefixed with "Tracey:"
      3. The next part of the story (at least 250 words)
      4. 3 new detailed choices, each starting with a number and a short phrase in bold, followed by a brief description.
      
      Ensure Tracey's message relates to the current story context and guides the user.`
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId
    });

    const storyContent = await waitForRunCompletion(thread.id, run.id);

    return NextResponse.json({ storyContent });
  } catch (error) {
    console.error('Error in story progression:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function waitForRunCompletion(threadId, runId) {
  let runStatus;
  do {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  } while (runStatus.status === 'in_progress' || runStatus.status === 'queued');

  if (runStatus.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(threadId);
    return parseStoryContent(messages.data[0].content[0].text.value);
  } else {
    throw new Error('Run failed or was cancelled');
  }
}

function parseStoryContent(content) {
  const lines = content.split('\n');
  const titleIndex = lines.findIndex(line => line.startsWith('**Title:'));
  const title = lines[titleIndex].replace(/^\*\*Title:\s*/, '').replace(/\*\*$/, '').trim();
  
  const traceyIndex = lines.findIndex(line => line.startsWith('Tracey:'));
  const traceyMessage = lines[traceyIndex].replace(/^Tracey:\s*/, '').trim();
  
  const storyTextStart = traceyIndex + 1;
  const storyTextEnd = lines.findIndex((line, index) => index > storyTextStart && line.startsWith('1. **'));
  const storyText = lines.slice(storyTextStart, storyTextEnd).join('\n').trim();
  
  const choices = lines.slice(storyTextEnd).filter(line => line.startsWith('**')).map(choice => ({
    text: choice.replace(/^\d+\.\s*\*\*(.*?)\*\*:/, '$1').trim()
  }));
  
  return { title, traceyMessage, storyText, choices };
}