import React from 'react';

const Navbar = () => (
  <div className="bg-white border-b fixed top-0 right-0 left-0 z-20">
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-1 items-center">
            <div className="mr-2 flex md:hidden">
              <button className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white mr-2">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 text-primary font-bold cursor-pointer">
              HEALTH EXPLORE
            </div>
            <div className="flex-1 hidden md:block">
              <div className="flex flex-1 items-baseline justify-center space-x-4">
                <a
                  href="#"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Jobs
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Professional Network
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Lounge
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase"
                >
                  Salary
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="uppercase font-medium text-sm p-2 border-2 border-primary-light rounded-md text-primary-light">
                Create job
              </button>
              <div className="ml-3 relative">
                <button className="bg-gray-800 rounded-full text-white flex items-center justify-center text-lg focus:outline-none bg-primary h-10 w-10">
                  JO
                </button>
              </div>
              <a
                href="#"
                className="text-gray-800 hover:text-primary pl-3 py-2 rounded-md text-sm font-medium uppercase"
              >
                Logout
              </a>
            </div>
          </div>
          <button className="md:hidden rounded-full text-white flex items-center justify-center text-lg focus:outline-none bg-primary h-10 w-10">
            JO
          </button>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
