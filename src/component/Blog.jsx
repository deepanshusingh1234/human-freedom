import React from 'react';

const blogPosts = [
    {
        id: 1,
        date: '06 Sep',
        title: 'Traveling Visa-Free, but Not Reciprocating',
        content: `A number of countries citizens' benefit from traveling visa-free–yet they do not reciprocate this privilege. Countries with the biggest difference between their Visa-Free Travel and Visa-Free Welcome Indices in 2015 are (with Visa-Free Travel and Visa-Free Welcome Indices, respectively, in parentheses):`,
        stats: [
            { country: 'Japan', difference: '59%', travel: '81%', welcome: '21%' },
            { country: 'Canada', difference: '44%', travel: '59%', welcome: '16%' },
            { country: 'United States', difference: '43%', travel: '59%', welcome: '16%' },
            { country: 'Puerto Rico', difference: '42%', travel: '59%', welcome: '16%' },
            { country: 'Sweden', difference: '42%', travel: '65%', welcome: '23%' },
            { country: 'Norway', difference: '41%', travel: '64%', welcome: '23%' },
            { country: 'Finland', difference: '41%', travel: '65%', welcome: '23%' },
            { country: 'France', difference: '41%', travel: '64%', welcome: '23%' },
            { country: 'United Kingdom', difference: '41%', travel: '63%', welcome: '22%' },
            { country: 'Belgium', difference: '41%', travel: '64%', welcome: '23%' }
        ],
        content2: `On the other hand, countries with the greatest difference in their Visa-Free Welcome and Visa-Free Travel Indices in 2015 are:`,
        stats2: [
            { country: 'Cook Islands', difference: '-89%', travel: '11%', welcome: '100%' },
            { country: 'Comoros', difference: '-88%', travel: '12%', welcome: '100%' },
            { country: 'Madagascar', difference: '-99%', travel: '12%', welcome: '100%' },
            { country: 'Mauritania', difference: '-86%', travel: '14%', welcome: '100%' },
            { country: 'Uganda', difference: '-86%', travel: '14%', welcome: '100%' },
            { country: 'Guinea-Bissau', difference: '-85%', travel: '15%', welcome: '100%' },
            { country: 'Togo', difference: '-84%', travel: '16%', welcome: '100%' },
            { country: 'Mozambique', difference: '-71%', travel: '29%', welcome: '100%' },
            { country: 'Djibouti', difference: '-70%', travel: '29%', welcome: '99%' },
            { country: 'Turkey', difference: '-69%', travel: '31%', welcome: '100%' }
        ],
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 2,
        date: '01 Sep',
        title: '5-Year Visa-Free Welcome Gainers–and Laggards',
        content: `Over the past 5-year period, from 2010 to 2015 the average Visa-Free Welcome Index gained 5.9%. Leaders of visa-free welcome over that period are (with percentage point gains of their Visa-Free Welcome Indices):`,
        stats: [
            { country: 'Guinea-Bissau', gain: '96%' },
            { country: 'Kenya', gain: '94%' },
            { country: 'Mauritania', gain: '94%' },
            { country: 'Laos', gain: '92%' },
            { country: 'Myanmar', gain: '82%' }
        ],
        content2: `The laggards decline was significant–as they tightened their visa-free welcome. Most significant ones are:`,
        stats2: [
            { country: 'Turks and Caicos', decline: '-37%' },
            { country: 'Virgin Islands', decline: '-31%' },
            { country: 'Pakistan', decline: '-19%' },
            { country: 'Saint Vincent and the Grenadines', decline: '-19%' },
            { country: 'Hong Kong', decline: '-18%' }
        ],
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 3,
        date: '16 Aug',
        title: '5-Year Visa-Free Travel Gainers–and Laggards',
        content: `Most countries' Visa-Free Travel Index increased over the past 5-year period, from 2010 to 2015. For the 214 countries we follow, the average increase in the Visa-Free Travel Index was 13% points over this period.`,
        stats: [
            { label: 'Five countries with the greatest increase:', gain: null },
            { country: 'Macau', gain: '45%' },
            { country: 'Seychelles', gain: '45%' },
            { country: 'Hong Kong', gain: '41%' },
            { country: 'Bahamas', gain: '38%' },
            { country: 'Mauritius', gain: '37%' }
        ],
        content2: `Three countries' Visa-Free Travel Indices decreased over this time period. They are:`,
        stats2: [
            { country: 'Iran', decline: '-4%' },
            { country: 'Iraq', decline: '-1%' },
            { country: 'South Africa', decline: '-1%' }
        ],
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 4,
        date: '07 Aug',
        title: 'Visa-Free Freedom Index Reaches All-Time High in 2015',
        content: `At 37.2%, Visa-Free Freedom Index reached its highest ever value in 2015–since the index was introduced, for 2006. At the same time, the index notched its fourth consecutive year of growth, after three years of treading water, in the 2009 to 2011 period.`,
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 5,
        date: '30 Jul',
        title: 'Asian Countries Lead the List of Countries with Highest Visa-Free Travel Indices',
        content: `All top four countries in the world, ranked by the Visa-Free Travel Index in 2015, are in Asia, and so are five out of the top 6. In the top ten list there is only one from the Americas—the Bahamas; remaining four are from Europe.`,
        stats: [
            { label: 'Countries making up the top ten list are (in that order):', gain: null },
            { country: 'Japan', position: 1 },
            { country: 'Singapore', position: 2 },
            { country: 'Hong Kong', position: 3 },
            { country: 'Macau', position: 4 },
            { country: 'The Bahamas', position: 5 },
            { country: 'South Korea', position: 6 },
            { country: 'Sweden', position: 7 },
            { country: 'Finland', position: 8 },
            { country: 'Norway', position: 9 },
            { country: 'France', position: 10 }
        ],
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 6,
        date: '13 Jul',
        title: 'Nineteen Welcoming Countries in 2015 vs. Eighteen in 2014',
        content: `Nineteen countries welcome all the world's citizens without a visa in 2015. They are, in alphabetical order:`,
        list: [
            'Comoros',
            'Cook Islands',
            'Dominica',
            'Guinea-Bissau',
            'Kenya',
            'Laos',
            'Macau',
            'Madagascar',
            'Maldives',
            'Mauritania',
            'Micronesia, Federated States of',
            'Mozambique',
            'Saint Kitts and Nevis',
            'Seychelles',
            'Timor-Leste',
            'Togo',
            'Turkey',
            'Tuvalu',
            'Uganda'
        ],
        content2: `Three countries are new to the list: Kenya, Mauritania, and Turkey. Two dropped from the list, however: Samoa (introducing visas for a number of EU countries) and Sri Lanka (introducing visas for citizens of Pakistan and several primarily African countries).`,
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 7,
        date: '06 Jul',
        title: 'Consistent, 10-Year Champions of Welcome',
        content: `Ten countries, of the 214 we track, have been welcoming all the citizens of the world, not requiring visas for a visit—for ten years now, year after year, consistently. We recognize, celebrate—and thank—these champions of welcome: they are, in alphabetical order:`,
        list: [
            'Comoros',
            'Cook Islands',
            'Macau',
            'Maldives',
            'Micronesia',
            'Mozambique',
            'Timor-Leste',
            'Togo',
            'Tuvalu',
            'Uganda'
        ],
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    },
    {
        id: 8,
        date: '30 Jun',
        title: 'Japanese Citizens the World\'s Most Visa-Free Travelers—for the 10th Year in a Row',
        content: `Japanese citizens remain the world's least visa-encumbered travelers in 2015; they are able to visit 81% of the world's population without having to obtain a visa. 2015 is the tenth year in a row that Japan claims the top spot in our ranking of countries by the Visa-Free Travel Index.`,
        author: 'Saša Zorović',
        category: 'Uncategorized',
        comments: 0
    }
];

