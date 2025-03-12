import { Dropdown } from '@/components/Dropdown';
import { fetchUsersRequest } from '@/redux/actions/userAction';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardOverviewCard from '../dashboardCards/dashboardOverviewCard';
import PieChartGraph from '@/components/Graphs/PieChart';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { matricTypes, usersLearningNeedsData, sortType, weeklySummaryData, repoUserPerformanceCardData, monthNames, activityTypeData } from '@/constants/data';
import { DateRangePicker } from '../overview/dateRangePicker';
import { HorizontalBarChartGraph } from '@/components/Graphs/HorizontalBarChartGraph';
import AreaGraph from '@/components/Graphs/AreaGraph';
import HeatGraph from '@/components/Graphs/HeatGraph';
import { CiFilter } from 'react-icons/ci';
import { LuCopy } from 'react-icons/lu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterDropdown } from '../overview/filterDropdown';
import { message } from 'antd';
import { ArrowDownUp, GitCommitHorizontal } from 'lucide-react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { fetchReposRequest } from '@/redux/actions/gitRepoAction';
import NoDataAvailable from '../overview/noDataAvailable';
import {
  codeQualityChartRequest, repoLevelPeformanceRequest, repoParticipationRequest, resetRepoLevelPerformance, resetUserClassificationChart, resetUserComparisonChart, resetUserRequest, userActivityRequest,
  userAlertRequest,
  userClassificationChartRequest,
  userCommitFrequencyRequest,
  userCommitTypeScoreRequest,
  userComparisonChartRequest,
  userHeatMapRequest,
  userOverviewRequest,
  userRepoCommitPerformanceRequest
} from '@/redux/actions/userDashboardAction';
import { fetchGlobalConfigRequest } from '@/redux/actions/globalAction';
import { LabelBarChartGraph } from '@/components/Graphs/LabelBarChartGraph';
import { BarChartSkeleton, HeatmapSkeleton, OverviewCardSkeleton, EventsCardSkeleton } from '@/components/dashboard/repositories/CustomSkeletons';
import { useMetadata } from '@/context/MetadataContext';
import { setTimeRangeData } from '@/redux/actions/globalAction';
import EventsCard from '../dashboardCards/eventCards';
import { forwardRef, useImperativeHandle } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommitTable from '../dashboardCards/CommitTable';
import { MultipleBarChartGraph } from '@/components/Graphs/MultipleBarChartGraph';
import CardHeading from '../dashboardCards/CardHeading';
const Users = forwardRef(({ onDropDownChange }, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTitle } = useMetadata();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.gitUser || []);
  const repos = useSelector((state) => state.gitRepo?.data || []);
  const { userOverview, userHeatMap, userComparisonChart, userClassificationChart, repoLevelPerformance, codeQualityChart, repoParticipationChart,
    userActivity,
    userAlerts,
    userRepoCommitPerformance,
    userCommitFrequency,
    userCommitScoreTypeAnalysis
  } = useSelector((state) => state.userDashboardData);
  const { globalConfigData } = useSelector((state) => state.globalData);
  const [userCommits, setUserCommits] = useState([]);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCommitUser, setSelectedCommitUser] = useState('');
  const [repo, setRepo] = useState();
  const [filterData, setFilterData] = useState({ selectedUser: [], firstUsersData: [], unselectedUsers: [], userRepos: [] });
  const [dateRange, setDateRange] = useState(null);
  const [compDateRange, setCompDateRange] = useState(null);
  const [compUserId, setCompUserId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [repoId, setRepoId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [metricForCompare, setMetricForCompare] = useState("codeQuality");
  const [clear, setClear] = useState(false);
  const [classificationType, setClassificationType] = useState("Feature/Enhancement");
  const [selectorData, setSelectorData] = useState({
    activityType: null,
    sort: null
  });
  const [defaultRepoName, setDefaultRepoName] = useState(null)
  const [defaultUserName, setDefaultUserName] = useState('');

  const userName = data?.find((item) => item?._id === userId);

  const handleRefresh = useCallback(() => {
    if (!userId) return;
    if (userId) {
      const user = data?.find((item) => item?._id === userId);
      dispatch(userOverviewRequest(user?._id));
      dispatch(userHeatMapRequest(user?._id));
      dispatch(codeQualityChartRequest(user?._id));
      dispatch(repoParticipationRequest(user?._id));
      dispatch(
        userActivityRequest(
          userName?._id,
          selectorData?.activityType,
          selectorData?.sort
        )
      );
    }
    if (userId) {
      const user = data?.find((item) => item?._id === userId);
      if (dateRange) {
        dispatch(
          userClassificationChartRequest(
            user?._id,
            dateRange
          )
        );
      } else {
        dispatch(userClassificationChartRequest(user?._id));
      }
    }
    if (compUserId && selectedUserId && metricForCompare) {
      const user1 = data?.find((item) => item?._id === selectedUserId);
      const user2 = data?.find((item) => item?._id === compUserId);
      dispatch(
        userComparisonChartRequest(user1?.login, user2?.login, metricForCompare)
      );
    }

    if (repoId && userId) {
      const repoName = repos?.find((item) => item?._id === repoId);
      const userName = data?.find((item) => item?._id === userId);
      if (dateRange) {
        dispatch(
          repoLevelPeformanceRequest(userName?._id, repoName?.name, dateRange)
        );
      } else {
        dispatch(repoLevelPeformanceRequest(userName?._id, repoName?.name));
      }
    }
  }, [userId, selectorData, classificationType, compUserId, selectedUserId, metricForCompare, repoId, dateRange, data, repos, dispatch]);

  useImperativeHandle(ref, () => ({
    handleRefresh
  }));

  useEffect(() => {
    dispatch(fetchUsersRequest());
    dispatch(fetchReposRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      if (dateRange) {
        dispatch(userAlertRequest(userName?._id, dateRange));
      } else {
        dispatch(userAlertRequest(userName?._id));
      }
    }
  }, [dispatch, userId, dateRange, userName]);

  useEffect(() => {
    if (userId) {

      dispatch(
        userActivityRequest(
          userName?._id,
          selectorData?.activityType,
          selectorData?.sort
        )
      );
    }
  }, [userId, dateRange, selectorData, userName]);
  useEffect(() => {
    if (userName) {
      if (dateRange) {
        dispatch(userCommitFrequencyRequest(userName?._id, dateRange))
      }
      else {
        dispatch(userCommitFrequencyRequest(userName?._id))
      }
    }
  }, [userId, dateRange, userName])

  useEffect(() => {
    if (userId) {
      const user = data?.find((item) => item?._id === userId);
      if (dateRange) {
        dispatch(userAlertRequest(user?._id, dateRange));
        dispatch(userOverviewRequest(user?._id, dateRange));
        dispatch(codeQualityChartRequest(user?._id, dateRange));
        dispatch(repoParticipationRequest(user?._id, dateRange));
      } else {
        dispatch(userAlertRequest(user?._id));
        dispatch(userOverviewRequest(user?._id));
        dispatch(fetchGlobalConfigRequest());

        dispatch(codeQualityChartRequest(user?._id));
        dispatch(repoParticipationRequest(user?._id));
      }
      dispatch(userHeatMapRequest(user?._id));
    }
  }, [userId, dispatch, data, dateRange, userName]);

  useEffect(() => {
    if (userId) {
      const user = data?.find((item) => item?._id === userId);
      if (dateRange) {
        dispatch(userClassificationChartRequest(user?._id, dateRange));
      } else {
        dispatch(userClassificationChartRequest(user?._id));
      }
    } else {
      dispatch(resetUserClassificationChart());
    }
  }, [userId, dateRange, userName]);
  const handleWeekChange = (range) => {
    onDropDownChange();
  };
  useEffect(() => {
    localStorage.setItem('userId', userId);
    if (userId) {
      setDisabled(false);
    } else {
      setDisabled(true);
      dispatch(resetRepoLevelPerformance());
      dispatch(resetUserClassificationChart());
    }
  }, [userId]);
  useEffect(() => {
    if (userId !== selectedUserId) {
      dispatch(resetUserComparisonChart());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!compUserId || !selectedUserId || !metricForCompare || !userId) {
      dispatch(resetUserComparisonChart());
    }
    if (compUserId && selectedUserId && metricForCompare) {
      const user1 = data?.find((item) => item?._id === selectedUserId);
      const user2 = data?.find((item) => item?._id === compUserId);

      if (compDateRange) {
        dispatch(
          userComparisonChartRequest(
            user1?.login,
            user2?.login,
            metricForCompare,
            compDateRange
          )
        );
      } else {
        dispatch(
          userComparisonChartRequest(
            user1?.login,
            user2?.login,
            metricForCompare
          )
        );
      }
    }
  }, [compUserId, dispatch, selectedUserId, metricForCompare, compDateRange, userName]);

  useEffect(() => {
    if (!repoId) {
      dispatch(resetRepoLevelPerformance());
    }
    if (repoId && userId) {
      const repoName = repos.find((item) => item?._id === repoId);
      const userName = data.find((item) => item?._id === userId);
      if (dateRange) {
        dispatch(
          repoLevelPeformanceRequest(userName?._id, repoName?.name, dateRange)
        );
      } else {
        dispatch(repoLevelPeformanceRequest(userName?._id, repoName?.name));
      }
    }
  }, [dispatch, repoId, dateRange, userName]);

  useEffect(() => {
    if (!data || !data.length) return;

    const urlTab = searchParams.get('tab');
    const urlUserId = searchParams.get('userId');
    const storedId = localStorage.getItem('userId');

    const userNameFromUrl = data?.find(
      (item) => item?._id === urlUserId || item?._id === storedId
    );

    if (urlTab === 'users' && userNameFromUrl) {
      setUserId(urlUserId);
      setDefaultUserName(userNameFromUrl?.login);
    }
  }, [searchParams, data]);
  const storedId = localStorage.getItem('userId');
  useEffect(() => {
    storedId && setUserId(storedId);
    dispatch(fetchGlobalConfigRequest());
  }, []);
  const handleUserChange = (id) => {
    if (userId !== id) {
      setUserId(id);
      if (id !== userId && repoLevelPerformance.data) {
        setClear(true);
        setRepoId(null);
        dispatch(resetRepoLevelPerformance());
      }
      if (id !== userId && userClassificationChart.data) {
        setClear(true);
        setClassificationType("Feature/Enhancement");
        dispatch(resetUserClassificationChart());
      }
      if (id) {
        onDropDownChange();
        router.push(`/dashboard?tab=users&userId=${id}`);
      } else {
        dispatch(resetUserRequest());
        router.push(`/dashboard?tab=users`);
      }
    }
  };
  useEffect(() => {
    if (userName) {
      if (dateRange && classificationType) {
        dispatch(userCommitTypeScoreRequest(userName?._id, classificationType, dateRange))
      }
      else if (classificationType) {
        dispatch(userCommitTypeScoreRequest(userName?._id, classificationType))
      }
      else if (dateRange) {
        dispatch(userCommitTypeScoreRequest(userName?._id, dateRange))
      }
      else {
        dispatch(userCommitTypeScoreRequest(userName?._id))
      }
    }
  }, [dispatch, userId, dateRange, classificationType, userName])

  useEffect(() => {
    if (!userId || !data) {
      setTitle('Git Vector');
      dispatch(setTimeRangeData('Select Date'));
      return;
    }
    const userRepos = repos.filter((item) => item.gitUser.includes(userId));
    const selectedUser = data.find((item) => item._id === userId);
    if (selectedUser) {
      setTitle(`${selectedUser?.login} | User Dashboard`);
    }
    const otherUsers = data.filter((item) =>
      selectedUserId ? item._id !== selectedUserId : item._id !== userId
    );

    setFilterData({
      userRepos,
      selectedUser,
      unselectedUsers: otherUsers
    });
    setDisabled(false);
  }, [userId, selectedUserId, repos, data]);

  const handleCompChart = (range) => {
    if (range !== compDateRange && range) {
      setCompDateRange(range);
      onDropDownChange();
    }
  };
  const handleCopyToClipboard = () => {
    const listContent = usersLearningNeedsData?.content?.join('\n');
    navigator.clipboard.writeText(listContent).then(
      () => {
        message.success('Copied to clipboard');
      },
      (err) => {
        message.error('Failed to copy to clipboard');
      }
    );
  };
  const handleUserReposChange = (id) => {
    if (clear === false) {
      setRepoId(id);
      onDropDownChange();
    }
    setClear(false);
  };
  useEffect(() => {
    const newData = data?.filter((item) => item._id !== compUserId);
    setFilterData((prev) => ({ ...prev, firstUsersData: newData }));
  }, [compUserId, data, selectedUserId]);

  const handleFirstUserChange = (id) => {
    setSelectedUserId(id);
    onDropDownChange();
  };
  const DateChange = (range) => {
    setDateRange(range);
    onDropDownChange();
  };
  const handleSecondUserChange = (id) => {
    setCompUserId(id);
    onDropDownChange();
  };
  const handleMetricChange = (value) => {
    setMetricForCompare(value);
    onDropDownChange();
  };
  const filterUserOverviewData = Object?.keys(userOverview?.data).filter(
    (item) =>
      userOverview.data[item] !== null &&
      item !== '_id' &&
      item !== 'overallScoreWithoutDate'
  );
  const handleClassificationChange = (type) => {
    setClassificationType(type);
    onDropDownChange();
    setClear(false);
  };
  const itemsPerPage = 8;
  useEffect(() => {
    if (userRepoCommitPerformance?.data) {
      setUserCommits(userRepoCommitPerformance.data.data);
      setFilteredCommits(userRepoCommitPerformance.data.data);
      setTotalPages(
        Math.ceil(
          userRepoCommitPerformance.data.pagination?.total / itemsPerPage
        )
      );
    }
  }, [userRepoCommitPerformance]);
  useEffect(() => {
    if (userName) {
      if (userName?._id !== repo) {
        setRepo(userName?._id);
      }
    }
  }, [userName]);

  useEffect(() => {
    if (repo && dateRange) {
      fetchCommits();
    }
  }, [currentPage, repo, dateRange]);

  const fetchCommits = async () => {
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    dispatch(userRepoCommitPerformanceRequest(repo, dateRange, skip, limit));
  };
  const sortData = (column) => {
    let order = 'asc';
    if (sortColumn === column) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    const sortedData = [...filteredCommits].sort((a, b) => {
      if (typeof a[column] === 'string') {
        return order === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
      return order === 'asc' ? a[column] - b[column] : b[column] - a[column];
    });

    setSortColumn(column);
    setSortOrder(order);
    setFilteredCommits(sortedData);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleUserSelect = (value) => {
    setSelectedCommitUser(value);
    if (value === 'Show All' || value === '') {
      setFilteredCommits(userCommits);
    } else {
      setFilteredCommits(userCommits.filter((item) => item.repoName === value));
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const defaultOrg = userId === null && data ? data : [];
    const shouldSetDefault = defaultOrg.length > 0;
    const defaultOrgId = shouldSetDefault ? defaultOrg[0]._id : null;
    const defaultOrgLogin = shouldSetDefault ? defaultOrg[0].login : null;
    setUserId(defaultOrgId);
    setDefaultUserName(defaultOrgLogin);
  }, [data]);
  const handleActivityChange = (type) => {
    setSelectorData((prev) => ({
      ...prev,
      activityType: type
    }));
    onDropDownChange();
  }
  const handleSortChange = (type) => {
    setSelectorData((prev) => ({ ...prev, sort: type }));
    onDropDownChange();
  }
  useEffect(() => {
    const defaultRepo = repoId === null && filterData?.userRepos ? filterData?.userRepos : [];
    const shouldSetDefault = defaultRepo.length > 0 && !clear;
    const defaultRepoId = shouldSetDefault ? defaultRepo[0]._id : null;
    const defaultRepoLogin = shouldSetDefault ? defaultRepo[0].full_name : null;
    setRepoId(defaultRepoId);
    setDefaultRepoName(defaultRepoLogin);
  }, [filterData?.userRepos]);

  return (
    <div className="flex w-full flex-col gap-6 pb-10 pt-2  ">
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row  sm:items-center">
        <div className="grid w-full grid-cols-1 gap-4  lg:w-3/5 lg:grid-cols-2 lg:gap-10">
          <Dropdown
            data={data}
            targetEntity={'User'}
            loading={loading}
            placeholder={'Select user'}
            onChange={handleUserChange}
            icon={<MdOutlineAccountCircle className="lg:h-4 lg:w-4" />}
            defaultValue={defaultUserName}
          />
          <DateRangePicker
            disabled={disabled}
            showTitle={true}
            onChange={DateChange}
          />
        </div>
      </div>
      {
        loading ?
          <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          </div>
          :
          userId && userId !== 'null' ? (
            <div className="flex w-full flex-col  gap-6">
              {userOverview?.loading ? (
                <OverviewCardSkeleton numberOfCards={6} />
              ) : (
                <div>
                  <DashboardOverviewCard
                    isDataEmpty={Object.keys(userOverview?.data).length > 0}
                    plainKey={'commitCount'}
                    gridCount={filterUserOverviewData?.length}
                    allowedKeys={filterUserOverviewData}
                    data={userOverview.data}
                    title={`User overview: ${userName?.login}`}
                    popOver={
                      <Dialog>
                        <DialogTrigger className="text-start text-sm font-normal underline">
                          Click here to view {userName?.login}’s learning needs
                        </DialogTrigger>
                        <DialogContent
                          closeIcon={true}
                          closeOverlay={true}
                          className="w-auto rounded-lg py-2 shadow-md md:max-w-[540px] md:px-4 md:pr-4"
                        >
                          <DialogHeader>
                            <DialogDescription className="w-72 py-5  md:w-[520px]">
                              <div className="w-full">
                                <div className="flex w-full flex-col justify-between gap-1  lg:flex-row  lg:pr-6">
                                  <h1 className="text-start text-sm font-semibold text-black lg:text-lg">
                                    {usersLearningNeedsData?.needTitle}
                                    {userName?.login}
                                  </h1>
                                  <div
                                    className="  flex cursor-pointer items-center gap-1 text-xs text-[#71717A] lg:text-sm"
                                    onClick={handleCopyToClipboard}
                                  >
                                    <LuCopy className="text-xs text-[#71717A] sm:text-sm" />
                                    <p>Copy to clipboard</p>
                                  </div>
                                </div>
                                <p className="w-full pt-1 text-left text-sm font-normal text-[#71717A] sm:pt-0">
                                  {usersLearningNeedsData?.desc}
                                </p>
                                <ScrollArea className="h-80 w-full overflow-auto">
                                  <ul className="mt-3 flex list-disc flex-col items-center gap-2 px-4">
                                    {usersLearningNeedsData?.content?.map(
                                      (item, index) => (
                                        <li
                                          className="text-left text-sm font-normal text-black"
                                          key={index}
                                        >
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </ScrollArea>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    }
                  />
                </div>
              )}
              <div className="flex w-full flex-col lg:h-[625px] lg:flex-row gap-8 xl:gap-10">
                <div className="lg:w-2/4">
                  <DashboardOverviewCard
                    loading={repoLevelPerformance?.loading}
                    headerContent={{
                      title: "Repository level performance", dropDown: {
                        placeholder: "Repository",
                        data: filterData?.userRepos,
                        defaultValue: defaultRepoName,
                        targetEntity: 'Repository',
                        clear: clear,
                        disabled: disabled,
                        icon: (
                          <GitCommitHorizontal className="lg:h-4 lg:w-4" />
                        )
                      }
                    }}
                    onChange={handleUserReposChange}
                    isDataEmpty={
                      repoLevelPerformance?.data &&
                      Object.keys(repoLevelPerformance.data).length > 0
                    }
                    data={repoLevelPerformance.data}
                    staticData={repoUserPerformanceCardData}
                    gridCount={3}
                    height="auto"
                  />
                </div>
                <div className="lg:w-2/4">
                  <EventsCard
                    loading={userActivity?.loading}
                    headerContent={{
                      title: "Recent Activity", activityDropDown: {
                        placeholder: "Activity type",
                        icon: <CiFilter className="mr-1 h-5 w-5 dark:text-white" />,
                        data: activityTypeData,
                      },
                      sortDropDown: {
                        placeholder: "Sort",
                        icon: <ArrowDownUp strokeWidth={1} className="mr-1 h-5 w-5" />,
                        data: sortType
                      }
                    }}
                    onSortChange={(type) => handleSortChange(type)}
                    onActivityChange={(type) => handleActivityChange(type)}
                    isDataEmpty={
                      Object.keys(userActivity?.data || {}).length > 0
                    }
                    data={userActivity.data}
                    height="625px"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-8  lg:flex-row xl:gap-10">
                <div className="w-full lg:w-1/2">
                  {userAlerts?.loading ? (
                    <EventsCardSkeleton size={'small'} />
                  ) : (
                    <EventsCard
                      loading={userAlerts?.loading}
                      headerContent={{ title: "Alert" }}
                      isDataEmpty={
                        Object.keys(userAlerts?.data?.Notifications || {})?.length >
                        0
                      }
                      data={userAlerts.data.Notifications}
                      height={'500px'}
                    />
                  )}
                </div>
                <div className="w-full lg:w-1/2 ">
                  <EventsCard
                    headerContent={{
                      title: "Weekly performance summary", dateRangeDropDown: {
                        disabled: false,
                        showTitle: false,
                      }
                    }}
                    onWeekChange={handleWeekChange}
                    isDataEmpty={weeklySummaryData.length}
                    data={weeklySummaryData}
                    height={'500px'}
                  />
                </div>
              </div>
              <div className=" grid w-full  grid-cols-1 justify-between gap-5 lg:grid-cols-2 xl:gap-x-10">
                {repoParticipationChart?.loading ? (
                  <BarChartSkeleton />
                ) : (
                  <div className="w-full h-[500px]">
                    <HorizontalBarChartGraph
                      headerContent={{
                        title: 'Repository participation',
                        toolTip: 'Based on commits made in the last 15 days'
                      }}
                      isDataEmpty={repoParticipationChart?.data.length}
                      data={repoParticipationChart?.data}
                      toolTipKey={'Total Avg Score'}
                      yAxisDataKey={'reponame'}
                      BarDataKey={'totalAvgScore'}
                    />
                  </div>
                )}
                {codeQualityChart?.loading ? (
                  <BarChartSkeleton />
                ) : (
                  <div className="w-full h-full">
                    <CommitTable
                      isDataEmpty={userRepoCommitPerformance?.data?.length > 0}
                      placeholder={'Repository'}
                      loading={userRepoCommitPerformance?.loading}
                      onChange={handleUserSelect}
                      data={userCommits}
                      filteredCommits={filteredCommits}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      selectedUser={selectedCommitUser}
                      handlePageChange={handlePageChange}
                      sortData={sortData}
                      sortColumn={sortColumn}
                    />
                  </div>
                )}
              </div>
              <div className="grid w-full grid-cols-1 justify-between gap-6 lg:grid-cols-2 lg:gap-x-10">
                <div>
                  <PieChartGraph
                    isLoading={userCommitFrequency.loading}
                    headerContent={{
                      title: 'Commit Type Contribution',
                      toolTip: 'Commit count for the selected period'
                    }}
                    isDataEmpty={
                      Object.keys(userCommitFrequency.data || {}).length > 0
                        ? true
                        : false
                    }
                    data={userCommitFrequency.data}
                    nameKey={"type"}
                    dataKey={"percentage"}
                  />
                </div>
                <div className="w-full h-[500px]">
                  <LabelBarChartGraph
                    isLoading={userClassificationChart.loading}
                    headerContent={{
                      title: 'Commit Type vs. Average Score',
                      toolTip: `Shows the average performance score for each commit type based on ${userName?.login} for the selected period.`
                    }}
                    isDataEmpty={userClassificationChart.data?.length}
                    data={userClassificationChart.data}
                    toolTipKey={'Avg. Score'}
                    xAxisDataKey={'commitType'}
                    BarDataKey={'averageScore'}
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-1  justify-between gap-6 lg:grid-cols-2 lg:gap-x-10">
                <div className="w-full ">
                  <LabelBarChartGraph
                    isLoading={userCommitScoreTypeAnalysis.loading}
                    headerContent={{
                      title: 'Contribution Quality',
                      toolTip:
                        'Displays the average score for all users based on the selected commit type over the chosen period.',
                      dropDown: {
                        placeholder: 'Classification type',
                        data: globalConfigData?.data?.classificationType,
                        height: 400,
                        type: 'classification',
                        icon: (
                          <CiFilter className="mr-1 h-5 w-5 dark:text-white" />
                        )
                      }
                    }}
                    onChange={handleClassificationChange}
                    isDataEmpty={
                      userCommitScoreTypeAnalysis.data &&
                        Object.keys(userCommitScoreTypeAnalysis.data || {}).length > 0
                        ? true
                        : false
                    }

                    data={userCommitScoreTypeAnalysis.data}
                    toolTipKey={'Avg. Score'}
                    classificationType={classificationType}
                    xAxisDataKey={'reponame'}
                    BarDataKey={'avgScore'}
                  />
                </div>
                <div className=" w-full ">

                  <MultipleBarChartGraph
                    isLoading={repoParticipationChart.loading}
                    headerContent={{
                      title: 'Contribution Quantity',
                      toolTip:
                        'User contribution based on number of lines committed and average commit score'
                    }}
                    isDataEmpty={
                      repoParticipationChart.data &&
                        Object.keys(repoParticipationChart.data || {}).length > 0
                        ? true
                        : false
                    }
                    className="h-[300px]"
                    data={repoParticipationChart?.data}
                    xAxisDataKey={'reponame'}
                    firstBarDataKey={'additions'}
                    secondBarDataKey={'deletions'}
                  />
                </div>
              </div>

              {userHeatMap?.loading ? (
                <HeatmapSkeleton />
              ) : (
                <div className="h-full">
                  {userHeatMap?.data.length ? (
                    <HeatGraph
                      headerContent={{
                        title: 'Commit heat map',
                        toolTip: 'Commit heat map'
                      }}
                      data={userHeatMap?.data}
                      monthNames={monthNames}
                      hDays={['M', 'W', 'F']}
                      borderRadius={3}
                    />
                  ) : (
                    <NoDataAvailable />
                  )}
                </div>
              )}
              <div>
                <CardHeading paddingLeft={"pl-0"} title={"Peer to peer comparison"} tooltipContent={"You can compare performances of any two users basis on the parameters below"} />
                <div className="grid w-full grid-cols-1 gap-3 pb-3 lg:w-3/5 lg:grid-cols-3 lg:gap-8">
                  <FilterDropdown
                    data={matricTypes}
                    title="Select metric to compare"
                    placeholder="Select metric to compare"
                    onChange={handleMetricChange}
                    defaultValue={metricForCompare}
                    height={"350px"}
                  />
                  <Dropdown
                    title={'Select user'}
                    disabled={disabled}
                    data={filterData?.firstUsersData}
                    targetEntity={'User'}
                    selectedValue={filterData?.selectedUser}
                    placeholder={'Select user'}
                    onChange={handleFirstUserChange}
                    icon={<MdOutlineAccountCircle className="lg:h-4 lg:w-4" />}
                  />
                  <Dropdown
                    title={'Select user'}
                    targetEntity={'User'}
                    disabled={disabled}
                    loading={loading}
                    data={filterData?.unselectedUsers}
                    placeholder={'Select user '}
                    onChange={handleSecondUserChange}
                    clear={
                      (filterData?.selectedUser &&
                        compUserId === filterData?.selectedUser._id) ||
                      clear
                    }
                    icon={<MdOutlineAccountCircle className="lg:h-4 lg:w-4" />}
                  />
                </div>
                {userComparisonChart?.loading ? (
                  <HeatmapSkeleton />
                ) : (
                  userComparisonChart?.data && (
                    <AreaGraph
                      isDataEmpty={
                        Object.keys(userComparisonChart.data)?.length > 0
                      }
                      data={userComparisonChart.data}
                      onChange={handleCompChart}
                      toolTipKeys={[
                        selectedUserId === null
                          ? filterData.selectedUser?.login
                          : data?.find((item) => item?._id === selectedUserId)
                            ?.login,
                        data?.find((item) => item?._id === compUserId)?.login
                      ]}
                      metricArea1={'user1MetricScore'}
                      metricArea2={'user2MetricScore'}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            <NoDataAvailable />
          )}
    </div>
  );
});

Users.displayName = 'Users';

export default Users;
