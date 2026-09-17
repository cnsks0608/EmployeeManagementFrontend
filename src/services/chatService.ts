import { apiClient } from './apiClient';

type AskChatDto = {
  question: string;
};

export async function askChat(question: string) {
  return apiClient('/api/Chat/Ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question } as AskChatDto),
  });
}