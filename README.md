# Operate AI Chat

A modern AI chat interface powered by Google's Gemini Pro model, featuring document analysis capabilities and a clean, responsive UI built with React and TypeScript.

## 🚀 Features

- Real-time chat interface with Google's Gemini Pro AI
- Document analysis support (PDF, TXT, MD, JSON)
- Markdown rendering for AI responses
- Clean, responsive UI with Tailwind CSS
- File upload with progress indication
- Error handling and user feedback

## 🛠️ Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Google Generative AI SDK
- PDF.js for PDF processing
- Lucide React for icons
- React Markdown for message rendering

## 🔧 Setup & Configuration

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 API Key Configuration

The application uses Google's Gemini Pro model through the `@google/generative-ai` package. To use the application:

1. Obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to your `.env` file as shown above
3. The key is automatically loaded and used by the application

## 📝 Usage

1. **Starting a Chat**
   - Type your message in the input field
   - Press Enter or click the Send button
   - The AI will respond based on the conversation context

2. **Document Analysis**
   - Click "Upload Training File" to select a document
   - Supported formats: PDF, TXT, MD, JSON (max 10MB)
   - Once uploaded, the AI will use the document as context for answers

## ⚠️ Known Issues

### PDF Processing Limitations

Currently, there are some limitations and issues with PDF processing:

1. **Worker Loading Issues**
   - The PDF.js worker sometimes fails to load properly
   - This is due to CORS restrictions and worker file accessibility
   - We're working on a more robust solution for worker file distribution

2. **Error Handling Improvements**
   - Some PDF processing errors may not show detailed error messages
   - We've implemented better error logging and user feedback
   - Future updates will include more comprehensive error handling

### Workarounds

If you experience issues with PDF uploads:
1. Try using smaller PDF files (under 5MB)
2. Convert PDFs to text format if possible
3. Use alternative file formats (TXT, MD, JSON) for reliable processing

## 🎥 Tutorial Videos

For detailed explanations and demonstrations, check out these tutorial videos:
- [Setting up the Project](your_video_link_here)
- [Using the Chat Interface](your_video_link_here)
- [Document Analysis Features](your_video_link_here)

## 🔜 Upcoming Features

- Improved PDF processing reliability
- Multiple file upload support
- Enhanced error reporting
- Chat history persistence
- Export conversation functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.