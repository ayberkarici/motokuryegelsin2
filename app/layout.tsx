import { Metadata } from 'next'
import './globals.css'

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
      </head>
      <body>{children}</body>
    </html>
  )
}