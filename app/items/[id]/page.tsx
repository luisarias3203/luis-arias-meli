import { getDescription, getItem } from '@/app/lib/data'
import { FormatPrice } from '@/app/lib/utils'
import NotFound from '@/app/not-found'
import Image from 'next/image'

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { item = [] } = (await getItem(id)) || {}
  const { title, price, picture, condition, soldQuantity } = item
  const { description } = (await getDescription(id)) || {}

  if (!item) {
    return <NotFound />
  }
  return (
    <div className='md:grid md:grid-cols-12 gap-4'>
      <div className='md:col-start-2 md:grid md:grid-cols-10 md:col-span-10 gap-4'>
        {/* <Breadcrumbs categories={items?.categories} /> */}
        <div className='w-full pb-[100%] relative size col-span-7 mt-4 mb-8'>
          {picture && (
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
        </div>
        <div className='col-span-3'>
          {condition && (
            <p className='mt-8 mb-4 font-proximanovaRegular'>
              {condition} - {soldQuantity}{' '}
              {soldQuantity > 1 ? 'vendidos' : 'vendido'}
            </p>
          )}
          {title && (
            <h2 className='text-2xl font-proximanovaSemibold'>{title}</h2>
          )}
          {price && (
            <p className='text-3xl lg:text-[2.875rem] my-8 font-proximanovaRegular'>
              {FormatPrice({
                currency: price.currency,
                amount: price.amount,
                decimals: price.decimals,
              })}
            </p>
          )}
          <div className='md:mr-8'>
            <button
              type='button'
              className='bg-blue text-2xl text-white py-3 w-full rounded font-proximanovaRegular mb-8 md:mb-0'
            >
              Comprar
            </button>
          </div>
        </div>
        {description && (
          <div className='col-span-10 md:pl-8'>
            <h3 className='text-2xl font-proximanovaSemibold '>
              Descripción del producto
            </h3>
            <p className='font-proximanovaRegular my-8'>{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
