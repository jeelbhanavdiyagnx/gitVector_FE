import React from 'react';
import Image from 'next/image';
import complexity from '@/components/assets/scores/complexity.svg';
import bug_penalty from '@/components/assets/scores/bug-penalty.svg';
import implementation_quality from '@/components/assets/scores/implementation_quality.svg';
import readability from '@/components/assets/scores/readability.svg';
import commenting_and_documentation from '@/components/assets/scores/documentation.svg';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function Scores({ review }) {
  const imageMap = {
    complexity,
    bug_penalty,
    implementation_quality,
    readability,
    commenting_and_documentation
  };

  return (
    <span>
      {review?.score ? (
        Object.entries(review.score)
          .filter(([key]) => key in imageMap) // Show only scores present in imageMap
          .map(([key, value], index) => {
            const imageSrc = imageMap[key];

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                      className='lg:pl-2.5 lg:pr-0 pr-2.5' 
                    >
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={key}
                          width={16}
                          height={16}
                        />
                      )}
                      <span className="text-base">{value}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className='bg-white text-[#71717A]'>
                    <p>
                      {key
                        .replace(/_/g, ' ')
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })
      ) : (
        <span></span>
      )}
    </span>
  );
}
