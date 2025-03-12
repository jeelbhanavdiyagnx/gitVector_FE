'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { TrackingDeveloperPerformanceContent } from '../components/trackingPerformance';
function Page() {
    return (
        <div>
            <TrackingDeveloperPerformanceContent />
        </div>
    );
}

export default withAuth(Page);