'use client';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import { chartConfig } from '@/constants/data';
import { BarChartSkeleton } from '../dashboard/repositories/CustomSkeletons';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import { useTheme } from 'next-themes';
import { FilterDropdown } from '../dashboard/overview/filterDropdown';

const CustomTooltip = ({
  classificationType,
  active,
  payload,
  toolTipKey,
  label,
  dateFormat
}: {
  classificationType: string;
  active?: boolean;
  payload?: any[];
  label?: string;
  dateFormat: boolean;
  toolTipKey?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded border bg-white dark:text-gray-700 p-2 shadow">
        <p className="label text-sm font-medium">
          {dateFormat && label
            ? new Date(label).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
            : label}
        </p>
        {classificationType &&
          <div className=" flex items-center gap-2">
            <p className="value text-xs">{`Commit Type: ${classificationType}`}</p>
          </div>
        }
        <div className=" flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-blue-700"></div>
          <p className="value text-xs">{`${toolTipKey}: ${Math.round(
            payload[0].value
          )}`}</p>
        </div>
      </div>
    );
  }

  return null;
};
export function LabelBarChartGraph({
  classificationType,
  isLoading,
  data,
  xAxisDataKey,
  BarDataKey,
  toolTipKey,
  dateFormat,
  isDataEmpty,
  headerContent,
  onChange
}: {
  classificationType: string;
  isLoading: boolean;
  headerContent: any;
  data: any;
  xAxisDataKey: string;
  BarDataKey: string;
  toolTipKey: string;
  dateFormat: boolean;
  allowYAxis: boolean;
  isDataEmpty: boolean;
  title: string;
  tooltipContent: string;
  onChange: any;
}) {
  const theme = useTheme()
  const processedData = (data || []).map((item: any) => ({
    ...item,
    [BarDataKey]: Math.max(0, Math.round(item[BarDataKey]))
  }));

  const hasSingleDataPoint = data?.length === 1;
  const hasDoubleDataPoint = data?.length <= 3;
  const handleChange = (type: any) => {
    onChange(type)
  };

  return (
    <Card className="h-full rounded-xl pt-4 pb-12 ">
      <div className="w-full justify-between lg:flex pr-2">
        <CardHeading
        paddingLeft={null}
          title={headerContent.title}
          tooltipContent={headerContent.toolTip}
        />
        {headerContent?.dropDown &&
          <div className=" w-full lg:w-4/5 xl:w-4/5">
            <FilterDropdown
              disabled={false}
              clear={false}
              title={null}
              placeholder={headerContent.dropDown.placeholder}
              data={headerContent.dropDown.data}
              height={headerContent.dropDown.height}
              type={headerContent.dropDown.type}
              onChange={handleChange}
              defaultValue={classificationType}
              icon={headerContent.dropDown.icon}
            />
          </div>
        }
      </div>
      {isLoading ? (
        <BarChartSkeleton />
      ) : isDataEmpty ? (
        <CardContent className="h-full w-full pt-4">
          <ChartContainer className="h-full w-full pt-2 " config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data && processedData}
              margin={{
                top: 20,
                right: hasSingleDataPoint ? 180 : hasDoubleDataPoint ? 90: 0,
                left: hasSingleDataPoint ? 180 : hasDoubleDataPoint ? 90: 0,
                bottom: 10
              }}
            >
              <YAxis
                id={theme.theme}
                scale="linear"
                axisLine={false}
                tickLine={false}
                fontSize={16}
              />
              <XAxis
                id={theme.theme}
                dataKey={xAxisDataKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={16}
                tick={{ fill: '#179FDB' }}
                tickFormatter={
                  dateFormat
                    ? (value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: '2-digit'
                      });
                    }
                    : (value) => hasSingleDataPoint ? value.slice(0, 20) :hasDoubleDataPoint? value.slice(0, 15):value.slice(0, 5)
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <CustomTooltip
                    classificationType={classificationType}
                    dateFormat={dateFormat}
                    toolTipKey={toolTipKey}
                  />
                }
              />
              <Bar
                dataKey={BarDataKey}
                fill="var(--color-desktop)"
                radius={4}
                minPointSize={5}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
}
