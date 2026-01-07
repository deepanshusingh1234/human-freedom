// components/VisaFreeChart.jsx
import React, { useState, useRef } from 'react';

const VisaFreeChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const chartContainerRef = useRef(null);

    // Sample data for the chart (years 2007-2016)
    const chartData = [
        { year: 2007, value: 23.2 },
        { year: 2008, value: 25.8 },
        { year: 2009, value: 24.4 },
        { year: 2010, value: 24.4 },
        { year: 2011, value: 24.4 },
        { year: 2012, value: 27.6 },
        { year: 2013, value: 36.1 },
        { year: 2014, value: 36.2 },
        { year: 2015, value: 37.2 },
        { year: 2016, value: 37.2 }
    ];

    // Chart dimensions and calculations
    const chartHeight = 400;
    const chartWidth = 900;
    const margin = { top: 50, right: 50, bottom: 80, left: 50 }; // Increased bottom margin for scrollbar
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Calculate scales
    const minValue = 0;
    const maxValue = 100;

    // Calculate y positions
    const getYPosition = (value) => {
        return innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
    };

    // Calculate x positions
    const getXPosition = (index) => {
        return (innerWidth / (chartData.length - 1)) * index;
    };

    const handleMouseMove = (e) => {
        if (!chartContainerRef.current) return;

        const rect = chartContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - margin.left;

        // Find the closest data point
        let closestIndex = 0;
        let minDistance = Infinity;

        chartData.forEach((_, index) => {
            const dataX = getXPosition(index);
            const distance = Math.abs(x - dataX);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setHoveredIndex(closestIndex);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Visa-Free Freedom Index over Time
            </h3>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                {/* Chart Container */}
                <div className="relative" style={{ height: `${chartHeight}px`, width: '100%' }}>
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between"
                        style={{ width: `${margin.left}px`, height: `${innerHeight}px`, marginTop: `${margin.top}px` }}>
                        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
                            <div key={value} className="text-xs text-gray-500 text-right pr-2">
                                {value}
                            </div>
                        ))}
                    </div>

                    {/* Chart area */}
                    <div
                        ref={chartContainerRef}
                        className="absolute cursor-crosshair"
                        style={{
                            left: `${margin.left}px`,
                            top: `${margin.top}px`,
                            width: `${innerWidth}px`,
                            height: `${innerHeight}px`
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Horizontal grid lines */}
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value, index) => (
                            <div
                                key={value}
                                className="absolute w-full border-t border-gray-200"
                                style={{
                                    top: `${getYPosition(value)}px`,
                                    height: '1px'
                                }}
                            />
                        ))}

                        {/* Vertical grid lines for years */}
                        {chartData.map((item, index) => (
                            <div
                                key={item.year}
                                className="absolute h-full border-l border-gray-200"
                                style={{
                                    left: `${getXPosition(index)}px`,
                                    width: '1px'
                                }}
                            />
                        ))}

                        {/* Chart line */}
                        <svg className="absolute w-full h-full" viewBox={`0 0 ${innerWidth} ${innerHeight}`}>
                            <path
                                d={`M ${chartData.map((item, index) =>
                                    `${getXPosition(index)} ${getYPosition(item.value)}`
                                ).join(' L ')}`}
                                fill="none"
                                stroke="#67b7dc"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Data points */}
                            {chartData.map((item, index) => (
                                <g key={item.year}>
                                    <circle
                                        cx={getXPosition(index)}
                                        cy={getYPosition(item.value)}
                                        r={hoveredIndex === index ? "6" : "4"}
                                        fill="white"
                                        stroke="#67b7dc"
                                        strokeWidth={hoveredIndex === index ? "3" : "2"}
                                        className="transition-all duration-150"
                                    />
                                    {hoveredIndex === index && (
                                        <circle
                                            cx={getXPosition(index)}
                                            cy={getYPosition(item.value)}
                                            r="12"
                                            fill="#67b7dc"
                                            fillOpacity="0.2"
                                            className="animate-pulse"
                                        />
                                    )}
                                </g>
                            ))}

                            {/* Hover vertical line */}
                            {hoveredIndex !== null && (
                                <g>
                                    <line
                                        x1={getXPosition(hoveredIndex)}
                                        y1="0"
                                        x2={getXPosition(hoveredIndex)}
                                        y2={innerHeight}
                                        stroke="#258cbb"
                                        strokeWidth="1"
                                        strokeDasharray="3,3"
                                    />
                                    <line
                                        x1="0"
                                        y1={getYPosition(chartData[hoveredIndex].value)}
                                        x2={innerWidth}
                                        y2={getYPosition(chartData[hoveredIndex].value)}
                                        stroke="#258cbb"
                                        strokeWidth="1"
                                        strokeDasharray="3,3"
                                        strokeOpacity="0.2"
                                    />
                                </g>
                            )}
                        </svg>

                        {/* Hover tooltip */}
                        {hoveredIndex !== null && (
                            <div
                                className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10"
                                style={{
                                    left: `${getXPosition(hoveredIndex)}px`,
                                    top: `${getYPosition(chartData[hoveredIndex].value) - 80}px`,
                                    transform: 'translateX(-50%)',
                                    minWidth: '140px'
                                }}
                            >
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">
                                        {chartData[hoveredIndex].year}
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {chartData[hoveredIndex].value}%
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Visa-Free Index
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-300"></div>
                            </div>
                        )}

                        {/* X-axis labels (years) */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between"
                            style={{ transform: 'translateY(30px)' }}>
                            {chartData.map((item, index) => (
                                <div
                                    key={item.year}
                                    className={`text-sm ${hoveredIndex === index ? 'font-bold text-blue-600' : 'text-gray-600'}`}
                                    style={{
                                        transform: 'translateX(-50%)',
                                        left: `${getXPosition(index)}px`,
                                        position: 'absolute',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {item.year}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrollbar area */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                        {/* Scrollbar track */}
                        <div className="absolute inset-0 bg-gray-200"></div>

                        {/* Scrollbar thumb */}
                        <div
                            className="absolute top-0 bottom-0 bg-blue-500 rounded-lg cursor-pointer"
                            style={{
                                left: '20%',
                                right: '20%',
                                background: 'linear-gradient(to right, #3b82f6, #1d4ed8)'
                            }}
                        >
                            {/* Scrollbar handle icons */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-1">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Year markers on scrollbar */}
                        <div className="absolute inset-0 flex justify-between px-2 items-center">
                            {chartData.filter((_, index) => index % 2 === 0).map((item) => (
                                <div key={item.year} className="text-xs text-gray-600 font-medium">
                                    {item.year}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scrollbar instructions */}
                    <div className="text-xs text-gray-500 text-center mt-2">
                        Drag to zoom • Use mouse wheel to scroll
                    </div>
                </div>


            </div>
        </div>
    );
};

export default VisaFreeChart;