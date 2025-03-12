'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { RemovePolicyContent } from '../components/RemovePolicy';
function Page() {
    return (
        <div>
        <RemovePolicyContent/>
        </div>
    );
}

export default withAuth(Page);