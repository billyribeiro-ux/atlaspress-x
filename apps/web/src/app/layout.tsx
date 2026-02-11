import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { validateEnv } from '@/lib/env'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'

// Validate environment at startup (non-blocking for development)
try {
  const envValidation = validateEnv()
  if (!envValidation.success && envValidation.error && typeof envValidation.error === 'object' && 'issues' in envValidation.error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Environment validation warnings:', (envValidation.error as { issues: unknown }).issues)
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn('⚠️ Environment validation failed:', error)
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AtlasPress X',
    template: '%s | AtlasPress X',
  },
  description: 'Enterprise Publishing and Content Operations Platform',
  keywords: ['publishing', 'cms', 'content management', 'enterprise'],
  authors: [{ name: 'AtlasPress X' }],
  creator: 'AtlasPress X',
  publisher: 'AtlasPress X',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'AtlasPress X',
    title: 'AtlasPress X',
    description: 'Enterprise Publishing and Content Operations Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AtlasPress X',
    description: 'Enterprise Publishing and Content Operations Platform',
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
  verification: {
    google: 'verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
