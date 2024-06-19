// async function getCategories(categoryId: string) {
//   try {
//     const response = await fetch(
//       `https://api.mercadolibre.com/categories/${categoryId}`
//     )
//   } catch (error) {
//     console.error(error)
//   }
// }

export default async function Breadcrumbs() {
  // const data = await getCategories(categoryId)
  // console.log(data)
  return (
    <ol className='my-4 flex space-x-4'>
      {/* {categories?.map((category, index) => {
        return (
          <li key={index}>
            <Link href={`/items?search=${category}`}>
              <a className='hover:text-gray-dark transition-colors'>
                {category}
              </a>
            </Link>
          </li>
        )
      })} */}
    </ol>
  )
}
