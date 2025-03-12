'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { chartConfig } from '@/constants/data';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import { BarChartSkeleton } from '../dashboard/repositories/CustomSkeletons';
import WindowWidth from '@/context/WindowWidthContext';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import { useTheme } from 'next-themes';

const CustomTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded border bg-white dark:text-gray-700 p-2 shadow">
        <p className="label text-sm font-medium">{`${label}`}</p>
        <div className="value flex items-center text-xs">
          <span
            className="indicator mr-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[0].color || '#000' }}
          ></span>
          {`Lines added: ${payload[0].value}`}
        </div>
        <div className="value flex items-center text-xs">
          <span
            className="indicator mr-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[1].color || '#000' }}
          ></span>
          {`Lines removed: ${payload[1].value}`}
        </div>
      </div>
    );
  }

  return null;
};

export function MultipleBarChartGraph({
  isLoading,
  headerContent,
  data,
  xAxisDataKey,
  firstBarDataKey,
  secondBarDataKey,
  isDataEmpty
}: {
  isLoading: any;
  headerContent: any;
  data: any;
  xAxisDataKey: string;
  firstBarDataKey: string;
  secondBarDataKey: string;
  thirdBarDataKey: string;
  isDataEmpty: boolean;
}) {
  const theme = useTheme()
  const hasSingleDataPoint = data?.length === 1;
  const hasDoubleDataPoint = data?.length <= 3;
  return (
    <Card className="py-4 h-full rounded-xl">
      <>
      <CardHeading
        paddingLeft={0}
        title={headerContent?.title}
        tooltipContent={headerContent?.toolTip}
      />
      {
        isLoading ?
          (<BarChartSkeleton />)
          :
          (isDataEmpty ? (
            <CardContent className="h-full w-full pt-4 pb-12 ">
              <ChartContainer className="h-full w-full dark:text-white pt-2" config={chartConfig}>
                <BarChart accessibilityLayer data={data} margin={{
                  top: 20,
                  right: hasSingleDataPoint ? 180 : hasDoubleDataPoint ? 90 : 0,
                  left: hasSingleDataPoint ? 180 : hasDoubleDataPoint ? 90 : 0,
                  bottom: 10
                }}>
                  <YAxis
                    id={theme.theme}
                    scale="linear"
                    axisLine={false}
                    tickLine={false}
                    fontSize={16}
                  />
                  <XAxis
                    id={theme.theme}
                    dataKey={xAxisDataKey || 'month'}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    fontSize={16}
                    tickFormatter={(value) => hasSingleDataPoint ? value.slice(0, 20) : hasDoubleDataPoint ? value.slice(0, 15) : value.slice(0, 5)
                    }
                  />
                  <ChartTooltip cursor={false} content={<CustomTooltip />} />
                  <Bar
                    dataKey={firstBarDataKey}
                    fill="#34B223"
                    radius={4}
                  />
                  <Bar
                    dataKey={secondBarDataKey}
                    fill="#ba1414"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          ) : (
            <NoDataAvailable />
          ))}
      </>
    </Card>
  );
}
