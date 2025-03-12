'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { TopCodeMetricsContent } from '../components/topCodeMetrics';
function Page() {
    return (
        <div>
            <TopCodeMetricsContent />
        </div>
    );
}

export default withAuth(Page);