import { FilterDropdown } from '../../overview/filterDropdown';
import NoDataAvailable from '../../overview/noDataAvailable';
import { EventsCardSkeleton } from '../../repositories/CustomSkeletons';
import EventCardComponent from './eventCard.jsx';
import WeeklyRangeDatePicker from '@/components/dashboard/overview/WeeklyRangeDatePicker';

export default function EventsCard({
  loading,
  headerContent,
  title,
  isDataEmpty,
  data,
  paddingBottom,
  height,
  onActivityChange,
  onSortChange,
  onWeekChange
}) {
  const groupedData = (data || []).reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const groupedArray = Object.keys(groupedData).map((key) => ({
    day: key,
    list: groupedData[key]
  }));
  const handleActivityChange = (type) => {
    onActivityChange(type);
  };
  const handleSortChange = (type) => {
    onSortChange(type);
  };
  const handleWeekChange = (range) => {
    onWeekChange(range);
  }
  return (
    <div
      style={{ height: height }}
      className="h-full w-full gap-5 rounded-lg border  py-4  shadow-md lg:h-full dark:border-2 "
    >
      {title && (
        <h1
          className="text-lg font-medium"
          style={{ paddingBottom: paddingBottom || '8px' }}
        >
          {title}
        </h1>
      )}

      <div className="flex h-full w-full flex-col  px-4">
        {headerContent && (
          <div className="flex flex-col gap-1 pt-1 pb-2">
            <h1 className="text-lg font-medium">{headerContent?.title}</h1>
            {headerContent?.activityDropDown && headerContent?.sortDropDown && (
              <div className="flex w-full flex-col gap-4 md:flex-row">
                <FilterDropdown
                  placeholder={headerContent?.activityDropDown?.placeholder}
                  icon={headerContent?.activityDropDown?.icon}
                  data={headerContent?.activityDropDown?.data}
                  onChange={(type) => handleActivityChange(type)}
                />
                <FilterDropdown
                  placeholder={headerContent?.sortDropDown?.placeholder}
                  icon={headerContent?.sortDropDown?.icon}
                  data={headerContent?.sortDropDown?.data}
                  onChange={(type) => handleSortChange(type)}
                />
              </div>
            )}
            {headerContent?.dateRangeDropDown && (
              <div className="w-full lg:w-auto lg:pb-2 xl:w-1/2">
                <WeeklyRangeDatePicker
                  disabled={headerContent?.disabled}
                  showTitle={headerContent?.showTitle}
                  onChange={handleWeekChange}
                />
              </div>
            )}
          </div>
        )}
        <div style={{ height: height }} className='h-full w-full overflow-y-auto'>
        {loading ? (
          <EventsCardSkeleton size="small" />
        ) : isDataEmpty ? (
          groupedArray?.map((group, index) => (
            <EventCardComponent key={index} item={group} />
          ))
        ) : (
          <NoDataAvailable />
        )}
        </div>
      </div>
    </div>
  );
}
