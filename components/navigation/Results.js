import React, { useState, useEffect } from 'react';
import { fetchJobs } from '../../requests/jobs';
import JobList from '../jobs/JobList';

const sortData = [
  { key: 'location', text: 'Location' },
  { key: 'role', text: 'Role' },
  { key: 'department', text: 'Department' },
  { key: 'experience', text: 'Experience' },
  { key: 'education', text: 'Education' },
];

const iconCodes = {
  ASC: '&#8593;',
  DSC: '&#8595;',
};

const Results = ({ filters, keyword, sortOptions, onChangeSortOptions }) => {
  const [results, setResults] = useState([]);
  const [requestState, setRequestState] = useState(null);
  const totalResults = results.reduce(
    (total, job) => total + job.total_jobs_in_hospital,
    0,
  );
  const changeSort = (selectedAttr) => {
    let newSortOptions = { attribute: selectedAttr, order: 'ASC' };

    if (sortOptions.attribute === selectedAttr) {
      newSortOptions = {
        attribute: sortOptions.order === 'DSC' ? null : selectedAttr,
        order: sortOptions.order === 'DSC' ? null : 'DSC',
      };
    }

    onChangeSortOptions(newSortOptions);
  };

  useEffect(async () => {
    const { jobs, isError } = await fetchJobs({
      filters,
      keyword,
      sortOptions,
    });

    if (jobs) {
      setResults(jobs);
      setRequestState('success');
    }

    if (isError) {
      setRequestState('error');
    }
  }, [filters, keyword, sortOptions]);

  return (
    <div className="flex flex-1 flex-col m-4 ml-0 bg-white border">
      <div className="w-full flex py-8 px-4">
        <div className="w-full md:w-1/2">
          <span className="text-sm">
            <b>{totalResults}</b> job postings
          </span>
        </div>
        <div className="hidden md:flex w-1/2 justify-end">
          <span className="text-sm mx-2 text-gray-400">Sort by</span>
          {sortData.map(({ key, text }) => {
            const isSortSelected = key === sortOptions.attribute;

            return (
              <span
                key={key}
                onClick={() => changeSort(key)}
                className={`text-sm mx-2 cursor-pointer ${
                  isSortSelected ? 'font-bold' : null
                }`}
              >
                {text}
                <span
                  dangerouslySetInnerHTML={{
                    __html: isSortSelected
                      ? iconCodes[sortOptions.order]
                      : null,
                  }}
                />
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 px-4 flex-col">
        {results.map((job) => (
          <JobList key={job.name} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Results;
