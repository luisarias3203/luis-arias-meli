import { CategoriesProps, CategoryProps } from '@/app/lib/definitions'
import Link from 'next/link'

export default async function Breadcrumbs({ categories }: CategoriesProps) {
  return (
    <nav className='my-4'>
      <ol>
        {categories?.map((items: CategoryProps, index: number) => {
          const { category, id } = items
          return (
            <li key={id} className='inline-flex items-center'>
              <Link
                href={`/items?search=${category}`}
                className='hover:text-gray-dark transition-colors inline-flex items-center text-gray-dark font-proximanovaRegular text-sm'
              >
                {category}
                {index !== categories.length - 1 && (
                  <span className='size-5 inline-flex bg-no-repeat bg-center bg-contain mx-1 bg-[url(../app/assets/arrow-right.svg)]' />
                )}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
