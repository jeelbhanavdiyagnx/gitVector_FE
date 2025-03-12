import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BranchCards } from '@/components/BranchCards/CommitScores';
import NoDataAvailable from '@/components/dashboard/overview/noDataAvailable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate, formatDateToIST } from '@/components/utils/helper.js';
import Scores from '@/components/Branch/Scores';
import CommitClassification from '@/components/Branch/CommitClassification';
import Image from 'next/image';
import viewCode from '@/components/assets/view-code.svg';
import { fetchCommitReviewRequest } from '@/redux/actions/commitReviewAction';

export default function CommitList({ repo, user, type, sort }) {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.commitReviews);
  const { branches: allBranches } = useSelector((state) => state.branch);
  const { pagination } = useSelector((state) => state.commitReviews);
  const { user:userData } = useSelector((state) => state.auth);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { data } = useSelector((state) => state.gitUser);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  useEffect(() => {
    dispatch(
      fetchCommitReviewRequest(
        repo,
        user || null,
        type || null,
        sort || null,
        skip
      )
    );
  }, [dispatch, skip]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 1 && !loading) {
      setSkip(() => {
        const nextSkip = pagination.skip + limit;
        // Only update skip if nextSkip is within bounds
        if (nextSkip < pagination.total) {
          return nextSkip;
        }
        // Otherwise, return the current skip value to prevent updates
        return pagination.skip;
      });
    }
  };
  useEffect(() => {
    setSelectedReview(reviews?.[0]);
    setSelectedReviewId(reviews?.[0]?._id);
  }, [reviews]);

  if (loading && !reviews?.length)
    return (
      <div className="flex items-center justify-center pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  if (!reviews?.length) return <NoDataAvailable />;

  return (
    <div className="flex h-screen w-full gap-6 px-4 py-2">
      {/* Reviews Table Card */}
      <Card className="h-[calc(100vh-18rem)] w-full sm:w-1/2 ">
        <ScrollArea className="h-[calc(99vh-18rem)]" onScroll={handleScroll}>
          <CardContent className="p-0">
            {reviews.map((review, index) => {
              const userData = data.find((item) => item._id === review.gitUser);
              return (
                <Card
                  key={index}
                  className="cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:scale-100"
                  onClick={() => {
                    setSelectedReview(review);
                    setSelectedReviewId(review._id);
                  }}
                >
                  <CardContent
                    key={review._id}
                    className={`py-0 ${selectedReviewId === review._id
                      ? 'bg-[#E5E7EB] dark:bg-[#f3f182]'
                      : ''
                      }`}
                  >
                    <div className="w-full">
                      {/* First Line: Author info and overview score */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center space-x-1 text-sm font-medium">
                          {/* Avatar */}
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={
                                userData?.avatar_url ||
                                userData?.user?.avatarUrl ||
                                'https://via.placeholder.com/150'
                              }
                              alt={userData?.login || 'Fallback'}
                            />
                            <AvatarFallback>
                              {userData?.login || '-'}
                            </AvatarFallback>
                          </Avatar>

                          {/* Author name */}
                          <span>{review.commit.author.name}</span>

                          <span>committed</span>

                          {/* Date with tooltip */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                {formatDate(review.commit.author.date)}
                              </TooltipTrigger>
                              <TooltipContent className='bg-white text-[#71717A]'>
                                <p>
                                  {formatDateToIST(review.commit.author.date)}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Commit Classification */}
                          <span className="flex items-center px-1">
                            {review.commitClassification && (
                              <CommitClassification
                                Tooltip={true}
                                type={review.commitClassification}
                              />
                            )}
                          </span>
                        </div>

                        {/* Overview score */}
                        <div>
                          <span className="inline-flex items-center justify-center py-1 pl-2.5 text-sm font-medium">
                            Overview score:{' '}
                            {review?.review?.overview_summary?.final_score ??
                              '-'}
                          </span>
                        </div>
                      </div>

                      {/* Second Line: Commit message and scores */}
                      <div className="flex items-center justify-between ">
                        <div className="flex-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="line-clamp-1 h-auto w-full justify-start py-0 pl-1 pr-0 text-left text-xs font-medium text-[#71717A]">
                                  {review.commit.message.length > 50
                                    ? `${review.commit.message.substring(
                                      0,
                                      50
                                    )}...`
                                    : review.commit.message}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className='bg-white text-[#71717A]'>
                                {review.commit.message}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Scores section */}
                        <div className="flex items-center space-x-2 text-xs">
                          <Scores review={review} />
                        </div>
                      </div>

                      {/* Third Line: Branches, view code button, and stats */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center space-x-2">
                          {/* Branches */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span>
                                  {review.branches.map((branch) => {
                                    const matchingBranch = allBranches.find(
                                      (b) => b._id === branch
                                    );
                                    return (
                                      <span
                                        key={branch}
                                        className="mr-2 rounded-lg bg-[#DDF4FF] pb-[3px] pl-[6px] pr-[6px] pt-[3px] text-xs"
                                      >
                                        {matchingBranch
                                          ? matchingBranch.name
                                          : 'Unknown Branch'}
                                      </span>
                                    );
                                  })}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className='bg-white text-[#71717A]'>
                                {review.branches.length > 1
                                  ? 'Branches'
                                  : 'Branch name'}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* View Code Button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    window.open(review.html_url, '_blank')
                                  }
                                >
                                  <Image
                                    src={viewCode}
                                    alt="View code"
                                    width={20}
                                    height={20}
                                  />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className='bg-white text-[#71717A]'>View code</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-1 text-xs">
                          <span className="font-medium">
                            {review?.files?.length || 0} file
                            {review?.files?.length === 1 ? '' : 's'}
                          </span>
                          <span className="font-medium text-green-700">
                            +{review?.stats?.additions}
                          </span>
                          <span className="font-medium text-red-700">
                            -{review?.stats?.deletions}
                          </span>
                          <span className="font-medium">lines</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {loading && (
              <div className="flex items-center px-5 py-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
      {/* Branch Cards Section */}
      <div className="h-[calc(100vh-16rem)] w-full sm:w-1/2">
        <ScrollArea className="h-[calc(100vh-18rem)]">
          <BranchCards review={selectedReview} />
        </ScrollArea>
      </div>
    </div>
  );
}
