'use client';

import * as React from 'react';
import { format, subWeeks } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function WeekRangeDatePicker({ disabled, showTitle, onChange }) {
  const [weeksToShow, setWeeksToShow] = React.useState(4);
  const [dateRange, setDateRange] = React.useState(null);
  const triggerRef = React.useRef(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  
  const updateTriggerWidth = () => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    updateTriggerWidth();
    window.addEventListener('resize', updateTriggerWidth);
    return () => window.removeEventListener('resize', updateTriggerWidth);
  }, []);

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (disabled) {
      setOpen(false);
      setDateRange(null);
    }
  }, [disabled]);

  const generateWeekRanges = (count) => {
    const today = new Date();
    return Array.from({ length: count }, (_, index) => {
      const from = subWeeks(today, index + 1);
      const to = index === 0 ? today : subWeeks(today, index);
      return { from, to };
    });
  };

  const weeks = generateWeekRanges(weeksToShow);

  return (
    <div className="w-full">
      {showTitle && (
        <h2 className={`pb-1 text-sm font-medium text-[#09090B] ${disabled ? 'opacity-50' : ''}`}>Select date</h2>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={`${disabled ? 'opacity-50' : 'opacity-100'}`} disabled={disabled} asChild>
          <div ref={triggerRef} className="w-full">
            <Button variant={'outline'} className={cn('w-full justify-between text-left font-normal px-2', !dateRange?.from)}>
              <div className="flex justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  <span>Select date</span>
                )}
              </div>
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="max-h-60 overflow-y-auto" style={{ width: triggerWidth }}>
          {dateRange && (
            <DropdownMenuItem onClick={() => { onChange(null); setDateRange(null); }}>
              <div className='flex items-center'>Clear <X className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" /></div>
            </DropdownMenuItem>
          )}

          {weeks.map((week, index) => (
            <DropdownMenuItem key={index} onClick={() => { onChange(week); setDateRange(week); setOpen(false); }}>
              {format(week.from, 'LLL dd, y')} - {format(week.to, 'LLL dd, y')}
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault(); // Prevent dropdown from closing
              setWeeksToShow((prev) => prev + 4);
            }}
          >
            Load more
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
