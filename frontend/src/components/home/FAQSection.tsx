'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS = [
  { question: "What is Ruby Calm Tea made of?", answer: "Ruby Calm Tea is made from 100% natural hibiscus blend with carefully selected herbs. It contains no artificial colors, flavors, or preservatives - just pure, natural ingredients." },
  { question: "Is it safe for everyone to drink?", answer: "Yes! Ruby Calm Tea is caffeine-free, vegan, and made from natural herbs. However, if you are pregnant, nursing, or have specific medical conditions, we recommend consulting with your doctor first." },
  { question: "How often should I drink it?", answer: "For best results, we recommend drinking 1-2 cups per day. You can enjoy it in the morning, afternoon, or evening as it is caffeine-free and won't affect your sleep." },
  { question: "How quickly will I see results?", answer: "Many people notice improvements in digestion and calmness within the first week. For benefits like hormone balance and skin glow, consistent use for 3-4 weeks typically shows noticeable results." },
  { question: "Does it really help with PCOS/PCOD?", answer: "Ruby Calm Tea contains herbs known to support hormone balance, which can be beneficial for PCOS/PCOD management. However, it should complement - not replace - medical treatment. Always consult your doctor." },
  { question: "How do I prepare the tea?", answer: "Simply add one tea bag or one teaspoon of loose tea to hot water (not boiling). Let it steep for 3-5 minutes, strain, and enjoy! You can add honey or lemon if desired." },
  { question: "Can I drink it if I have diabetes?", answer: "Yes! Ruby Calm Tea has no added sugar and may help support healthy blood sugar levels. However, please monitor your levels and consult with your healthcare provider." },
  { question: "What makes R-HerbalTea different from other herbal teas?", answer: "R-HerbalTea was created from personal experience and genuine care. We use only the highest quality natural herbs, with no preservatives or artificial ingredients. Plus, every blend is crafted with love and tested for real benefits." }
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  bgClass?: string;
}

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  subtitle = "", 
  faqs = DEFAULT_FAQS,
  bgClass = "bg-[#f4f2ee]"
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full ${bgClass} py-8 lg:py-8 relative`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0F3D2E] capitalize mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion List */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#fdfcf9] rounded-[20px] border border-[#e8e5de] hover:border-[#8cb73d]/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-6px_rgba(44,74,53,0.08)] transition-all duration-300 overflow-hidden"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              >
                <span className="text-[15px] md:text-[16px] font-semibold text-[#0F3D2E] group-hover:text-[#0F3D2E] transition-colors pr-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{faq.question}</span>
                <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-400 ease-in-out ${openIndex === index ? 'rotate-180 bg-[#0F3D2E] text-[#D4AF37]' : 'bg-[#f4f2ee] text-[#6b7b72] group-hover:bg-[#e8f2e1] group-hover:text-[#6b9933]'}`}>
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-5 pt-0 text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
