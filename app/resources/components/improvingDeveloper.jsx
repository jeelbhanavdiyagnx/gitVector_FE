'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export function ImprovingDeveloperSkills() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        Improving Developer Skills with Git Analysis: A Guide to Personal Code
        Insights
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        Git Analysis provides developers with personalized feedback to improve
        code quality and problem-solving skills. Explore how it helps you grow
        and learn.   
         <Link href="/resources/developerSkills" className='flex items-center gap-1'>
        Read more <FaArrowRight />
        </Link>
      </p>
    </div>
  );
}

export function ImprovingDeveloperSkillsContent() {
  return (
    <div className="mx-auto space-y-4 px-4">
      <p>
        For developers, growth is all about learning and improving skills. But
        understanding where you stand and which areas need improvement can be
        challenging. <span className="font-semibold">Git Analysis</span> makes
        it easier by offering{' '}
        <span className="font-semibold">personalized code insights</span> based
        on your specific contributions.
      </p>

      <h3 className="text-lg font-semibold">
        How Git Analysis Helps Developers Improve
      </h3>
      <p>
        Git Analysis uses AI to analyze individual commits and provide
        actionable feedback on key areas like{' '}
        <span className="font-semibold">code readability</span>,{' '}
        <span className="font-semibold">complexity</span>, and{' '}
        <span className="font-semibold">security practices</span>. Here&apos;s how
        developers can use these insights to continuously grow their skill set:
      </p>

      <ol className="space-y-2">
        <li>
          <span className="font-semibold">1. Personalized Code Reviews:</span>
          <span>
            {' '}
            Each time you commit code, Git Analysis provides feedback on areas
            like function length, naming conventions, and best practices. This
            continuous feedback loop helps developers learn as they go, rather
            than waiting for a manual review.
          </span>
        </li>

        <li>
          <span className="font-semibold">
            2. Score Tracking for Continuous Improvement:
          </span>
          <span>
            {' '}
            Git Analysis generates a score for each parameter (e.g., code
            quality, security). Over time, you can track your progress and see
            which areas are improving and which still need attention.
          </span>
        </li>

        <li>
          <span className="font-semibold">3. Guided Problem-Solving:</span>
          <span>
            {' '}
            By analyzing your past solutions, Git Analysis offers insights into
            how effectively you solve coding challenges. It suggests alternative
            approaches to improve efficiency or security, helping you become a
            more well-rounded developer.
          </span>
        </li>
      </ol>

      <p>
        Whether you&apos;re looking to improve specific skills or just track your
        overall progress, Git Analysis provides developers with the insights
        needed to continually grow and improve.
      </p>
    </div>
  );
}
