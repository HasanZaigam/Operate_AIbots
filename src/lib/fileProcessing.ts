import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Use the exact same version as the package for the worker
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export async function processPdfFile(file: File): Promise<string> {
  // Validate file size (max 10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File is too large. Maximum size is 10MB.');
  }

  try {
    // First verify it's actually a PDF by checking magic numbers
    const firstBytes = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    const pdfHeader = String.fromCharCode(...firstBytes);
    if (!pdfHeader.startsWith('%PDF-')) {
      throw new Error('Invalid PDF file format.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument(new Uint8Array(arrayBuffer));
    
    // Add progress callback
    loadingTask.onProgress = (progress) => {
      const percent = (progress.loaded / progress.total) * 100;
      console.log(`Loading PDF: ${Math.round(percent)}%`);
    };

    const pdf = await loadingTask.promise;
    
    if (pdf.numPages === 0) {
      throw new Error('PDF file is empty.');
    }

    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        const errorMessage = pageError instanceof Error ? pageError.message : 'Unknown error';
        console.error(`Error processing page ${i}:`, errorMessage);
        throw new Error(`Failed to process page ${i} of the PDF file: ${errorMessage}`);
      }
    }
    
    const processedText = fullText.trim();
    if (!processedText) {
      throw new Error('No readable text found in the PDF file.');
    }
    
    return processedText;
  } catch (error) {
    // Log the full error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Detailed PDF processing error:', error);
    
    // Return a user-friendly error message
    throw error instanceof Error ? error : new Error('Failed to process PDF file. Please try again with a different file.');
  }
}