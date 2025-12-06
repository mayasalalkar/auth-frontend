import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { HelpCircle, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Help = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            question: "How do I update my profile?",
            answer: "You can update your profile information including name and email from the Settings page. Click on your avatar or the Settings icon in the sidebar."
        },
        {
            question: "Is my data secure?",
            answer: "Yes, we use industry-standard encryption to protect your data. Your password is hashed and we never store it in plain text."
        },
        {
            question: "How can I change my password?",
            answer: "Go to Settings > Security section to update your password. You'll need to know your current password."
        },
        {
            question: "Who do I contact for support?",
            answer: "You can use the contact form on this page to reach out to our support team directly."
        }
    ];

    const handleContactSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent! We will get back to you shortly.');
        e.target.reset();
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* FAQ Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                            <HelpCircle className="text-primary-600" />
                            Frequently Asked Questions
                        </h2>

                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                    className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    {faq.question}
                                    {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-400 text-sm bg-gray-50/50 dark:bg-gray-900/20">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                            <MessageCircle className="text-blue-600" />
                            Contact Support
                        </h2>

                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>General Inquiry</option>
                                    <option>Technical Issue</option>
                                    <option>Billing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Help;
