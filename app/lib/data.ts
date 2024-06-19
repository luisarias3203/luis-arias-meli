import {
  DescriptionResponseProps,
  ItemMeliProps,
  ItemResponseProps,
} from './definitions'

/**
 * Fetches items from the MercadoLibre API based on a search query.
 * @param {{ search: string }} { search } - The search parameter to query the API.
 * @returns {Promise<Object>} A promise that resolves to an object containing author details, categories, and items.
 */
export async function getItems({ search }: { search: string }) {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=4`
    )
    if (!response.ok) throw new Error('Failed to fetch data')
    const jsonResponse = await response.json()
    const itemsArray = jsonResponse.results
    const responseObject = {
      author: {
        name: 'Luis',
        lastName: 'Arias',
      },
      categories: {
        categories: itemsArray?.map(
          (item: { category_id: string; category_name: string }) => ({
            id: item?.category_id,
            category: item?.category_name,
          })
        ),
      },
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
