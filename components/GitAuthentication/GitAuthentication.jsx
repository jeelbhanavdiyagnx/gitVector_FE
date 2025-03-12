import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { MdDone } from "react-icons/md";

function GithubAuthentication() {
  const handleGitHubAuth = () => {
    const redirectUri = `${window.location.origin}/connect`;
    const githubUrl = `https://api.gitvector.io/api/v1/user/auth/github?redirect_uri=${redirectUri}`;
    window.location.href = githubUrl;
  };
    return(
        <div className="flex  flex-col items-center sm:mt-10">
      <div className="flex  flex-1 items-center p-4 lg:p-8">
        <div className="mx-auto  mt-10 flex w-full items-center flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="flex items-center justify-center gap-2">
            <h1 className="flex w-20 h-20 sm:h-28 sm:w-28 items-center justify-center rounded-full dark:bg-zinc-900 bg-gray-100 px-4 text-center text-sm sm:text-lg font-medium">
              Git Analysis Logo
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-16 sm:w-32 border-t-2 border-dashed border-gray-600 "></div>
              <MdDone className="rounded-full border-2 border-[#34B223] p-1 font-bold text-2xl sm:text-4xl text-[#34B223]" />
              <div className="h-[1px] w-16 sm:w-32 border-t-2 border-dashed border-gray-600 "></div>
            </div>
            <div>
                <FaGithub className='text-4xl sm:text-8xl'/>
            </div>
          </div>
          <h1 className='text-lg sm:text-2xl font-normal dark:text-white text-black'>Authorize Git Analysis</h1>
          <div className='sm:w-[340px] w-full h-[340px] border rounded-lg flex flex-col items-center justify-end p-5'>
            <div className='w-full h-full flex flex-col items-center justify-center dark:text-white text-black font-medium leading-tight'>
            <h1>---Placeholder---</h1>
            <h1>Oauth component to taken from GitHub</h1>
            </div>
            <Button variant="default" className='ml-auto w-full bg-[#34B223]' onClick={handleGitHubAuth}>Authorize Git Analysis</Button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default GithubAuthentication;