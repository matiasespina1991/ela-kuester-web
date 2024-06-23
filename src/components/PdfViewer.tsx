import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <Box
    height={window.innerHeight}
    marginTop={0}
    >
      <Document
        file={fileUrl}
        
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> */}

        {Array.from(new Array(numPages), (el, index) => (
          <Page
            width={window.innerWidth - 100}
            
          
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ))}
      </Document>
   
    </Box>
  );
};

export default PdfViewer;
