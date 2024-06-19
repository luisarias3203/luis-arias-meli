import '@/app/globals.css'
import { Header } from '@/app/ui/components/header'
import {
  proximanovaLight,
  proximanovaRegular,
  proximanovaSemibold,
} from '@/app/ui/fonts'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Luis Arias Meli test',
  description: 'Meli test',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${proximanovaLight.variable} ${proximanovaRegular.variable} ${proximanovaSemibold.variable} antialiased bg-gray-light`}
      >
        <Suspense>
          <Header />
        </Suspense>
        <main className='container'>{children}</main>
      </body>
    </html>
  )
}
