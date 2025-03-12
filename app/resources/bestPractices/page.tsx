'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { BestPracticesForVersionControlContent } from '../components/bestPracticesVersionControl';
function Page() {
    return (
        <div>
            < BestPracticesForVersionControlContent />
        </div>
    );
}

export default withAuth(Page);