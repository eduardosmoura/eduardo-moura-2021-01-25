import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { fetchFilters } from '../../requests/filters';
import { formatNumberWithComma } from '../../utils';
import Modal from '../modal/Modal';

const emptyFilters = new Array(4).fill('');
const Filter = ({ applied, onToggleFilter }) => {
  const [filters, setFilters] = useState({});
  const [requestState, setRequestState] = useState('loading');
  const [modalFilterType, setModalFilterType] = useState(null);
  const toggleFilter = (filterType, key) => {
    const appliedFilterValues = applied[filterType] || [];
    let newFilterValues;

    if (appliedFilterValues.includes(key)) {
      newFilterValues = appliedFilterValues.filter(
        (filterKey) => filterKey !== key,
      );
    } else {
      newFilterValues = [...appliedFilterValues, key];
    }

    onToggleFilter(filterType, newFilterValues);
  };

  useEffect(async () => {
    const { isError, filters } = await fetchFilters();
    if (filters) {
      setFilters(filters);
      setRequestState('success');
    }

    if (isError) {
      setRequestState('error');
    }
  }, []);

  if (requestState === 'loading') {
    return (
      <div className="w-72 flex-col">
        {emptyFilters.map((_, index) => (
          <div key={`loader-${index}`} className="bg-white p-4 m-4 border">
            <ContentLoader height={200} width={288} viewBox="0 0 288 200">
              <rect x="0" y="17" rx="4" ry="4" width="120" height="15" />
              <rect x="0" y="50" rx="3" ry="3" width="200" height="12" />
              <rect x="0" y="75" rx="3" ry="3" width="180" height="12" />
              <rect x="0" y="100" rx="3" ry="3" width="140" height="12" />
              <rect x="0" y="125" rx="3" ry="3" width="200" height="12" />
              <rect x="0" y="150" rx="3" ry="3" width="200" height="12" />
              <rect x="0" y="175" rx="3" ry="3" width="200" height="12" />
            </ContentLoader>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-72 flex-col">
      {Object.keys(filters).map((filterType) => {
        const filterOptions = filters[filterType];
        const currentlyAppliedFilters = applied[filterType] || [];
        const isShowMoreVisible = filterOptions.length > 10;

        return (
          <div key={filterType} className="bg-white p-4 m-4 border">
            <h3 className="text-sm font-bold">
              {filterType.replace(/_/g, ' ').toUpperCase()}
            </h3>
            {filterOptions.slice(0, 10).map(({ key, doc_count }) => (
              <p
                key={`${filterType}-${key}`}
                onClick={() => toggleFilter(filterType, key)}
                className={`text-sm my-2 cursor-pointer ${
                  currentlyAppliedFilters.includes(key) ? 'font-bold' : ''
                }`}
              >
                {key}
                <span className="text-xs text-gray-400 ml-2">
                  {formatNumberWithComma(doc_count)}
                </span>
              </p>
            ))}
            {isShowMoreVisible ? (
              <button
                onClick={() => setModalFilterType(filterType)}
                className="text-sm text-blue-400 cursor-pointer focus:outline-none"
              >
                Show more
              </button>
            ) : null}
          </div>
        );
      })}

      <Modal
        open={modalFilterType && modalFilterType.length > 0}
        size="lg"
        onClose={() => setModalFilterType(null)}
      >
        {modalFilterType && filters[modalFilterType] ? (
          <div className="flex flex-1 flex-col">
            <h3 className="text-sm font-bold p-4 border-b">
              {modalFilterType.replace(/_/g, ' ').toUpperCase()}
            </h3>
            <div className="flex flex-1 flex-wrap p-4">
              {filters[modalFilterType].map(({ key, doc_count }) => (
                <div
                  key={`${modalFilterType}-${key}`}
                  onClick={() => toggleFilter(modalFilterType, key)}
                  className={`text-sm w-full md:w-1/4 p-2 cursor-pointer ${
                    (applied[modalFilterType] || []).includes(key)
                      ? 'font-bold'
                      : ''
                  }`}
                >
                  {key}
                  <span className="text-xs text-gray-400 ml-2">
                    {formatNumberWithComma(doc_count)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Filter;
