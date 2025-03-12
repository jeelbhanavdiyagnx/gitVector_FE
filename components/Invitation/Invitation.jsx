import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from '@/components/ui/accordion';
import { FETCH_GITORG_REQUEST } from '@/redux/actions/gitOrgAction';
import { fetchGitRepoRequest } from '@/redux/actions/gitRepoAction';
import { fetchContributorsRequest } from '@/redux/actions/contributorsAction';
import OrganizationSection from '@/components/Invitation/OrganizationSelector';
import RepositorySection from '@/components/Invitation/RepositorySelector';
import ContributorsSection from '@/components/Invitation/ContributorsSelector';
import DialogButtons from '@/components/Invitation/DialogButton';


const Invitation = () => {
  const dispatch = useDispatch();
  const gitOrgs = useSelector((state) => state.gitOrg.gitOrgs);
  const gitRepos = useSelector((state) => state.gitRepo.gitRepos);
  const contributors = useSelector((state) => state.contributors.contributors);
  const [orgOptions, setOrgOptions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allContributors, setAllContributors] = useState([]);

  const LICENSE_LIMITS = {
    org: 1,
    repo: 5,
    users: 5
  };

  useEffect(() => {
    dispatch({ type: FETCH_GITORG_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    if (gitOrgs.length) {
      setOrgOptions(gitOrgs.map((org) => org.login));
    }
  }, [gitOrgs]);

  const handleOrgSelection = (org, isChecked) => {
    if (isChecked) {
      setSelectedOrg(org);
      dispatch(fetchGitRepoRequest(org));
    } else {
      setSelectedOrg(null);
      setRepos([]);
      setSelectedRepos([]);
      setAllContributors([]);
      setSelectedUsers([]);
    }
  };

  useEffect(() => {
    if (selectedOrg && gitRepos.length > 0) {
      setRepos(gitRepos);
    } else if (selectedOrg && gitRepos.length === 0) {
      setRepos([]);
    }
  }, [gitRepos, selectedOrg]);

  useEffect(() => {
    if (contributors) {
      setAllContributors((prevContributors) => {
        const uniqueContributors = new Set(
          prevContributors.map((c) => JSON.stringify(c))
        );
        contributors.forEach((contributor) => {
          uniqueContributors.add(JSON.stringify(contributor));
        });
        return Array.from(uniqueContributors).map((c) => JSON.parse(c));
      });
    }
  }, [contributors]);

  const handleRepoSelection = (repo, isChecked) => {
    if (isChecked && selectedRepos.length >= LICENSE_LIMITS.repo) {
      return;
    }

    let updatedRepos;
    if (isChecked) {
      updatedRepos = [...selectedRepos, repo];
      dispatch(fetchContributorsRequest(selectedOrg, repo));
    } else {
      updatedRepos = selectedRepos.filter((r) => r !== repo);
    }
    setSelectedRepos(updatedRepos);
  };

  const handleUserSelection = (user, isChecked) => {
    if (isChecked && selectedUsers.length >= LICENSE_LIMITS.users) {
      return;
    }

    setSelectedUsers((prev) =>
      isChecked ? [...prev, user] : prev.filter((u) => u !== user)
    );
  };

  return (
    <div className="flex h-4/5 w-full flex-col items-center pt-5 sm:h-screen">
      <div className="flex h-5/6 w-full flex-col items-center gap-8">
        <h1 className="w-full text-lg font-semibold sm:text-3xl">
          Import your data and invite users from GitHub
        </h1>
        <div className="z-50 flex w-full flex-col items-center gap-4 sm:w-5/6 sm:p-6">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-2 px-3"
          >
            <OrganizationSection
              orgOptions={orgOptions}
              selectedOrg={selectedOrg}
              onOrgSelection={handleOrgSelection}
              LICENSE_LIMITS={LICENSE_LIMITS}
            />
            <RepositorySection
              repos={repos}
              selectedOrg={selectedOrg}
              selectedRepos={selectedRepos}
              onRepoSelection={handleRepoSelection}
              LICENSE_LIMITS={LICENSE_LIMITS}
            />
            <ContributorsSection
              allContributors={allContributors}
              selectedRepos={selectedRepos}
              selectedUsers={selectedUsers}
              onUserSelection={handleUserSelection}
              LICENSE_LIMITS={LICENSE_LIMITS}
            />
          </Accordion>
        </div>
      </div>
      <DialogButtons />
    </div>
  );
};

export default Invitation;