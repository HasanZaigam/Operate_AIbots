import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-4 p-6 rounded-lg ${isBot ? 'bg-white shadow-sm' : ''}`}>
      <div className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 ${
        isBot ? 'bg-blue-100' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? (
          <img 
            src="/Pasted image.png" 
            alt="Operate AI Logo" 
            className="w-6 h-6"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
      <div className="flex-1 prose prose-blue prose-sm max-w-none">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}