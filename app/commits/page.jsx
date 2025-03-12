'use client';
import CommitList from '@/components/Branch/CommitList';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import withAuth from '@/app/withAuth';
import { Dropdown } from '@/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposRequest } from '@/redux/actions/gitRepoAction';
import { fetchUsersRequest } from '@/redux/actions/userAction';
import { fetchBranchesRequest } from '@/redux/actions/branchActions';
import {
  fetchCommitReviewRequest,
  fetchCommitReviewReset
} from '@/redux/actions/commitReviewAction';
import { fetchGlobalConfigRequest } from '@/redux/actions/globalAction';
import CommitListMobile from '@/components/Branch/CommitListMobile';
import RefreshTime from '@/components/Branch/RefreshTime';
import { useMetadata } from '@/context/MetadataContext';
import {sortOrder } from '@/constants/data';
import { FilterDropdown } from '@/components/dashboard/overview/filterDropdown';
import { CiFilter } from 'react-icons/ci';
import { ArrowDownUp } from 'lucide-react';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { data: repositories } = useSelector((state) => state.gitRepo || []);
  const { globalConfigData } = useSelector((state) => state.globalData);
  const users = useSelector((state) => state.gitUser?.data || []);
  const [repositoryId, setRepositoryId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);
  const [defaultRepoName, setDefaultRepoName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clear, setClear] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const { setTitle } = useMetadata();
  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  useEffect(() => {
    const urlRepoId = searchParams.get('repoId');
    if (!urlRepoId || !repositories.length) return;

    const selectedRepo = repositories.find((repo) => repo._id === urlRepoId);
    if (selectedRepo) {
      setRepositoryId(urlRepoId);
      setDefaultRepoName(`${selectedRepo.owner.login}/${selectedRepo.name}`);
      if (selectedRepo) {
        setTitle(`${selectedRepo.owner.login}/${selectedRepo.name}| Commits`);
      } else {
        setTitle('Git Vector');
      }
      setDisabled(false);
    }
  }, [searchParams, repositories]);

  useEffect(() => {
    if (!repositoryId) {
      dispatch(fetchCommitReviewRequest(repositoryId, userId));
      setDisabled(true);
      return;
    }
    setDisabled(false);
    dispatch(fetchUsersRequest(repositoryId));
    dispatch(fetchCommitReviewReset());
    dispatch(fetchGlobalConfigRequest());
    dispatch(fetchCommitReviewRequest(repositoryId, userId, type, sort));
    dispatch(fetchBranchesRequest(repositoryId));
  }, [repositoryId, userId, type, sort, dispatch]);

  const handleRepositoryChange = (id) => {
    setRepositoryId(id);
    setDisabled(!id);

    if (id) {
      router.push(`/commits?repoId=${id}`);
    } else {
      router.push('/commits');
    }
  };

  const handleUserChange = (id) => {
    if (!repositoryId) {
      setUserId(null);
      setClear(true);
    }
    setUserId(id);
  };

  const handleCommitTypeChange = (type) => {
    if (!repositoryId) {
      setType(null);
      setClear(true);
    }
    setType(type);
  };

  const handleSortChange = (sort) => {
    if (!repositoryId) {
      setSort(null);
      setClear(true);
    }
    setSort(sort);
  };

  const handleShowDropDown = (data) => {
    setShowDropdown(data);
  };

  const handleRefresh = useCallback(() => {
    dispatch(fetchCommitReviewReset());
    dispatch(fetchCommitReviewRequest(repositoryId, userId, type, sort, 0));
    dispatch(fetchBranchesRequest(repositoryId));
  }, [repositoryId, userId, type, sort, dispatch]);

  return (
    <div className="p-4">
      <div
        className={`transition-all duration-300 ${showDropdown ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
      >
        <div className="mt-4 flex justify-between ">
          <p className="pl-4 text-3xl font-semibold">Commits</p>
          <RefreshTime disabled={disabled} onRefresh={handleRefresh} />
        </div>
        <div className="flex flex-col lg:flex-row pt-2 items-end px-4 gap-4  ">
          <div className="lg:w-9/12 w-full gap-4 flex flex-col  lg:flex-row">
          <div className="w-full ">
            <Dropdown
              data={repositories}
              targetEntity={"Repository"}
              placeholder="Select a repository to analyze"
              onChange={handleRepositoryChange}
              defaultValue={defaultRepoName}
            />
            </div>
            <div className="w-full">
            <Dropdown
              data={users}
              targetEntity={"User"}
              placeholder="Select a user to analyze"
              disabled={disabled}
              onChange={handleUserChange}
              clear={clear}
            />
            </div>
          </div>
          <div className="w-full justify-start gap-4 flex flex-col lg:flex-row">
            <div className="w-full lg:w-4/12">
              <FilterDropdown
                disabled={disabled}
                placeholder="Commit type"
                height={400}
                data={globalConfigData?.data?.classificationType}
                onChange={handleCommitTypeChange}
                type={'classification'}
                icon={<CiFilter className="mr-1 h-5 w-5 dark:text-white" />}
              />
            </div>
            <div className="w-full lg:w-3/12">
              <FilterDropdown
                disabled={disabled}
                placeholder="Sort"
                data={sortOrder}
                onChange={handleSortChange}
                icon={<ArrowDownUp strokeWidth={1} className="mr-1 h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden pt-6 lg:block">
        <CommitList repo={repositoryId} user={userId} type={type} sort={sort} />
      </div>
      <div className="lg:hidden">
        <CommitListMobile
          repo={repositoryId}
          user={userId}
          type={type}
          sort={sort}
          showDropdownOnScroll={handleShowDropDown}
        />
      </div>
    </div>
  );
};

export default withAuth(Page);
