export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  context: string;
}

export interface FileUploadProps {
  onFileProcess: (content: string) => void;
  disabled?: boolean;
}