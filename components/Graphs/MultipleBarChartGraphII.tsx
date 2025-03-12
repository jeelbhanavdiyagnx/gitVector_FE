'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import { chartConfig } from '@/constants/data';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import { FilterDropdown } from '../dashboard/overview/filterDropdown';
import { BarChartSkeleton } from '../dashboard/repositories/CustomSkeletons';
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
        <p className="label text-sm font-medium">
          {label
            ? new Date(label).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : label}
        </p>
        <div className="value flex items-center text-xs">
          <span
            className="indicator mr-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[0].color || '#000' }}
          ></span>
          {`Commit count: ${Math.round(payload[0].value)}`}
        </div>
        <div className="value flex items-center text-xs">
          <span
            className="indicator mr-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[1].color || '#000' }}
          ></span>
          {`Total Avg Score:  ${Math.round(payload[1].value)}`}
        </div>
      </div>
    );
  }

  return null;
};

export default function MultipleBarChartGraphII({
  isLoading,
  headerContent,
  data,
  xAxisDataKey,
  firstBarDataKey,
  secondBarDataKey,
  isDataEmpty,
  onChange
}: {
  isLoading: any;
  headerContent: any;
  data: any;
  xAxisDataKey: string;
  firstBarDataKey: string;
  secondBarDataKey: string;
  isDataEmpty: boolean;
  onChange: any
}) {  
    const theme = useTheme()
  const handleChange = (type: any) => {    
    onChange(type)
  };
  return (
    <Card className="h-full w-full py-4">
        <div className="w-full justify-between lg:flex pr-2">
                  <CardHeading
                    title={headerContent.title}
                    tooltipContent={headerContent.toolTip}
                  />
                  <div className=" w-full lg:w-4/5 xl:w-4/5">
                    <FilterDropdown
                     disabled={false}
                     clear = {false}
                     title={null}
                      placeholder={headerContent.dropDown.placeholder}
                      data={headerContent.dropDown.data}
                      height={headerContent.dropDown.height}
                      type={headerContent.dropDown.type}
                      onChange={handleChange}
                      icon={headerContent.dropDown.icon}
                    />
                  </div>
                </div>
                
      {
        isLoading ?
        (
          <BarChartSkeleton/>
        )
        :(
      isDataEmpty ? (
        <CardContent className="h-full w-full pt-4">
          <ChartContainer className="h-full w-full pt-2" config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <YAxis
              id={theme.theme}
                scale="linear"
                fontSize={16}
                tickMargin={30}
                axisLine={false}
                tickLine={false}
              />
              <XAxis
              id={theme.theme}
                dataKey={xAxisDataKey || 'month'}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={16}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit'
                  });
                }}
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey={firstBarDataKey}
                fill="var(--color-desktop)"
                radius={4}
              />
              <Bar
                dataKey={secondBarDataKey}
                fill="var(--color-mobile)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <NoDataAvailable />
      ))}
    </Card>
  );
}
