'use client';
import { GraphComponent } from "./graphComponent";

const chartType = [
  'Quality of code',
  'Complexity',
  'Performance Considerations',
  'Security Practices',
  'Code Readability',
  'Code Structure'
]

export default function GraphList() {
  return (
    <div className='p-6 grid grid-cols-1 justify-center gap-4 px-4 sm:grid-cols-2 sm:gap-12 sm:px-16 lg:grid-cols-3 xl:grid-cols-3'> 
      {chartType.map((item, index) => (
        <GraphComponent key={index} item={item} />
      ))}
    </div>
  );
}
