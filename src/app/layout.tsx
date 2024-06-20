import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from 'next/font/local';



const neueHaasDisplay = localFont({
  src: [
    { path: '/fonts/NeueHaasDisplayBlack.ttf', weight: '900', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayBlackItalic.ttf', weight: '900', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayBold.ttf', weight: '700', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayBoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayLight.ttf', weight: '300', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayLightItalic.ttf', weight: '300', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayMediu.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayMediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayRomanItalic.ttf', weight: '400', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayRoman.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayThin.ttf', weight: '100', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayThinItalic.ttf', weight: '100', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayXThin.ttf', weight: '50', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayXThinItalic.ttf', weight: '50', style: 'italic' },
    { path: '/fonts/NeueHaasDisplayXXThin.ttf', weight: '25', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayXXThinItalic.ttf', weight: '25', style: 'italic' },
  ]
});

export const metadata: Metadata = {
  title: "Ela Kuester",
  description: "Ela Kuester's online portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={neueHaasDisplay.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
