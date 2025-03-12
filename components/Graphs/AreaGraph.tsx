'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeRangeData } from '@/redux/actions/globalAction';
import { subMonths } from 'date-fns';
import { generateDynamicColors } from '@/components/utils/helper';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import { HeatmapSkeleton } from '../dashboard/repositories/CustomSkeletons';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

const CustomTooltipForTwo = ({
  active,
  payload,
  toolTipKeys,
  label,
  config,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  toolTipKeys?: any;
  config?: any;
}) => {

  if (active && payload && payload.length) {
    const colors = Object.values(config).map((item: any) => item.color);
    return (
      <div className="custom-tooltip rounded border bg-white p-2 shadow">
        <p className="label text-sm font-medium">{label ? new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Invalid Date'}</p>
        {toolTipKeys?.map((item: string, index: number) => (

          <div className="flex items-center gap-1" key={index}>
            <div
              className="h-2 w-2 rounded-sm"
              style={{
                backgroundColor: colors[index],
              }}
            ></div>
            <p className="value text-xs">{`${item}: ${Math.round(
              payload[index]?.value || 0
            )}`}</p>
          </div>
        ))}

      </div>
    );
  }

  return null;
};

const CustomTooltip = ({
  active,
  payload,
  toolTipKeys,
  label,
  config,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  toolTipKeys?: any;
  config?: any;
}) => {

  if (active && payload && payload.length) {
    const colors = Object.values(config).map((item: any) => item.color);
    return (
      <div className="custom-tooltip rounded border bg-white dark:text-gray-700 p-2 shadow">
        <p className="label text-sm dark:text-gray-700 font-medium">{label ? new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Invalid Date'}</p>
        {
          payload?.map((item, index) => (
            <div className="flex items-center gap-1" key={index}>
              <div
                className="h-2 w-2 rounded-sm"
                style={{
                  backgroundColor: item.stroke,
                }}
              ></div>
              <p className="value text-xs">{`${item.dataKey}: ${Math.round(
                item.value || 0
              )}`}</p>
            </div>
          ))
        }
      </div>
    );
  }

  return null;
};

export default function AreaGraph({
  data,
  headerContent,
  toolTipKeys = [],
  onChange,
  graphTitle,
  graphDescription,
  isDataEmpty,
  loading
}: {
  headerContent: any;
  data: any;
  toolTipKeys: string[];
  onChange?: any;
  graphLabel?: string;
  graphTitle?: string;
  graphDescription?: string;
  isDataEmpty?: boolean;
  loading?: boolean;
}) {
  const dispatch = useDispatch();
  const { timeRanges } = useSelector((state: any) => state.globalData);
  const [timeRange, setTimeRange] = React.useState('Select Date');

  React.useEffect(() => {
    if (timeRange !== timeRanges.timeRange && timeRange !== 'Select Date') {
      dispatch(setTimeRangeData(timeRange));
      const today = new Date();
      let newRange: DateRange = { from: null, to: null };
      switch (timeRange) {
        case '30d':
          newRange = { from: subMonths(today, 1), to: today };
          break;
        case '90d':
          newRange = { from: subMonths(today, 3), to: today };
          break;
        default:
          newRange = { from: null, to: null };
      }

      onChange(newRange);
    }
  }, [timeRange]);



  const colorPalette = generateDynamicColors();

  // Generate Config
  const generateConfig = React.useMemo(() => {
    const keys = isDataEmpty ? data.flatMap((i: any) => Object.keys(i).filter((item: any) => item !== 'date')) : [];

    const config: Record<string, { label: string; color: string }> = {};
    const setData = Array.from(new Set(keys));

    setData.forEach((key: any, index: any) => {
      const color = colorPalette[index];

      config[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color,
      };
    });

    return config;
  }, [data, colorPalette]);



  const generateGradients = () => {

    return isDataEmpty && Object.keys(generateConfig).map((key) => {
      const color = generateConfig[key].color;
      return (
        <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      );
    });
  };

  const generateAreas = () => {
    return Object.keys(generateConfig).map((key) => {

      const color = generateConfig[key].color;

      return (
        <Area

          key={key}
          dataKey={key}
          fillOpacity={1}
          type="natural"
          fill={`url(#fill${key})`}
          stroke={color}
        />
      );
    });
  };

  return (
    <Card className='pt-4'>
      <>
        {loading ? <HeatmapSkeleton />
        :
          <>
            {headerContent &&
              <CardHeading paddingLeft={0} title={headerContent.title} tooltipContent={null} />
            }
            {isDataEmpty
              ?
              (
                <>
                  <CardHeader className="flex items-center gap-2 space-y-0 border-b sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                      <CardTitle className='text-base'>{graphTitle || 'Area Chart - Interactive'}</CardTitle>
                      <CardDescription>
                        {graphDescription || 'Showing total visitors for the last 3 months'}
                      </CardDescription>
                    </div>
                    <Select value={timeRanges.timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                      >
                        <SelectValue placeholder="Select Date" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Select Date" disabled={true} className="rounded-lg">
                          Select Date
                        </SelectItem>
                        <SelectItem value="90d" className="rounded-lg">
                          Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                          Last 30 days
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="rounded-md px-2 pt-4 shadow-md sm:pt-6">
                    <ChartContainer
                      className="aspect-auto h-[250px] w-full"
                      config={generateConfig}
                    >
                      <AreaChart data={data}>
                        <defs>{generateGradients()}</defs>
                        <CartesianGrid vertical={true} />
                        <YAxis scale="linear" axisLine={false} tickLine={false} fontSize={14} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            });
                          }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            toolTipKeys.length ? (
                              <CustomTooltipForTwo
                                config={generateConfig}
                                toolTipKeys={toolTipKeys}
                              />
                            ) : (
                              <CustomTooltip
                                config={generateConfig}
                              />
                            )
                          }
                        />
                        {generateAreas()}
                        <ChartLegend
                          className="hidden md:flex"
                          content={<ChartLegendContent nameKey="customKey" />}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </>
              )
              :
              (
                <NoDataAvailable />
              )
            }
          </>
        }
      </>
    </Card>
  );
}
