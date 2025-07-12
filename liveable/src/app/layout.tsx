import type { Metadata } from 'next';
import { Afacad_Flux } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/styles.css';
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
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
      <html lang='en' className={`${afacadFlux.variable}`}>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
  );
}
