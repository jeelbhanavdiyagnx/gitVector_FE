import { Checkbox } from '@/components/ui/checkbox';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import LicenseCounter from '@/components/Invitation/LicenseCounter';

const ContributorsSection = ({
  allContributors,
  selectedRepos,
  selectedUsers,
  onUserSelection,
  LICENSE_LIMITS
}) => (
  <AccordionItem
    value="contributors"
    tabIndex={0}
    className={`group w-full border-b-0 selection:text-black dark:selection:text-white ${
      selectedRepos.length === 0 ? 'pointer-events-none opacity-50' : ''
    }`}
  >
    <AccordionTrigger
      className="relative w-full border border-gray-400 px-3 text-xs font-medium text-gray-500 transition-all selection:text-black hover:no-underline focus:border-black sm:text-xl dark:text-gray-600 dark:focus:border-white dark:focus:text-white"
      disabled={selectedRepos.length === 0}
    >
      <div className="flex w-full justify-between">
        <div>3. Select Users you want to invite</div>
        <div className="flex text-base">
          <span>Users licenses:</span>
          <span className="ml-1">
            <LicenseCounter
              current={selectedUsers.length}
              limit={LICENSE_LIMITS.users}
            />
          </span>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <ScrollArea className="h-52">
        <div className="z-0 w-full border-2 bg-white p-3 dark:bg-black">
          {allContributors.length > 0 ? (
            allContributors.map((contributor, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <Checkbox
                  id={contributor.login}
                  checked={selectedUsers.includes(contributor.login)}
                  disabled={
                    !selectedUsers.includes(contributor.login) &&
                    selectedUsers.length >= LICENSE_LIMITS.users
                  }
                  onCheckedChange={(isChecked) =>
                    onUserSelection(contributor.login, isChecked)
                  }
                />
                <label
                  htmlFor={contributor.login}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                >
                  {contributor.login}
                </label>
              </div>
            ))
          ) : (
            <p>No contributors found for the selected repositories.</p>
          )}
        </div>
      </ScrollArea>
    </AccordionContent>
  </AccordionItem>
);

export default ContributorsSection;
