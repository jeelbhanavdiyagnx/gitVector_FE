import { NotificationEnabledData } from "@/constants/data";
import React from "react";
import { NotificationEnabledCard } from "./notificationEnabledCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CodeAnalysisSettings() {
    return(
        <div className="w-full relative mt-10">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {NotificationEnabledData?.map((item,index)=>(
                    <NotificationEnabledCard key={index} item={item}/>
                ))}
            </div>
            <Dialog className="w-[862px]">
          <DialogTrigger asChild>
          <Button className="mt-8 text-sm">Update Notifications</Button>
          </DialogTrigger>
          <DialogContent
          closeOverlay={false}
            className="flex absolute border border-[#E4E4E7] top-24 max-w-[462px] h-16 rounded-md  items-center gap-2 text-lg font-semibold w-[462px]"
          >
          Notification settings updated successfully
          </DialogContent>
        </Dialog>
            
        </div>
    )
}