const BlogCard = ({ post }) => {
    return (
        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-8">
                {/* Date Badge */}
                <div className="mb-4">
                    <span className="inline-block bg-[#b39000] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {post.date}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[#b39000] transition-colors duration-200">
                    {post.title}
                </h2>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {/* Stats Table for first type */}
                    {post.stats && (
                        <div className="mb-6 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                        {post.stats[0]?.difference && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                                        )}
                                        {post.stats[0]?.travel && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Index</th>
                                        )}
                                        {post.stats[0]?.welcome && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Welcome Index</th>
                                        )}
                                        {post.stats[0]?.gain && post.stats[0].gain !== null && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain</th>
                                        )}
                                        {post.stats[0]?.decline && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decline</th>
                                        )}
                                        {post.stats[0]?.position && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {post.stats.map((stat, idx) => (
                                        <tr key={idx} className={stat.label ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                                            <td className={`px-4 py-3 text-sm ${stat.label ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                                {stat.country || stat.label}
                                            </td>
                                            {stat.difference && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.difference.startsWith('-') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {stat.difference}
                                                    </span>
                                                </td>
                                            )}
                                            {stat.travel && (
                                                <td className="px-4 py-3 text-sm font-medium text-blue-600">
                                                    {stat.travel}
                                                </td>
                                            )}
                                            {stat.welcome && (
                                                <td className="px-4 py-3 text-sm font-medium text-green-600">
                                                    {stat.welcome}
                                                </td>
                                            )}
                                            {stat.gain !== undefined && stat.gain !== null && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {stat.gain}
                                                    </span>
                                                </td>
                                            )}
                                            {stat.decline && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        {stat.decline}
                                                    </span>
                                                </td>
                                            )}
                                            {stat.position && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b39000] text-white text-sm font-bold">
                                                        {stat.position}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* List items */}
                    {post.list && (
                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {post.list.map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-[#b39000]"></div>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Second content section */}
                    {post.content2 && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{post.content2}</p>
                    )}

                    {/* Second stats table */}
                    {post.stats2 && (
                        <div className="mb-6 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                        {post.stats2[0]?.difference && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                                        )}
                                        {post.stats2[0]?.travel && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Index</th>
                                        )}
                                        {post.stats2[0]?.welcome && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Welcome Index</th>
                                        )}
                                        {post.stats2[0]?.gain && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain</th>
                                        )}
                                        {post.stats2[0]?.decline && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decline</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {post.stats2.map((stat, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{stat.country}</td>
                                            {stat.difference && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.difference.startsWith('-') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {stat.difference}
                                                    </span>
                                                </td>
                                            )}
                                            {stat.travel && (
                                                <td className="px-4 py-3 text-sm font-medium text-blue-600">
                                                    {stat.travel}
                                                </td>
                                            )}
                                            {stat.welcome && (
                                                <td className="px-4 py-3 text-sm font-medium text-green-600">
                                                    {stat.welcome}
                                                </td>
                                            )}
                                            {stat.gain && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {stat.gain}
                                                    </span>
                                                </td>
                                            )}
                                            {stat.decline && (
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        {stat.decline}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer with author and comments */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#b39000] flex items-center justify-center text-white font-bold">
                            SZ
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.category}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-[#b39000] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span className="text-sm">{post.comments} Comments</span>
                        </button>
                        <button className="text-[#b39000] hover:text-[#8a7000] font-medium text-sm transition-colors">
                            Read more →
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default function Blog() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#b39000] to-[#ffdc4d] py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-4">Visa-Free Freedom Blog</h1>
                        <p className="text-xl text-white/90 mb-8">
                            Insights, analysis, and updates on global visa-free travel trends and policies
                        </p>
                        <div className="flex justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-flex items-center">
                                <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search blog posts..."
                                    className="bg-transparent border-none text-white placeholder-white/70 focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
                            <p className="text-gray-600">Stay updated with the latest insights on visa-free travel</p>
                        </div>

                        <div className="space-y-8">
                            {blogPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                                    Previous
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-[#b39000] text-white">1</button>
                                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                                    2
                                </button>
                                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                                    3
                                </button>
                                <span className="px-2 text-gray-500">...</span>
                                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-8 space-y-8">
                            {/* About Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Blog</h3>
                                <p className="text-gray-600 mb-4">
                                    Dive deep into visa-free travel data, trends, and policies. We analyze global mobility patterns to help you understand the freedom of movement worldwide.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#b39000] to-[#ffdc4d] flex items-center justify-center text-white font-bold text-lg">
                                        SZ
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Saša Zorović</p>
                                        <p className="text-sm text-gray-500">Lead Analyst & Writer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {['Trend Analysis', 'Country Rankings', 'Policy Updates', 'Historical Data', 'Regional Insights'].map((category, idx) => (
                                        <button
                                            key={idx}
                                            className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <span className="text-gray-700 group-hover:text-[#b39000]">{category}</span>
                                            <span className="text-sm text-gray-400">12</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Posts */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Posts</h3>
                                <div className="space-y-4">
                                    {blogPosts.slice(0, 3).map((post) => (
                                        <a
                                            key={post.id}
                                            href="#"
                                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-r from-[#b39000] to-[#ffdc4d] flex items-center justify-center text-white text-sm font-bold">
                                                {post.date.split(' ')[0]}<br />{post.date.split(' ')[1]}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 group-hover:text-[#b39000] line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{post.author}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-r from-[#b39000] to-[#ffdc4d] rounded-xl shadow-lg p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                                <p className="mb-4 text-white/90">
                                    Subscribe to get the latest visa-free travel insights delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button className="w-full bg-white text-[#b39000] font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Stats */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-12 mt-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Key Blog Statistics</h2>
                        <p className="text-gray-600 mt-2">Our blog in numbers</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Posts', value: '48+' },
                            { label: 'Countries Covered', value: '214' },
                            { label: 'Years of Data', value: '15' },
                            { label: 'Monthly Readers', value: '10K+' }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                                <div className="text-4xl font-bold text-[#b39000] mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}