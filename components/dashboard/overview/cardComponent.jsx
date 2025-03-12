import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { IoInformationCircleOutline } from 'react-icons/io5';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Portal } from '@radix-ui/react-portal';

export function CardComponent({ title, value, desc, hoverTooltip, tooltipContent }) {

  function formatCamelCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (match) => match.toUpperCase())
      .toLowerCase()
      .replace(/^\w/, (match) => match.toUpperCase());
  }
  return (
    <Card className="flex w-full flex-col items-start justify-evenly p-2 shadow-md  duration-200 hover:scale-105">
      <CardHeader className="w-full p-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">{formatCamelCase(title)}</CardTitle>
          <CardDescription className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`h-auto justify-start px-0 py-1 text-left font-semibold`}
                    variant="link"
                  >
                    <IoInformationCircleOutline className="" fontSize={20} />
                  </Button>
                </TooltipTrigger>
                <Portal>
                  <TooltipContent
                    side="bottom"
                    className="min-w-auto  z-[9999] max-w-44 bg-white px-2 text-sm  font-normal leading-5 text-[#71717A] opacity-100 shadow-md"
                  >
                    <p className="">
                      {tooltipContent ||
                        "Based on commits made in the last 15 days"}
                    </p>
                  </TooltipContent>
                </Portal>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mb-0 space-y-0 px-2 pb-0">
        {hoverTooltip
          ?
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><p className="text-2xl  font-normal"> {value}</p></TooltipTrigger>
              <TooltipContent side="bottom"
                className="min-w-auto  z-[9999] max-w-44 bg-white px-2 text-sm  font-normal leading-5 text-[#71717A] opacity-100 shadow-md">
                <p>{hoverTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          :
          <p className="text-2xl  font-normal">{value}</p>
        }
      </CardContent>

      <CardFooter className="p-2 text-xs text-[#71717A]">
        <p>{desc ? desc : 'Last commit on prompt_maker at 11:11 12/12/12'} </p>
      </CardFooter>
    </Card>
  );
}
