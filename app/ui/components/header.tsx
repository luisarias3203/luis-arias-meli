'use client'
import Logo from '@/app/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function Header() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    push(`/items/?${params.toString()}`)
  })

  useEffect(() => {
    if (pathname === '/') setSearchTerm('')
  }, [pathname])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <header className='bg-yellow py-2'>
      <div className='container grid md:grid-cols-12 gap-4'>
        <div className='flex md:col-start-2 col-span-10'>
          <Link href='/' className='flex items-center'>
            <Image
              src={Logo}
              alt='Create Next App'
              width={55}
              height={38}
              priority
            />
          </Link>
          <form className='ml-6 w-full relative flex' onSubmit={handleSubmit}>
            <label htmlFor='search' className='sr-only'>
              Buscar
            </label>
            <input
              type='search'
              id='search'
              name='search'
              className='w-full bg-white rounded-l-md py-2 px-[.9rem] focus-visible:outline-gray focus-visible:outline focus-visible:outline-2 text-[1.125rem]'
              placeholder='Nunca dejes de buscar'
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='rounded-r-md bg-gray-light p-2 h-full w-10 hover:bg-gray bg-[length:1.25rem] bg-no-repeat bg-center transition-colors bg-[url(../app/assets/search.svg)]'
              aria-label='Search'
            />
          </form>
        </div>
      </div>
      <h1 className='sr-only'>Luis Arias Meli test</h1>
    </header>
  )
}
