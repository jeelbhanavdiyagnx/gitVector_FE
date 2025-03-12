import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import NoDataAvailable from '../dashboard/overview/noDataAvailable';
import { PieChartSkeleton } from '@/components/dashboard/repositories/CustomSkeletons';
import CardHeading from '@/components/dashboard/dashboardCards/CardHeading';

const baseColors = ["#E0F2FE", "#b3e5fc", "#03a9f4", "#1a5ad0", "#1a4ab0", "#1a3a8c", "#1a2a6c", "#1a1a40"];

const hexToHSL = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};
const generateBlueShade = (index: number) => {
  const baseColor = baseColors[index % baseColors.length];
  const { h, s, l } = hexToHSL(baseColor);
  const adjustedLightness = Math.min(Math.max(l + (index % 2 === 0 ? 10 : -10), 10), 90);
  const adjustedSaturation = Math.min(Math.max(s + (index % 3 === 0 ? 5 : -5), 30), 100);

  return `hsl(${h}, ${adjustedSaturation}%, ${adjustedLightness}%)`;
};


interface CommitData {
  user: string;
  commitCount: number;
  type: string;
  percentage: number;
}

interface CommitPieChartProps {
  data: CommitData[];
  isDataEmpty: boolean;
  isLoading: boolean;
  headerContent?: any;
}

const CommitPieChart: React.FC<CommitPieChartProps> = ({
  data,
  isDataEmpty,
  isLoading,
  headerContent
}) => {

  const chartData = data?.map((item, index) => ({
    nameKey: item.user || item.type,
    dataKey: item.commitCount || Math.round(item.percentage),
    fill: generateBlueShade(index)
  }));

  const chartConfig = chartData?.reduce(
    (acc: { [key: string]: { label: string; color?: string } }, curr) => {
      acc[curr.nameKey] = {
        label: curr.nameKey,
        color: curr.fill
      };
      return acc;
    },
    {
      dataKey: {
        label: 'amm'
      }
    }
  );

  return (
    <Card className="flex h-full flex-col py-4">
      <CardHeading
        paddingLeft={0}
        title={headerContent.title}
        tooltipContent={headerContent.toolTip}
      />
      {isLoading ? (
        <PieChartSkeleton />
      ) : isDataEmpty ? (
        <CardContent className="h-full flex-1 pb-0 pt-4">
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-full w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="dataKey"
                nameKey="nameKey"
                label
              ></Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="nameKey" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
};

export default CommitPieChart;
