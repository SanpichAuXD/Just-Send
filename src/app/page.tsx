import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className='text-red-500'>Hello World</h1>
      
      <Button>Click me</Button>
      <Button asChild>
  <Link href="/login">Login</Link>
</Button>

    </div>
   
  )
}
