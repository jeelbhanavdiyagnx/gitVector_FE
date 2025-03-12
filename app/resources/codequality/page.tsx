'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { AITransformingCodeQualityContent } from '../components/AITransformingCode';
function Page() {
    return (
        <div>
        <AITransformingCodeQualityContent/>
        </div>
    );
}

export default withAuth(Page);