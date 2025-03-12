import { Dropdown } from '@/components/Dropdown';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from '../overview/dateRangePicker';
import PieChartGraph from '@/components/Graphs/PieChart';
import RepoOverviewCard from '@/components/dashboard/repositories/RepoOverviewCard';
import {
  monthNames,
  repoUserPerformanceCardData,
  sortType,
  allowedKeysData,
  activityTypeData
} from '@/constants/data';
import CardHeading from '../dashboardCards/CardHeading';
import HeatGraph from '@/components/Graphs/HeatGraph';
import EventsCard from '../dashboardCards/eventCards';
import { MultipleBarChartGraph } from '@/components/Graphs/MultipleBarChartGraph';
import { FilterDropdown } from '../overview/filterDropdown';
import { ArrowDownUp, GitCommitHorizontal } from 'lucide-react';
import { CiFilter } from 'react-icons/ci';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { fetchReposRequest } from '@/redux/actions/gitRepoAction';
import { fetchUsersRequest } from '@/redux/actions/userAction';
import { fetchGlobalConfigRequest } from '@/redux/actions/globalAction';
import {
  repoOverviewRequest,
  repoContributionHeatmapRequest,
  repoCommitFrequencyRequest,
  repoClassificationChartRequest,
  repoUserPerformanceChartRequest,
  repoUserPerformanceRequest,
  repoUserParticipationRequest,
  repoActivityRequest,
  resetRepoUserPerformance,
  resetRepoRequest,
  repoUserCommitPerformanceRequest,
  commitTypeScoreAnalysisRequest,
} from '@/redux/actions/repoDashboardAction';
import { LabelBarChartGraph } from '@/components/Graphs/LabelBarChartGraph';
import {
  OverviewCardSkeleton,
  HeatmapSkeleton,
  EventsCardSkeleton
} from '@/components/dashboard/repositories/CustomSkeletons';
import { useMetadata } from '@/context/MetadataContext';
import CommitTable from '../dashboardCards/CommitTable';
import { forwardRef, useImperativeHandle } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OverviewCards from '@/components/cards/overviewCards';
import NoDataAvailable from '../overview/noDataAvailable';

