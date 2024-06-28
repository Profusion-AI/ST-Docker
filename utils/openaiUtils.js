import axios from 'axios';

const API_ENDPOINT = '/api/openai';

export async function createAssistant() {
  const response = await axios.post(API_ENDPOINT, { action: 'CREATE_ASSISTANT' });
  return response.data;
}

export async function createThread() {
  const response = await axios.post(API_ENDPOINT, { action: 'CREATE_THREAD' });
  return response.data;
}

export async function createMessage(threadId, content) {
  const response = await axios.post(API_ENDPOINT, {
    action: 'CREATE_MESSAGE',
    data: { threadId, content }
  });
  return response.data;
}

export async function createRun(threadId, assistantId) {
  const response = await axios.post(API_ENDPOINT, {
    action: 'CREATE_RUN',
    data: { threadId, assistantId }
  });
  return response.data;
}

export async function getRunStatus(threadId, runId) {
  const response = await axios.post(API_ENDPOINT, {
    action: 'GET_RUN',
    data: { threadId, runId }
  });
  return response.data;
}

export async function getMessages(threadId) {
  const response = await axios.post(API_ENDPOINT, {
    action: 'GET_MESSAGES',
    data: { threadId }
  });
  return response.data;
}