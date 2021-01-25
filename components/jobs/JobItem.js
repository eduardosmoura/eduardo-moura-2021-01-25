import React, { useState } from 'react';
import { timeSince } from '../../utils';

const JobItem = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleJobDetail = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="w-full text-sm">
      <div
        onClick={toggleJobDetail}
        className="w-full flex py-3 border-t cursor-pointer"
      >
        <div className="w-3/4">
          <b>{data.job_title}</b>
          <div>
            {data.job_type}
            {' | '}${data.salary_range[0]} - ${data.salary_range[1]} an hour
            {' | '}
            {data.city}
          </div>
        </div>
        <div className="w-1/4 flex flex-1 items-center justify-end">
          {timeSince(data.created)} ago
        </div>
      </div>
      {isExpanded && (
        <div className="w-full flex">
          <div className="w-3/4">
            <div className="flex flex-1 my-2">
              <div className="w-1/2">Department</div>
              <div className="w-1/2">{data.department.join(', ')}</div>
            </div>
            <div className="flex flex-1 my-2">
              <div className="w-1/2">Hours / shifts</div>
              <div className="w-1/2">
                {data.hours} hours / {data.work_schedule}
              </div>
            </div>
            <div className="flex flex-1 my-2">
              <div className="w-1/2">Summary</div>
              <div className="w-1/2">{data.description}</div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-center justify-center">
            <button className="block font-medium text-sm p-2 bg-primary rounded-md text-white">
              Job details
            </button>
            <div className="h-2" />
            <button className="block font-medium text-sm p-2 border-2 border-primary-light rounded-md text-primary-light">
              Save job
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobItem;
