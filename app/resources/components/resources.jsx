import { Separator } from '@/components/ui/separator';

import {
  GitAnalysisParameters,
} from '@/app/resources/components/gitAnalysisParameters';

import {
  AITransformingCodeQuality,
} from './AITransformingCode';

import { TopCodeMetrics, } from './topCodeMetrics';

import {
  TrackingDeveloperPerformance,
} from './trackingPerformance';

import {
  ImprovingDeveloperSkills,
} from './improvingDeveloper';

import {
  BestPracticesForVersionControl,
} from './bestPracticesVersionControl';
import { RemovePolicy } from './RemovePolicy';

export default function Resources() {
  return (
    <div className="w-full px-4 text-left sm:px-6 lg:px-16">
      <div className="mt-8 pb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Resources</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          You can access resources from Git Analysis below
        </p>
      </div>
      <Separator />
      <div className="py-8">
      <GitAnalysisParameters />
      <Separator className='mt-4 mb-4' />
      <AITransformingCodeQuality />
      <Separator className='mt-4 mb-4' />
      <TopCodeMetrics />
      <Separator className='mt-4 mb-4' />
      <TrackingDeveloperPerformance />
      <Separator className='mt-4 mb-4' />
      <ImprovingDeveloperSkills />
      <Separator className='mt-4 mb-4' />
      <BestPracticesForVersionControl />
      <Separator className='mt-4 mb-4' />
      <RemovePolicy/>
      </div>
    </div>
  );
}
