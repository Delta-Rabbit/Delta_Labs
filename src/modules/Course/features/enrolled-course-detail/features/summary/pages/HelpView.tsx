/**
 * Delta Labs Fast Summary - Help View
 * Provides guidance and FAQs for using the Fast Summary feature
 */

import React from 'react';

const HelpView: React.FC = () => {
  const faqs = [
    {
      question: 'How do I generate a summary using AI?',
      answer: 'Click the "Generate Summary" button at the top right. You can enter a topic or prompt, select a roadmap, and the AI will create a comprehensive summary for you.',
    },
    {
      question: 'Can I edit my summaries?',
      answer: 'Yes! Go to the "My Summaries" tab, find the summary you want to edit, and click the pencil icon. You can modify the content, title, and tags.',
    },
    {
      question: 'Who can see my summaries?',
      answer: 'By default, summaries are private. If you choose to publish them to the Community or School tabs, they will be visible to other students.',
    },
    {
      question: 'What are reminders?',
      answer: 'Reminders in the right sidebar help you track summaries you need to review or finish reading. You can create reminders from any summary.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-3">How can we help you?</h1>
        <p className="text-text-secondary text-lg">
          Learn how to make the most of Fast Summary to accelerate your learning.
        </p>
      </div>

      {/* Quick Guides Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-border-primary hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">AI Generation</h3>
          <p className="text-text-secondary mb-4">
            Use our advanced AI to instantly summarize complex topics. Just provide a prompt and let the AI do the heavy lifting.
          </p>
          <div className="text-primary-600 font-medium text-sm flex items-center gap-1 cursor-pointer hover:underline">
            Try AI Generation <span aria-hidden="true">&rarr;</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border-primary hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Community Sharing</h3>
          <p className="text-text-secondary mb-4">
            Share your knowledge with peers. Publish your best summaries to the School or Community feeds to help others learn.
          </p>
          <div className="text-primary-600 font-medium text-sm flex items-center gap-1 cursor-pointer hover:underline">
            Explore Community <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-border-primary overflow-hidden">
        <div className="p-6 border-b border-border-primary bg-surface-secondary">
          <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-border-primary">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 hover:bg-surface-secondary/50 transition-colors">
              <h3 className="font-semibold text-text-primary mb-2">{faq.question}</h3>
              <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 text-center">
        <p className="text-text-secondary mb-4">Still have questions?</p>
        <button className="px-6 py-2.5 border border-border-primary hover:border-text-secondary text-text-primary font-medium rounded-lg transition-colors inline-flex items-center gap-2 bg-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Support
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HelpView;
