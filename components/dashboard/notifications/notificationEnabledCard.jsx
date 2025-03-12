import { Switch } from "@/components/ui/switch";
import React from "react";

export function NotificationEnabledCard({item}){
    return(
        <div className=" gap-4 w-full xl:w-[493px] h-[78px] p-3 flex items-center justify-between border rounded-lg border-[#E4E4E7]">
            <div>
                <h1 className="text-base font-medium dark:text-white text-[#09090B]">{item?.header}</h1>
                <p className="text-xs text-[#71717A]">{item?.info}</p>
            </div>
            <Switch/>
        </div>
    )
}