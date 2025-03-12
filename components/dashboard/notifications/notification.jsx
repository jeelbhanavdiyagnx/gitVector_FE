import { newNotifications, oldNotifications } from '@/constants/data';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RxCross1 } from 'react-icons/rx';
import NotificationComponenet from './notificationComponent';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { IoSettingsOutline } from 'react-icons/io5';
import NotificationSettings from './notificationSettings';

export default function Notifications() {
  const [showSetting, setShowSetting] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <div
          className="flex items-center justify-end sm:justify-center sm:pr-12"
          onClick={() => setShowSetting(!showSetting)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="relative">
                <IoSettingsOutline className="text-2xl" />
              </TooltipTrigger>
              <TooltipContent className="absolute right-3 top-[20px] mr-0 h-8 w-[142px] border bg-white text-xs text-black">
                <p>Notification settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {showSetting ? (
        <NotificationSettings />
      ) : (
        <div className="flex w-full flex-col items-center ">
          <div className="w-full sm:w-11/12">
            <div className="flex items-center justify-between border-b-2 py-5 ">
              <h4 className="text-xl font-semibold text-[#09090B] dark:text-white">
                New notifications
              </h4>
              <Button variant="secondary" className="flex gap-2">
                Mark as read <RxCross1 />
              </Button>
            </div>
            {newNotifications?.map((item, index) => (
              <NotificationComponenet
                key={index}
                notificationData={item}
                isNew={true}
              />
            ))}
          </div>
          <div className="w-full sm:w-11/12">
            <div className="flex items-center justify-between border-b-2 py-5 ">
              <h4 className="text-xl font-semibold text-[#71717A]">
                Older notifications
              </h4>
            </div>
            {oldNotifications?.map((item, index) => (
              <NotificationComponenet
                key={index}
                notificationData={item}
                isNew={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
