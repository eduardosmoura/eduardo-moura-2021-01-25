import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Container from '../components/Container';
import SearchBar from '../components/search/SearchBar';
import Filter from '../components/navigation/Filter';
import Results from '../components/navigation/Results';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    job_type: [],
    department: [],
    work_schedule: [],
    experience: [],
  });
  const [sortOptions, setSortOptions] = useState({
    attribute: '',
    order: '',
  });
  const onToggleFilter = useCallback((filterType, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterType]: value,
    }));
  }, []);

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-16">
        <SearchBar keyword={keyword} onKeywordChange={setKeyword} />
        <div className="flex flex-1">
          <div className="hidden md:block">
            <Filter applied={filters} onToggleFilter={onToggleFilter} />
          </div>
          <Results
            keyword={keyword}
            filters={filters}
            sortOptions={sortOptions}
            onChangeSortOptions={setSortOptions}
          />
        </div>
      </main>
    </Container>
  );
};

export default Home;
