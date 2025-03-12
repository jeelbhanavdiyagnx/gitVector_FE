'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";


export function RemovePolicy() {
    return (
        <div className="flex flex-col items-start">
            <h2 className="text-xl font-medium">
                Understanding User, Organization, and Repository Removal Policies in GitVector
            </h2>
            <p className="text-sm text-gray-500 ">
                Managing users, organizations, and repositories effectively is crucial for maintaining accurate and actionable insights in GitVector.
                Here’s a clear explanation of how data is handled when any of these elements are removed, ensuring transparency and continuity for all stakeholders.
                <Link href="/resources/removal" className='flex items-center gap-1'>
                    Read more <FaArrowRight />
                </Link>
            </p>
        </div>
    );
}

export function RemovePolicyContent() {
    return (
        <div className="mx-auto space-y-4 px-4 mb-16">
            <ol className="space-y-2">
                <li>
                    <span className="font-semibold">1. User Removal Policy</span>
                </li>
                <span>When a user is removed from GitVector:</span>
                <ul className="list-disc pl-5 space-y-2">
                    <li>The users contributions remain visible in analyses but are limited to work completed up until the date of removal.</li>
                    <li>No new data or activities from the removed user will be processed or displayed.</li>
                </ul>
                <span>
                    This ensures that historical user data remains intact for reference while ceasing updates from the removed user.
                </span>
            </ol>
            <ol className="space-y-2">
                <li>
                    <span className="font-semibold">2. Organization Removal Policy</span>
                </li>
                <span>When an organization is removed from GitVector::</span>
                <ul className="list-disc pl-5 space-y-2">
                    <li>All repositories and user data tied to the organization are preserved, but only for work completed up until the removal date.</li>
                    <li>Data from the removed organization or its repositories will no longer be updated or processed.</li>
                </ul>
                <span>
                This policy retains valuable insights about past contributions without including future data.
                </span>
            </ol>
            <ol className="space-y-2">
                <li>
                    <span className="font-semibold">3. Repository Removal Policy</span>
                </li>
                <span>When a repository is removed:</span>
                <ul className="list-disc pl-5 space-y-2">
                    <li>All analyses, metrics, and user data connected to the repository remain accessible but reflect only activity up until the removal date.</li>
                    <li>Future updates or changes to the repository will not appear in GitVector.</li>
                </ul>
                <span>
                This ensures the integrity of historical analysis while stopping future data collection from the removed repository.
                </span>
            </ol>
          
            <p className="font-semibold">
                Why Preserve Data After Removal?
            </p>
            <p>
                By retaining historical data after removal, GitVector ensures that teams can reference past performance, measure progress, and maintain consistent analytical insights. This approach balances the need for historical accuracy with the ability to discontinue future data processing.
                For more details or assistance with removal policies, please reach out to our support team

            </p>
        </div>
    );
}
