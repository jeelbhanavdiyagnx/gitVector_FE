import React, { useEffect, useState } from 'react';
import { DateRangePicker } from './dateRangePicker';
import { CardList } from './cardList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import NoDataAvailable from './noDataAvailable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommitReviewRequest } from '@/redux/actions/commitReviewAction';
import { RxRocket } from 'react-icons/rx';
import { calculateAverageScores } from '@/components/utils/helper';
import { Dropdown } from '@/components/Dropdown';
import { fetchBranchesRequest } from '@/redux/actions/branchActions';
import { fetchReposRequest } from '@/redux/actions/gitRepoAction';
import { fetchUsersRequest } from '@/redux/actions/userAction';

export default function Overview() {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.commitReviews);
  const { data } = useSelector((state) => state.gitRepo || []);
  const { branches } = useSelector((state) => state.branch);
  const users = useSelector((state) => state.gitUser?.data || []);
  const [disabled, setDisabled] = useState(false)
  const [dateRange,setDateRange] = useState(null)

  const [repositoryId, setRepositoryId] = useState(null)
  const [branchId, setBranchId] = useState(null)
  const [userId, setUserId] = useState(null)
  //Getting Id's of Repo, User, Branch
  const handleRepositoryChange = (id) => {
    setRepositoryId(id);
  };
  const handleBranchChange = (id) => {
    setBranchId(id)
  }
  const handleUserChange = (id) => {
    setUserId(id)
  }
  useEffect(() => {
    dispatch(fetchReposRequest());
  }, []);
  //Fetching repos and users
  useEffect(() => {
    repositoryId &&
      dispatch(fetchBranchesRequest(repositoryId));
      dispatch(fetchUsersRequest(repositoryId))
  }, [dispatch, repositoryId]);

  useEffect(() => {
    if (dateRange?.from == null && dateRange?.to == null) {
      if (repositoryId || userId || branchId) {
        dispatch(fetchCommitReviewRequest(repositoryId, userId, branchId));
      }
    }
    else if (dateRange?.from && dateRange?.to) {
      dispatch(fetchCommitReviewRequest(repositoryId, userId, branchId, dateRange));
    }

  }, [repositoryId, userId, branchId, dateRange]);

  useEffect(() => {
    dispatch(fetchCommitReviewRequest(null, null, null));  // Clear previous commits by passing null/empty params
  }, []);

  useEffect(() => {
    !repositoryId ? setDisabled(true) : setDisabled(false)
  }, [repositoryId, setDisabled])
  const commitReviews = calculateAverageScores(reviews)
  const DateChange = (range)=>{
    setDateRange(range)
  }
  return (
    <div>
      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <DateRangePicker disabled={disabled} onChange={DateChange} />
        <Dropdown title={"Repository"} data={data} placeholder={"Select a repository to analyze"} onChange={handleRepositoryChange} />
        <Dropdown title={"Branches"} disabled={disabled} data={branches} placeholder={"Select a branch to analyze"} onChange={handleBranchChange} />
        <Dropdown title={"User"} data={users} placeholder={"Select a user to analyze"} disabled={disabled} onChange={handleUserChange} />
      </div>
      {commitReviews && Object.keys(commitReviews).length > 0 ? (
        <CardList reviews={commitReviews} />
      ) : (
        <NoDataAvailable />
      )}
      <Dialog open={loading}>
        <DialogContent
          closeIcon={false}
          className="h- w-11/12 max-w-[196px] px-2 py-2 sm:w-[196px]"
        >
          <DialogHeader>
            <DialogTitle className="flex items-start gap-1 select-none outline-none ring-0 text-lg border-none font-medium dark:text-white text-[#09090B]">
              <RxRocket className="mt-1 text-2xl" />
              Fetching data...
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
