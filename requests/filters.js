export const fetchFilters = async () => {
  try {
    const filters = await fetch('/api/filters').then((res) => res.json());
    return { filters };
  } catch (err) {
    return { isError: true };
  }
};
