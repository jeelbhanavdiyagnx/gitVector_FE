'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";


export function AITransformingCodeQuality() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        How AI is Transforming Code Quality Analysis: A Look into Git Analysis
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        AI tools like Git Analysis are reshaping code reviews, providing
        real-time feedback and improving code quality. Discover how it
        revolutionizes software development.     
        <Link href="/resources/codequality" className='flex items-center gap-1'>
         Read more <FaArrowRight />
        </Link>
      </p>
    </div>
  );
}

export function AITransformingCodeQualityContent() {
  return (
    <div className="mx-auto space-y-4 px-4 mb-16">
      <p>
        In today&apos;s fast-paced software development landscape, code quality is
        more important than ever. Traditionally, code quality was assessed
        through manual code reviews, which are time-consuming and prone to human
        error. Enter <span className="font-semibold">Git Analysis</span>, an
        AI-powered tool that is revolutionizing how we assess code quality.
      </p>

      <h3 className="text-lg font-semibold">
        How Git Analysis Uses AI to Improve Code Quality
      </h3>
      <p>
        Git Analysis leverages artificial intelligence to automate the process
        of evaluating code across multiple parameters, such as{' '}
        <span className="font-semibold">code readability</span>,
        <span className="font-semibold">performance</span> and{' '}
        <span className="font-semibold">security practices</span>. By doing so,
        it eliminates the subjectivity that can arise from manual reviews,
        providing consistent and accurate assessments.
      </p>

      <ol className="space-y-2">
        <li>
          <span className="font-semibold">1. Automated Code Reviews:</span>
          <span>
            {' '}
            With AI, Git Analysis can continuously monitor and analyze code as
            it is committed. This allows developers to get real-time feedback
            without waiting for a manual review, ensuring that issues are caught
            early in the development cycle.
          </span>
        </li>

        <li>
          <span className="font-semibold">
            2. Personalized Developer Feedback:
          </span>
          <span>
            {' '}
            The tool provides tailored feedback based on each developer&apos;s
            commits. It identifies areas for improvement, such as where a
            developer might need to enhance readability or optimize performance,
            fostering personal growth and skill development.
          </span>
        </li>

        <li>
          <span className="font-semibold">
            3. Data-Driven Insights for Admins:
          </span>
          <span>
            {' '}
            For admins, Git Analysis offers comprehensive dashboards that
            display a team&apos;s performance over time. The AI categorizes areas
            that require attention, making it easier to track progress and
            identify where additional training or guidance might be needed.
          </span>
        </li>
      </ol>

      <p>
        As AI continues to evolve, tools like Git Analysis will become
        indispensable for maintaining high code standards in development teams,
        allowing developers and managers to focus more on innovation and less on
        error correction.
      </p>
    </div>
  );
}
