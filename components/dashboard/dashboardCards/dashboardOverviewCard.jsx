import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import CardHeading from './CardHeading';
import { Dropdown } from '@/components/Dropdown';
import { BarChartSkeleton } from '../repositories/CustomSkeletons';

export default function DashboardOverviewCard({
  loading,
  headerContent,
  title,
  data,
  popOver,
  height,
  gridCount,
  staticData,
  allowedKeys,
  plainKey,
  specialKey,
  total,
  getStaticData,
  isDataEmpty,
  onChange
}) {
  const getTooltipItem = (item) => {
    const tooltip = staticData?.find((value) => value.key === item);
    return tooltip.tooltip;
  };
  const getDescriptionItem = (item, count) => {
    const descriptionObj = staticData?.find((value) => value.key === item);
    return `${count
      ? `${count} ${descriptionObj.description}`
      : descriptionObj.description
      } `;
  };
  const handleDropDownChange = (response) => {
    onChange(response);
  };

  return (
    <div className="w-full pb-1">
      {popOver ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <h1 className="text-lg font-medium">{title}</h1>
          {popOver}
        </div>
      ) : (
        title && <h1 className="text-lg font-medium">{title}</h1>
      )}

      <Card className={` p-0  shadow-md  duration-200 hover:scale-100`}>
        {headerContent && (
          <CardHeader className="py-0 pb-3 pt-6">
            <div className="flex w-full flex-col gap-1  ">
              <CardHeading paddingLeft={'pl-0'} title={headerContent.title} />

              {headerContent?.dropDown && (
                <div className=" w-2/4">
                  <Dropdown
                    data={headerContent?.dropDown?.data}
                    placeholder={headerContent?.dropDown?.placeholder}
                    disabled={headerContent?.dropDown?.disabled}
                    targetEntity={headerContent?.dropDown?.targetEntity}
                    onChange={handleDropDownChange}
                    defaultValue={headerContent?.dropDown?.defaultValue}
                    clear={headerContent?.dropDown?.clear}
                    icon={headerContent?.dropDown?.icon}
                  />
                </div>
              )}
            </div>
          </CardHeader>
        )}{' '}
        {loading ? (
          <BarChartSkeleton />
        ) : isDataEmpty ? (
          <ScrollArea
            className={`h-full overflow-y-auto lg:h-full lg:max-h-[510px]  ${height && 'md:max-h-[510px]'
              } max-h-[300px]`}
          >
            <CardContent
              className={`grid grid-cols-1 p-0    sm:grid-cols-3     
      ${gridCount ? `lg:grid-cols-${gridCount}` : 'lg:grid-cols-3'} `}
            >
              {allowedKeys && data && Object.keys(data).length > 0
                ? Object.keys(data)
                  ?.filter((key) => allowedKeys?.includes(key))
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full border-b-2 py-4  sm:border-b-2 sm:py-0"
                    >
                      <div className="flex w-full flex-col gap-3 px-5 py-2">
                        <h3 className="flex items-center justify-between text-sm font-medium">
                          {formatCamelCase(
                            specialKey
                              ? item === specialKey.key
                                ? specialKey.value
                                : item
                              : item
                          )}
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
                                        data[item].tooltip ||
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
                          {(getStaticData &&
                            getDescriptionItem(
                              item,
                              data[item].activeUsers
                            )) ||
                            data[item].description ||
                            ''}
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
                                      data[item].tooltip ||
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
                        {(getStaticData && getDescriptionItem(item)) ||
                          data[item].description ||
                          ''}
                      </p>
                    </div>
                    <Separator orientation="vertical" className="" />
                  </div>
                ))}
            </CardContent>
          </ScrollArea>
        ) : (
          <div
            className={`mt-2 h-40 w-full  ${height && 'mt-2 h-[510px]'
              } flex items-center justify-center `}
          >
            <NoDataAvailable />
          </div>
        )}
      </Card>
    </div>
  );
}
