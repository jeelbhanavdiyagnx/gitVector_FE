'use client';
import React from 'react';

export default function NoDataAvailable() {
  return (
    <div className="flex flex-col items-center justify-center py-40">
      <p>No data available</p>
      <p>Try changing the filters</p>
    </div>
  );
}
