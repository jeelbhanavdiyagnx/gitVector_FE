import React from "react";
import { LuBell, LuBellDot } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

export default function NotificationComponenet({notificationData, isNew}){
    return(
        <div className="py-5 flex items-start justify-between  border-b">
            <h1 className={`flex gap-2 items-start w-3/4 sm:w-4/5 text-[12px] sm:text-base font-medium ${isNew ? 'text-black dark:text-white' : 'text-[#71717A]'} leading-5`}>
            {isNew
            ?
            <LuBellDot className="text-6xl sm:text-4xl mt-1 h-auto"/>
            :
            <LuBell className="text-5xl sm:text-3xl  mt-1 h-auto "/>
            }
            {notificationData?.message}
            </h1>
            <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-normal text-[#71717A]">{notificationData?.timing}</h2>
                {isNew
                &&
                <MdOutlineCancel className="w-5 h-5"/>

            }
            </div>
        </div>
    )
}