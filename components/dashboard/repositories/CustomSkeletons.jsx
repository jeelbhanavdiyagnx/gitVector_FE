import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export const OverviewCardSkeleton = ({ numberOfCards }) => (
  <div className={`grid grid-cols-2 gap-4 p-6 md:grid-cols-3 ${numberOfCards <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-6'}`}>
    {[...Array(numberOfCards)].map((_, i) => (
      <div key={i} className="flex flex-col gap-2" aria-hidden="true">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-2 w-16" />
      </div>
    ))}
  </div>
);

export const HeatmapSkeleton = () => (
  <div className="w-full">
    <Skeleton className="h-[200px] w-full rounded-lg" />
  </div>
);

export const BarChartSkeleton = () => (
  <div className="w-full space-y-4 p-4">
    <Skeleton className="h-6 w-1/4 rounded-md" />
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  </div>
);
export const PieChartSkeleton = () => (
  <div className="w-full flex flex-col items-center space-y-4 p-4">
    <Skeleton className="h-6 w-1/4 rounded-md" />
    <div className="relative w-48 h-48">
      <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
      <Skeleton className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white opacity-50" />
    </div>
    <div className="w-full space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>
      ))}
    </div>
  </div>
);



export const EventsCardSkeleton = ({ size }) => {
  const numberOfEvents = size === 'small' ? 2 : 4;
  return (
    <div className="flex flex-col gap-4">
      {[...Array(numberOfEvents)].map((_, i) => (
        <div key={i} className="flex flex-col gap-4 p-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
};

