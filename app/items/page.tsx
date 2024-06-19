import { getItems } from '@/app/lib/data'
import { ItemProps } from '@/app/lib/definitions'
import { FormatPrice } from '@/app/lib/utils'
import Shipping from '@/app/shipping.png'
import Image from 'next/image'
import Link from 'next/link'
import NotFound from '../not-found'

export default async function Items({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const { items = [] } = (await getItems(searchParams)) || {}

  if (!items.length) {
    return <NotFound />
  }

  return (
    <div className='md:grid md:grid-cols-12 gap-4'>
      <div className='md:col-start-2 col-span-10'>
        {/* <Breadcrumbs categories={items?.categories} /> */}
        <ul className='bg-white px-4 divide-gray-light rounded-sm divide-y my-4'>
          {items?.map((item: ItemProps) => {
            const { id, title, price, picture, condition, freeShipping } = item
            return (
              <li key={id} className='py-4 md:grid md:grid-cols-10 gap-4'>
                <Link
                  href={`/items/${id}`}
                  className='w-full pb-[100%] relative rounded col-span-2'
                >
                  {picture && title && (
                    <Image
                      src={picture}
                      alt={title}
                      fill
                      sizes='100%'
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </Link>
                <div className='col-span-6'>
                  <div className='flex space-x-2 items-center mb-4 md:mb-8 mt-4'>
                    {price && (
                      <p className='text-xl font-proximanovaRegular'>
                        {FormatPrice({
                          currency: price.currency,
                          amount: price.amount,
                          decimals: price.decimals,
                        })}
                      </p>
                    )}
                    {freeShipping && (
                      <div>
                        <Image
                          src={Shipping}
                          alt='Envío gratis'
                          width={18}
                          height={18}
                        />
                        <span className='sr-only'>Envio Gratis</span>
                      </div>
                    )}
                  </div>
                  {id && (
                    <Link
                      href={`/items/${id}`}
                      className='hover:text-gray-dark transition-colors'
                    >
                      <h2 className='text-lg font-proximanovaRegular'>
                        {title}
                      </h2>
                    </Link>
                  )}
                </div>
                {condition && (
                  <div className='col-span-2 mt-4 text-xs'>
                    <p className='text-sm font-proximanovaRegular'>
                      {condition}
                    </p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
