// src/app/layout.tsx
import { ReactNode, Suspense } from 'react';
import ClientLayout from './ClientLayout';
import { FirstLoadProvider } from '@/context/FirstLoadContext';
import { url } from 'inspector';

export const metadata = {
  title: 'Ela Kuester',

  description: 'London based fashion designer, stylist and artist.',
  siteName: 'Ela Kuester',
  url: 'https://elakuester.de',
  locale: 'en_GB',
  type: 'website',
  metadataBase: new URL('https://elakuester.de'),
  openGraph: {
    images: [
      {
        url: '/images/opengraph-image.jpg',
        alt: 'Ela Kuester Logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html style={{ height: '100%' }} lang="en">
      <body style={{ height: '100%' }}>
        <Suspense fallback={<div className="loading-page-suspense"></div>}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
