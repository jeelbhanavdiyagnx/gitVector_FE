'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export function TopCodeMetrics() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        Top 10 Code Metrics Every Developer Should Track in Their Git
        Repositories
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        Tracking key code metrics is essential for maintaining high-quality,
        efficient, and secure code. Learn the top 10 metrics to monitor with Git
        Analysis.
        <Link href="/resources/parameters" className='flex items-center gap-1'>
          Read more <FaArrowRight />
        </Link>
      </p>
    </div>
  );
}

export function TopCodeMetricsContent() {
  return (
    <div className="mx-auto space-y-4 px-4 mb-16">
      <p>
        Monitoring the quality of your code is essential for both personal and
        team development. <span className="font-semibold">Git Analysis</span>{' '}
        provides a comprehensive breakdown of key metrics every developer should
        track. These metrics help ensure that code is clean, efficient, and
        secure. Let&apos;s take a look at the top 10 metrics to keep an eye on.
      </p>

      <ol className="space-y-2">
        <li>
          <span className="font-semibold">1. Code Quality:</span>
          <span>
            {' '}
            This evaluates the overall cleanliness and efficiency of the code.
            High-quality code is easier to maintain and less prone to bugs.
          </span>
        </li>

        <li>
          <span className="font-semibold">2. Code Complexity:</span>
          <span>
            {' '}
            Complex code is harder to debug and maintain. Keeping complexity low
            ensures that the code is more readable and easier to work with.
          </span>
        </li>

        <li>
          <span className="font-semibold">3. Readability:</span>
          <span>
            {' '}
            If your code isn&apos;t easy to read, it can create barriers for
            collaboration. Proper naming conventions, spacing, and documentation
            improve readability.
          </span>
        </li>

        <li>
          <span className="font-semibold">4. Best Practices:</span>
          <span>
            {' '}
            Ensuring that your code follows industry best practices, such as DRY
            (Don&apos;t Repeat Yourself) principles, helps keep your project
            maintainable.
          </span>
        </li>

        <li>
          <span className="font-semibold">5. Performance:</span>
          <span>
            {' '}
            This metric assesses how efficiently your code runs. Git Analysis
            identifies resource-hungry areas of the codebase that could benefit
            from optimization.
          </span>
        </li>

        <li>
          <span className="font-semibold">6. Security Practices:</span>
          <span>
            {' '}
            Ensuring the code is secure is crucial, especially in web
            development. Regular checks for vulnerabilities like SQL injection
            or insecure authentication are key.
          </span>
        </li>

        <li>
          <span className="font-semibold">7. Testing Coverage:</span>
          <span>
            {' '}
            A good codebase includes thorough unit and integration testing. Git
            Analysis tracks how much of your code is covered by tests,
            identifying gaps that need attention.
          </span>
        </li>

        <li>
          <span className="font-semibold">8. Code Structure:</span>
          <span>
            {' '}
            A well-structured codebase makes it easy to add new features and fix
            bugs without causing disruptions in other parts of the project.
          </span>
        </li>

        <li>
          <span className="font-semibold">9. Documentation Quality:</span>
          <span>
            {' '}
            Proper documentation ensures that others can understand and
            contribute to your project easily. It&apos;s vital for both internal
            teams and external collaborators.
          </span>
        </li>

        <li>
          <span className="font-semibold">10. Problem-Solving Skills:</span>
          <span>
            {' '}
            Finally, Git Analysis tracks how effectively a developer solves
            coding challenges, particularly in implementing efficient algorithms
            and creative solutions.
          </span>
        </li>
      </ol>

      <p>
        By keeping an eye on these metrics, developers can continuously improve
        their craft and contribute to a healthier, more sustainable codebase.
      </p>
    </div>
  );
}
