import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { storyId } = await req.json();

  const assistant = await openai.beta.assistants.create({
    name: "Tracey",
    instructions: "You are Tracey, an AI storyteller for StoryTaxi. Your role is to guide users through interactive stories, providing engaging narrative and responding to their choices.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o"
  });

  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `Initialize a story with ID: ${storyId}. Provide the following:
    1. A title prefixed with "**Title:"
    2. A contextual message from Tracey prefixed with "Tracey:"
    3. An opening scene of at least 250 words, prefixed with "**Opening Scene:**"
    4. The introduction of a character
    5. 3 detailed choices for the user, each starting with a number and a short phrase in bold, followed by a brief description.
    
    Ensure Tracey's message relates to the current story context and guides the user.`
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Provide detailed, engaging responses with vivid descriptions. Aim for at least 400 words for the story content.",
    stream: true
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of run) {
        if (chunk.choices?.[0]?.delta?.content) {
          controller.enqueue(encoder.encode(chunk.choices[0].delta.content));
        }
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}