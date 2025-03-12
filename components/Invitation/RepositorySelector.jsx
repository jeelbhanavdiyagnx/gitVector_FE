import { Checkbox } from '@/components/ui/checkbox';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import LicenseCounter from '@/components/Invitation/LicenseCounter';

const RepositorySection = ({
  repos,
  selectedOrg,
  selectedRepos,
  onRepoSelection,
  LICENSE_LIMITS
}) => (
  <AccordionItem
    value="repositories"
    tabIndex={0}
    className={`group w-full border-b-0 ${
      !selectedOrg ? 'pointer-events-none opacity-50' : ''
    } selection:text-black dark:selection:text-white`}
  >
    <AccordionTrigger
      className="relative w-full border border-gray-400 px-3 text-xs font-medium text-gray-500 transition-all selection:text-black hover:no-underline focus:border-black sm:text-xl dark:text-gray-600 dark:focus:border-white dark:focus:text-white"
      disabled={!selectedOrg}
    >
      <div className="flex w-full justify-between">
        <div>2. Select repositories you want to import</div>
        <div className="flex text-base">
          <span>Repo licenses:</span>
          <span className="ml-1">
            <LicenseCounter
              current={selectedRepos.length}
              limit={LICENSE_LIMITS.repo}
            />
          </span>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <ScrollArea className="h-52">
        <div className="z-0 w-full border-2 bg-white p-3 dark:bg-black">
          {repos.length ? (
            repos.map((repo, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <Checkbox
                  id={repo.name}
                  checked={selectedRepos.includes(repo.name)}
                  disabled={
                    !selectedRepos.includes(repo.name) &&
                    selectedRepos.length >= LICENSE_LIMITS.repo
                  }
                  onCheckedChange={(isChecked) =>
                    onRepoSelection(repo.name, isChecked)
                  }
                />
                <label
                  htmlFor={repo.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                >
                  {repo.name}
                </label>
              </div>
            ))
          ) : (
            <p>No repositories found for {selectedOrg}</p>
          )}
        </div>
      </ScrollArea>
    </AccordionContent>
  </AccordionItem>
);

export default RepositorySection;
