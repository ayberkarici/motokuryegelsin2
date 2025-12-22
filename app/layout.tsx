import { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import FixedWhatsAppButton from '@/components/fixed-whatsapp-button'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.motokuryegelsin.com'),
  title: {
    default: 'MotoKuryeGelsin - İstanbul\'un En Hızlı Kurye Servisi',
    template: '%s | MotoKuryeGelsin'
  },
  description: 'İstanbul içi hızlı ve güvenli teslimat. 39 ilçe kapsama alanı. Döküman, paket ve acil kurye hizmetleri.',
  keywords: ['kurye', 'istanbul kurye', 'hızlı teslimat', 'paket kurye', 'acil kurye', 'moto kurye'],
  authors: [{ name: 'MotoKuryeGelsin' }],
  creator: 'MotoKuryeGelsin',
  publisher: 'MotoKuryeGelsin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.motokuryegelsin.com',
    title: 'MotoKuryeGelsin - İstanbul\'un En Hızlı Kurye Servisi',
    description: 'İstanbul içi hızlı ve güvenli teslimat. 39 ilçe kapsama alanı.',
    siteName: 'MotoKuryeGelsin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotoKuryeGelsin - İstanbul\'un En Hızlı Kurye Servisi',
    description: 'İstanbul içi hızlı ve güvenli teslimat. 39 ilçe kapsama alanı.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.motokuryegelsin.com',
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Ahrefs Site Verification */}
        <meta name="ahrefs-site-verification" content="a3002a4beef9054c139f52b275f2dcbe9c6b8004bfe47cd5656b3714ca7e461b" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1P50LVFTHK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1P50LVFTHK');
          `}
        </Script>

        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="CofuF32puvyU3GC4Dq0qcQ"
          async
        />
      </head>
      <body>
        {children}
        <FixedWhatsAppButton />
      </body>
    </html>
  )
}