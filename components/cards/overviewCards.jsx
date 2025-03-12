import { CookieIcon } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCamelCase } from '../utils/helper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Portal } from '@radix-ui/react-portal';
import Image from 'next/image';
import ProgressChart from '../Graphs/ProgressGraph';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import { OverviewCardSkeleton } from '../dashboard/repositories/CustomSkeletons';

export default function OverviewCards({
  isLoading,
  gridCount,
  data,
  allowedKeys,
  specialKey,
  radialChart,
  plainKey,
  total,
  staticData,
  getStaticData,
}) {
  const getDescriptionItem = (item, count) => {
    const descriptionObj = staticData?.find((value) => value.key === item);
    return `${count
      ? `${count} ${descriptionObj.description}`
      : descriptionObj.description
      }`;
  };

  const getTooltipItem = (item) => {
    const tooltip = staticData?.find((value) => value.key === item);
    return tooltip?.tooltip || 'Based on commits made in the last 15 days';
  };

  const calculateValue = (item) =>
    total.key === item
      ? Math.round(data[item]?.activeUsers)
      : Math.round(data[item]?.count || data[item]||0);

  const calculateColor = (value, maxValue) =>
    value < maxValue - value ? '#B91C1C' : '#15803D';

  const getDisplayText = (item, value, maxValue) => {
    if (plainKey.includes(item)) return value;
    return `${value}/${maxValue}`;
  };

  return (
    <>
      {isLoading ?
        <OverviewCardSkeleton numberOfCards={gridCount} /> :
        <div className={` md:grid-cols-3 grid-cols-1 grid h-auto w-full lg:grid-cols-${gridCount} gap-4 xl:gap-10 `}  >
          {data ?
            Object.keys(data)
              .filter((key) => allowedKeys?.includes(key))
              .map((item, index) => {
                const isSpecial = specialKey && item === specialKey.key;
                const iconKey = isSpecial ? specialKey.value : item;
                const formattedName = formatCamelCase(iconKey);
                const value = calculateValue(item);
                const maxValue = total.key === item ? total.value : 10;
                const color = calculateColor(value, maxValue);
                return (
                  <Card
                    key={index}
                    className="flex flex-col gap-2 rounded-lg border px-2 py-2 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    <CardContent className="flex h-full w-full flex-col justify-between px-0 pb-2">
                      <div className="flex w-full flex-col gap-2 px-0 pb-0">
                        <div className="flex w-full items-center justify-center">
                          <div className="flex w-full items-center gap-1">
                            <span className="flex size-4 items-center justify-center rounded-full">
                              <Image
                                src={`/overviewIcons/${iconKey}.svg`}
                                alt={iconKey}
                                width={20}
                                height={20}
                              />
                            </span>
                            <h2 className="flex items-center text-sm font-medium">
                              {formattedName}
                            </h2>
                          </div>
                          <span className="flex items-center justify-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    className="h-auto justify-start px-0 py-1 text-left font-medium"
                                    variant="link"
                                  >
                                    <IoInformationCircleOutline fontSize={20} />
                                  </Button>
                                </TooltipTrigger>
                                <Portal>
                                  <TooltipContent className="min-w-auto z-[9999] max-w-44 bg-white px-2 text-sm font-normal leading-5 text-[#71717A] shadow-md">
                                    <p>{getTooltipItem(item)}</p>
                                  </TooltipContent>
                                </Portal>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                        </div>
                        <div>
                          {radialChart && radialChart.includes(item) ? (
                            <div className="my-1 flex w-full items-center justify-start gap-2">
                              <div className="flex items-center justify-center">
                                <ProgressChart value={value} maxValue={maxValue} />
                              </div>
                              <div
                                style={{ fontSize: '24px', color }}
                              >{`${value}/${maxValue}`}</div>
                            </div>
                          ) : (
                            <h1 className="my-1 text-2xl">
                              {getDisplayText(item, value, maxValue)}
                            </h1>
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-normal text-[#71717A]">
                        {getStaticData && getDescriptionItem(item) || data[item].description || ""}
                      </p>
                    </CardContent>
                  </Card>
                );
              }) :
            <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
              <NoDataAvailable />
            </div>
          }
        </div>
      }
    </>
  );
}
