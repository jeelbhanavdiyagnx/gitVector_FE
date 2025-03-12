'use client';
import React from 'react';
import {
    GitAnalysisContent
  } from '@/app/resources/components/gitAnalysisParameters';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <GitAnalysisContent />
    </div>
  );
}

export default withAuth(Page);