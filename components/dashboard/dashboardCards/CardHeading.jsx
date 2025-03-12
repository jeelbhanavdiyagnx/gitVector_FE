import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  } from '@/components/ui/tooltip';
  import { Button } from '@/components/ui/button';
  import { IoInformationCircleOutline } from 'react-icons/io5';

function CardHeading({paddingLeft,title,tooltipContent}) {
  return (
    <h1 className={`flex w-full items-center gap-2 text-lg font-semibold ${paddingLeft ? paddingLeft : 'pl-4'}`}>
  {title}
  {tooltipContent &&
    <span className='pt-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={`h-auto justify-start px-0 py-1 text-left font-medium`}
              variant="link"
            >
              <IoInformationCircleOutline
                className=""
                fontSize={20}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="z-50  min-w-auto max-w-52 bg-white   text-sm font-normal leading-5 text-[#71717A] shadow-md"
          >
            <p className='text-center'>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
}
  </h1>
  )
}

export default CardHeading