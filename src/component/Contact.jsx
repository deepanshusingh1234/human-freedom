import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (value.length < 2) return 'Name is too short';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                return '';
            case 'subject':
                if (!value.trim()) return 'Subject is required';
                if (value.length < 5) return 'Subject is too short';
                return '';
            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.length < 20) return 'Message must be at least 20 characters';
                if (value.length > 1000) return 'Message must be less than 1000 characters';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate on change
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        // Submit if no errors
        if (Object.keys(newErrors).length === 0) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Form submitted:', formData);
                setIsSubmitted(true);

                // Reset form after submission
                setTimeout(() => {
                    setFormData({ fullName: '', email: '', subject: '', message: '' });
                    setIsSubmitted(false);
                }, 3000);
            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            details: "contact@hf.com",
            description: "We typically respond within 24 hours"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            ),
            title: "Join Discussion",
            details: "Community Forum",
            description: "Share insights with other travelers"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Response Time",
            details: "24-48 Hours",
            description: "During business days"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in <span className="text-[#b39000]">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        We value your feedback and insights about global visa-free travel
                    </p>

                    {/* Decorative elements */}
                    <div className="flex justify-center space-x-2 mb-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-[#b39000]"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Welcome Card */}
                        <div className="bg-gradient-to-r from-[#b39000] to-[#ffdc4d] rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">We Value Your Input</h2>
                                    <p className="text-white/90">
                                        Do you have a comment about the indices, the data, or the calculations?
                                        Want to share your opinion? We'd love to hear from you.
                                    </p>
                                </div>
                            </div>
                            <p className="text-white/80 italic border-l-4 border-white/30 pl-4 py-2">
                                "Your insights help us improve our data and provide better analysis
                                of global visa-free travel patterns."
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Share Your Insights
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Data Accuracy</h4>
                                        <p className="text-gray-600">
                                            Found discrepancies in our data? Help us maintain the most
                                            accurate visa-free travel database by reporting any issues.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Methodology Feedback</h4>
                                        <p className="text-gray-600">
                                            Have suggestions about how we calculate our indices?
                                            We're always looking to improve our methodology.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Feature Requests</h4>
                                        <p className="text-gray-600">
                                            Want to see new features or data visualizations?
                                            Tell us what would make your experience better.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-2 bg-[#ffdc4d] rounded-lg">
                                            {info.icon}
                                        </div>
                                        <h4 className="font-bold text-gray-900">{info.title}</h4>
                                    </div>
                                    <p className="text-[16px] font-semibold text-[#b39000] mb-1">{info.details}</p>
                                    <p className="text-sm text-gray-500">{info.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-gray-600">
                                Fill out the form below and we'll get back to you as soon as possible
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">
                                    Thank you for reaching out. We'll review your message and get back to you within 24-48 hours.
                                </p>
                                <div className="animate-pulse">
                                    <div className="h-2 bg-gray-200 rounded-full w-48 mx-auto"></div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-[#b39000] focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                                                placeholder="John Doe"
                                            />
                                            {errors.fullName && (
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-[#b39000] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">
                                        Subject *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-[#b39000] focus:border-transparent transition-all ${errors.subject ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                                            placeholder="What's this regarding?"
                                        />
                                        {errors.subject && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">
                                        Your Message *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-[#b39000] focus:border-transparent transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                                            placeholder="Share your thoughts, questions, or feedback..."
                                            maxLength="1000"
                                        />
                                        {errors.message && (
                                            <div className="absolute right-3 top-4">
                                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.message && (
                                            <p className="text-red-500 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.message}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-sm ml-auto">
                                            <span className={formData.message.length > 900 ? 'text-red-500' : ''}>
                                                {formData.message.length}
                                            </span>
                                            /1000 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${isLoading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-[#b39000] to-[#ffdc4d] hover:from-[#a38200] hover:to-[#f4d347] shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>

                                <p className="text-center text-gray-500 text-sm mt-4">
                                    By submitting this form, you agree to our privacy policy and consent to
                                    being contacted regarding your inquiry.
                                </p>
                            </form>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
}