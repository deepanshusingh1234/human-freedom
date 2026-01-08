import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">About Human Freedom Project</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                        The Visa-Free Welcome Index, Visa-Free Travel Index, and Visa-Free Freedom Index
                        have been created by <strong>Saša Zorović</strong> in order to put an objective
                        measure on visa-free travel and human freedom.
                    </p>

                    <blockquote className="border-l-4 border-[#ffd733] pl-4 italic text-gray-800 my-8">
                        Something that needs to be changed (i.e., human freedom improved, visa-free travel enhanced),
                        first needs to be measured. That was our motivation.
                    </blockquote>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Join Our Volunteer Effort</h2>
                    <p className="text-gray-700 mb-6">
                        As a volunteer effort, we are looking for those who would help us measure (track, document)
                        human freedom and help us provide factual evidence for improving human freedom. We are looking
                        for data analysts, researchers, opinion writers/bloggers…
                        <strong> Reach out, we would love to hear from you.</strong>
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">About Saša Zorović</h2>
                    <p className="text-gray-700 mb-4">
                        Saša Zorović is the founder of HumanFreedom.org and the creator of the Visa-Free Welcome,
                        Visa-Free Travel, and Visa-Free Freedom indices.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Education</h3>
                    <ul className="list-disc pl-5 text-gray-700 mb-6">
                        <li>AB from Harvard University</li>
                        <li>PhD and MBA from Stanford University</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Board Service</h3>
                    <p className="text-gray-700 mb-4">
                        Saša is on the Board of <strong>FRAXA Research Foundation</strong>—a cause he very deeply cares about.
                        FRAXA is a 501(c)3 organization which is dedicated to funding biomedical research for improved
                        treatment and a cure for fragile X, the leading inherited cause of intellectual disability and autism.
                    </p>
                    <a
                        href="https://www.fraxa.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#ffeb99] text-gray-600 px-6 py-2 rounded hover:bg-[#ffeb99] transition-colors"
                    >
                        Learn More About FRAXA
                    </a>
                </div>
            </div>
        </div>
    );
}