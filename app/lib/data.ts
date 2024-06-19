import {
  CategoriesProps,
  DescriptionResponseProps,
  ItemMeliProps,
  ItemResponseProps,
} from './definitions'

export async function getItems({ search }: { search: string }) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=4`
    )
    if (!response.ok) throw new Error('Failed to fetch data')
    const jsonResponse = await response.json()
    const itemsArray = jsonResponse?.results
    const responseObject = {
      author: {
        name: 'Luis',
        lastName: 'Arias',
      },
      categories: jsonResponse?.filters?.[0]?.values?.[0].path_from_root.map(
        (category: { id: string; name: string }) => ({
          id: category?.id,
          category: category?.name,
        })
      ),
      items: itemsArray?.map((item: ItemMeliProps) => ({
        id: item?.id,
        title: item?.title,
        price: {
          currency: item?.currency_id,
          amount: Math.floor(item?.price),
          decimals: parseInt((item?.price % 1).toFixed(2).substring(2)),
        },
        picture: item?.thumbnail,
        condition: item?.condition,
        freeShipping: item?.shipping?.free_shipping || false,
        sellerAddress: item?.seller_address?.city.name,
      })),
    }
    return responseObject
  } catch (error) {
    console.error(error)
  }
  return null
}

export async function getItem(id: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`)
    if (!response.ok) throw new Error('Failed to fetch data')
    const jsonResponse = await response.json()
    const responseObject: ItemResponseProps = {
      author: {
        name: 'Luis',
        lastName: 'Arias',
      },
      categoryId: jsonResponse?.category_id,
      item: {
        id: jsonResponse?.id,
        title: jsonResponse?.title,
        price: {
          currency: jsonResponse?.currency_id,
          amount: Math.floor(jsonResponse?.price),
          decimals: parseInt((jsonResponse?.price % 1).toFixed(2).substring(2)),
        },
        picture: jsonResponse?.pictures?.[0]?.url,
        condition: jsonResponse?.condition,
        freeShipping: jsonResponse?.shipping?.free_shipping || false,
        soldQuantity: jsonResponse?.initial_quantity,
      },
    }
    return responseObject
  } catch (error) {
    console.error(error)
  }
  return null
}

export async function getDescription(id: string) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/items/${id}/description`
    )
    if (!response.ok) throw new Error('Failed to fetch data')
    const jsonResponse = await response.json()
    const responseObject: DescriptionResponseProps = {
      description: jsonResponse?.plain_text,
    }
    return responseObject
  } catch (error) {
    console.error(error)
  }
  return null
}

export async function getCategory(id: string) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/categories/${id}`
    )
    if (!response.ok) throw new Error('Failed to fetch data')
    const jsonResponse = await response.json()
    const responseObject: CategoriesProps = {
      categories: jsonResponse?.path_from_root.map(
        (category: { id: string; name: string }) => ({
          id: category?.id,
          category: category?.name,
        })
      ),
    }
    return responseObject
  } catch (error) {
    console.error(error)
  }
  return null
}
