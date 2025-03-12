import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BranchCards } from '@/components/BranchCards/CommitScores';
import NoDataAvailable from '@/components/dashboard/overview/noDataAvailable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronUp } from 'lucide-react';
import { formatDate } from '@/components/utils/helper.js';
import Scores from '@/components/Branch/Scores';
import CommitClassification from '@/components/Branch/CommitClassification';
import Image from 'next/image';
import viewCode from '@/components/assets/view-code.svg';
import { fetchCommitReviewRequest } from '@/redux/actions/commitReviewAction';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommitListMobile({
  repo,
  user,
  type,
  sort,
  showDropdownOnScroll
}) {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.commitReviews);
  const { branches: allBranches } = useSelector((state) => state.branch);
  const { pagination } = useSelector((state) => state.commitReviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { data } = useSelector((state) => state.gitUser);
  const [skip, setSkip] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // New state
  const limit = 10;

  useEffect(() => {
    dispatch(fetchCommitReviewRequest(repo, user || null, type || null, sort || null, skip));
  }, [dispatch, skip]);

  const handleScroll = (e) => {
    if (showDropdownOnScroll) {
      showDropdownOnScroll(false);
    }
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // Show or hide "Scroll to Top" button
    setShowScrollToTop(scrollTop > 100);

    if (scrollTop === 0) {
      showDropdownOnScroll(true);
    }

    if (scrollHeight - scrollTop <= clientHeight + 1 && !loading) {
      setSkip(() => {
        const nextSkip = pagination.skip + limit;
        if (nextSkip < pagination.total) {
          return nextSkip;
        }
        return pagination.skip;
      });
    }
  };

  const scrollToTop = () => {
    const scrollArea = document.querySelector(
      '.scroll-area [data-radix-scroll-area-viewport]'
    );
    if (scrollArea) {
      scrollArea.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (loading && !reviews?.length)
    return (
      <div className="flex justify-center pt-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  if (!reviews?.length) return <NoDataAvailable />;

  return (
    <div className="w-full max-w-full">
      <div className="relative flex min-h-screen flex-col">
        {/* List View */}
        <div
          className={`absolute w-full transition-transform duration-300 ease-in-out ${
            showDetails ? 'translate-x-[-100%]' : 'translate-x-0'
          }`}
        >
          <h2 className="flex items-center justify-between px-4 py-3 text-base font-semibold md:px-6 md:text-lg">
            Select the commit to review
          </h2>
          <ScrollArea
            className="scroll-area h-[calc(100vh-9rem)] md:h-[calc(100vh-13rem)]"
            onScroll={handleScroll}
          >
            <div className="px-2 py-2 pb-10 md:px-4 lg:px-6">
              {reviews.map((review) => {
                const userData = data.find(
                  (item) => item._id === review.gitUser
                );
                return (
                  <Card
                    key={review._id}
                    className="mb-2 shadow-md"
                    onClick={() => {
                      setSelectedReview(review);
                      setShowDetails(true);
                      if (showDropdownOnScroll) {
                        showDropdownOnScroll(false);
                      }
                    }}
                  >
                    <CardContent className="p-3 md:p-4 lg:p-6">
                      <div className="flex flex-col gap-3">
                        {/* First Row: Author info and classification */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 md:h-10 md:w-10">
                              <AvatarImage
                                src={
                                  userData?.avatar_url ||
                                  userData?.user?.avatarUrl ||
                                  'https://via.placeholder.com/150'
                                }
                                alt={userData?.login || 'Fallback'}
                              />
                              <AvatarFallback>
                                {userData?.login?.charAt(0)?.toUpperCase() ||
                                  '-'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium md:text-base">
                                {review.commit.author.name}
                              </span>
                              <span className="text-xs text-muted-foreground md:text-sm">
                                {formatDate(review.commit.author.date)}
                              </span>
                            </div>
                            {review.commitClassification && (
                              <CommitClassification
                                type={review.commitClassification}
                                className="text-xs md:text-sm"
                              />
                            )}
                          </div>
                          <span className="inline-flex items-center justify-center py-1 pl-2.5 text-base font-medium">
                            {review?.review?.overview_summary?.final_score ??
                              '-'}
                          </span>
                        </div>

                        {/* Second Row: Meta information */}
                        <div className="flex flex-col gap-2 text-xs md:text-sm">
                          <div className="flex flex-row items-center justify-between gap-2">
                            <span className="line-clamp-1 text-sm text-[#71717A] md:text-base">
                              {review.commit.message.length > 30
                                ? `${review.commit.message.substring(0, 30)}...`
                                : review.commit.message}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 md:h-10 md:w-10"
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
                          </div>
                          <Scores review={review} />
                          {/* Third Line: Branches on the left, stats on the right */}
                          <div className="flex flex-row items-center justify-between gap-2">
                            {/* Left: Branches */}
                            <div className="flex flex-wrap gap-2">
                              {review.branches.map((branch) => {
                                const matchingBranch = allBranches.find(
                                  (b) => b._id === branch
                                );
                                return (
                                  <span
                                    key={branch}
                                    className="rounded-lg bg-blue-100 px-2 py-1 text-xs md:text-sm"
                                  >
                                    {matchingBranch
                                      ? matchingBranch.name
                                      : 'Unknown Branch'}
                                  </span>
                                );
                              })}
                            </div>

                            {/* Right: Stats */}
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                {review?.files?.length || 0} file
                                {review?.files?.length > 1 ? 's' : ''}
                              </span>
                              <span className="font-medium text-green-700">
                                +{review?.stats?.additions}
                              </span>
                              <span className="font-medium text-red-700">
                                -{review?.stats?.deletions}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {loading && <Skeleton className="mt-2 h-12 w-full" />}
            </div>
          </ScrollArea>
          {showScrollToTop && (
            <Button
              className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-8 w-8" />
            </Button>
          )}
        </div>

        {/* Details View */}
        <div
          className={`absolute w-full transition-transform duration-300 ease-in-out ${
            showDetails ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        >
          <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-1 md:px-6">
            <Button
              variant="ghost"
              className="mb-2"
              onClick={() => setShowDetails(false)}
            >
              <ChevronLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Back to commits
            </Button>
          </div>
          <ScrollArea className="h-[calc(95vh-9rem)]">
            <div className="px-4 md:px-6">
              <BranchCards review={selectedReview} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
