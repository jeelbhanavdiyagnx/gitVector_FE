import React from "react";
import AccessOptions from "./accessOptions";
import CodeAnalysisSettings from "./codeAnalysisSettings";

export default function NotificationSettings() {
    return(
        <div className="py-5  w-[95%]">
            <div className="pb-5 border-b-2">
                <h1 className="text-[#09090B] dark:text-white text-lg font-medium">Notifications</h1>
                <p className="text-[#71717A] text-base">Configure how you receive notifications. All notifications are sent at the start of the week calculating last week scores. Notifications are sent both in app and on admin emails.</p>
            </div>
            <div className="py-5">
                <AccessOptions/> 
                <CodeAnalysisSettings/>
            </div>
        </div>
    )
}