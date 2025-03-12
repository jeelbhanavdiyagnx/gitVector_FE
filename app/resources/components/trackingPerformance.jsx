'use client';
import React from 'react';

import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export function TrackingDeveloperPerformance() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        Tracking Developer Performance with AI: The Role of Git Analysis in Team
        Management
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        Git Analysis uses AI to offer objective insights into developer
        performance, making tracking progress easier for team managers. See how
        it helps teams.
        <Link href="/resources/developerPerformance" className='flex items-center gap-1'>
          Read more <FaArrowRight />
        </Link>
       </p> 
    </div>
  );
}

export function TrackingDeveloperPerformanceContent() {
  return (
    <div className="mx-auto space-y-4 px-4">
      <p>
        One of the biggest challenges in software development is assessing and
        managing developer performance effectively. Manual performance reviews
        can be subjective, and traditional metrics often fail to provide a
        holistic picture of a developer&apos;s contributions. That&apos;s where{' '}
        <span className="font-semibold">Git Analysis</span>, an AI-driven tool,
        steps in to fill the gap.
      </p>

      <h3 className="text-lg font-semibold">
        How Git Analysis Tracks Developer Performance
      </h3>
      <p>
        Git Analysis provides{' '}
        <span className="font-semibold">real-time insights</span> into developer
        performance by automatically analyzing their code contributions across
        key metrics such as <span className="font-semibold">code quality</span>,{' '}
        <span className="font-semibold">security</span>, and{' '}
        <span className="font-semibold">problem-solving skills</span>. This
        eliminates the guesswork, giving team managers data-driven insights to
        evaluate developers accurately.
      </p>

      <ol className="space-y-2">
        <li>
          <span className="font-semibold">
            1. Objective Performance Metrics:
          </span>
          <span>
            {' '}
            The AI generates scores for each developer based on their
            contributions, giving managers clear data points for evaluations.
            These scores are updated regularly as new commits are made,
            providing ongoing feedback.
          </span>
        </li>

        <li>
          <span className="font-semibold">2. Timeframe-Based Reporting:</span>
          <span>
            {' '}
            Git Analysis allows managers to filter performance data by
            timeframe, such as last week, last month, or the last six months.
            This helps track developer progress over time and spot trends in
            their performance.
          </span>
        </li>

        <li>
          <span className="font-semibold">
            3. Identifying Strengths and Weaknesses:
          </span>
          <span>
            {' '}
            With AI-powered insights, managers can identify specific areas where
            developers excel or struggle. This allows for targeted feedback and
            personalized training plans, ensuring continuous growth for each
            team member.
          </span>
        </li>
      </ol>

      <p>
        In today&apos;s data-driven world, Git Analysis enables managers to track
        developer performance more efficiently, providing a clear path for team
        members to improve and grow their skills.
      </p>
    </div>
  );
}
