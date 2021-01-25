import jobs from '../../data/jobs';

const filterProcessors = {
  job_type: (item, values) => values.includes(item.job_type),
  work_schedule: (item, values) => values.includes(item.work_schedule),
  experience: (item, values) => values.includes(item.experience),
  department: (item, values) =>
    values.filter((value) => item.department.includes(value)).length > 0,
};

const sortByAttrMap = {
  location: 'city',
  role: 'job_title',
  department: 'department',
  experience: 'experience',
  education: 'required_credentials',
};

const experienceWeightage = {
  Internship: 0,
  Junior: 1,
  Intermediate: 2,
  Senior: 3,
};

const sort = (items, options) => {
  const attr = sortByAttrMap[options.attribute];
  const rank = options.order === 'ASC' ? [1, -1] : [-1, 1];

  if (attr === 'experience') {
    return items.sort((e1, e2) =>
      experienceWeightage[e1[attr]] > experienceWeightage[e2[attr]]
        ? rank[0]
        : rank[1],
    );
  }

  return items.sort((e1, e2) => (e1[attr] > e2[attr] ? rank[0] : rank[1]));
};

export default async (req, res) => {
  const { filters: rawFilters, keyword, sort_by: rawSortBy } = req.query;
  const filters = rawFilters ? JSON.parse(rawFilters) : {};
  const sortBy = rawSortBy ? JSON.parse(rawSortBy) : {};
  let results = jobs;

  if (keyword && keyword.length > 0) {
    const newResults = [];
    const downcasedKeyword = keyword.toLowerCase();

    results.forEach((job) => {
      const matchedItems = job.items.filter(
        (item) =>
          item.name.toLowerCase().includes(downcasedKeyword) ||
          item.job_title.toLowerCase().includes(downcasedKeyword) ||
          item.required_skills
            .join(' ')
            .toLowerCase()
            .includes(downcasedKeyword) ||
          item.description.toLowerCase().includes(downcasedKeyword),
      );

      if (matchedItems.length > 0) {
        newResults.push({
          ...job,
          total_jobs_in_hospital: matchedItems.length,
          items: matchedItems,
        });
      }
    });

    results = newResults;
  }

  results = Object.keys(filters).reduce((resultSet, filterType) => {
    const filterValues = filters[filterType];
    if (!filterValues || filterValues.length === 0) {
      return resultSet;
    }

    const newResultSet = [];
    resultSet.forEach((job) => {
      const matchingJobs = job.items.filter((item) =>
        filterProcessors[filterType](item, filterValues),
      );
      if (matchingJobs.length > 0) {
        newResultSet.push({
          ...job,
          total_jobs_in_hospital: matchingJobs.length,
          items: matchingJobs,
        });
      }
    });

    return newResultSet;
  }, results);

  if (sortBy.attribute && sortBy.order) {
    results = results.map((result) => ({
      ...result,
      items: sort(result.items, sortBy),
    }));
  }

  res.statusCode = 200;

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

  res.json(results);
};
