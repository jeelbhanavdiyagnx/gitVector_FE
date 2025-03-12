import React from 'react';
import CardComponent from '@/components/BranchCards/cardCompoent';

export const BranchCards = ({review}) => {
  if (!review) {
    return <div className='flex justify-center items-center h-[400px]'>
      Select a commit to view its review details.</div>;
  }
  const transformReviewToArray = (review) => {
    const result = [];
    for (const category in review) {
      const metrics = review[category];
      if (typeof metrics === "object" && !Array.isArray(metrics)) {
        const transformedMetrics = [];
        for (const metric in metrics) {
          const metricData = metrics[metric];
          if (typeof metricData === "object" && metricData !== null) {
            transformedMetrics.push({
              metric,
              ...metricData,
            });
          } else {
            transformedMetrics.push({
              metric,
              value: metricData,
            });
          }
        }
        result.push({
          category,
          metrics: transformedMetrics,
        });
      } else {
        result.push({
          category,
          metrics,
        });
      }
    }
    const overviewIndex = result.findIndex(item => item.category === 'overview_summary');
    if (overviewIndex !== -1) {
      const [overviewItem] = result.splice(overviewIndex, 1); 
      result.unshift(overviewItem);
    }

    return result;
  };
  const transformedReview = transformReviewToArray(review.review);
  return (
    <>
      {review?.review?.status !=="Error" ? <>
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-2 px-2 pb-6">
          {transformedReview.map((item, index) => (
            <CardComponent
              key={index}
              item={item}
              commitMessage={review.commit.message}
            />
          ))}
        </div></> :
        <p>No analysis available on this commit</p>}

    </>
  );
};
