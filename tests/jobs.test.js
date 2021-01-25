import { createMocks } from 'node-mocks-http';
import uniq from 'lodash.uniq';
import handleJobs from '../pages/api/jobs';
import jobs from '../data/jobs.json';

describe('/api/jobs', () => {
  test('returns all jobs when no query params are passed', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {},
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(jobs);
  });

  test("returns only full-time shifts, when type is 'Full-time' and work schedule is 'Night shift'", async () => {
    const jobTypes = ['Full-time'];
    const workSchedules = ['Night shift'];
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        filters: JSON.stringify({
          job_type: jobTypes,
          work_schedule: workSchedules,
          experience: [],
          department: [],
        }),
      },
    });

    await handleJobs(req, res);

    const parsedResponse = JSON.parse(res._getData());
    const responseJobTypes = parsedResponse
      .reduce(
        (results, job) =>
          uniq([...results, ...job.items.map((e) => e.job_type)]),
        [],
      )
      .sort();
    const responseWorkSchedules = parsedResponse
      .reduce(
        (results, job) =>
          uniq([...results, ...job.items.map((e) => e.work_schedule)]),
        [],
      )
      .sort();

    expect(res._getStatusCode()).toBe(200);
    expect(responseJobTypes).toEqual(jobTypes);
    expect(responseWorkSchedules).toEqual(workSchedules);
  });

  test("returns all jobs matching 'Anesthesiology' keyword and they should be sorted by location", async () => {
    const keyword = 'Endoscopy Nurse';
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        keyword,
        sort_by: JSON.stringify({
          attribute: 'location',
          order: 'ASC',
        }),
      },
    });

    await handleJobs(req, res);
    const parsedResponse = JSON.parse(res._getData());
    const jobsMatchingKeyword = parsedResponse.reduce(
      (results, job) =>
        uniq([...results, ...job.items.map((e) => e.job_title)]),
      [],
    );
    expect(jobsMatchingKeyword).toEqual([keyword]);
    parsedResponse.forEach(({ items }) => {
      const locations = items.map((e) => e.city);
      expect(locations).toEqual(locations.sort());
    });
  });
});
