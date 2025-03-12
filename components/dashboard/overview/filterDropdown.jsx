'use client';

import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import CommitClassification from '@/components/Branch/CommitClassification';
import { formatCamelCase } from '@/components/utils/helper';

export function FilterDropdown({
  title,
  icon,
  defaultValue,
  placeholder,
  data,
  onChange,
  disabled,
  clear = false,
  height,
  type
}) {
  const triggerRef = React.useRef(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const updateTriggerWidth = () => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  };
  React.useEffect(() => {
    if (clear) {      
      setValue('');
    }
  }, [clear]);

  React.useEffect(() => {
    updateTriggerWidth();
    const handleResize = () => updateTriggerWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [triggerRef.current]);

  const handleClearSelection = (e) => {
    e.stopPropagation();
    
    setValue('');
    onChange('');
  }; 

  return (
    <div className="w-full">
      {title && <h2 className="pb-1 text-sm font-medium text-[#09090B]">{title}</h2>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div ref={triggerRef} className="w-full">
            <Button
              disabled={disabled}
              variant="outline"
              className="w-full justify-between font-normal lg:px-2"
            >
              <div className="flex justify-between w-full items-center">
                <div className='flex justify-start w-full'>
                  {icon}
                  {value ? (
                    <span>{value}</span>
                  ) : (
                    defaultValue ? formatCamelCase(defaultValue) : <span>{placeholder}</span>
                  )}
                </div>
                <div>
                  {value && (
                    <X
                      className="h-4 w-4 text-gray-400 ml-2 cursor-pointer"
                      onClick={handleClearSelection}
                    />
                  )}
                </div>
              </div>
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        {!disabled &&
        <PopoverContent
        
          style={{ width: triggerWidth, overflow: 'auto', height: height || '' }}
          className="p-2"
        >
          {data?.map((item,index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#5e5e6671] rounded-md text-left flex gap-2"
              onClick={() => {
                setValue(item.value || item);
                onChange(item.key || item);
                setOpen(false);
              }}
            >
              {type === "classification" && <CommitClassification Tooltip={false} type={item?.value || item} />} {item?.value || item}
            </div>
          ))}
        </PopoverContent>
}
      </Popover>
    </div>
  );
}
