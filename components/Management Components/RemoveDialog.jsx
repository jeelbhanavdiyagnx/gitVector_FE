import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from '@/components/ui/dialog';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Button } from '../ui/button';

const RemoveDialog = ({dialogFor,onRemove,onGoBack,inputValue,item,onInputChange,errorMessage,isOpen = undefined}) => {
  const value = dialogFor === "repo" ? item?.name : item?.login;
  return (
    <Dialog open={isOpen}>
        {isOpen === undefined &&
      <DialogTrigger>
        <Button
          variant="link"
          className="px-0 text-sm font-normal text-[#71717A]"
        >
          Remove
        </Button>
      </DialogTrigger>
}

      <DialogContent
        closeIcon={false}
        className=" ` w-11/12 max-w-[462px]   sm:w-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-left">
            Are you sure you want to remove this {dialogFor}?
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p key={item?.id} className="text-left">
              To remove {value} {dialogFor}, type “{value}” in the box below
              without quotes
            </p>
            <div className="h-[109px] w-full border border-[#EAEAEA] p-2">
              <input
                value={inputValue}
                onChange={onInputChange}
                type="text"
                className="w-full border-0 outline-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 "
              />
            </div>
            {errorMessage && (
              <p className="text-xs font-medium text-[#FF0000]">
                {inputValue === ''
                  ? ' The input box cannot be empty.'
                  : `Your input does not match the ${value}. Please enter the correct ${dialogFor} name to proceed`}
              </p>
            )}
            <p className="flex gap-1 text-left text-xs font-medium md:items-center">
              <span>
                {' '}
                <IoInformationCircleOutline className="text-base md:text-sm" />
              </span>
              Please note it might take up to 24 hrs to remove this {dialogFor}
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full  flex-row items-center justify-between gap-2 sm:justify-between">
          <DialogClose
            onClick={onGoBack}
            className="rounded-md bg-[#71717A] px-4 py-2 text-white"
          >
            Go Back
          </DialogClose>
          <Button
            variant="default"
            onClick={() => onRemove(item)}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveDialog;
