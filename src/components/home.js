

import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import AttritionChart from './attritionchart'; // Adjust import path if necessary
import { BsFilter } from 'react-icons/bs';
import { FaGripHorizontal } from 'react-icons/fa';

const Home = () => {
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2 whitespace-nowrap">
          <FaGripHorizontal className="text-gray-600" />
          <span>Attrition Dashboard Prediction</span>
        </h1>

        <div className="flex justify-between items-center w-full space-x-4">
          <div className="flex items-center space-x-2 ml-auto mr-30">
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300"
              onClick={handleSort}
            >
              <BsFilter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-bold">Sort by</span>
              <span className="bg-blue-200 text-blue-700 text-xs px-2 rounded-full">
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300">
              <AiOutlineFilter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-bold">Filter by</span>
              <span className="bg-blue-200 text-blue-700 text-xs px-2 rounded-full">6</span>
            </button>

            <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 w-80">
              <AiOutlineSearch className="h-5 w-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search anything here..."
                className="outline-none text-gray-700 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-2 gap-6 overflow-hidden">
        {/* Attrition Prediction Section */}
        <div className="bg-white p-6 shadow rounded h-full">
          <h2 className="font-semibold text-lg">Attrition Prediction</h2>
          {/* Pass sortOrder and width to AttritionChart */}
          <AttritionChart sortOrder={sortOrder} width="600px" />
        </div>

        {/* Confusion Matrix Section */}
        <div className="bg-white p-6 shadow rounded h-full">
          <h2 className="font-semibold text-lg">Confusion Matrix</h2>
          <div className="h-48 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>

      {/* Shrinkage Dashboard Section */}
      <h2 className="text-xl font-bold mt-8">Shrinkage Dashboard Prediction</h2>
      <div className="bg-white p-6 shadow rounded mt-4 h-full">
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default Home;
