// components/HomeContent.jsx
import React, { useState } from 'react';
import VisaFreeChart from './VisaFreeChart';

export default function HomeContent() {
    // States for pagination
    const [currentPageLeft, setCurrentPageLeft] = useState(1);
    const [currentPageRight, setCurrentPageRight] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(25);

    const totalEntries = 214; // Total entries as shown in your screenshot

    const visaFreeCountries = [
        { rank: 1, country: "Japan", code: "JP", population: "126,920", index: "80.9%" },
        { rank: 2, country: "Singapore", code: "SG", population: "5,674", index: "79.2%" },
        { rank: 3, country: "Hong Kong", code: "HK", population: "7,141", index: "77.4%" },
        { rank: 4, country: "Macau", code: "MO", population: "0,593", index: "72.5%" },
        { rank: 5, country: "Bahamas", code: "BS", population: "0,335", index: "72.0%" },
        { rank: 6, country: "South Korea", code: "KR", population: "49,115", index: "66.4%" },
        { rank: 7, country: "Sweden", code: "SE", population: "9,802", index: "65.1%" },
        { rank: 8, country: "Finland", code: "FI", population: "5,477", index: "64.9%" },
        { rank: 9, country: "Norway", code: "NO", population: "5,208", index: "64.8%" },
        { rank: 10, country: "France", code: "FR", population: "66,554", index: "64.3%" },
        // Add more sample data to simulate 25 entries per page
        { rank: 11, country: "Germany", code: "DE", population: "82,800", index: "64.0%" },
        { rank: 12, country: "Italy", code: "IT", population: "59,550", index: "63.5%" },
        { rank: 13, country: "United Kingdom", code: "GB", population: "66,000", index: "63.0%" },
        { rank: 14, country: "Spain", code: "ES", population: "46,700", index: "62.8%" },
        { rank: 15, country: "Portugal", code: "PT", population: "10,300", index: "62.5%" },
        { rank: 16, country: "Netherlands", code: "NL", population: "17,200", index: "62.2%" },
        { rank: 17, country: "Belgium", code: "BE", population: "11,400", index: "62.0%" },
        { rank: 18, country: "Switzerland", code: "CH", population: "8,500", index: "61.8%" },
        { rank: 19, country: "Austria", code: "AT", population: "8,800", index: "61.5%" },
        { rank: 20, country: "Denmark", code: "DK", population: "5,800", index: "61.2%" },
        { rank: 21, country: "Malta", code: "MT", population: "0,414", index: "60.9%" },
        { rank: 22, country: "Luxembourg", code: "LU", population: "0,570", index: "60.6%" },
        { rank: 23, country: "Monaco", code: "MC", population: "0,031", index: "60.3%" },
        { rank: 24, country: "Chile", code: "CL", population: "17,508", index: "60.0%" },
        { rank: 25, country: "Liechtenstein", code: "LI", population: "0,038", index: "59.8%" }
    ];

    const visaFreeWelcomeCountries = [
        { rank: 1, country: "Mozambique", code: "MZ", population: "25,303", index: "100.0%" },
        { rank: 1, country: "Macau", code: "MO", population: "0,593", index: "100.0%" },
        { rank: 1, country: "Kenya", code: "KE", population: "45,925", index: "100.0%" },
        { rank: 1, country: "Tuvalu", code: "TV", population: "0,011", index: "100.0%" },
        { rank: 1, country: "Turkey", code: "TR", population: "79,414", index: "100.0%" },
        { rank: 1, country: "Laos", code: "LA", population: "6,912", index: "100.0%" },
        { rank: 1, country: "Uganda", code: "UG", population: "37,102", index: "100.0%" },
        { rank: 1, country: "Timor-Leste", code: "TL", population: "1,231", index: "100.0%" },
        { rank: 1, country: "Maldives", code: "MV", population: "0,393", index: "100.0%" },
        { rank: 1, country: "Saint Kitts and Nevis", code: "KN", population: "0,052", index: "100.0%" },
        // Add more sample data to simulate 25 entries per page
        { rank: 21, country: "Haiti", code: "HT", population: "10,110", index: "98.6%" },
        { rank: 22, country: "Palau", code: "PW", population: "0,021", index: "96.4%" },
        { rank: 23, country: "Nepal", code: "NP", population: "31,551", index: "94.1%" },
        { rank: 24, country: "Samoa", code: "WS", population: "0,198", index: "93.4%" },
        { rank: 25, country: "Singapore", code: "SG", population: "5,674", index: "91.2%" }
    ];

    // Pagination component
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        const pages = [];

        // Always show first page
        pages.push(1);

        // Calculate range of pages to show
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // Add ellipsis if needed
        if (startPage > 2) {
            pages.push('...');
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if there's more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return (
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                    Showing <span className="font-semibold">1</span> to <span className="font-semibold">{entriesPerPage}</span> of <span className="font-semibold">{totalEntries}</span> entries
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {pages.map((page, index) => (
                            page === '...' ? (
                                <span key={index} className="px-3 py-1 text-gray-400">...</span>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => onPageChange(page)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-1">
                <div className="text-center mb-4">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 md:p-4 max-w-8xl mx-auto shadow-sm">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Visa-Free Freedom Index:
                                </h2>
                                <div className="text-3xl md:text-2xl font-bold text-blue-600">
                                    37.2%
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-sm font-medium text-gray-700">
                                    Select Year:
                                </div>
                                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                    <option>2006</option>
                                    <option>2007</option>
                                    <option>2008</option>
                                    <option>2009</option>
                                    <option>2010</option>
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Table - Visa-Free Travel Index */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900">
                                Countries with the Highest Visa-Free Travel Index
                            </h3>
                        </div>

                        <div className="p-6">
                            {/* Table Controls */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                                    >
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">entries</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#ffdc4d]">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ranking
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Country Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Country Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Population (Millions)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Visa-Free Travel Index
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {visaFreeCountries.map((item) => (
                                            <tr key={`${item.code}-${item.rank}`} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.rank}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.country}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.population}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                        {item.index}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination for Left Table */}
                            <Pagination
                                currentPage={currentPageLeft}
                                totalPages={totalPages}
                                onPageChange={setCurrentPageLeft}
                            />
                        </div>
                    </div>

                    {/* Right Table - Visa-Free Welcome Index */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900">
                                Countries with the Highest Visa-Free Welcome Index
                            </h3>
                        </div>

                        <div className="p-6">
                            {/* Table Controls */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                                    >
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">entries</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#ffdc4d]">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ranking
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Country Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Country Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Population (Millions)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Visa-Free Welcome Index
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {visaFreeWelcomeCountries.map((item, index) => (
                                            <tr key={`${item.code}-${index}`} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.rank}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.country}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.population}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        {item.index}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination for Right Table */}
                            <Pagination
                                currentPage={currentPageRight}
                                totalPages={totalPages}
                                onPageChange={setCurrentPageRight}
                            />
                        </div>
                    </div>
                </div>

                {/* ADD THE CHART HERE - AFTER TABLES, BEFORE FOOTER */}
                <VisaFreeChart />

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Data source: Human Freedom Index • Last updated: January 2024
                    </p>
                </div>
            </div>
        </div>
    );
}