'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export function GitAnalysisParameters() {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-medium">
        Understanding Git Analysis Parameters and How They Are Measured
      </h2>
      <p className="text-sm text-gray-500 flex gap-1">
        Git Analysis evaluates key metrics like code quality, complexity, and
        security to provide actionable insights. Learn how these parameters are
        measured to improve your code.
        <Link href="/resources/parameters" className='flex items-center gap-1'>
         Read more <FaArrowRight />
        </Link>
      </p>
    </div>
  );
}

export function GitAnalysisContent() {
  return (
    <div className="mx-auto space-y-6 px-4 mb-16">
      <p>
        Git Analysis is an AI-powered tool designed to provide deep insights
        into the quality of code within Git repositories. It analyzes various
        metrics to evaluate both individual and team performance, enabling
        developers to improve their skills and admins to track overall progress.
        Below, we break down the key parameters Git Analysis focuses on and how
        they are measured.
      </p>
      <h3 className="text-lg font-semibold">1. Code Quality</h3>
      <p>
        Code quality refers to how well-written, maintainable, and efficient the
        code is. Git Analysis examines factors like:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Error rates:</span> Frequency of bugs
          and runtime issues.
        </li>
        <li>
          <span className="font-semibold">Code structure:</span> Adherence to
          industry-standard patterns and clean design.
        </li>
        <li>
          <span className="font-semibold">Maintainability:</span> The ease with
          which the code can be updated or extended.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The AI assesses code
        through static analysis, reviewing syntax, modularity, and comments, and
        compares it to industry best practices.
      </p>

      <h3 className="text-lg font-semibold">2. Code Complexity</h3>
      <p>
        This parameter evaluates how intricate and convoluted the codebase is. A
        high level of complexity can lead to difficult debugging and increased
        chances of errors. Key metrics include:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Cyclomatic complexity:</span> The
          number of independent paths through the code.
        </li>
        <li>
          <span className="font-semibold">Nesting levels:</span> How deep
          control structures (loops, conditionals) go.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The AI calculates
        the number of decision points and control flow paths to quantify the
        complexity score.
      </p>

      <h3 className="text-lg font-semibold">3. Code Readability</h3>
      <p>
        Readability is essential for code collaboration and maintenance. It
        refers to how easy it is for others to understand the code. Factors
        include:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Naming conventions:</span> Are
          variables, functions, and classes intuitively named?
        </li>
        <li>
          <span className="font-semibold">Commenting:</span> Are critical
          sections of code well-documented?
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> Git Analysis
        evaluates adherence to naming conventions, use of whitespace, and the
        presence of comments that explain non-trivial logic.
      </p>

      <h3 className="text-lg font-semibold">4. Best Practices</h3>
      <p>
        Best practices ensure that code is written in a way that follows
        industry standards and conventions, leading to more robust, secure, and
        scalable systems. This includes:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">DRY (Don&apos;t Repeat Yourself):</span>{' '}
          Avoiding code duplication.
        </li>
        <li>
          <span className="font-semibold">SOLID principles:</span> Ensuring code
          is modular and flexible.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The AI examines
        patterns in the code to identify repeated logic, adherence to modular
        design, and whether refactoring opportunities exist.
      </p>

      <h3 className="text-lg font-semibold">5. Performance Considerations</h3>
      <p>
        Performance measures how efficiently the code executes. It examines
        factors that can affect execution time and resource consumption, such
        as:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Algorithmic efficiency:</span> Use of
          optimized data structures and algorithms.
        </li>
        <li>
          <span className="font-semibold">Memory usage:</span> Efficient use of
          memory to prevent bottlenecks.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> Git Analysis reviews
        the time and space complexity of functions, identifying inefficient or
        resource-heavy operations.
      </p>

      <h3 className="text-lg font-semibold">6. Security Practices</h3>
      <p>
        Security is a critical component in modern codebases. Git Analysis
        checks for vulnerabilities such as:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Input validation:</span> Ensuring data
          input is properly sanitized to avoid injection attacks.
        </li>
        <li>
          <span className="font-semibold">
            Authentication and authorization:
          </span>{' '}
          Proper security protocols for user access.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The tool scans the
        code for known security vulnerabilities (e.g., SQL injection risks,
        unsecured APIs) and weak authentication mechanisms.
      </p>

      <h3 className="text-lg font-semibold">7. Code Structure</h3>
      <p>
        A well-structured codebase is easier to maintain and extend. This
        parameter evaluates:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Modularity:</span> How well the code
          is split into functions, classes, and modules.
        </li>
        <li>
          <span className="font-semibold">Layering:</span> Adherence to
          separation of concerns.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The AI analyzes the
        logical separation of different parts of the codebase, looking for
        cohesive modules and decoupled components.
      </p>

      <h3 className="text-lg font-semibold">8. Testing Coverage</h3>
      <p>Testing coverage measures how well the code is tested. It looks at:</p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Unit tests:</span> Coverage of
          individual components.
        </li>
        <li>
          <span className="font-semibold">Integration tests:</span> How well
          different modules work together.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> Git Analysis
        calculates the percentage of the codebase covered by tests and checks
        for the quality of test cases, such as edge case handling.
      </p>

      <h3 className="text-lg font-semibold">9. Documentation Quality</h3>
      <p>
        Documentation ensures that code is understandable for others, especially
        in collaborative environments. Git Analysis evaluates:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Code comments:</span> Clarity and
          usefulness of inline comments.
        </li>
        <li>
          <span className="font-semibold">API documentation:</span> Completeness
          of documentation for any exposed APIs or libraries.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> The AI assesses the
        presence of documentation and its relevance to complex code logic,
        ensuring it&apos;s helpful for future development.
      </p>

      <h3 className="text-lg font-semibold">10. Problem-Solving Skills</h3>
      <p>
        This metric assesses how efficiently a developer tackles challenges in
        the codebase. It looks at:
      </p>
      <ul className="list-disc space-y-2 pl-8">
        <li>
          <span className="font-semibold">Algorithm implementation:</span> How
          well developers implement efficient solutions to problems.
        </li>
        <li>
          <span className="font-semibold">Creative solutions:</span> Identifying
          non-obvious optimizations or refactorings.
        </li>
      </ul>
      <p>
        <span className="font-semibold">Measurement:</span> Git Analysis reviews
        commit history and the complexity of problems solved over time to assess
        developer&apos;s problem-solving capabilities.
      </p>
      <hr />
      <p>
        By focusing on these parameters, Git Analysis provides a comprehensive
        evaluation of both individual and team contributions, helping to boost
        code quality, security, and performance across projects. The AI-driven
        tool gives actionable insights that encourage continuous learning and
        improvement.
      </p>
    </div>
  );
}
