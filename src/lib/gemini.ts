// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// export async function chat(messages: { role: string; content: string }[], context?: string) {
//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
//     const history = messages.map(msg => ({
//       role: msg.role === 'user' ? 'user' : 'model',
//       parts: msg.content,
//     }));

//     const chat = model.startChat({
//       history: history.slice(0, -1),
//     });

//     // If there's context, include it in the prompt
//     const lastMessage = messages[messages.length - 1].content;
//     const prompt = context 
//       ? `Context: ${context}\n\nQuestion: ${lastMessage}\n\nPlease answer the question based on the provided context. If the context doesn't contain relevant information, say so.`
//       : lastMessage;

//     const result = await chat.sendMessage(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return text;
//   } catch (error) {
//     console.error('Error in chat:', error);
//     throw error;
//   }
// }
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function chat(messages: { role: string; content: string }[], context?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const history = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: msg.content,
    }));

    const chat = model.startChat({
      history: history.slice(0, -1),
    });

    // If there's context, include it in the prompt
    const lastMessage = messages[messages.length - 1].content;
    const prompt = context 
      ? `Context: ${context}\n\nQuestion: ${lastMessage}\n\nPlease answer the question based on the provided context. If the context doesn't contain relevant information, say so.`
      : lastMessage;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
}

