import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import EventsCard from '@/components/dashboard/dashboardCards/eventCards/index';
import { CardComponent } from '@/components/dashboard/overview/cardComponent';
import { MultipleBarChartGraph } from '@/components/Graphs/MultipleBarChartGraph';
import AreaGraph from '@/components/Graphs/AreaGraph';
import HeatGraph from '@/components/Graphs/HeatGraph';
import {extractNoOfDays, truncateWithEllipsis, formatDateForMostActiveDay, deepFilter, getLinesChanged} from '@/components/utils/helper';
import { Dropdown } from '@/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrgRequest } from '@/redux/actions/gitOrgAction';
import {sortType, orgOverviewCardsData, orgCardData, allowedKeysData,monthNames, activityTypeData} from '@/constants/data';
import { FilterDropdown } from '@/components/dashboard/overview/filterDropdown';
import { CiFilter } from 'react-icons/ci';
import { ArrowDownUp } from 'lucide-react';
import { DateRangePicker } from '@/components/dashboard/overview/dateRangePicker';
import {
  orgActivityRequest,
  orgAlertsRequest,
  orgHeatMapRequest,
  orgOverviewRequest,
  orgTotalCommitAnalysisRequest,
  repoAvgScoreChartRequest,
  resetOrgRequest,
  userPerformanceChartRequest
} from '@/redux/actions/orgDashboardAction';
import { LabelBarChartGraph } from '@/components/Graphs/LabelBarChartGraph';
import {OverviewCardSkeleton} from '@/components/dashboard/repositories/CustomSkeletons';
import { useMetadata } from '@/context/MetadataContext';
import { fetchGlobalConfigRequest, setTimeRangeData } from '@/redux/actions/globalAction';
import { useRouter, useSearchParams } from 'next/navigation';
import NoDataAvailable from '@/components/dashboard/overview/noDataAvailable';
import OverviewCards from '@/components/cards/overviewCards';
const Organizations = forwardRef(({ onDropDownChange }, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTitle } = useMetadata();
  const dispatch = useDispatch();
  const { orgsData, loading } = useSelector((state) => state.gitOrg);
  const {
    orgOverview,
    userPerformance,
    repoAvgScoreChart,
    orgHeatMap,
    error,
    orgActivity,
    orgAlerts,
    orgTotalCommitAnalysis
  } = useSelector((state) => state.orgDashboardData);
  const [orgId, setOrgId] = useState(null);
  const [clear, setClear] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [areaChartRange, setAreaChartRange] = useState(null);
  const [selectorData, setSelectorData] = useState({activityType: null, sort: null});
  const [defaultOrgName, setDefaultOrgName] = useState('');
  const orgName = orgsData?.data?.find((item) => item?._id === orgId);
  useImperativeHandle(ref, () => ({
    handleRefresh
  }));
  const handleRepoAreaChart = (range) => {
    if (range !== areaChartRange && range) {
      setAreaChartRange(range);
      onDropDownChange();
    }
  };
  useEffect(() => {
    const orgName = orgsData?.data?.find((item) => item?._id === orgId);
    if (areaChartRange && orgName) {
      dispatch(repoAvgScoreChartRequest(orgName?._id, areaChartRange));
    }
  }, [areaChartRange]);
  useEffect(() => {
    if (orgId) {
      dispatch(orgTotalCommitAnalysisRequest(orgId))
    }
  }, [orgId, orgName])
  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (orgId && (urlTab === "organizations" || urlTab === null)) {
      dispatch(
        orgActivityRequest(
          orgName?._id,
          selectorData?.activityType,
          selectorData?.sort,
          dateRange
        )
      );
    }
  }, [orgId, dateRange, selectorData, orgName]);
  const handleRefresh = useCallback(() => {
    if (!orgId) return;
    if (orgName) {
      dispatch(orgTotalCommitAnalysisRequest(orgId))
      if (dateRange) {
        dispatch(orgOverviewRequest(orgName?._id, dateRange));
        dispatch(userPerformanceChartRequest(orgName?._id, dateRange));
        dispatch(orgHeatMapRequest(orgName?._id));
        dispatch(
          orgActivityRequest(
            orgName?._id,
            selectorData?.activityType,
            selectorData?.sort,
            dateRange
          )
        );        
        dispatch(orgAlertsRequest(orgName?._id, dateRange));
      } else {
        dispatch(fetchGlobalConfigRequest());
        dispatch(orgOverviewRequest(orgName?._id));
        dispatch(orgActivityRequest(orgName?._id));
        dispatch(userPerformanceChartRequest(orgName?._id));
        dispatch(orgHeatMapRequest(orgName?._id));
        dispatch(
          orgActivityRequest(
            orgName?._id,
            selectorData?.activityType,
            selectorData?.sort,
            null
          )
        );
        dispatch(orgAlertsRequest(orgName?._id));
      }
      if (areaChartRange) {
        dispatch(repoAvgScoreChartRequest(orgName?._id, areaChartRange));
      }
      else{
        dispatch(repoAvgScoreChartRequest(orgName?._id));
      }
    }
  }, [orgId, dateRange, selectorData, orgName]);
  useEffect(() => {
    const defaultOrg = orgId === null && orgsData?.data ? orgsData.data : [];
    const shouldSetDefault = defaultOrg.length > 0 && !clear;
    const defaultOrgId = shouldSetDefault ? defaultOrg[0]._id : null;
    const defaultOrgLogin = shouldSetDefault ? defaultOrg[0].login : null;
    setOrgId(defaultOrgId);
    setDefaultOrgName(defaultOrgLogin);
  }, [orgsData]);

  useEffect(() => {
    dispatch(fetchOrgRequest());
    storedId && setOrgId(storedId)
  }, []);

  useEffect(() => {
    if (orgId) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setDateRange(null);
      dispatch(setTimeRangeData('Select Date'));
    }
  }, [orgId]);

  useEffect(() => {
    const orgName = orgsData?.data?.find((item) => item?._id === orgId);
    if (orgId) {
      if (dateRange) {
        dispatch(orgAlertsRequest(orgName?._id, dateRange));
      } else {
        dispatch(orgAlertsRequest(orgName?._id));
      }
    }
    if (orgName) {
      dispatch(orgHeatMapRequest(orgName?._id));
      setTitle(`${orgName?._id} | Organization Dashboard`);
    } else {
      setTitle('Git Vector');
    }
    if (orgName) {
      dispatch(repoAvgScoreChartRequest(orgName?._id));
      if (dateRange) {
        dispatch(orgOverviewRequest(orgName?._id, dateRange));
        dispatch(userPerformanceChartRequest(orgName?._id, dateRange));
      } else {
        dispatch(orgOverviewRequest(orgName?._id));
        dispatch(fetchGlobalConfigRequest());
        dispatch(userPerformanceChartRequest(orgName?._id));
      }
    }
  }, [dispatch, orgId, dateRange, orgName]);

  useEffect(() => {
    if (!orgsData?.data || orgsData?.data.length === 0) {
      return;
    }
    const urlTab = searchParams.get('tab');
    const urlOrgId = searchParams.get('orgId');
    const storedId = localStorage.getItem('orgId')
    const orgName = orgsData?.data.find((item) => item._id == urlOrgId || item._id == storedId || item._id == orgId);
    if (urlTab === 'organizations' && orgName) {
      setDefaultOrgName(orgName?.login);
      setOrgId(urlOrgId);
    }
  }, [searchParams, orgsData]);

  useEffect(() => {
    localStorage.setItem('orgId', orgId)
  }, [orgId])
  const storedId = localStorage.getItem('orgId')
  const handleOrgChange = (id) => {
    if (orgId !== id) {
      setOrgId(id);
      if (id) {
        setClear(false)
        router.push(`/dashboard?tab=organizations&orgId=${id}`);
        onDropDownChange()
      } else {
        setOrgId(null)
        setClear(true)
        dispatch(resetOrgRequest())
        router.push(`/dashboard?tab=organizations`);
      }
    }
  };
  const DateChange = (range) => {
    setDateRange(range);
    onDropDownChange()
  };
  useEffect(() => {
    if (clear) {
      setDateRange(null)
    }
  }, [clear])
  const getDescription = (item) => {
    const response = orgCardData?.find((value) => value.key === item);
    return response.description;
  };
  const getTitle = (item) => {
    const response = orgCardData?.find((value) => value.key === item);
    if (response.title) {
      return response.title;
    }
  };
  const getTooltip = (item) => {
    const response = orgCardData?.find((value) => value.key === item);
    return response.tooltip;
  };
  const getAllowedKeys = (keys, specialKey) => {
    return keys?.filter(
      (item) =>
        specialKey === 'activeUsersData' &&
        orgOverview?.data[item]?.activeUsers !== null &&
        orgOverview?.data[item]?.count !== null
    );
  };
  const cleanedData = deepFilter(orgOverview?.data);
  const keysOfInterest = (allowedKeys) => {
    const result = Object.keys(cleanedData).filter((item) =>
      allowedKeys.includes(item)
    );
    return result;
  };
  const hasAllowedKeys = (keyGroup) => {
    return Object.keys(cleanedData).some((item) =>
      allowedKeysData?.[keyGroup]?.includes(item)
    );
  };
  const hasKeysOfInterest = (keyGroup, keys) => {
    return keysOfInterest(allowedKeysData?.[keyGroup]).some((key) => {
      const value = cleanedData[key];
      return keys.some((k) => k in value);
    });
  };
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
  return (
    <div className="flex w-full  flex-col gap-6 pb-10 pt-2 ">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center  md:justify-end lg:justify-between">
        <div className="grid w-full grid-cols-1 gap-4  lg:w-3/5 lg:grid-cols-2 lg:gap-10">
          <Dropdown
            data={orgsData?.data}
            targetEntity={"Organization"}
            loading={loading}
            placeholder={'Select Organization'}
            onChange={handleOrgChange}
            defaultValue={defaultOrgName}
          />
          <DateRangePicker
            disabled={disabled}
            showTitle={true}
            onChange={DateChange}
            clear={clear}
          />
        </div>
      </div>
      {orgsData?.loading
        ?
        <div className="flex h-[80vh] w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
        :
        !error.message && orgId && orgId !== "null" ? (
          <div className="flex w-full  flex-col gap-6">
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-10">
              <div className="flex w-full flex-col gap-4 lg:w-3/5  ">
                <div className="flex h-full w-full flex-col gap-1  lg:justify-between xl:w-full">
                  <h1 className="pb-1 text-lg font-medium">Organization Overview</h1>
                  <div className='w-full'>
                    <OverviewCards
                      getStaticData={true}
                      isLoading={orgOverview.loading}
                      gridCount={3}
                      staticData={orgOverviewCardsData}
                      plainKey={[
                        'connectedRepos',
                         'repoAnalysed'
                      ]}
                      total={{
                        key: 'activeUsersData',
                        value: cleanedData.activeUsersData?.totalUsers
                      }}
                      radialChart={['activeUsersData']}
                      allowedKeys={getAllowedKeys(
                        allowedKeysData?.orgOveriew,
                        'activeUsersData'
                      )}
                      data={cleanedData}
                      specialKey={{ key: 'activeUsersData', value: 'activeUsers' }}
                      specialValue="activeUsers"
                    />
                  </div>
                </div>
                <div className="flex h-full w-full flex-col gap-4 lg:justify-between xl:w-full">
                  {orgOverview.loading ? (
                    <OverviewCardSkeleton numberOfCards={3} />
                  ) : (
                    <div>
                      <h1 className="pb-2 text-lg font-medium">Most Active</h1>
                      {hasAllowedKeys('mostActive') &&
                        hasKeysOfInterest('mostActive', ['name', 'day']) ? (
                        <div className="flex w-full flex-col justify-between  md:w-full md:flex-row gap-4 xl:gap-10">
                          {Object.keys(cleanedData)
                            ?.filter((key) =>
                              allowedKeysData?.mostActive?.includes(key)
                            )
                            .filter(
                              (item) =>
                                cleanedData[item]?.name || cleanedData[item].day
                            )
                            .map((item, index) => (
                              <CardComponent
                                key={index}
                                title={item}
                                hoverTooltip={
                                  cleanedData[item]?.name?.length > 8 &&
                                  cleanedData[item]?.name
                                }
                                tooltipContent={getTooltip(item)}
                                desc={getDescription(item)}
                                value={
                                  item === 'mostActiveDay'
                                    ? formatDateForMostActiveDay(
                                      cleanedData[item]?.day
                                    )
                                    : truncateWithEllipsis(
                                      cleanedData[item]?.name
                                    )
                                }
                                data={item}
                                days={dateRange && extractNoOfDays(dateRange)}
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
                          <NoDataAvailable />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {orgOverview.loading ? (
                  <div className="flex h-full w-full flex-col gap-4  lg:justify-between xl:w-full">
                    <OverviewCardSkeleton numberOfCards={3} />
                    <OverviewCardSkeleton numberOfCards={3} />
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col gap-4  lg:justify-between xl:w-full">
                    <div>
                      <h1 className="pb-2 text-lg font-medium">Performance</h1>
                      {hasAllowedKeys('orgPerformance') &&
                        hasKeysOfInterest('orgPerformance', ['name', 'count']) ? (
                        <div className="flex w-full flex-col justify-between md:w-full md:flex-row gap-4 xl:gap-10">
                          {allowedKeysData?.orgPerformance
                            .filter((key) => cleanedData[key])
                            .map((item, index) => (
                              <CardComponent
                                title={getTitle(item) || item}
                                key={index}
                                tooltipContent={getTooltip(item)}
                                desc={getDescription(item)}
                                hoverTooltip={
                                  cleanedData[item]?.name?.length > 8 &&
                                  cleanedData[item]?.name
                                }
                                value={
                                  item === 'avgUserPerformance'
                                    ? `${Math.round(cleanedData[item].count)}/10`
                                    : truncateWithEllipsis(
                                      cleanedData[item]?.name
                                    )
                                }
                                days={dateRange && extractNoOfDays(dateRange)}
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
                          <NoDataAvailable />
                        </div>
                      )}
                    </div>
                    {orgOverview.loading ? (
                      <OverviewCardSkeleton numberOfCards={3} />
                    ) : (
                      <div>
                        <h1 className="pb-2 text-lg font-medium">
                          Insights and Trends
                        </h1>
                        {hasAllowedKeys('insightsAndTrends') &&
                          hasKeysOfInterest('insightsAndTrends', [
                            'type',
                            'additions'
                          ]) ? (
                          <div className="flex w-full flex-col justify-between  md:w-full md:flex-row gap-4 xl:gap-10">
                            {Object.keys(cleanedData)
                              ?.filter((key) =>
                                allowedKeysData?.insightsAndTrends.includes(key)
                              )
                              .filter((item) => cleanedData[item]).length >
                              0 ? (
                              Object.keys(cleanedData)
                                ?.filter((key) =>
                                  allowedKeysData?.insightsAndTrends?.includes(
                                    key
                                  )
                                )
                                .map(
                                  (item, index) =>
                                    cleanedData[item].type !== 'N/A' && (
                                      <CardComponent
                                        key={index}
                                        title={item}
                                        hoverTooltip={cleanedData[item]?.type?.length > 0 && cleanedData[item]?.type}
                                        tooltipContent={getTooltip(item)}
                                        desc={getDescription(item)}
                                        value={item === 'linesChanged' ? getLinesChanged(item,orgOverview) : truncateWithEllipsis(cleanedData[item]?.type)}
                                        data={item}
                                        days={
                                          dateRange && extractNoOfDays(dateRange)
                                        }
                                      />
                                    )
                                )
                            ) : (
                              <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
                                <NoDataAvailable />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex h-40 w-full items-center justify-center rounded-lg border shadow-md">
                            <NoDataAvailable />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex w-full   flex-col gap-6 lg:gap-10   lg:w-2/5  ">
                <div className="w-full ">                
                      <EventsCard
                       loading={orgActivity?.loading}
                       headerContent={{title: "Recent Activity", activityDropDown: {
                         placeholder:"Activity type",
                         icon: <CiFilter className="mr-1 h-5 w-5 dark:text-white" />,
                         data: activityTypeData, 
                       },
                       sortDropDown: {
                         placeholder:"Sort",
                         icon: <ArrowDownUp strokeWidth={1} className="mr-1 h-5 w-5" />,                    
                         data: sortType
                       }
                     }}
                     onSortChange={(type) => handleSortChange(type)}
                       onActivityChange={(type) => handleActivityChange(type)}
                        isDataEmpty={
                          Object.keys(orgActivity?.data || {}).length > 0
                            ? true
                            : false
                        }
                        data={orgActivity?.data}
                        height={'380px'}
                        isLoading={orgActivity.loading}
                      />
                </div>
                <div className="h-full w-full  ">
                        <EventsCard
                          headerContent={{title: "Alert"}}
                          isDataEmpty={
                            Object.keys(orgAlerts?.data?.Notifications || {})
                              .length > 0
                          }
                          className="h-full"
                          isLoading={orgAlerts.loading}
                          data={orgAlerts?.data?.Notifications}
                          height={'380px'}
                        />
                </div>
              </div>
            </div>
            <div className=" grid w-full grid-cols-1 justify-between gap-6 lg:grid-cols-2 lg:gap-10">
              <div className=" w-full ">
                <MultipleBarChartGraph
                  headerContent={{ title: "User performance comparison", toolTip: "Denotes no. of code lines changed vs average score for the period selected" }}
                  isDataEmpty={userPerformance.data.length}
                  data={userPerformance.data}
                  xAxisDataKey={'username'}
                  firstBarDataKey={'additions'}
                  secondBarDataKey={'totalAvgScore'}
                  thirdBarDataKey={'deletions'}
                  isLoading={userPerformance.loading}
                />
              </div>
              <div className="w-full">
                <LabelBarChartGraph
                  headerContent={{ title: "Average user score", toolTip: "Denotes average score of users for the period selected" }}
                  isDataEmpty={userPerformance.data.length}
                  data={userPerformance.data}
                  toolTipKey='Average Score'
                  xAxisDataKey={'username'}
                  BarDataKey={'avgScore'}
                  isLoading={userPerformance.loading}
                />
              </div>
            </div>
            <AreaGraph
              headerContent={{ title: 'Overall repository performance trends' }}
              isDataEmpty={Object.keys(repoAvgScoreChart.data)?.length}
              data={repoAvgScoreChart?.data}
              onChange={handleRepoAreaChart}
              graphTitle={`Performance trends for repositories in ${orgName?.login}`}
              graphDescription={
                'Select the time range below to compare average performance scores'
              }
              loading={repoAvgScoreChart?.loading}
            />
            {Object.keys(orgHeatMap.data || {}).length > 0 && (
              <div className="w-full">
                <HeatGraph
                  headerContent={{ title: "GitHub Contribution Heatmap", toolTip: "Commit heatmap" }}
                  data={orgHeatMap.data}
                  monthNames={monthNames}
                  hDays={['M', 'W', 'F']}
                  borderRadius={3}
                  hoverColor="#999"
                  loading={orgHeatMap.loading}
                />
              </div>
            )}
          </div>
        ) : (
          <NoDataAvailable />
        )}
    </div>
  );
});
Organizations.displayName = 'Organizations';
export default Organizations;
