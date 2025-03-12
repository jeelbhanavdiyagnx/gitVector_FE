
import { Checkbox } from '@/components/ui/checkbox';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import LicenseCounter from '@/components/Invitation/LicenseCounter';

const OrganizationSection = ({ 
  orgOptions, 
  selectedOrg, 
  onOrgSelection, 
  LICENSE_LIMITS 
}) => (
  <AccordionItem
    value="1. Select your organization"
    tabIndex={0}
    className="group w-full border-b-0 selection:text-black dark:selection:text-white"
  >
    <AccordionTrigger className="relative w-full border border-gray-400 px-3 text-xs font-medium text-gray-500 transition-all selection:text-black hover:no-underline focus:border-black sm:text-xl dark:text-gray-600 dark:focus:border-white dark:focus:text-white">
      <div className="flex w-full justify-between">
        <div>1. Select your organization</div>
        <div className="flex text-base">
          <span>Organization licenses:</span>
          <span className="ml-1">
            <LicenseCounter current={selectedOrg ? 1 : 0} limit={LICENSE_LIMITS.org} />
          </span>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <scrollArea className="h-52">
      <div className="z-0 w-full border bg-white p-3 dark:bg-black">
        {orgOptions.map((org, index) => (
          <div key={index} className="flex items-center gap-2 py-1">
            <Checkbox
              id={org}
              checked={selectedOrg === org}
              onCheckedChange={(isChecked) => onOrgSelection(org, isChecked)}
            />
            <label
              htmlFor={org}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
            >
              {org}
            </label>
          </div>
        ))}
      </div>
      </scrollArea>
    </AccordionContent>
  </AccordionItem>
);

export default OrganizationSection;