'use client';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

if (typeof Promise.withResolvers === 'undefined') {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <Box height={window.innerHeight} marginTop={0}>
      <Document
        loading={
          <Box
            sx={{
              position: 'absolute',
              top: '43vh',
              transform: 'translateX(-46%)',
            }}
          >
            <Stack
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <CircularProgress size={30} sx={{ opacity: 0.7 }} />
              <Stack
                alignContent="center"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
              >
                <Typography textTransform="uppercase" variant="body1">
                  loading portfolio...
                </Typography>
                <Typography textTransform="uppercase" variant="body1">
                  Please wait.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        }
        file={fileUrl}
        noData={
          <Box
            sx={{
              position: 'absolute',
              top: '43vh',
              transform: 'translateX(-46%)',
            }}
          >
            <Stack
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              spacing={0.5}
            >
              <Typography textTransform="uppercase" variant="body1">
                No portfolio found.
              </Typography>
              <Typography textTransform="uppercase" variant="body1">
                {':('}
              </Typography>
            </Stack>
          </Box>
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            className="LLLLL"
            width={window.innerWidth}
            // height={280}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ))}
      </Document>
    </Box>
  );
};

export default PdfViewer;
