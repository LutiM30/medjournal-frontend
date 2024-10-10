import localFont from 'next/font/local';
import './globals.css';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'jotai';
import { Footer } from '@/components/ui/footer';
import { Toaster } from '@/components/ui/sonner';
import { projectConstants } from '@/lib/utils';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: `${projectConstants.PROJECT_NAME}`,
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme={'system' || localStorage.getItem('theme')}
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position='bottom-center' />
          <Provider>
            <>
              <FloatingNav className={cn('')} />
              {children}
              {/* <Footer /> */}
            </>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
