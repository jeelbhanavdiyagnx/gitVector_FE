'use client';
import React from 'react';
import withAuth from '@/app/withAuth';
import { ImprovingDeveloperSkillsContent } from '../components/improvingDeveloper';
function Page() {
    return (
        <div>
            <ImprovingDeveloperSkillsContent />
        </div>
    );
}

export default withAuth(Page);