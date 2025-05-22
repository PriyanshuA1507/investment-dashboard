import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  FaChartLine,
  FaWallet,
  FaUser,
  FaHome,
  FaChartPie,
  FaUndo,
  FaReceipt,
} from 'react-icons/fa';

const SHEET_ID = '1eSQ0m5OCLYud_JBhkW26v-geKuCMOxEM-FCjIBxuuAw';
const API_KEY = 'AIzaSyAnWS12-i37cqFBWIqfHA8XASrU-0ahD80';
const RANGE = 'Sheet1!A2:G2';

function StatCard({ label, value }) {
  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-xl text-center shadow w-full">
      <p className="text-sm text-gray-200">{label}</p>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  );
}

function App() {
  const [data, setData] = useState({
    currentValue: '-',
    totalReturns: '-',
    returnsPercent: '-',
    invested: '-',
    xirr: '-',
    dayReturn: '-',
    dayReturnPercent: '-',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const values = response.data.values?.[0];

        if (!values || values.length < 7) {
          throw new Error('Invalid data format received from API');
        }

        setData({
          currentValue: values[0],
          totalReturns: values[1],
          returnsPercent: values[2],
          invested: values[3],
          xirr: values[4],
          dayReturn: values[5],
          dayReturnPercent: values[6],
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderPercent = (percentStr) => {
    if (!percentStr) return null;
    const percent = parseFloat(percentStr.replace('%', ''));
    if (isNaN(percent)) return null;
    const isPositive = percent >= 0;
    return (
      <span className={isPositive ? 'text-green-400' : 'text-red-500'}>
        ({isPositive ? '+' : '-'}
        {Math.abs(percent)}%)
      </span>
    );
  };

  const iconClass = useCallback(
    (tabName) =>
      `text-xl sm:text-2xl transition-colors duration-200 cursor-pointer ${
        activeTab === tabName ? 'text-white' : 'text-purple-300 hover:text-white'
      }`,
    [activeTab]
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 text-white font-inter">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <img src="/assets/1fi-logo.png" alt="1Fi Logo" className="w-10 h-10 rounded" />
          <h1 className="text-2xl font-bold">Invest</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 space-y-6">
        {loading ? (
          <p className="text-center text-lg">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Current Value */}
            <section className="text-center">
              <p className="text-xl">Current Value</p>
              <h2 className="text-5xl font-extrabold">₹ {data.currentValue}</h2>
              <p className="text-base mt-1">
                <span className="text-white font-medium">Total Returns ↑ ₹ {data.totalReturns}</span>{' '}
                {renderPercent(data.returnsPercent)}
              </p>
            </section>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Invested" value={`₹ ${data.invested}`} />
              <StatCard label="XIRR" value={data.xirr} />
              <StatCard
                label="1 Day Return"
                value={`₹ ${data.dayReturn} (${data.dayReturnPercent})`}
              />
            </section>

            {/* Chart */}
            <section className="bg-white rounded-xl py-4 px-4 text-black shadow-md">
              <div className="w-full max-w-2xl mx-auto">
                <img
                  src="/assets/investment-graph.png"
                  alt="Investment Chart"
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex justify-around mt-3 text-xs sm:text-sm text-gray-600">
                  {['1D', '1W', '3M', '6M', '1Y', '5Y', 'All'].map((label) => (
                    <span
                      key={label}
                      className={`cursor-pointer ${label === 'All' ? 'font-bold text-black' : ''}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Buttons */}
            <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-lg font-semibold transition">
              + Invest More
            </button>
            <button className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-xl text-sm font-medium transition">
              💳 Get Loan Against Investments
            </button>

            {/* Horizontal Button Group */}
            <section className="flex justify-center gap-4 mt-4 flex-wrap sm:flex-nowrap">
              {[
                { icon: <FaChartPie />, label: 'Portfolio' },
                { icon: <FaUndo />, label: 'Redeem' },
                { icon: <FaReceipt />, label: 'Transactions' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex items-center justify-center gap-2 bg-white text-purple-800 px-4 py-3 rounded-xl shadow hover:bg-purple-100 transition flex-1 min-w-[100px]"
                >
                  {icon} {label}
                </button>
              ))}
            </section>

            {/* Spacer before navigation */}
            <div className="h-6" />
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-purple-800 py-3 flex justify-around items-center shadow-inner">
        <FaHome className={iconClass('home')} onClick={() => setActiveTab('home')} title="Home" />
        <FaChartLine className={iconClass('stats')} onClick={() => setActiveTab('stats')} title="Stats" />
        <FaWallet className={iconClass('wallet')} onClick={() => setActiveTab('wallet')} title="Wallet" />
        <FaUser className={iconClass('profile')} onClick={() => setActiveTab('profile')} title="Profile" />
      </nav>
    </div>
  );
}

export default App;
