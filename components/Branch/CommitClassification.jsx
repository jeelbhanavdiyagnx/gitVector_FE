import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

// Import classification images
import TrivialMinor from '@/components/assets/classification/Trivial-Minor2.svg';
import Bugfix from '@/components/assets/classification/bug-fix.svg';
import FeatureEnhancement from '@/components/assets/classification/Feature-Enhancement.svg';
import Refactor from '@/components/assets/classification/refactoring.svg';
import CriticalSecurity from '@/components/assets/classification/critical-security.svg';
import Documentation from '@/components/assets/classification/commenting_and_documentation.svg';
import Test from '@/components/assets/classification/test.svg';
import BuildCICD from '@/components/assets/classification/build-ci-cd.svg';
import DependencyUpdate from '@/components/assets/classification/dependencies.svg';
import PerformanceImprovement from '@/components/assets/classification/performance-improvement.svg';
import Revert from '@/components/assets/classification/revert.svg';
import Chore from '@/components/assets/classification/chore.svg';
import Experimental from '@/components/assets/classification/experimental.svg';
import UIUX from '@/components/assets/classification/ui-ux.svg';
import DataMigration from '@/components/assets/classification/data-migration.svg';
import Hotfix from '@/components/assets/classification/hotfix.svg';
import Infrastructure from '@/components/assets/classification/infrastructure.svg';
import LocalizationInternationalization from '@/components/assets/classification/localization-internationalization.svg';
import Merge from '@/components/assets/classification/merge.svg';
import EnvironmentConfiguration from '@/components/assets/classification/environment-configuration.svg';
import ResearchSpike from '@/components/assets/classification/research-spike.svg';
import AnalyticsLogging from '@/components/assets/classification/analytics-logging.svg';
import DesignSystemTheme from '@/components/assets/classification/design-system-theme.svg';
import businessLogic from '@/components/assets/classification/businessLogic.svg';
import Dependencies from '@/components/assets/classification/dependencies.svg';
import ErrorHandling from '@/components/assets/classification/errorHandling.svg';

const classificationImages = {
  'Trivial/Minor': TrivialMinor,
  Bugfix,
  'Bugfix/Enhancement': Bugfix,
  'Feature/Enhancement': FeatureEnhancement,
  Enhancement: FeatureEnhancement, // Using same image
  Refactor,
  'Critical/Security': CriticalSecurity,
  Documentation,
  Test,
  'Build/CI/CD': BuildCICD,
  'Dependency Update': DependencyUpdate,
  'Performance Improvement': PerformanceImprovement,
  Revert,
  Chore,
  Experimental,
  'UI/UX': UIUX,
  'Data Migration': DataMigration,
  Hotfix,
  Infrastructure,
  'Localization/Internationalization': LocalizationInternationalization,
  Merge,
  'Environment Configuration': EnvironmentConfiguration,
  'Configuration': EnvironmentConfiguration,
  'Research/Spike': ResearchSpike,
  'Analytics/Logging': AnalyticsLogging,
  'Design System/Theme': DesignSystemTheme,
  'businessLogic Alert': businessLogic,
  'dependencies Alert': Dependencies,
  'errorHandling Alert': ErrorHandling

};

export default function CommitClassification({ type, Tooltip: showTooltip = true }) {
  const imageSrc = classificationImages[type];

  return (
    <>
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {imageSrc ? (
                <Image src={imageSrc} alt={type} width={20} height={20} color='white' />
              ) : (
                <span></span> // Fallback if no imageSrc
              )}
            </TooltipTrigger>
            <TooltipContent className='bg-white text-[#71717A]'>
              <p>{type}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span>
          {imageSrc ? (
            <Image src={imageSrc} alt={type} width={20} height={20} />
          ) : (
            <span></span> // Fallback if no imageSrc
          )}
        </span>
      )}
    </>
  );
}
