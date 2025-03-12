import React, { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export function Dropdown({
  onChange,
  loading = false,
  data,
  title,
  placeholder,
  disabled = false,
  searchable = true,
  targetEntity,
  defaultValue = '',
  selectedValue,
  clear = false,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const triggerRef = useRef(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [defaultSelectedItem, setDefaultSelectedItem] = useState();
  const updateTriggerWidth = () => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  };
  useEffect(() => {
    updateTriggerWidth();

    const handleResize = () => updateTriggerWidth();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [triggerRef.current]);
  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue?.login);
      setDefaultSelectedItem(selectedValue);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (clear) {
      return setValue(null)
    }
    if (defaultValue && data?.length > 0) {
      
      // For repositories, find by owner/name format
      if (title === 'Repository' || targetEntity === 'Repository') {
        const [ownerLogin, repoName] = defaultValue.split('/');
        const repo = data.find(
          (item) => item?.owner?.login === ownerLogin && item.name === repoName
        );
        if (repo) {
          setValue(repo.name);
        }
      } else {
        setValue(defaultValue);
      }
    }
  }, [defaultValue, data, title]);

  useEffect(() => {
    if (clear) {
      setValue('')
    }
  }, [clear])
  useEffect(() => {
    const selectedItem = data?.find(
      (item) => item.name === value || item.login === value
    );

    if (selectedItem) {

      if (title === 'User') {
        onChange(selectedItem?.user?.gitUser || selectedItem._id);
      } else {

        selectedItem._id
          ? onChange(selectedItem._id)
          : onChange(selectedItem.id);
      }
    }
  }, [value, data, onChange, title]);

  const getAvatar = (item) => {
    return item.avatar_url || item.user?.avatarUrl || '';
  };

  const getName = (item) => {
    return item.user?.name || item.name || ' ';
  };
  const newData = data && data?.filter((item) => {
    if (targetEntity === 'Repository') {
      return item?.name !== value
    }
    else {
      return item?.login !== value
    }
  })


  return (
    <div className="w-full">
      {title && <h2 className="pb-1 text-sm font-medium text-[#09090B]">{title}</h2>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Button
              ref={triggerRef}
              disabled={disabled}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between px-2 text-sm font-normal"
            >
              <>
                <div className="flex items-center gap-1">
                  {!value && !defaultSelectedItem && targetEntity && <Image alt="logo" src={`/dropDownIcons/${targetEntity}.svg`}
                    width={20}
                    height={20} />}
                  {value
                    ? (() => {
                      const selectedItem = defaultSelectedItem
                        ? defaultSelectedItem
                        : data?.find(
                          (item) =>
                            item.name === value || item.login === value
                        );
                      return (
                        <div className="flex items-center gap-2">
                          {selectedItem?.avatar_url ? (
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage
                                  src={selectedItem?.avatar_url}
                                  alt={`${selectedItem?.login}'s avatar`}
                                />
                                <AvatarFallback>
                                  {selectedItem?.login
                                    ?.substring(0, 1)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                <span className="font-medium">
                                  {selectedItem?.login}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  @{selectedItem.login || 'unknown'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              {title === 'Repository' ||
                                targetEntity === 'Repository' ? (
                                <div>{`${selectedItem?.owner?.login}/${selectedItem?.name}`}</div>
                              ) : (
                                <div>{selectedItem?.name}</div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })()
                    : placeholder}
                </div>
                <div className="flex items-center gap-1">
                  {value && (
                    <X
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue('');
                        onChange(null);
                      }}
                    />
                  )}
                  <ChevronsUpDown className="h-3 w-3 opacity-50" />
                </div>
              </>
            </Button>
          </div>
        </PopoverTrigger>
        {!disabled &&
        <PopoverContent
          style={{ width: triggerWidth }}
          className="h-46 w-[348] p-0 sm:min-w-[180px]"
        >
          <Command>
            {searchable && <CommandInput placeholder={'Search'} />}
            <CommandList>
              <CommandEmpty>
                {loading && !disabled ? 'Loading...' : 'No data found'}
              </CommandEmpty>
              <CommandGroup>
                {newData?.map((item, index) => {
                  const avatar = getAvatar(item);
                  const name = getName(item);
                  return (
                    <CommandItem
                      key={index}
                      value={avatar ? item.login : item.name}
                      className="flex items-center space-x-2 border-b"
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                        setDefaultSelectedItem('');
                      }}
                    >
                      {avatar ? (
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage
                              src={avatar}
                              alt={`${name}'s avatar`}
                            />
                            <AvatarFallback>
                              {item?.login?.substring(0, 1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col text-left">
                            <span className="font-medium">{name}</span>
                            <span className="text-xs text-muted-foreground">
                              @{item.login || 'unknown'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          {title === 'Repository' || targetEntity === 'Repository'
                            ? `${item?.full_name}`
                            : item.name}
                        </>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
}
      </Popover>
    </div>
  );
}
