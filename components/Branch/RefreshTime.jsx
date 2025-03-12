import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { RefreshCwIcon } from 'lucide-react';
import { formatDate, formatDateToIST } from '@/components/utils/helper.js';
import { Dropdown } from '@/components/Dropdown';
import { refreshOptions } from '@/constants/data';
import { useSearchParams } from 'next/navigation';


const RefreshTime = memo(({
  disabled = false,
  onRefresh,
  setResetRefresh,
  resetRefresh,
  className = '',
  showAutoRefresh = true,
  defaultRefreshInterval = '5 minutes',
  tooltipText = 'Refresh',
  showLastRefreshTime = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(() => new Date());
  const [formattedTime, setFormattedTime] = useState(() => formatDate(new Date()));
  const [currInterval, setCurrInterval] = useState('5 minutes')
  const refreshIntervalRef = useRef(null);
  const timeUpdateIntervalRef = useRef(null);
  const onRefreshRef = useRef(onRefresh);

  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  const refreshData = useCallback(() => {
    if (disabled) return;

    if (onRefreshRef.current) {
      onRefreshRef.current();
    }

    setIsAnimating(true);
    const newTime = new Date();
    setLastRefreshTime(newTime);
    setFormattedTime(formatDate(newTime));
    
    const timeoutId = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [disabled]);

  useEffect(() => {
    const updateFormattedTime = () => {
      setFormattedTime(formatDate(lastRefreshTime));
    };

    updateFormattedTime();

    timeUpdateIntervalRef.current = setInterval(updateFormattedTime, 60000);

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [lastRefreshTime]);

  const handleAutoRefreshChange = useCallback((interval) => {
    setCurrInterval(interval)
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (interval && interval > 0) {
      refreshIntervalRef.current = setInterval(refreshData, interval * 60000);
    }
  }, [refreshData]);

  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, []);
  const restartRefresh = useCallback(() => {
  clearInterval(refreshIntervalRef.current)
    refreshIntervalRef.current = null;
    setResetRefresh(false)  
    if (currInterval && currInterval > 0) {
      refreshIntervalRef.current = setInterval(refreshData, currInterval * 60000);
    }
  }, [currInterval, refreshData]);
  
useEffect(() => {
  if (resetRefresh) {
    restartRefresh()
  }
}, [resetRefresh])

  return (
    <div className={`flex flex-col items-end gap-1 md:gap-2 ${className}`}>
      <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled={disabled} onClick={refreshData}>
              <RefreshCwIcon
                className={`h-5 w-5 ${
                  disabled ? 'opacity-50' : 'opacity-100'
                } ${isAnimating ? 'animate-spin' : ''}`}
              />
            </TooltipTrigger>
            <TooltipContent className='bg-white text-[#71717A]'>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {showAutoRefresh && (
          <Dropdown
            searchable={false}
            disabled={disabled}
            data={refreshOptions}
            placeholder="Auto refresh"
            onChange={handleAutoRefreshChange}
            defaultValue={defaultRefreshInterval}
          />
        )}
      </div>
      {showLastRefreshTime && (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="pr-1 text-right text-xs text-muted-foreground">
                <span className="hidden lg:block">
                  Last refreshed {formattedTime}
                </span>
                <span className="lg:hidden">
                  Last refreshed
                  <br />
                  {formattedTime}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatDateToIST(lastRefreshTime)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
});

RefreshTime.displayName = 'RefreshTime';

export default RefreshTime;