import React, { useState } from 'react';
import { pluralize } from '../../utils';
import JobItem from './JobItem';

const JobList = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { total_jobs_in_hospital: totalJobs, name, items } = job;
  const firstTwoLetters = name.slice(0, 2).toUpperCase();
  const toggleJobDetail = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div>
      <div
        onClick={toggleJobDetail}
        className="flex flex-1 pt-2 pb-3 items-center cursor-pointer"
      >
        <div className="bg-gray-300 rounded-md text-white flex items-center justify-center text-lg focus:outline-none h-10 w-10">
          {firstTwoLetters}
        </div>
        <div className="pl-2 flex-1">
          {pluralize(totalJobs, 'job')} for {name}
        </div>
      </div>
      {isExpanded &&
        items.map((item, index) => (
          <JobItem key={`${name}-${item.job_title}-${index}`} data={item} />
        ))}
    </div>
  );
};

export default JobList;
