import React from 'react';
import { CardComponent } from './cardComponent';

export function CardList({ reviews }) {
  return (
    <div className="grid grid-cols-1 justify-center gap-4 p-12 px-4 sm:grid-cols-2 sm:gap-12 sm:px-16 lg:grid-cols-4 xl:grid-cols-5">
      {Object.keys(reviews).map((key, index) => (
        <CardComponent
          key={index}
          itemKey={key
            .replace(/_/g, ' ')
            .replace(/^\w/, (c) => c.toUpperCase())}
          itemValue={reviews[key]}
        />
      ))}
    </div>
  );
}
