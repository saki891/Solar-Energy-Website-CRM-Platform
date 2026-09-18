import React from "react";

export default function Faqs() {
  const faqList = [
    {
      question: "How long does a typical solar panel installation take?",
      answer: "Most residential installations take 1 to 3 days. Commercial projects take 1 to 3 weeks.",
    },
    {
      question: "Will my property remain connected to the electrical grid?",
      answer: "Yes, your system remains connected via a net meter for power credits.",
    },
    {
      question: "What maintenance is required for rooftop solar panels?",
      answer: "Solar panels require minimal maintenance, mostly occasional cleaning and annual inspection.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          FAQs Management
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Manage frequently asked questions and support content for customers.
        </p>
      </div>

      <div className="space-y-4">
        {faqList.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-5 shadow-sm space-y-2"
          >
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {faq.question}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
