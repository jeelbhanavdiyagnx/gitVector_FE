import React, { useEffect, useRef, useState } from 'react';
import { createGitgraph, templateExtend } from '@gitgraph/js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesRequest } from '@/redux/actions/branchActions';
import { fetchCommitReviewRequest } from '@/redux/actions/commitReviewAction';
import { BranchCards } from '@/components/BranchCards/CommitScores';
import NoDataAvailable from '@/components/dashboard/overview/noDataAvailable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Branch = ({ repositoryId, userId }) => {
  const graphContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedReview, setSelectedReview] = useState(null);
  const [htmlUrl, setHtmlUrl] = useState(null)
  const { branches } = useSelector((state) => state.branch);
  const { reviews, loading } = useSelector((state) => state.commitReviews);

  useEffect(() => {
    if (repositoryId || userId) {
      dispatch(fetchCommitReviewRequest(repositoryId, userId));
      dispatch(fetchBranchesRequest(repositoryId));
    }
  }, [repositoryId, userId, dispatch]);
  useEffect(() => {
    dispatch(fetchCommitReviewRequest(null, null, null));
  }, []);

  useEffect(() => {
    if (
      !Array.isArray(branches) ||
      branches.length === 0 ||
      !Array.isArray(reviews) ||
      reviews.length === 0
    ) {
      return;
    }
    function renderCommitMessage(message, maxLength = 50) {
      if (message.length > maxLength) {
        return `${message.slice(0, maxLength - 3)}...`;
      }
      return message;
    }
    const graphContainer = graphContainerRef.current;
    if (!graphContainer) return;

    graphContainer.innerHTML = '';

    const options = {
      template: templateExtend('metro', {
        colors: [
          '#2563eb',
          '#1660ce',
          '#103b7c',
          '#059659',
          '#093372'
        ],
        branch: {
          lineWidth: 1, spacing: 10, label: {
            position: "top",
            borderRadius: 2,
            font: 'normal 8pt Arial',
          },
        },
        commit: {
          dot: { size: 4 },
          message: {
            display: true,
            displayAuthor: false,
            displayHash: false,
            font: 'normal 10pt Arial',
          },
          spacing: 30,
        }
      }),
      orientation: ''
    };

    const gitgraph = createGitgraph(graphContainer, options);

    const branchMap = {};
    const branchIdToName = {};
    branches.forEach((branch) => {
      branchMap[branch._id] = gitgraph.branch(branch.name);
      branchIdToName[branch._id] = branch.name;
    });

    reviews.forEach((commit) => {
      const {
        branches: commitBranches,
        commit: commitData,
        review,
        html_url
      } = commit;

      if (commitBranches.length === 1) {
        const branchId = commitBranches[0];
        if (branchMap[branchId]) {
          branchMap[branchId].commit({
            subject: renderCommitMessage(commitData.message, 50),
            onClick: () => { setHtmlUrl(html_url); setSelectedReview(review) },
            onMessageClick: () => setSelectedReview(review),
            onMouseOver: () => {
              event.target.style.cursor = 'pointer';
            }
          });
        }
      } else if (commitBranches.length > 1) {
        const [baseBranchId, ...mergeBranchIds] = commitBranches;
        const baseBranch = branchMap[baseBranchId];

        if (baseBranch) {
          const mergeMessage = renderCommitMessage(commitData.message, 50) || "Merge Commit";
          const mergeCommit = baseBranch.commit({
            subject: mergeMessage,
            onClick: () => { setHtmlUrl(html_url); setSelectedReview(review) },
            onMessageClick: () => setSelectedReview(review),
            onMouseOver: () => {
              event.target.style.cursor = 'pointer';
            }
          });

          mergeBranchIds.forEach((mergeBranchId) => {
            const mergeBranch = branchMap[mergeBranchId];
            if (mergeBranch) {
              const baseBranchName =
                branchIdToName[baseBranchId] || baseBranchId;
              mergeBranch.merge(mergeCommit, `Merged into ${baseBranchName}`);
            }
          });
        }
      }
    });
  }, [branches, reviews, repositoryId]);
  return (
    <div className="flex w-full flex-col gap-4 pb-16 sm:flex-row">
      {loading ? (
        <div className="w-full h-[50vh] sm:h-auto flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      ) : reviews.length && branches.length ? (
        <>
          <Card className="w-full shadow-sm sm:w-1/2">
            <CardHeader>
              <div>Click on the commit dot to see analyses</div>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[2500px] w-full">
                <div
                  className="w-full pr-4"
                  id="graph-container"
                  ref={graphContainerRef}
                ></div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="w-full sm:w-1/2">
            <BranchCards review={selectedReview} htmlUrl={htmlUrl} />
          </div>
        </>
      ) : (
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <NoDataAvailable />
        </div>
      )}
    </div>
  );
};
export default Branch;
