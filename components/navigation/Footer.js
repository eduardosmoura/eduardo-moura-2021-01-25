import React from 'react';

const Footer = () => (
  <div className="bg-white border-t border-b flex flex-col flex-1 p-6 md:flex-row">
    <div className="flex-1 p-2">
      <h2 className="text-xl font-bold">About us</h2>
      <p className="text-sm my-2">
        We are a team of nurses, doctors, technologists and executives dedicated
        to help nurses find jobs that they love.
      </p>
      <p className="text-sm my-2">
        All copyrights reserved &copy; 2020 - Health Explore
      </p>
    </div>
    <div className="flex flex-col flex-1 md:flex-row">
      <div className="flex-1 p-2">
        <h2 className="text-xl font-bold">Sitemap</h2>
        <div className="text-sm my-2">Nurses</div>
        <div className="text-sm my-2">Employers</div>
        <div className="text-sm my-2">Social Networking</div>
        <div className="text-sm my-2">Jobs</div>
      </div>
      <div className="flex-1 p-2">
        <h2 className="text-xl font-bold">Privacy</h2>
        <div className="text-sm my-2">Terms of use</div>
        <div className="text-sm my-2">Privacy policy</div>
        <div className="text-sm my-2">Cookie policy</div>
      </div>
    </div>
  </div>
);

export default Footer;
