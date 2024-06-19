import notFoundImage from '@/app/assets/not-found-image.svg'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Renders the NotFound component.
 */
export default function NotFound() {
  return (
    <div className='text-center container py-11 md:py-32'>
      <Image
        src={notFoundImage}
        alt='not found image'
        width={250}
        height={150}
        priority
        className='mx-auto'
      />
      <h2 className='font-proximanovaSemibold my-6 text-xl'>
        Parece que esta página no existe
      </h2>
      <Link href='/' className='font-proximanovaRegular text-sm'>
        Ir a la página principal
      </Link>
    </div>
  )
}
