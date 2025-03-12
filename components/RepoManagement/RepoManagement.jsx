'use client';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReposRequest,
  fetchGitRepoRequest,
  resetGitrepo,
  removeRepoRequest,
  repoUpdateRequest
} from '@/redux/actions/gitRepoAction';
import {
  Dialog,
  DialogTrigger
} from '../ui/dialog';
import { fetchGitOrgRequest } from '@/redux/actions/gitOrgAction';
import RemoveDialog from '../Management Components/RemoveDialog';

const RepoManagement = () => {
  const dispatch = useDispatch();
  const { gitRepos, data, removedRepo } = useSelector((state) => state.gitRepo);
  const { gitOrgs, loading } = useSelector((state) => state.gitOrg);
  const [selectRepo, setSelectRepo] = useState([]);
  const [unSelectRepo, setUnSelectRepo] = useState({});
  const [checkedId, setCheckedId] = useState();
  const [isRemoved, setIsRemoved] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [initialCheckedState, setInitialCheckedState] = useState([]);
  const [initialSelectState, setInitialSelectState] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pendingSelection, setPendingSelection] = useState([]);
  useEffect(() => {
    const filterSelectedRepo = Object.keys(unSelectRepo).length
      ? data.filter((item) => unSelectRepo?.githubId !== item.githubId)
      : data;

    const initialSelectedRepos = filterSelectedRepo.map((repo) => ({
      githubId: repo.githubId
    }));
    const initialCheckedRepos = gitRepos?.data.filter((repo) =>
      initialSelectedRepos.some(
        (selected) => selected.githubId === repo.githubId
      )
    );

    setInitialCheckedState(initialCheckedRepos || []);
    setCheckedId(initialCheckedRepos || []);

    setInitialSelectState(initialSelectedRepos || []);
    setSelectRepo(initialSelectedRepos || []);
  }, [data, gitRepos?.data, unSelectRepo]);

  useEffect(() => {
    dispatch(fetchGitOrgRequest());
    dispatch(fetchReposRequest());
  }, [dispatch]);
  useEffect(() => {
    if (Object.keys(unSelectRepo).length > 0) {
      setIsRemoved(true);
    }
  }, [unSelectRepo]);

  const resetCheckboxState = () => {
    setCheckedId(initialCheckedState);
    setSelectRepo(initialSelectState);
    setUnSelectRepo([]);
  };

  const handleChecked = (repoId) => {
    const isAlreadyAdded = data.some((selRepo) => selRepo.githubId === repoId);
    if (isAlreadyAdded) {
      const response = data.find((selrepo) => selrepo.githubId === repoId);
      const newSelectedData = selectRepo?.filter(
        (repo) => repo.githubId !== repoId
      );
      setSelectRepo(newSelectedData);
      setUnSelectRepo(response);
      if (Object.keys(unSelectRepo).length > 0) {
        setIsRemoved(true);
      }
      setPendingSelection((prev) =>
        prev.filter((repo) => repo.githubId !== repoId)
      );
    } else {
      const isAlreadySelected = pendingSelection?.filter(
        (selRepo) => selRepo.githubId === repoId
      );
      if (isAlreadySelected.length === 0) {
        const newRepo = gitRepos?.data.find((item) => item.githubId === repoId);
        if (newRepo) {
          setPendingSelection((prev) => [...prev, newRepo]);
        }
      } else {
        const newRepo = pendingSelection?.filter(
          (item) => item.githubId !== repoId
        );
        if (newRepo) {
          setPendingSelection(newRepo);
        }
      }
    }
    const newRepo = gitRepos?.data.find((item) => item.githubId === repoId);
    if (!newRepo) return;

    setCheckedId((prev = []) => {
      const isRepoChecked = prev.some((item) => item?.githubId === repoId);
      return isRepoChecked
        ? prev.filter((item) => item?.githubId !== repoId)
        : [...prev, newRepo];
    });
  };

  const handleSubmit = async () => {
    if (pendingSelection.length > 0) {
      await Promise.all(
        pendingSelection.map((repo) => dispatch(repoUpdateRequest(repo)))
      );
      setPendingSelection([]);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const unselectedCheckbox = (id) => {
    const newResult = checkedId?.filter((item) => item?.githubId !== id);
    const newSelected = selectRepo?.filter((item) => item?.githubId !== id);
    setSelectRepo(newSelected);
    setCheckedId(newResult);
  };
  useEffect(() => {
    const selectedOrg = gitOrgs?.find((item) => item?.id === activeAccordion);
    if (selectedOrg) {
      dispatch(fetchGitRepoRequest(selectedOrg?.login));
    }
  }, [activeAccordion, dispatch, removedRepo]);
  const handleReset = () => {
    if (gitRepos?.data) {
      dispatch(resetGitrepo());
    }
  };
  const handleInputValue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleGoBack = () => {
    setIsRemoved(false);
    setInputValue('');
    setErrorMessage(false);
    resetCheckboxState();
  };
const handleRemove = () => {
  if (inputValue === unSelectRepo.name) {
    dispatch(removeRepoRequest(unSelectRepo.full_name));
    unselectedCheckbox(unSelectRepo?.githubId);
    setIsRemoved(false);
    setInputValue('');

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    setErrorMessage(true);
  }
}
  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto lg:w-3/4">
      <ScrollArea className="h-auto max-h-[454px] w-full overflow-y-auto rounded-md border px-2 ">
        <Command>
          <CommandInput
            placeholder="Search your repositories here"
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {loading ? (
            <div className="flex h-[250px] w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
          ) : (
            <CommandList className="h-full dark:bg-[#09090b]">
              <CommandEmpty className="flex h-[250px] w-full items-center justify-center dark:text-white">
                No results found.
              </CommandEmpty>
              <CommandGroup>
                {gitOrgs?.map((orgs) => (
                  <CommandItem
                    key={orgs?.id}
                    className="w-full dark:bg-[#09090b] dark:selection:bg-[#09090b]"
                  >
                    <Accordion
                      type="single"
                      collapsible
                      value={activeAccordion}
                      onValueChange={(value) => setActiveAccordion(value)}
                      className=" w-full"
                    >
                      <AccordionItem value={orgs?.id}>
                        <AccordionTrigger
                          onClick={handleReset}
                          className="relative w-full border-b py-1 text-base font-medium dark:focus:text-white"
                        >
                          <h1 className="text-xs sm:text-base">
                            {orgs?.login}
                          </h1>
                          <span className="absolute right-5 text-[0.5rem] text-gray-600 sm:right-7 sm:text-sm">
                            Expand to select repository
                          </span>
                        </AccordionTrigger>

                        <AccordionContent>
                          {gitRepos?.loading ? (
                            <div className="flex h-36 w-full items-center justify-center">
                              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
                            </div>
                          ) : (
                            gitRepos?.data
                              ?.filter((repoItem) => repoItem?.githubId)
                              .map((repoItem) => (
                                <div
                                  key={repoItem.githubId}
                                  className="flex items-center gap-2 py-1"
                                >
                                  <Checkbox
                                    value={repoItem.githubId}
                                    type="checkbox"
                                    id={repoItem.githubId}
                                    checked={
                                      checkedId?.some(
                                        (i) => i?.githubId === repoItem.githubId
                                      ) ||
                                      pendingSelection?.some(
                                        (i) => i?.githubId === repoItem.githubId
                                      )
                                    }
                                    onCheckedChange={() =>
                                      handleChecked(repoItem.githubId)
                                    }
                                  />
                                  <label
                                    htmlFor={repoItem.githubId}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                                  >
                                    {repoItem.full_name}
                                  </label>
                                </div>
                              ))
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </ScrollArea>
      <RemoveDialog
        dialogFor={'repo'}
        item={unSelectRepo}
        inputValue={inputValue}
        onInputChange={handleInputValue}
        errorMessage={errorMessage}
        onGoBack={handleGoBack}
        onRemove={handleRemove}
        isOpen={isRemoved}
      />
      <Dialog>
        <DialogTrigger className="text-start" asChild>
          <Button
            type="submit"
            variant="default"
            className="mt-3 w-20"
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default RepoManagement;
