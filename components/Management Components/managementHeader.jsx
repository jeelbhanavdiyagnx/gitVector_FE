import React from 'react'

const ManagementHeader = ({title,description}) => {  
  return (
    <div className="border-b pb-4 w-full">
    <h1 className="text-lg font-medium text-[#09090B] dark:text-white">
      {title}
    </h1>
    <p className="text-sm font-normal text-[#71717A]">
     {description}
    </p>
  </div>
  )
}

export default ManagementHeader