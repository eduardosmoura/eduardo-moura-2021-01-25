import React from 'react';
import { debounce } from '../../utils';

const SearchBar = ({ onKeywordChange }) => {
  const onChange = debounce((keyword) => onKeywordChange(keyword), 250);

  return (
    <div className="w-full p-4 pb-0">
      <div className="relative">
        <input
          placeholder="Search for any job, title, keywords or company"
          className="w-full py-5 px-14 border"
          onChange={(e) => onChange(e.target.value)}
        />
        <img
          src="/search.png"
          height={16}
          width={16}
          className="absolute top-6 left-8 z-10"
        />
      </div>
    </div>
  );
};

export default SearchBar;
