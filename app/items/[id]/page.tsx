import { getCategory, getDescription, getItem } from '@/app/lib/data'
import { FormatPrice } from '@/app/lib/utils'
import NotFound from '@/app/not-found'
import Breadcrumbs from '@/app/ui/components/breadcrumbs'
import Image from 'next/image'

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await getItem(id)
  const item = data?.item

  if (!data) {
    return <NotFound />
  }

  const descriptionData = await getDescription(id)
  const description = descriptionData?.description

  const categoriesData = await getCategory(data?.categoryId)
  const categories = categoriesData?.categories
  return (
    <section className='md:grid md:grid-cols-12 gap-4'>
      <div className='md:col-start-2 md:col-span-10 gap-4'>
        {categories && <Breadcrumbs categories={categories} />}
        <div className='md:grid md:grid-cols-10'>
          <div className='col-span-7 mt-4 mb-8'>
            {item?.picture && (
              <Image
                src={item?.picture}
                alt={item?.title}
                priority
                width={680}
                height={680}
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            )}
          </div>
          <div className='col-span-3'>
            <p className='mt-8 mb-4 font-proximanovaRegular'>
              {item?.condition} - {item?.soldQuantity ?? 0}{' '}
              {item?.soldQuantity && item.soldQuantity > 1
                ? 'vendidos'
                : 'vendido'}
            </p>
            {item?.title && (
              <h2 className='text-2xl font-proximanovaSemibold'>
                {item?.title}
              </h2>
            )}
            {item?.price && (
              <p className='text-3xl lg:text-[2.875rem] my-8 font-proximanovaRegular'>
                {FormatPrice({
                  currency: item?.price.currency,
                  amount: item?.price.amount,
                  decimals: item?.price.decimals,
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
              <p
                className='text-base font-proximanovaRegular my-8'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
