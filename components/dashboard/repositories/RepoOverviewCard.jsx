import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Portal } from '@radix-ui/react-portal';
import { formatCamelCase } from '@/components/utils/helper';
import NoDataAvailable from '../overview/noDataAvailable';
import CardHeading from '../dashboardCards/CardHeading';
import { Dropdown } from '@/components/Dropdown';
import { BarChartSkeleton, OverviewCardSkeleton } from './CustomSkeletons';

export default function RepoOverviewCard({
  title,
  headerContent,
  loading,
  data,
  popOver,
  staticData,
  gridCount,
  allowedKeys,
  plainKey,
  onChange,
  specialKey,
  total,
  isDataEmpty
}) {
  const getTooltipItem = (item) => {
    const tooltip = staticData?.find((value) => value.key === item);
    return tooltip.tooltip;
  };
  const handleChange = (type) => {
    onChange(type);
  };
  return (
    <div className="w-full ">
      {popOver ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <h1 className="text-lg font-medium">{title}</h1>
          {popOver}
        </div>
      ) : (
        title && <h1 className="text-lg font-medium">{title}</h1>
      )}
      <Card className={` shadow-md duration-200 hover:scale-100 py-4`}>
        {headerContent && (
          <div className="flex flex-col gap-1 pb-3">
            <CardHeading
              title={headerContent?.title}
              tooltipContent={headerContent?.toolTip}
            />
            <div className="flex w-[300px] pl-4 flex-row">
              <Dropdown
                data={headerContent?.dropDown?.data}
                targetEntity={headerContent?.dropDown?.targetEntity}
                disabled={headerContent?.dropDown?.disabled}
                placeholder={headerContent?.dropDown?.placeholder}
                onChange={handleChange}
                icon={headerContent?.dropDown?.icon}
              />
            </div>
          </div>
        )}
        {loading ? (
          <BarChartSkeleton />
        ) : isDataEmpty ? (
          <ScrollArea className={`h-[400px] overflow-y-auto`}>
            <CardContent
              className={`grid grid-cols-1 p-0    sm:grid-cols-3     
             ${gridCount ? `lg:grid-cols-${gridCount}` : 'lg:grid-cols-3'} `}
            >
              {allowedKeys && data && Object.keys(data).length > 0
                ? Object.keys(data)
                    ?.filter((key) => allowedKeys.includes(key))
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex w-full border-b-2 py-4  sm:border-b-2 sm:py-0"
                      >
                        <div className="flex w-full flex-col gap-3 px-5 py-2">
                          <h3 className="flex items-center justify-between text-sm font-medium">
                            {formatCamelCase(item)}
                            <span>
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
                                  <Portal>
                                    <TooltipContent
                                      side="bottom"
                                      className="min-w-auto  z-[9999] max-w-44 bg-white px-2  text-sm font-normal leading-5 text-[#71717A] shadow-md"
                                    >
                                      <p>
                                        {(staticData && getTooltipItem(item)) ||
                                          'Based on commits made in the last 15 days'}
                                      </p>
                                    </TooltipContent>
                                  </Portal>
                                </Tooltip>
                              </TooltipProvider>
                            </span>
                          </h3>
                          <h1 className="text-2xl">
                            {data[item].description
                              ? item === plainKey
                                ? Math.round(
                                    item === specialKey.key
                                      ? data[item].activeUsers
                                      : data[item].count
                                  )
                                : total && item === total.key
                                ? `${Math.round(
                                    item === specialKey.key
                                      ? data[item].activeUsers
                                      : data[item].count
                                  )}/${total.value}`
                                : `${Math.round(
                                    item === specialKey.key
                                      ? data[item].activeUsers
                                      : data[item].count
                                  )}/10`
                              : item === plainKey
                              ? Math.round(data[item])
                              : total && item === total.key
                              ? `${Math.round(data[item])}/${total.value}`
                              : `${Math.round(data[item])}/10`}
                          </h1>
                          <p className="text-xs font-normal text-[#71717A]">
                            {data[item].description || ''}
                          </p>
                        </div>
                        <Separator orientation="vertical" className="" />
                      </div>
                    ))
                : Object?.keys(data)?.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full border-b-2 py-4  sm:border-b-2 sm:py-0"
                    >
                      <div className="flex w-full flex-col gap-3 px-5 py-2">
                        <h3 className="flex items-center justify-between text-sm font-medium">
                          {formatCamelCase(item)}
                          <span>
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
                                <Portal>
                                  <TooltipContent
                                    side="bottom"
                                    className="min-w-auto  z-[9999] max-w-44 bg-white px-2  text-sm font-normal leading-5 text-[#71717A] shadow-md"
                                  >
                                    <p>
                                      {(staticData && getTooltipItem(item)) ||
                                        'Based on commits made in the last 15 days'}
                                    </p>
                                  </TooltipContent>
                                </Portal>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                        </h3>
                        <h1 className="text-2xl">
                          {item === plainKey
                            ? Math.round(data[item])
                            : total && item === total.key
                            ? `${Math.round(data[item])}/${total.value}`
                            : `${Math.round(data[item])}/10`}
                        </h1>
                        <p className="text-xs font-normal text-[#71717A]">
                          {data[item].description ||
                            '13 users committed to repos in the last week'}
                        </p>
                      </div>
                      <Separator orientation="vertical" className="" />
                    </div>
                  ))}
            </CardContent>
          </ScrollArea>
        ) : (
          <div className="flex h-[400px] w-full items-center justify-center">
            <NoDataAvailable />
          </div>
        )}
      </Card>
    </div>
  );
}
