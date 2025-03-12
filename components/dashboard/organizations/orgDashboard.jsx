import React, {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import { Dropdown } from '@/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGitOrgRequest } from '@/redux/actions/gitOrgAction';
import {
  orgOverviewCardsData,
  orgCardData,
  organizationOverview,
  allowedKeysData
} from '@/constants/data';
import { DateRangePicker } from '../overview/dateRangePicker';
import NoDataAvailable from '../overview/noDataAvailable';
import {
  orgActivityRequest,
  orgAlertsRequest,
  orgHeatMapRequest,
  orgOverviewRequest,
  repoAvgScoreChartRequest,
  userPerformanceChartRequest
} from '@/redux/actions/orgDashboardAction';
import { Skeleton } from '@/components/ui/skeleton';
import { LabelBarChartGraph } from '@/components/Graphs/LabelBarChartGraph';
import {
  BarChartSkeleton,
  HeatmapSkeleton,
  OverviewCardSkeleton,
  EventsCardSkeleton
} from '@/components/dashboard/repositories/CustomSkeletons';
import { useMetadata } from '@/context/MetadataContext';
import {
  fetchGlobalConfigRequest,
  setTimeRangeData
} from '@/redux/actions/globalAction';
import { useRouter, useSearchParams } from 'next/navigation';
import OverviewCards from '@/components/cards/overviewCards';

const Organizations = forwardRef((props, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTitle } = useMetadata();
  const dispatch = useDispatch();
  const { gitOrgs, loading } = useSelector((state) => state.gitOrg);
  const {
    orgOverview,
    userPerformance,
    repoAvgScoreChart,
    orgHeatMap,
    error,
    orgActivity,
    orgAlerts
  } = useSelector((state) => state.orgDashboardData);
  const { globalConfigData } = useSelector((state) => state.globalData);
  const [orgId, setOrgId] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [areaChartRange, setAreaChartRange] = useState(null);
  const [selectorData, setSelectorData] = useState({
    activityType: null,
    sort: null
  });
  const [defaultOrgName, setDefaultOrgName] = useState('');

  useImperativeHandle(ref, () => ({
    handleRefresh
  }));

  const handleRepoAreaChart = (range) => {
    if (range !== areaChartRange && range) {
      setAreaChartRange(range);
    }
  };

  useEffect(() => {
    const orgName = gitOrgs?.find((item) => item?.id === orgId);
    if (areaChartRange && orgName) {
      dispatch(repoAvgScoreChartRequest(orgName?.login, areaChartRange));
    }
  }, [areaChartRange]);

  useEffect(() => {
    if (orgId) {
      const orgName = gitOrgs?.find((item) => item?.id === orgId);

      dispatch(
        orgActivityRequest(
          orgName?.login,
          selectorData?.activityType,
          selectorData?.sort,
          dateRange
        )
      );
    }
  }, [orgId, dateRange, selectorData]);
  const handleRefresh = useCallback(() => {
    if (!orgId) return;
    const orgName = gitOrgs?.find((item) => item?.id === orgId);
    if (orgName) {
      if (dateRange) {
        dispatch(orgOverviewRequest(orgName?.login, dateRange));
        dispatch(userPerformanceChartRequest(orgName?.login, dateRange));
        dispatch(orgHeatMapRequest(orgName?.login));
        dispatch(
          orgActivityRequest(
            orgName?.login,
            selectorData?.activityType,
            selectorData?.sort,
            dateRange
          )
        );
        dispatch(orgAlertsRequest(orgName?.login, dateRange));
      } else {
        dispatch(fetchGlobalConfigRequest());
        dispatch(orgOverviewRequest(orgName?.login));
        dispatch(orgActivityRequest(orgName?.login));
        dispatch(userPerformanceChartRequest(orgName?.login));
        dispatch(orgHeatMapRequest(orgName?.login));
        dispatch(
          orgActivityRequest(
            orgName?.login,
            selectorData?.activityType,
            selectorData?.sort,
            null
          )
        );
        dispatch(orgAlertsRequest(orgName?.login));
      }
    }
  }, [orgId, dateRange, selectorData]);

  useEffect(() => {
    dispatch(fetchGitOrgRequest());
  }, [dispatch]);

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
    if (orgId) {
      const orgName = gitOrgs?.find((item) => item?.id === orgId);
      if (dateRange) {
        dispatch(orgAlertsRequest(orgName?.login, dateRange));
      } else {
        dispatch(orgAlertsRequest(orgName?.login));
      }
    }
  }, [dispatch, orgId, dateRange]);

  useEffect(() => {
    const orgName = gitOrgs?.find((item) => item?.id === orgId);
    if (orgName) {
      setTitle(`${orgName?.login} | Organization Dashboard`);
    } else {
      setTitle('Git Vector');
    }
    if (orgName) {
      if (dateRange) {
        dispatch(orgOverviewRequest(orgName?.login, dateRange));
        dispatch(userPerformanceChartRequest(orgName?.login, dateRange));
      } else {
        dispatch(orgOverviewRequest(orgName?.login));
        dispatch(fetchGlobalConfigRequest());
        dispatch(userPerformanceChartRequest(orgName?.login));
        dispatch(repoAvgScoreChartRequest(orgName?.login));
        dispatch(orgHeatMapRequest(orgName?.login));
      }
    }
  }, [orgId, dateRange]);

  const orgName = gitOrgs?.find((item) => item?.id === orgId);

  useEffect(() => {
    if (!gitOrgs || gitOrgs.length === 0) {
      return;
    }

    const urlTab = searchParams.get('tab');
    const urlOrgId = searchParams.get('orgId');

    const orgName = gitOrgs.find((item) => item.id == urlOrgId); // Ensure type match

    if (urlTab === 'organizations' && orgName) {
      setDefaultOrgName(orgName?.login);
      setOrgId(urlOrgId);
    }
  }, [searchParams, gitOrgs]);

  const handleOrgChange = (id) => {
    setOrgId(id);
    if (id) {
      router.push(`/dashboard?tab=organizations&orgId=${id}`);
    } else {
      router.push(`/dashboard?tab=organizations`);
    }
  };

  const DateChange = (range) => {
    setDateRange(range);
  };
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
  const getLinesChanged = (item) => {
    return (
      <h1 className="flex flex-col  text-sm font-semibold text-green-700">
        +{orgOverview.data[item].additions}{' '}
        <span className="text-red-700">
          -{orgOverview.data[item].deletions}
        </span>
      </h1>
    );
  };

  function deepFilter(obj) {
    function hasInvalidValue(val) {
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).some(hasInvalidValue);
      }
      return val === 'N/A' || val === null;
    }

    return Object.entries(obj)
      .filter(([_, val]) => {
        if (typeof val === 'object' && val !== null) {
          return (
            !hasInvalidValue(val) && Object.keys(deepFilter(val)).length > 0
          );
        }

        return val !== 'N/A' && val !== null;
      })
      .reduce((acc, [key, val]) => {
        if (typeof val === 'object' && val !== null && val !== 'N/A') {
          acc[key] = deepFilter(val);
        } else {
          acc[key] = val;
        }
        return acc;
      }, {});
  }

  const cleanedData = deepFilter(orgOverview?.data);
  const mergedData = { ...cleanedData, ...organizationOverview };

  const keysOfInterest = (allowedKeys) => {
    const result = Object.keys(cleanedData).filter((item) =>
      allowedKeys.includes(item)
    );
    return result;
  };
  return (
    <div className="flex w-full  flex-col gap-6 pb-10 pt-2 ">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center  md:justify-end lg:justify-between">
        <div className="grid w-full grid-cols-1 gap-4  lg:w-3/5 lg:grid-cols-2 lg:gap-10">
          <Dropdown
            title={'Organization'}
            data={gitOrgs}
            loading={loading}
            placeholder={'Select organization'}
            onChange={handleOrgChange}
            defaultValue={defaultOrgName}
          />
          <DateRangePicker
            disabled={disabled}
            showTitle={true}
            onChange={DateChange}
          />
        </div>
      </div>
      {!error.message && orgId ? (
        <>
          {orgOverview.loading ? (
            <OverviewCardSkeleton numberOfCards={5} />
          ) : (
            orgOverview?.data && (
              <OverviewCards
              isDataEmpty={Object.keys(cleanedData).length > 0}
                getStaticData={true}
                staticData={orgOverviewCardsData}
                plainKey={[
                  'connectedRepos',
                  'mergePullRequest',
                  'closedPullRequests'
                ]}
                total={{
                  key: 'activeUsersData',
                  value: cleanedData.activeUsersData?.totalUsers
                }}
                radialChart={['activeUsersData', 'averageCodeQuality']}
                allowedKeys={getAllowedKeys(
                  allowedKeysData?.orgOveriew,
                  'activeUsersData'
                )}
                data={mergedData}
                specialKey={{ key: 'activeUsersData', value: 'activeUsers' }}
                specialValue="activeUsers"
              />
            )
          )}
        </>
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
});

Organizations.displayName = 'Organizations';

export default Organizations;
