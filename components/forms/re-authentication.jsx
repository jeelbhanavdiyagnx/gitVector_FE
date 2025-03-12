import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ReAuthentication() {
    const router = useRouter();
  return (
    <div className='px-3 flex flex-col gap-4'>
      <div>
    <h3 className="text-lg font-semibold tracking-normal sm:text-2xl">
      Re-authenticate GitHub
    </h3>
    <p className="pb-2 text-base text-muted-foreground">
      If you are having trouble fetching data from GitHub, you can try re-authenticating your GitHub account
    </p>
    </div>
    <div>
    <Button onClick={()=>{router.push('/git-authentication')}}>Re-authenticate</Button>
    </div>
  </div>
  )
}

export default ReAuthentication