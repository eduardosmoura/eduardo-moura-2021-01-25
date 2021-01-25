import filters from '../../data/filters';

export default async (req, res) => {
  res.statusCode = 200;
  res.json(filters);
};
