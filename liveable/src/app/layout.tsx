import type { Metadata } from 'next';
import { Afacad_Flux } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/styles.css';
import '@/styles/mobile-globals.css'; 
import Navbar from './components/global/navbar';
import Footer from './components/global/footer';

const afacadFlux = Afacad_Flux({
  variable: '--font-afacad-flux',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: 'Liveable | %s',
    default: 'Liveable'
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};

/**
 * Root layout component for the application.
 *
 * @param props.children - The React nodes to be rendered within the layout.
 * @returns The root layout structure including Analytics, Navbar, children, and Footer components.
 */
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <Analytics />
      <html lang='en' className={`${afacadFlux.variable}`}>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
