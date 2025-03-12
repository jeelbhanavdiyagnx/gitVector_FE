'use client';

import * as React from 'react';
import { format, subWeeks, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function DateRangePicker({ disabled, onChange }) {
  const initialData = ['Past week', 'Past 2 weeks', 'Past month', 'Past 3 months']
  const [range,setRange] = React.useState(initialData);
  const [dateRange, setDateRange] = React.useState(null)
  const triggerRef = React.useRef(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  const today = new Date();
  const updateTriggerWidth = () => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  };
  
  React.useEffect(() => {
    updateTriggerWidth();

    const handleResize = () => updateTriggerWidth();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [triggerRef.current]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (disabled) {
      setOpen(false);
      setDateRange({ from: subWeeks(today, 2), to: today })
    }
  }, [disabled])

React.useEffect(() => {
    setDateRange({ from: subWeeks(today, 2), to: today })
    const filterRange = range?.filter((item) => item !== "Past 2 weeks")
    setRange(filterRange)
}, [])
React.useEffect(() => {
if (dateRange) {
  onChange(dateRange)
}
}, [dateRange])

  const handlePresetSelection = (value) => {
    const today = new Date();
    let newRange = { from: null, to: null };
    switch (value) {
      case 'Past week':
        newRange = { from: subWeeks(today, 1), to: today };
        break;
      case 'Past 2 weeks':
        newRange = { from: subWeeks(today, 2), to: today };
        break;
      case 'Past month':
        newRange = { from: subMonths(today, 1), to: today };
        break;
      case 'Past 3 months':
        newRange = { from: subMonths(today, 3), to: today };
        break;
      default:
        newRange = { from: subWeeks(today, 2), to: today };
    }
    if (
      !dateRange ||
      !dateRange.from ||
      !dateRange.to ||
      dateRange.from !== newRange.from ||
      dateRange.to !== newRange.to
    ) {
      const filterRange = initialData?.filter((item) => item !== value)
      setRange(filterRange)
      
      onChange(newRange)
      setDateRange(newRange)
    }
    setOpen(false);
  };
  const handleCustomRangeSelection = (range) => {
    onChange(range)
    setDateRange(range)
  };

  return (
    <div className="w-full">
      {/* Dropdown with preset selections */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className={`${disabled ? 'opacity-50' : 'opacity-100'}`}
          disabled={disabled}
          asChild
        >
          <div ref={triggerRef} className="w-full">
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-between text-left font-normal  px-2',
                !dateRange?.from
              )}
            >
              <div className="flex justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} -{' '}
                      {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Select date</span>
                )}
              </div>
              <CaretSortIcon className="h-4 w-4 " />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent style={{ width: triggerWidth }}>
          {/* Preset selections */}
          {
            dateRange &&
            <DropdownMenuItem onClick={() => {
              onChange(null)
              setDateRange(null)
            }}>
              <div className='flex items-center'> Clear <X className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" /></div>
            </DropdownMenuItem>
          }
          {range?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handlePresetSelection(item)}>
              {item}
            </DropdownMenuItem>
          ))}
          {/* Custom Range Picker */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Custom</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-auto p-4">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleCustomRangeSelection}
                  numberOfMonths={2}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
