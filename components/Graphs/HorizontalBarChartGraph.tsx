'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { chartConfig } from '@/constants/data';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import WindowWidth from '@/context/WindowWidthContext';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';

const CustomTooltip = ({
  active,
  payload,
  toolTipKey
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  toolTipKey?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex items-center gap-2 rounded border bg-white p-2 shadow">
        <div className="h-2 w-2 rounded-sm bg-blue-700"></div>
        <p className="value text-xs">{`${toolTipKey}: ${Math.round(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export function HorizontalBarChartGraph({
  headerContent,
  data,
  yAxisDataKey,
  BarDataKey,
  toolTipKey,
  isDataEmpty
}: {
  headerContent: any;
  data: any;
  yAxisDataKey: string;
  BarDataKey: string;
  toolTipKey: string;
  isDataEmpty: boolean;
}) {
  const windowWidth = WindowWidth();
  
  const hasSingleDataPoint = data.length === 1;
  return (
    <Card className='py-4 h-full'>
      <CardHeading
      paddingLeft={null}
        title={headerContent.title}
        tooltipContent={headerContent.toolTip}
      />
      {isDataEmpty ? (
        <CardContent className="!p-0 pt-8 h-full">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={
                windowWidth < 768
                  ? {
                      left: 0,
                      right: hasSingleDataPoint ? 20 : 0,
                      top: hasSingleDataPoint ? 50 : 10,
                      bottom: hasSingleDataPoint ? 50 : 10
                    }
                  : {
                      left: 0,
                      right: hasSingleDataPoint ? 20 : 10,
                      top: hasSingleDataPoint ? 110 : 10,
                      bottom: hasSingleDataPoint ? 110 : 10
                    }
              }
            >
              <XAxis
                type="number"
                scale="linear"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey={yAxisDataKey || 'month'}
                type="category"
                tickLine={false}
                fontSize={16}
                axisLine={false}
                tick={<></>}
              />
              <ChartTooltip
                cursor={false}
                content={<CustomTooltip toolTipKey={toolTipKey} />}
              />
              <Bar
                dataKey={BarDataKey || 'desktop'}
                fill="var(--color-desktop)"
                radius={5}
              >
                <LabelList
                  dataKey={yAxisDataKey || 'month'}
                  position="insideLeft"
                  offset={8}
                  className="fill-white"
                  fontSize={16}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
}
