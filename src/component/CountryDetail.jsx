// CountryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { visaFreeCountries } from '../Data/Data';

const CountryDetail = () => {
    const { countryId } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [countryData, setCountryData] = useState(null);
    const [viewMode, setViewMode] = useState('citizens'); // 'citizens' or 'visitors'
    const [currentPageLeft, setCurrentPageLeft] = useState(1);
    const [currentPageRight, setCurrentPageRight] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(25);
    const [searchTermLeft, setSearchTermLeft] = useState('');
    const [searchTermRight, setSearchTermRight] = useState('');

    const queryParams = new URLSearchParams(location.search);
    const yearParam = queryParams.get('year');
    const selectedYear = yearParam ? parseInt(yearParam) : 2006;

    // Sorting states for left table
    const [sortConfigLeft, setSortConfigLeft] = useState({
        key: 'country',
        direction: 'asc'
    });

    // Sorting states for right table
    const [sortConfigRight, setSortConfigRight] = useState({
        key: 'country',
        direction: 'asc'
    });

    useEffect(() => {
        setLoading(true);

        // Simulate loading
        setTimeout(() => {
            // Find the data for the selected year
            const yearData = visaFreeCountries.find(y => y.year === selectedYear);

            if (!yearData) {
                console.error('Year data not found:', selectedYear);
                setLoading(false);
                return;
            }

            const countryKey = countryId.toLowerCase();

            if (yearData.countries && yearData.countries[countryKey]) {
                setCountryData(yearData.countries[countryKey]);
            } else {
                console.error('Country not found:', countryKey, 'in year', selectedYear);
            }
            setLoading(false);
        }, 500);
    }, [countryId, selectedYear]); // Add selectedYear to dependency array

    // Sort icon component
    const SortIcon = ({ columnKey, sortConfig }) => {
        if (sortConfig.key !== columnKey) {
            return (
                <span className="ml-1 opacity-30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </span>
            );
        }

        return (
            <span className="ml-1">
                {sortConfig.direction === 'asc' ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </span>
        );
    };

    // Function to sort data
    const sortData = (data, sortConfig) => {
        if (!data.length || !sortConfig.key) return data;

        return [...data].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle numeric values (population)
            if (sortConfig.key === 'population') {
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
            }
            // Handle calculated percentage
            else if (sortConfig.key === 'percentage') {
                aValue = parseFloat(calculatePercentage(a.population).replace('%', '')) || 0;
                bValue = parseFloat(calculatePercentage(b.population).replace('%', '')) || 0;
            }
            // Handle string comparison for country name
            else if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    // Function to handle sort for left table
    const handleSortLeft = (key) => {
        setSortConfigLeft(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
        setCurrentPageLeft(1);
    };

    // Function to handle sort for right table
    const handleSortRight = (key) => {
        setSortConfigRight(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
        setCurrentPageRight(1);
    };

    // Calculate percentage for each country
    const calculatePercentage = (countryPopulation) => {
        const worldPopulation = 8000; // Example: 8 billion total world population
        const populationValue = parseFloat(countryPopulation);
        const percentage = ((populationValue / worldPopulation) * 100).toFixed(2);
        return `${percentage}%`;
    };

    // Calculate total entries based on current view mode
    const getTotalEntries = () => {
        if (!countryData) return 0;

        if (viewMode === 'citizens') {
            return (countryData.citizensVisaFree?.length || 0) +
                (countryData.citizensVisaRequired?.length || 0);
        } else {
            return (countryData.visaFreeForVisitors?.length || 0) +
                (countryData.visaRequiredForVisitors?.length || 0);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl">Loading country data...</div>
            </div>
        );
    }

    if (!countryData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-red-600">Country data not found</div>
            </div>
        );
    }

    const handleVisaFreeClick = () => {
        setViewMode('citizens');
        setCurrentPageLeft(1);
        setCurrentPageRight(1);
        // Reset sorting to default when switching view mode
        setSortConfigLeft({ key: 'country', direction: 'asc' });
        setSortConfigRight({ key: 'country', direction: 'asc' });
        setSearchTermLeft('');
        setSearchTermRight('');
    };

    const handleWelcomeIndexClick = () => {
        setViewMode('visitors');
        setCurrentPageLeft(1);
        setCurrentPageRight(1);
        // Reset sorting to default when switching view mode
        setSortConfigLeft({ key: 'country', direction: 'asc' });
        setSortConfigRight({ key: 'country', direction: 'asc' });
        setSearchTermLeft('');
        setSearchTermRight('');
    };

    const getTableTitles = () => {
        if (viewMode === 'citizens') {
            return {
                leftTitle: `Countries Citizens of ${countryData.name} Can Visit Without a Visa`,
                rightTitle: `Countries for Which Citizens of ${countryData.name} Need a Visa`
            };
        } else {
            return {
                leftTitle: `Countries Whose Citizens Do Not Need a Visa to Visit ${countryData.name}`,
                rightTitle: `Countries Whose Citizens Do Need a Visa to Visit ${countryData.name}`
            };
        }
    };

    const getTableData = () => {
        if (viewMode === 'citizens') {
            return {
                leftData: countryData.citizensVisaFree || [],
                rightData: countryData.citizensVisaRequired || []
            };
        } else {
            return {
                leftData: countryData.visaFreeForVisitors || [],
                rightData: countryData.visaRequiredForVisitors || []
            };
        }
    };

    // Filter data based on search terms
    const filterData = (data, searchTerm) => {
        if (!searchTerm) return data;
        return data.filter(item =>
            item.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const { leftTitle, rightTitle } = getTableTitles();
    const { leftData, rightData } = getTableData();

    // Filter and sort data for left table
    const filteredLeftData = filterData(leftData, searchTermLeft);
    const sortedLeftData = sortData(filteredLeftData, sortConfigLeft);

    // Filter and sort data for right table
    const filteredRightData = filterData(rightData, searchTermRight);
    const sortedRightData = sortData(filteredRightData, sortConfigRight);

    // Paginate sorted data
    const paginateData = (data, currentPage) => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        return data.slice(startIndex, endIndex);
    };

    const paginatedLeftData = paginateData(sortedLeftData, currentPageLeft);
    const paginatedRightData = paginateData(sortedRightData, currentPageRight);

    // Calculate total pages for each table
    const totalPagesLeft = Math.ceil(sortedLeftData.length / entriesPerPage);
    const totalPagesRight = Math.ceil(sortedRightData.length / entriesPerPage);

    // Pagination component
    const Pagination = ({ currentPage, totalPages, onPageChange, totalEntries }) => {
        const pages = [];

        // Always show first page if exists
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

        const startEntry = ((currentPage - 1) * entriesPerPage) + 1;
        const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

        return (
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                    Showing <span className="font-semibold">{startEntry}</span> to <span className="font-semibold">{endEntry}</span> of <span className="font-semibold">{totalEntries}</span> entries
                </div>

                {totalPages > 0 && (
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
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-white py-2">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{countryData.name}</h1>
                        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-md">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                                {/* Visa-Free Travel Index - Clickable */}
                                <div
                                    className="flex-1 text-center cursor-pointer group p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                    onClick={handleVisaFreeClick}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className={`text-xl md:text-3xl font-bold transition-all duration-200 ${viewMode === 'citizens'
                                            ? 'text-blue-700'
                                            : 'text-blue-600 group-hover:text-blue-700'
                                            }`}>
                                            {countryData.visaFreeIndex}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-700">Visa-Free Travel Index</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block h-16 w-px bg-gray-300"></div>
                                <div className="md:hidden w-full h-px bg-gray-300 my-4"></div>

                                {/* Visa-Free Welcome Index - Clickable */}
                                <div
                                    className="flex-1 text-center cursor-pointer group p-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                    onClick={handleWelcomeIndexClick}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className={`text-xl md:text-3xl font-bold transition-all duration-200 ${viewMode === 'visitors'
                                            ? 'text-green-700'
                                            : 'text-green-600 group-hover:text-green-700'
                                            }`}>
                                            {countryData.visaFreeWelcomeIndex}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-700">Visa-Free Welcome Index</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Table */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {leftTitle}
                            </h2>
                        </div>

                        <div className="p-6">
                            {/* Table Controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => {
                                            setEntriesPerPage(Number(e.target.value));
                                            setCurrentPageLeft(1);
                                            setCurrentPageRight(1);
                                        }}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">entries</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={searchTermLeft}
                                        onChange={(e) => {
                                            setSearchTermLeft(e.target.value);
                                            setCurrentPageLeft(1);
                                        }}
                                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#ffdc4d]">
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortLeft('country')}
                                            >
                                                <div className="flex items-center">
                                                    Country
                                                    <SortIcon columnKey="country" sortConfig={sortConfigLeft} />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortLeft('population')}
                                            >
                                                <div className="flex items-center">
                                                    Population (Millions)
                                                    <SortIcon columnKey="population" sortConfig={sortConfigLeft} />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortLeft('percentage')}
                                            >
                                                <div className="flex items-center">
                                                    Percentage of World Population
                                                    <SortIcon columnKey="percentage" sortConfig={sortConfigLeft} />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedLeftData.length > 0 ? (
                                            paginatedLeftData.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.country}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                        {item.population}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                        {calculatePercentage(item.population)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No countries found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination for Left Table */}
                            <Pagination
                                currentPage={currentPageLeft}
                                totalPages={totalPagesLeft}
                                onPageChange={setCurrentPageLeft}
                                totalEntries={sortedLeftData.length}
                            />
                        </div>
                    </div>

                    {/* Right Table */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {rightTitle}
                            </h2>
                        </div>

                        <div className="p-6">
                            {/* Table Controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => {
                                            setEntriesPerPage(Number(e.target.value));
                                            setCurrentPageLeft(1);
                                            setCurrentPageRight(1);
                                        }}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">entries</span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={searchTermRight}
                                        onChange={(e) => {
                                            setSearchTermRight(e.target.value);
                                            setCurrentPageRight(1);
                                        }}
                                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#ffdc4d]">
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortRight('country')}
                                            >
                                                <div className="flex items-center">
                                                    Country
                                                    <SortIcon columnKey="country" sortConfig={sortConfigRight} />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortRight('population')}
                                            >
                                                <div className="flex items-center">
                                                    Population (Millions)
                                                    <SortIcon columnKey="population" sortConfig={sortConfigRight} />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-[#ffd633] transition-colors"
                                                onClick={() => handleSortRight('percentage')}
                                            >
                                                <div className="flex items-center">
                                                    Percentage of World Population
                                                    <SortIcon columnKey="percentage" sortConfig={sortConfigRight} />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedRightData.length > 0 ? (
                                            paginatedRightData.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.country}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                        {item.population}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                        {calculatePercentage(item.population)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No countries found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination for Right Table */}
                            <Pagination
                                currentPage={currentPageRight}
                                totalPages={totalPagesRight}
                                onPageChange={setCurrentPageRight}
                                totalEntries={sortedRightData.length}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Data source: Human Freedom Index • Last updated: January 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;