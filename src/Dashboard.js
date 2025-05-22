import React from 'react';
import { FaChartLine, FaWallet, FaUser, FaHome } from 'react-icons/fa';

const InvestmentDashboard = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 text-white font-sans px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img src="/assets/1fi-logo.png" alt="1Fi Logo" className="w-10 h-10 rounded" />
        <h1 className="text-lg font-bold">Invest</h1>
      </div>

      {/* Current Value */}
      <div className="text-center mb-4">
        <p className="text-sm">Current Value</p>
        <h2 className="text-4xl font-extrabold">₹ {data.currentValue}</h2>
        <p className="text-sm text-green-300">
          Total Returns ↑ ₹ {data.totalReturns} ({data.returnsPercent})
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <div>
          <p className="text-sm text-gray-300">Invested</p>
          <p className="font-bold">₹ {data.invested}</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">XIRR</p>
          <p className="font-bold">{data.xirr}</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">1 Day Return</p>
          <p className="font-bold">
            ₹ {data.dayReturn} ({data.dayReturnPercent})
          </p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl py-6 px-4 text-black text-center mb-4">
        <p>[Chart Placeholder]</p>
        <div className="flex justify-around mt-2 text-xs">
          <span>1D</span><span>1W</span><span>3M</span><span>6M</span><span>1Y</span><span>5Y</span><span className="font-bold">All</span>
        </div>
      </div>

      {/* Invest More */}
      <button className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-bold mb-4">
        + Invest more
      </button>

      {/* Loan Box */}
      <button className="w-full bg-purple-400 text-white py-3 rounded-xl text-sm font-medium mb-4">
        💳 Get loan against your investments
      </button>

      {/* Portfolio Options */}
      <div className="flex justify-around text-black">
        <button className="bg-white px-4 py-2 rounded-full text-xs">📊 Portfolio</button>
        <button className="bg-white px-4 py-2 rounded-full text-xs">↩️ Redeem</button>
        <button className="bg-white px-4 py-2 rounded-full text-xs">📄 Transactions</button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-800 py-3 flex justify-around items-center text-white text-xl">
        <FaHome />
        <FaChartLine />
        <FaWallet />
        <FaUser />
      </div>
    </div>
  );
};

export default InvestmentDashboard;
