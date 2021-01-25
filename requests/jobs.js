export const fetchJobs = async ({ filters, keyword, sortOptions }) => {
  try {
    const jobs = await fetch(
      `/api/jobs?filters=${encodeURIComponent(
        JSON.stringify(filters),
      )}&keyword=${keyword}&sort_by=${encodeURIComponent(
        JSON.stringify(sortOptions),
      )}`,
    ).then((res) => res.json());
    return { jobs };
  } catch (err) {
    return { isError: true };
  }
};
