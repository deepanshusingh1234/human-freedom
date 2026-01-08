// components/HomeContent.jsx
import React, { useState, useEffect } from 'react';
import VisaFreeChart from './VisaFreeChart';
import { useNavigate } from 'react-router-dom';
import { visaFreeCountries } from '../Data/Data';

export default function HomeContent() {
    const navigate = useNavigate();

    // States for pagination
    const [currentPageLeft, setCurrentPageLeft] = useState(1);
    const [currentPageRight, setCurrentPageRight] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(25);

    // State for search functionality
    const [searchTermLeft, setSearchTermLeft] = useState('');
    const [searchTermRight, setSearchTermRight] = useState('');

    // State for selected year
    const [selectedYear, setSelectedYear] = useState(2006);
    const [currentYearData, setCurrentYearData] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);

    // Extract available years and set initial data
    useEffect(() => {
        // Determine the structure of your data
        let years = [];
        let initialData = [];

        // Case 1: Array of objects with year and data properties
        if (Array.isArray(visaFreeCountries)) {
            years = visaFreeCountries.map(item => item.year).sort((a, b) => a - b);
            // Find data for selected year
            const yearData = visaFreeCountries.find(item => item.year === selectedYear);
            initialData = yearData ? yearData.data : [];
        }
        // Case 2: Object with year keys
        else if (typeof visaFreeCountries === 'object' && visaFreeCountries !== null) {
            years = Object.keys(visaFreeCountries)
                .map(year => parseInt(year))
                .filter(year => !isNaN(year))
                .sort((a, b) => a - b);
            initialData = visaFreeCountries[selectedYear] || [];
        }
        // Case 3: Single year object (your current structure)
        else if (visaFreeCountries.year && visaFreeCountries.data) {
            years = [visaFreeCountries.year];
            initialData = visaFreeCountries.data;
            // If selected year doesn't match, use the available year
            if (selectedYear !== visaFreeCountries.year) {
                setSelectedYear(visaFreeCountries.year);
            }
        }

        setAvailableYears(years);
        setCurrentYearData(initialData);

        // Reset pagination and search when year changes
        setCurrentPageLeft(1);
        setCurrentPageRight(1);
        setSearchTermLeft('');
        setSearchTermRight('');
    }, [selectedYear]);

    // Filtered data based on search
    const [filteredDataLeft, setFilteredDataLeft] = useState(currentYearData);
    const [filteredDataRight, setFilteredDataRight] = useState(currentYearData);

    // Update filtered data when search term or year data changes
    useEffect(() => {
        if (currentYearData.length > 0) {
            const filteredLeft = currentYearData.filter(item =>
                item.country.toLowerCase().includes(searchTermLeft.toLowerCase()) ||
                (item.code && item.code.toLowerCase().includes(searchTermLeft.toLowerCase()))
            );
            setFilteredDataLeft(filteredLeft);
            setCurrentPageLeft(1); // Reset to first page when search changes
        } else {
            setFilteredDataLeft([]);
        }
    }, [searchTermLeft, currentYearData]);

    useEffect(() => {
        if (currentYearData.length > 0) {
            const filteredRight = currentYearData.filter(item =>
                item.country.toLowerCase().includes(searchTermRight.toLowerCase()) ||
                (item.code && item.code.toLowerCase().includes(searchTermRight.toLowerCase()))
            );
            setFilteredDataRight(filteredRight);
            setCurrentPageRight(1); // Reset to first page when search changes
        } else {
            setFilteredDataRight([]);
        }
    }, [searchTermRight, currentYearData]);

    // Calculate pagination for left table
    const indexOfLastEntryLeft = currentPageLeft * entriesPerPage;
    const indexOfFirstEntryLeft = indexOfLastEntryLeft - entriesPerPage;
    const currentEntriesLeft = filteredDataLeft.slice(indexOfFirstEntryLeft, indexOfLastEntryLeft);
    const totalPagesLeft = Math.ceil(filteredDataLeft.length / entriesPerPage);

    // Calculate pagination for right table
    const indexOfLastEntryRight = currentPageRight * entriesPerPage;
    const indexOfFirstEntryRight = indexOfLastEntryRight - entriesPerPage;
    const currentEntriesRight = filteredDataRight.slice(indexOfFirstEntryRight, indexOfLastEntryRight);
    const totalPagesRight = Math.ceil(filteredDataRight.length / entriesPerPage);

    // Function to handle country click
    const handleCountryClick = (countryName) => {
        const countryId = countryName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/country/${countryId}`);
    };

    // Handle year change
    const handleYearChange = (year) => {
        setSelectedYear(parseInt(year));
    };

    // Get visa-free freedom index for selected year from actual data
    const getVisaFreeFreedomIndex = () => {
        // Check if we have data for the selected year
        if (currentYearData.length === 0) {
            return "N/A";
        }

        // You should calculate this based on your actual data
        // This is a placeholder - you need to implement the actual calculation
        // For example, if you have a property called "freedomIndex" in your data:

        // Option 1: If you have a pre-calculated value for each year
        // You might need to add this to your data structure

        // Option 2: Calculate from the data
        // Example: Average of all freedomIndex values for the year
        try {
            const total = currentYearData.reduce((sum, item) => {
                // Extract numeric value from string like "2.1 %"
                const value = parseFloat(item.freedomIndex) || 0;
                return sum + value;
            }, 0);

            const average = total / currentYearData.length;
            return average.toFixed(1);
        } catch (error) {
            console.error("Error calculating freedom index:", error);
            return "N/A";
        }
    };

    // Pagination component (same as before)
    const Pagination = ({ currentPage, totalPages, onPageChange, totalEntries, entriesPerPage, indexOfFirstEntry, indexOfLastEntry }) => {
        const pages = [];

        // Calculate showing range
        const showingFirst = totalEntries === 0 ? 0 : indexOfFirstEntry + 1;
        const showingLast = Math.min(indexOfLastEntry, totalEntries);

        // Always show first page
        if (totalPages > 0) {
            pages.push(1);
        }

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
                    Showing <span className="font-semibold">{showingFirst}</span> to <span className="font-semibold">{showingLast}</span> of <span className="font-semibold">{totalEntries}</span> entries
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
                                        ? 'bg-[#b39000] text-white'
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

    // Handle entries per page change
    const handleEntriesPerPageChange = (value) => {
        const newEntriesPerPage = Number(value);
        setEntriesPerPage(newEntriesPerPage);
        setCurrentPageLeft(1);
        setCurrentPageRight(1);
    };

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
                                <div className="text-3xl md:text-2xl font-bold text-[#b39000]">
                                    {getVisaFreeFreedomIndex()}%
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-sm font-medium text-gray-700">
                                    Select Year:
                                </div>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b39000] focus:border-transparent bg-white"
                                >
                                    {availableYears.length > 0 ? (
                                        availableYears.map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))
                                    ) : (
                                        <option value={selectedYear}>{selectedYear}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Year Display */}
                {/* <div className="text-center mb-8">
                    <div className="inline-block bg-[#ffdc4d] text-black px-6 py-2 rounded-full font-semibold">
                        {currentYearData.length > 0 ? (
                            `Showing Data for ${selectedYear} (${currentYearData.length} countries)`
                        ) : (
                            `No data available for ${selectedYear}`
                        )}
                    </div>
                </div> */}

                {/* Two Tables Section - Only show if we have data */}
                {currentYearData.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Table - Visa-Free Travel Index */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Countries with the Highest Visa-Free Travel Index ({selectedYear})
                                </h3>
                            </div>

                            <div className="p-6">
                                {/* Table Controls */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">Show</span>
                                        <select
                                            value={entriesPerPage}
                                            onChange={(e) => handleEntriesPerPageChange(e.target.value)}
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
                                            value={searchTermLeft}
                                            onChange={(e) => setSearchTermLeft(e.target.value)}
                                            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b39000] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-[#ffdc4d]">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Ranking
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Country Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Country Code
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Population (Millions)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Visa-Free Travel Index
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentEntriesLeft.length > 0 ? (
                                                currentEntriesLeft.map((item) => (
                                                    <tr key={`${item.code}-${item.rank}`} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.rank}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <button
                                                                onClick={() => handleCountryClick(item.country)}
                                                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                                                            >
                                                                {item.country}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {item.code}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {item.population}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                {item.freedomIndex}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                        No matching results
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination for Left Table */}
                                {filteredDataLeft.length > 0 && (
                                    <Pagination
                                        currentPage={currentPageLeft}
                                        totalPages={totalPagesLeft}
                                        onPageChange={setCurrentPageLeft}
                                        totalEntries={filteredDataLeft.length}
                                        entriesPerPage={entriesPerPage}
                                        indexOfFirstEntry={indexOfFirstEntryLeft}
                                        indexOfLastEntry={indexOfLastEntryLeft}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Table - Visa-Free Welcome Index */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Countries with the Highest Visa-Free Welcome Index ({selectedYear})
                                </h3>
                            </div>

                            <div className="p-6">
                                {/* Table Controls */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">Show</span>
                                        <select
                                            value={entriesPerPage}
                                            onChange={(e) => handleEntriesPerPageChange(e.target.value)}
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
                                            value={searchTermRight}
                                            onChange={(e) => setSearchTermRight(e.target.value)}
                                            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b39000] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-[#ffdc4d]">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Ranking
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Country Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Country Code
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Population (Millions)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Visa-Free Welcome Index
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentEntriesRight.length > 0 ? (
                                                currentEntriesRight.map((item, index) => (
                                                    <tr key={`${item.code}-${index}`} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.rank}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <button
                                                                onClick={() => handleCountryClick(item.country)}
                                                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                                                            >
                                                                {item.country}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {item.code}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {item.population}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                                {item.welcomeIndex}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                        No matching results
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination for Right Table */}
                                {filteredDataRight.length > 0 && (
                                    <Pagination
                                        currentPage={currentPageRight}
                                        totalPages={totalPagesRight}
                                        onPageChange={setCurrentPageRight}
                                        totalEntries={filteredDataRight.length}
                                        entriesPerPage={entriesPerPage}
                                        indexOfFirstEntry={indexOfFirstEntryRight}
                                        indexOfLastEntry={indexOfLastEntryRight}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold text-yellow-800 mb-4">
                                No Data Available for {selectedYear}
                            </h3>
                            <p className="text-yellow-700 mb-6">
                                Please select a different year from the dropdown above.
                            </p>
                            <div className="text-sm text-yellow-600">
                                Available years: {availableYears.join(', ')}
                            </div>
                        </div>
                    </div>
                )}

                {/* Pass selected year to chart */}
                <VisaFreeChart selectedYear={selectedYear} />

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Data source: Human Freedom Index • {currentYearData.length > 0 ? `Showing data for ${selectedYear}` : `No data for ${selectedYear}`}
                    </p>
                </div>
            </div>
        </div>
    );
}