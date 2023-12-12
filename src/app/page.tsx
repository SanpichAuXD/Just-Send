import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-red-500'>
      <h1 className='text-red-500'>Hello World</h1>
      
      <Button>Click msade</Button>
      <Button asChild>
  <Link href="/login">Login</Link>
</Button>

    </div>
   
  )
}
