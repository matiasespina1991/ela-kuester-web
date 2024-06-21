import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import AnimatedCursor from "react-animated-cursor";



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
            <AnimatedCursor
          innerSize={10}
          outerSize={45}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          trailingSpeed={10}
          innerStyle={{
            backgroundColor: 'white',
            filter: 'opacity(0.9)',
            backdropFilter: 'invert(1)',
            zIndex: 1000,
          }}
          outerStyle={{
            backdropFilter: 'invert(1)',
            zIndex: 1000,
          }}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
