import React, { useRef, useState } from 'react';
import type { FileUploadProps } from '../types';
import { processPdfFile } from '../lib/fileProcessing';

export function FileUpload({ onFileProcess, disabled }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      let text: string;
      
      if (file.type === 'application/pdf') {
        text = await processPdfFile(file);
      } else {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('File is too large. Maximum size is 10MB.');
        }
        text = await file.text();
      }
      
      if (!text.trim()) {
        throw new Error('The file appears to be empty or contains no readable text.');
      }
      
      onFileProcess(text);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('File processing error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".txt,.md,.json,.pdf"
            disabled={disabled || isProcessing}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isProcessing}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            )}
            {isProcessing ? 'Processing...' : 'Upload Training File'}
          </button>
          <p className="text-sm text-gray-500">
            Supported formats: .txt, .md, .json, .pdf (max 10MB)
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}

