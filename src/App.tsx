import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { FileUpload } from './components/FileUpload';
import { chat } from './lib/gemini';
import type { ChatState, Message } from './types';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    context: '',
  });

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const response = await chat([...state.messages, userMessage], state.context);
      const assistantMessage: Message = { role: 'assistant', content: response };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const handleFileProcess = (content: string) => {
    setState(prev => ({
      ...prev,
      context: content,
      messages: [
        ...prev.messages,
        {
          role: 'assistant',
          content: 'I\'ve processed the file content. You can now ask questions about it!',
        },
      ],
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-6 border-b bg-white shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
          <img 
            src="/Pasted image.png" 
            alt="Operate AI Logo" 
            className="w-7 h-7"
          />
          <h1 className="text-3xl font-bold text-gray-800">Operate AI Chat</h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto py-6">
        <div className="max-w-3xl mx-auto px-4">
          {state.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <img 
                src="/Pasted image.png" 
                alt="Operate AI Logo" 
                className="w-12 h-12 mb-2"
              />
              <h2 className="text-2xl font-semibold text-gray-800">Welcome to Operate AI</h2>
              <p className="text-gray-600 max-w-md">
                Upload a file to train the AI or start a conversation directly. 
                I'm here to help you analyze documents and answer your questions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {state.messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {state.isLoading && (
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <span className="ml-2 text-gray-600">Operate AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <div className="bg-white border-t shadow-md">
        <div className="max-w-3xl mx-auto">
          <FileUpload onFileProcess={handleFileProcess} disabled={state.isLoading} />
          <ChatInput onSend={handleSend} disabled={state.isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App



// import { ChatMessage } from './components/ChatMessage';
// import { ChatInput } from './components/ChatInput';
// import { FileUpload } from './components/FileUpload';
// import { chat } from './lib/gemini';
// import { processPdfFile } from './lib/fileProcessing';
// import type { ChatState, Message } from './types';

// function App() {
//   const [state, setState] = useState<ChatState>({
//     messages: [],
//     isLoading: false,
//     context: '',
//   });

//   const handleSend = async (content: string) => {
//     const userMessage: Message = { role: 'user', content };
    
//     setState(prev => ({
//       ...prev,
//       messages: [...prev.messages, userMessage],
//       isLoading: true,
//     }));

//     try {
//       const response = await chat([...state.messages, userMessage], state.context);
//       const assistantMessage: Message = { role: 'assistant', content: response };
      
//       setState(prev => ({
//         ...prev,
//         messages: [...prev.messages, userMessage, assistantMessage],
//         isLoading: false,
//       }));
//     } catch (error) {
//       console.error('Error:', error);
//       setState(prev => ({
//         ...prev,
//         isLoading: false,
//       }));
//     }
//   };

//   const handleFileProcess = async (file: File) => {
//     setState(prev => ({ ...prev, isLoading: true }));
//     try {
//       const content = await processPdfFile(file);
//       setState(prev => ({
//         ...prev,
//         context: content,
//         messages: [
//           ...prev.messages,
//           {
//             role: 'assistant',
//             content: "I've processed the file content. You can now ask questions about it!",
//           },
//         ],
//         isLoading: false,
//       }));
//     } catch (error) {
//       console.error('File processing error:', error);
//       setState(prev => ({
//         ...prev,
//         messages: [...prev.messages, { role: 'assistant', content: 'Failed to process the file.' }],
//         isLoading: false,
//       }));
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <header className="p-6 border-b bg-white shadow-sm">
//         <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
//           <img src="/Pasted image.png" alt="Operate AI Logo" className="w-7 h-7" />
//           <h1 className="text-3xl font-bold text-gray-800">Operate AI Chat</h1>
//         </div>
//       </header>
      
//       <main className="flex-1 overflow-y-auto py-6">
//         <div className="max-w-3xl mx-auto px-4">
//           {state.messages.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
//               <img src="/Pasted image.png" alt="Operate AI Logo" className="w-12 h-12 mb-2" />
//               <h2 className="text-2xl font-semibold text-gray-800">Welcome to Operate AI</h2>
//               <p className="text-gray-600 max-w-md">
//                 Upload a file to train the AI or start a conversation directly. 
//                 I'm here to help you analyze documents and answer your questions.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {state.messages.map((message, index) => (
//                 <ChatMessage key={index} message={message} />
//               ))}
//               {state.isLoading && (
//                 <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                     <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                     <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
//                     <span className="ml-2 text-gray-600">Operate AI is thinking...</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
      
//       <div className="bg-white border-t shadow-md">
//         <div className="max-w-3xl mx-auto">
//           <FileUpload onFileProcess={handleFileProcess} disabled={state.isLoading} />
//           <ChatInput onSend={handleSend} disabled={state.isLoading} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;