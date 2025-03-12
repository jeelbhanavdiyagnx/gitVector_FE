'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export function BestPracticesForVersionControl() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        Best Practices for Version Control: How Git Analysis Can Help Maintain
        High Code Standards
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        Git Analysis ensures your version control stays clean and organized by
        automating checks on code quality, security, and documentation. Discover
        its impact.   
        <Link href="/resources/bestPractices" className='flex items-center gap-1'>
         Read more <FaArrowRight />
        </Link>
      </p>
    </div>
  );
}

export function BestPracticesForVersionControlContent() {
  return (
    <div className="mx-auto space-y-4 px-4">
      <p>
        Version control is a critical part of any development project, but
        keeping your repositories clean, organized, and secure can be a
        challenge. <span className="font-semibold">Git Analysis</span> offers
        AI-driven insights that help ensure best practices are followed
        throughout the project lifecycle.
      </p>

      <h3 className="text-lg font-semibold">
        Ensuring Clean Code with Git Analysis
      </h3>
      <p>
        Git Analysis provides real-time feedback on each commit, focusing on
        areas like <span className="font-semibold">code quality</span>,{' '}
        <span className="font-semibold">structure</span>, and{' '}
        <span className="font-semibold">testing</span>. Here&apos;s how it can help
        maintain high standards:
      </p>

      <ol className="space-y-2">
        <li>
          <span className="font-semibold">1. Continuous Code Review:</span>
          <span>
            {' '}
            The AI runs checks for best practices, such as avoiding code
            duplication, ensuring modularity, and following consistent naming
            conventions. This keeps the codebase maintainable and scalable over
            time.
          </span>
        </li>

        <li>
          <span className="font-semibold">2. Security Best Practices:</span>
          <span>
            {' '}
            Git Analysis scans for common vulnerabilities in real-time, helping
            developers patch security risks like injection attacks before they
            become an issue.
          </span>
        </li>

        <li>
          <span className="font-semibold">3. Automated Testing Insights:</span>
          <span>
            {' '}
            The tool tracks test coverage and identifies gaps in unit or
            integration tests, ensuring that your code is fully covered and
            reducing the risk of bugs making it to production.
          </span>
        </li>

        <li>
          <span className="font-semibold">4. Documentation Compliance:</span>
          <span>
            {' '}
            With Git Analysis, you&apos;ll be alerted if parts of your codebase are
            missing documentation. This ensures that the entire team can easily
            understand and maintain the project.
          </span>
        </li>
      </ol>

      <p>
        By automating these checks, Git Analysis ensures that best practices are
        followed consistently, making it easier to maintain high standards in
        your version control workflow.
      </p>
    </div>
  );
}
