'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    question: '如何开始使用？',
    answer: '注册账号后，您可以立即开始使用我们的服务。我们提供详细的新手指南帮助您快速上手。',
    category: '入门指南'
  },
  {
    question: '支持哪些付款方式？',
    answer: '我们支持信用卡、PayPal 等多种支付方式，确保您能便捷地完成支付。',
    category: '支付相关'
  },
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">常见问题</h1>

      {/* 分类选择器 */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ 列表 */}
      <div className="space-y-4">
        {faqData
          .filter(item => item.category === selectedCategory)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800"
            >
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                {item.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.answer}
              </p>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