const Repositories = forwardRef(({ onDropDownChange }, ref) => {
  const { setTitle } = useMetadata();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, loading } = useSelector((state) => state.gitRepo || []);
  const users = useSelector((state) => state.gitUser?.data || []);
  const {
    repoOverview,
    repoContributionHeatmap,
    repoCommitFrequency,
    repoClassificationChart,
    repoUserPerformanceChart,
    repoUserPerformance,
    repoUserParticipation,
    repoActivity,
    commitTypeScoreAnalysisChart,
  } = useSelector((state) => state.repoDashboardData || []);
  const { globalConfigData } = useSelector((state) => state.globalData);
  const { repoUserCommitPerformance } = useSelector(
    (state) => state.repoDashboardData || []
  );
  const [userCommits, setUserCommits] = useState([]);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCommitUser, setSelectedCommitUser] = useState('');
  const [repo, setRepo] = useState();
  const [repositoryId, setRepositoryId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [classificationType, setClassificationType] = useState();
  const [defaultRepoName, setDefaultRepoName] = useState('');
  const [clear, setClear] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [selectorData, setSelectorData] = useState({
    activityType: null,
    sort: null
  });
  const Selectedrepo = data && data?.find((item) => item?._id === repositoryId);
  const selectedUser = users?.find((item) => item?._id === userId);
  useImperativeHandle(ref, () => ({
    handleRefresh
  }));
  const itemsPerPage = 8;
  const handleRefresh = useCallback(() => {
    if (!repositoryId) return;
    setRefresh(true);
    if (Selectedrepo && selectorData) {
      dispatch(
        repoActivityRequest(
          Selectedrepo._id,
          selectorData?.activityType,
          selectorData?.sort
        )
      );
      dispatch(repoUserPerformanceChartRequest(Selectedrepo?._id));
    }

    if (dateRange && classificationType) {
      dispatch(
        commitTypeScoreAnalysisRequest(
          Selectedrepo._id,
          dateRange,
          classificationType
        )
      );
      dispatch(
        repoClassificationChartRequest(
          Selectedrepo._id,
          dateRange,
          classificationType,
          'monthly'
        )
      );
    } else if (classificationType) {
      dispatch(
        commitTypeScoreAnalysisRequest(Selectedrepo._id, classificationType)
      );
      dispatch(
        repoClassificationChartRequest(
          Selectedrepo._id,
          null,
          classificationType,
          'monthly'
        )
      );
    } else if (dateRange && Selectedrepo) {
      dispatch(repoUserPerformanceChartRequest(Selectedrepo?._id, dateRange));
      dispatch(repoUserParticipationRequest(Selectedrepo?._id, dateRange));
      dispatch(
        repoClassificationChartRequest(
          Selectedrepo._id,
          dateRange,
          null,
          'monthly'
        )
      );
    } else if (Selectedrepo) {
      dispatch(repoUserParticipationRequest(Selectedrepo._id, null));
      dispatch(
        repoClassificationChartRequest(Selectedrepo._id, null, null, 'monthly')
      );
    }
    if (Selectedrepo) {
      if (dateRange && userId) {
        dispatch(
          repoUserPerformanceRequest(
            Selectedrepo._id,
            dateRange,
            selectedUser.login
          )
        );
        dispatch(repoContributionHeatmapRequest(Selectedrepo._id));
        dispatch(repoOverviewRequest(Selectedrepo._id, dateRange));
        dispatch(commitTypeScoreAnalysisRequest(Selectedrepo._id, dateRange));
        dispatch(
          repoCommitFrequencyRequest(Selectedrepo._id, dateRange, 'daily')
        );
      } else if (dateRange && userId) {
        dispatch(repoContributionHeatmapRequest(Selectedrepo._id));
        dispatch(repoOverviewRequest(Selectedrepo._id, dateRange));
        dispatch(
          repoUserPerformanceRequest(
            Selectedrepo._id,
            dateRange,
            selectedUser.login
          )
        );
        dispatch(repoUserPerformanceChartRequest(Selectedrepo._id, dateRange));
        dispatch(
          repoCommitFrequencyRequest(Selectedrepo._id, dateRange, 'daily')
        );
      } else if (userId) {
        dispatch(
          repoUserPerformanceRequest(
            Selectedrepo._id,
            null,
            selectedUser?.login
          )
        );
        dispatch(repoOverviewRequest(Selectedrepo._id));
        dispatch(repoContributionHeatmapRequest(Selectedrepo._id));
        dispatch(repoUserPerformanceChartRequest(Selectedrepo._id));
        dispatch(repoCommitFrequencyRequest(Selectedrepo._id, null, 'daily'));
      } else {
        if (Selectedrepo?._id) {
          dispatch(repoOverviewRequest(Selectedrepo._id));
          dispatch(repoContributionHeatmapRequest(Selectedrepo._id));
          dispatch(repoUserPerformanceChartRequest(Selectedrepo._id));
          dispatch(
            repoCommitFrequencyRequest(Selectedrepo._id, null, 'daily')
          );
        }
      }
    }
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, [repositoryId, dateRange, userId, classificationType, selectorData, Selectedrepo]);


  useEffect(() => {
    if (repoUserCommitPerformance?.data) {
      setUserCommits(repoUserCommitPerformance.data.data);
      setFilteredCommits(repoUserCommitPerformance.data.data);
      setTotalPages(
        Math.ceil(
          repoUserCommitPerformance.data.pagination.total / itemsPerPage
        )
      );
    }
  }, [repoUserCommitPerformance]);
  useEffect(() => {
    if (Selectedrepo?._id) {
      if (Selectedrepo._id !== repo) {
        setRepo(Selectedrepo._id);
      }
    }
  }, [Selectedrepo]);

  useEffect(() => {
    if ((repo && dateRange) || refresh) {
      fetchCommits();
    }
  }, [currentPage, repo, dateRange, refresh]);

  const fetchCommits = async () => {
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    dispatch(repoUserCommitPerformanceRequest(repo, dateRange, skip, limit));
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
      setFilteredCommits(userCommits.filter((user) => user.username === value));
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (Selectedrepo && dateRange) {
      
      dispatch(repoUserPerformanceChartRequest(Selectedrepo?._id, dateRange));
    } else if (Selectedrepo) {
      dispatch(repoUserPerformanceChartRequest(Selectedrepo?._id));
    }
  }, [dispatch, Selectedrepo, dateRange]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const urlTab = searchParams.get('tab');
    const urlRepoId = searchParams.get('repoId');
    const storedId = localStorage.getItem('repoId');

    const repo = data.find(
      (item) => item?._id === urlRepoId || item._id === storedId
    );

    if (urlTab === 'repositories' && repo) {
      setRepositoryId(urlRepoId);
      setDefaultRepoName(`${repo.owner.login}/${repo.name}`);
    }
  }, [searchParams, data]);

  const handleRepositoryChange = (id) => {
    if (repositoryId !== id) {
      setRepositoryId(id);
      if (id) {
        onDropDownChange();
        router.push(`/dashboard?tab=repositories&repoId=${id}`);
      } else {
        dispatch(resetRepoRequest());
        router.push(`/dashboard?tab=repositories`);
      }
    }
  };
  useEffect(() => {
    if (classificationType && dateRange && Selectedrepo?._id) {
      dispatch(
        commitTypeScoreAnalysisRequest(
          Selectedrepo._id,
          dateRange,
          classificationType
        )
      );
    } else if (dateRange && Selectedrepo?._id) {
      dispatch(commitTypeScoreAnalysisRequest(Selectedrepo?._id, dateRange));
    } else if (classificationType && Selectedrepo?._id) {
      dispatch(
        commitTypeScoreAnalysisRequest(Selectedrepo._id, classificationType)
      );
    } else if (Selectedrepo?._id) {
      dispatch(commitTypeScoreAnalysisRequest(Selectedrepo._id));
    }
  }, [classificationType, dateRange, Selectedrepo, dispatch]);
  useEffect(() => {
    const defaultRepo = data ? data : [];
    const shouldSetDefault = defaultRepo.length > 0 && !clear;

    const defaultRepoId = shouldSetDefault ? defaultRepo[0]._id : null;
    const defaultRepoName = shouldSetDefault ? defaultRepo[0].full_name : null;

    setRepositoryId(defaultRepoId);
    setDefaultRepoName(defaultRepoName);

  }, [data]);

  const handleUserChange = (id) => {
    setUserId(id);
    onDropDownChange();
  };
  const DateChange = (range) => {
    setDateRange(range);
    onDropDownChange();
  };
  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  useEffect(() => {
    if (repositoryId) {
      dispatch(fetchUsersRequest(repositoryId));
      setDisabled(false);
    }
    if (Selectedrepo) {
      setTitle(` ${Selectedrepo?.name} | Repository Dashboard`);
    } else {
      setDisabled(true);
      setTitle('Git Vector');
    }
  }, [dispatch, repositoryId, Selectedrepo]);

  useEffect(() => {
    if (Selectedrepo) {
      if (dateRange) {
        dispatch(
          repoClassificationChartRequest(
            Selectedrepo._id,
            dateRange,
            'monthly'
          )
        );
      } else {
        dispatch(
          repoClassificationChartRequest(
            Selectedrepo._id,
            null,
            null,
            'monthly'
          )
        );
      }
    }
  }, [dateRange, repositoryId]);

  useEffect(() => {
    localStorage.setItem('repoId', repositoryId);
  }, [repositoryId]);
  const storedId = localStorage.getItem('repoId');
  useEffect(() => {
    storedId && setRepositoryId(storedId);
  }, []);
  useEffect(() => {
    if (Selectedrepo) {
      dispatch(fetchGlobalConfigRequest());
      dispatch(repoContributionHeatmapRequest(Selectedrepo._id));
      if (dateRange) {
        dispatch(repoOverviewRequest(Selectedrepo._id, dateRange));
        dispatch(repoUserPerformanceChartRequest(Selectedrepo._id, dateRange));
        dispatch(
          repoCommitFrequencyRequest(Selectedrepo._id, dateRange, 'daily')
        );
        dispatch(
          repoClassificationChartRequest(
            Selectedrepo._id,
            dateRange,
            null,
            'monthly'
          )
        );
        dispatch(repoUserParticipationRequest(Selectedrepo._id, dateRange));
      } else {
        dispatch(repoOverviewRequest(Selectedrepo._id));
        dispatch(repoUserPerformanceChartRequest(Selectedrepo._id));
        dispatch(repoCommitFrequencyRequest(Selectedrepo._id, null, 'daily'));
        dispatch(repoUserParticipationRequest(Selectedrepo._id, null));
      }
    }
  }, [repositoryId, dateRange, dispatch, repositoryId, Selectedrepo]);
  const handleClassificationChange = (type) => {
    setClassificationType(type);
    onDropDownChange();
  };
  useEffect(() => {
    if (userId === null) {
      dispatch(resetRepoUserPerformance());
    }
  }, [userId]);
  useEffect(() => {
    if (Selectedrepo && dateRange && selectedUser) {
      dispatch(
              repoUserPerformanceRequest(
                Selectedrepo._id,
                dateRange,
                selectedUser.login
              )
            );
    }
    else if (Selectedrepo && selectedUser) {
      dispatch(
        repoUserPerformanceRequest(
          Selectedrepo._id,
          selectedUser.login
        )
      );
    }

  }, [userId, dateRange]);
  useEffect(() => {
    if (Selectedrepo) {
      if (dateRange) {
        dispatch(
          repoActivityRequest(
            Selectedrepo._id,
            selectorData?.activityType,
            selectorData?.sort,
            dateRange
          )
        );
      } else {
        dispatch(
          repoActivityRequest(
            Selectedrepo._id,
            selectorData?.activityType,
            selectorData?.sort,
            null
          )
        );
      }
    }
  }, [selectorData, Selectedrepo, repositoryId, dateRange]);


  const cardData = {
    commitAnalyzed: {
      description: 'Total commits analyzed in the selected repository',
      tooltip: 'Total commits analyzed in the selected repository',
      count: repoOverview?.data?.commitAnalysed || 0
    },
    overallRepoScore: {
      description:
        'Average score of all analysis parameters for the selected period',
      tooltip:
        'Average score of all analysis parameters for the selected period',
      count: repoOverview?.data?.overallRepoScore || 0
    },
    activeUsersData: {
      activeUsers: repoOverview?.data?.activeUsers || 0,
      description: 'No. of active users during in the selected period',
      tooltip: 'No. of active users during in the selected period'
    },
    codeQuality: {
      description: 'Average code quality score for the selected period',
      count: repoOverview?.data?.codeQuality || 0,
      tooltip: 'Average code quality score for the selected period'
    },
    codePerformance: {
      description: 'Average code performance for the selected period',
      tooltip: 'Average code performance for the selected period',
      count: repoOverview?.data?.codePerformance || 0
    },
    maintainability: {
      description: 'Average Maintainability score for the selected period',
      tooltip: 'Average Maintainability score for the selected period',
      count: repoOverview?.data?.maintainability || 0
    },
  };
  const handleActivityChange = (type) => {
    setSelectorData((prev) => ({
      ...prev,
      activityType: type
    }));
    onDropDownChange();
  };
  const handleSortChange = (type) => {
    setSelectorData((prev) => ({ ...prev, sort: type }));
    onDropDownChange();
  };

  return (
    <div className="flex w-full  flex-col gap-6 pb-10 pt-2 ">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center  md:justify-end lg:justify-between">
        <div className="grid w-full grid-cols-1 gap-4  lg:w-3/5 lg:grid-cols-2 lg:gap-10">
          <Dropdown
            targetEntity={'Repository'}
            data={data}
            loading={loading}
            placeholder={'Select Repository'}
            onChange={handleRepositoryChange}
            icon={<GitCommitHorizontal className="lg:h-4 lg:w-4" />}
            defaultValue={defaultRepoName}
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
          repositoryId && repositoryId !== 'null' ? (
            <div className="w-full">
              <div className="flex w-full flex-col gap-6">
                <div className="w-full">
                  {repoOverview.loading ? (
                    <OverviewCardSkeleton numberOfCards={6} />
                  ) : Object.keys(repoOverview.data || {}).length > 0 ? (
                    <OverviewCards
                      isDataEmpty={Object.keys(repoOverview.data || {}).length > 0}
                      gridCount={allowedKeysData?.repoOverview.length}
                      radialChart={allowedKeysData?.repoRadialCardList}
                      plainKey={['commitAnalyzed']}
                      specialKey={{
                        key: 'activeUsersData',
                        value: 'activeUsers'
                      }}
                      total={{
                        key: 'activeUsersData',
                        value: repoOverview?.data?.totalUsers || 0
                      }}
                      allowedKeys={allowedKeysData?.repoOverview}
                      data={cardData}
                      title={`Repository overview: ${Selectedrepo?.owner?.login}/${Selectedrepo?.name}`}
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
                      <NoDataAvailable />
                    </div>
                  )}
                </div>
                <div className="grid w-full grid-cols-1 justify-between gap-6 lg:grid-cols-2 lg:gap-x-10">
              <div className="w-full">
                <RepoOverviewCard
                  loading={repoUserPerformance.loading}
                  headerContent={{
                    title: 'User performance',
                    toolTip: 'Analyse user performance',
                    dropDown: {
                      placeholder: 'Select user',
                      data: users,
                      targetEntity: 'User',
                      clear: clear,
                      disabled: disabled,
                      icon: <MdOutlineAccountCircle className="lg:h-4 lg:w-4" />
                    }
                  }}
                  onChange={handleUserChange}
                  isDataEmpty={
                    Object.keys(repoUserPerformance.data || {}).length > 0
                  }
                  plainKey="connectedRepos"
                  allowedKeys={allowedKeysData?.repoUserPerformance}
                  staticData={repoUserPerformanceCardData}
                  data={repoUserPerformance.data}
                  height={'auto'}
                />
              </div>

              <div className=" w-full ">                
                    <EventsCard
                      loading={repoActivity?.loading}
                      headerContent={{
                        title: 'Recent Activity',
                        activityDropDown: {
                          placeholder: 'Activity type',
                          icon: (
                            <CiFilter className="mr-1 h-5 w-5 dark:text-white" />
                          ),
                          data: activityTypeData
                        },
                        sortDropDown: {
                          placeholder: 'Sort',
                          icon: (
                            <ArrowDownUp
                              strokeWidth={1}
                              className="mr-1 h-5 w-5"
                            />
                          ),
                          data: sortType
                        }
                      }}
                      onSortChange={(type) => handleSortChange(type)}
                      onActivityChange={(type) => handleActivityChange(type)}
                      isDataEmpty={
                        Object.keys(repoActivity?.data || {}).length > 0
                          ? true
                          : false
                      }
                      data={repoActivity?.data}
                      height={'520px'}
                    />                
              </div>
            </div>

                <div className="grid w-full grid-cols-1 justify-between gap-20  lg:grid-cols-2 lg:gap-6 lg:gap-x-10">
                  <div className=" w-full">
                    <CommitTable
                      placeholder={'Username'}
                      loading={repoUserCommitPerformance?.loading}
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
                  <div className="h-auto">
                    <PieChartGraph
                      headerContent={{
                        title: 'User participation ratio',
                        toolTip:
                          'Displays the total number of commits made by each individual user in the repository for the selected time period'
                      }}
                      isDataEmpty={
                        Object?.keys(repoUserParticipation.data || {}).length > 0
                      }
                      isLoading={repoUserParticipation.loading}
                      data={repoUserParticipation.data}
                    />
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 justify-between gap-6 lg:grid-cols-2 lg:gap-x-10">
                  <div>
                    <PieChartGraph
                      isLoading={repoCommitFrequency.loading}
                      headerContent={{
                        title: 'Commit Type Contribution',
                        toolTip: 'Commit count for the selected period'
                      }}
                      isDataEmpty={
                        Object.keys(repoCommitFrequency.data || {}).length > 0
                          ? true
                          : false
                      }
                      data={repoCommitFrequency.data}
                      nameKey={'type'}
                      dataKey={'percentage'}
                    />
                  </div>

                  <div className=" w-full ">
                    <LabelBarChartGraph
                      isLoading={repoClassificationChart.loading}
                      headerContent={{
                        title: 'Commit Type vs. Average Score',
                        toolTip: `Shows the average performance score for each commit type based on ${Selectedrepo?.name} for the selected period.`
                      }}
                      isDataEmpty={repoClassificationChart.data?.length}
                      data={repoClassificationChart.data}
                      toolTipKey={'Avg. Score'}
                      xAxisDataKey={'commitType'}
                      BarDataKey={'averageScore'}
                    />
                  </div>
                </div>
                <div className="grid w-full grid-cols-1  justify-between gap-6 lg:grid-cols-2 lg:gap-x-10">
                  <div className="w-full ">
                    <LabelBarChartGraph
                      isLoading={commitTypeScoreAnalysisChart.loading}
                      headerContent={{
                        title: 'User Contribution Quality',
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
                        commitTypeScoreAnalysisChart.data &&
                          Object.keys(commitTypeScoreAnalysisChart.data || {})
                            .length > 0
                          ? true
                          : false
                      }
                      data={commitTypeScoreAnalysisChart.data}
                      toolTipKey={'Avg. Score'}
                      classificationType={classificationType}
                      xAxisDataKey={'user'}
                      BarDataKey={'avgScore'}
                    />
                  </div>
                  <div className=" w-full ">
                    <MultipleBarChartGraph
                      isLoading={repoUserPerformanceChart.loading}
                      headerContent={{
                        title: 'User Contribution Quantity',
                        toolTip:
                          'User contribution based on number of lines committed and average commit score'
                      }}
                      isDataEmpty={
                        repoUserPerformanceChart.data &&
                          Object.keys(repoUserPerformanceChart.data || {}).length > 0
                          ? true
                          : false
                      }
                      className="h-[300px]"
                      data={repoUserPerformanceChart?.data}
                      xAxisDataKey={'username'}
                      firstBarDataKey={'additions'}
                      secondBarDataKey={'deletions'}
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex w-full  flex-col gap-2 sm:w-full">
                    {repoContributionHeatmap.loading ? (
                      <HeatmapSkeleton />
                    ) : repoContributionHeatmap.data ? (
                      <HeatGraph
                        headerContent={{
                          title: 'Overall commit heat map',
                          toolTip: 'Heatmap for no. of commit'
                        }}
                        data={repoContributionHeatmap.data}
                        monthNames={monthNames}
                        hDays={['M', 'W', 'F']}
                        borderRadius={3}
                        hoverColor="#999"
                      />
                    ) : (
                      <NoDataAvailable />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NoDataAvailable />
          )}
    </div>
  );
});

Repositories.displayName = 'Repositories';

export default Repositories;
