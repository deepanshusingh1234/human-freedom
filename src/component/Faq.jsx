import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
    {
        id: 1,
        question: "Does length of visa-free stay influence visa-free travel designation?",
        answer: `It certainly does. For the purposes of our analysis, we use the definition of "having time for visit, a walk, have tea or coffee together–and share a laugh." That is, if a person can come to a country without having to have a visa, spending a couple of days meeting others for tea or coffee, going for a walk, sharing a laugh–then we consider that to be visa-free travel and visa-free welcome. We consider that a transit of 24 or 48 hours, without leaving the port of entry (airport, port) is not sufficient for that. On the other hand, we do recognize that visa-free stay of three months represents greater visa-free travel and greater visa-free welcome than one for a week. An expanded, more nuanced definition of visa-free travel (and welcome) would account for that. In our case, and for our purposes, we opt to not capture these subtleties and stay closer to our definition from above.`
    },
    {
        id: 2,
        question: "How often is the data updated?",
        answer: `We update the data once a year, each October, for the newly released visa-free travel data. However, if we notice any discrepancies in the data during the year, we update them right away.`
    },
    {
        id: 3,
        question: "How is the Visa-Free Freedom Index calculated?",
        answer: `Visa-Free Freedom Index is calculated one of two ways. One way is through the Visa-Free Travel Index; it is calculated by multiplying each country's Visa-Free Travel Index by its population and then dividing the sum by the total population of the world. The other way is through the Visa-Free Welcome Index; it is calculated by multiplying each country's Visa-Free Welcome Index by its population and then dividing the sum by the total population of the world. Both methods lead to the same result.`
    },
    {
        id: 4,
        question: "What does the Visa-Free Freedom Index mean?",
        answer: `Visa-Free Freedom Index has two meanings; they are equivalent to one another. On one hand, it indicates what percentage of the world's population an average person in the world can visit without a visa. On the other hand, it indicates what percentage of the world's population can visit an average person in the world without requiring a visa.`
    },
    {
        id: 5,
        question: "What does the Visa-Free Welcome Index mean?",
        answer: `The Visa-Free Welcome Index indicates what percentage of the world's population can visit a country without having to obtain a visa.`
    },
    {
        id: 6,
        question: "What does the Visa-Free Travel Index mean?",
        answer: `Visa-Free Travel Index, for a country, represents the percentage of the world's population that citizens of that country can visit without having to obtain a visa.`
    },
    {
        id: 7,
        question: "What is the source of the data?",
        answer: `We rely for our data on two primary sources. The first is the International Air Transport Association (IATA) TIM Manuals for the sources of visa requirements. IATA (at www.iata.org) tracks and reports, on an ongoing basis, visa requirements for all the countries in the world. The second source is the United States Census Bureau (at www.census.gov) that tracks and reports population figures for all countries around the world.`
    },
    {
        id: 8,
        question: "How is the Visa-Free Welcome Index calculated?",
        answer: `Visa-Free Welcome Index for a country is calculated by dividing the population of all the countries that can visit this country without a visa by the total population of the world.`
    }
];

export default function Faq() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions about visa-free travel, our data sources,
                        and how we calculate our indices.
                    </p>
                </div>

                {/* FAQ Items Container */}
                <div className="max-w-4xl mx-auto">
                    {faqItems.map((item) => (
                        <div
                            key={item.id}
                            className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleQuestion(item.id)}
                                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 hover:bg-[#fffae6] transition-colors duration-200"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#cca400] to-[#ffd21a] rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {item.id}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                            {item.question}
                                        </h3>

                                    </div>
                                </div>

                                {/* Chevron Icon */}
                                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openQuestion === item.id ? 'rotate-180' : 'rotate-0'
                                    }`}>
                                    <div className="w-10 h-10 bg-[#fff5cc] rounded-full flex items-center justify-center">
                                        {openQuestion === item.id ? (
                                            <ChevronUp className="w-5 h-5 text-black" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-black" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {/* Answer Content */}
                            <div
                                className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openQuestion === item.id
                                    ? 'max-h-[1000px] pb-6'
                                    : 'max-h-0'
                                    }`}
                            >
                                <div className="pt-6 border-t border-gray-100">
                                    <div className="prose prose-lg max-w-none text-gray-700">
                                        {item.answer.split('. ').map((sentence, index, array) => (
                                            <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                                                {sentence}{index < array.length - 1 ? '.' : ''}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Optional: Add a subtle background to answer */}
                                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-blue-700 font-medium">
                                                This information is based on our latest data and methodology.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Help Section */}
                <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Still have questions?
                        </h2>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                            Can't find the answer you're looking for? Our support team is here to help you with any additional questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                Contact Support
                            </button>
                            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}