'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS = [
  { question: "Are your herbal teas 100% natural and organic?", answer: "Yes, we are committed to providing only the highest quality herbal teas. All our blends use 100% natural, ethically sourced botanical ingredients with absolutely no artificial additives, colors, or flavors." },
  { question: "How should I store my loose leaf tea to keep it fresh?", answer: "To preserve the potency and flavor of your herbal tea, store it in a cool, dark, and dry place. Keep it in an airtight container away from direct sunlight, moisture, and strong odors." },
  { question: "How many cups of herbal tea can I drink daily?", answer: "While herbal teas are generally safe and gentle, we recommend 2 to 3 cups a day for optimal wellness benefits. However, if you are pregnant, nursing, or taking medication, please consult your healthcare provider first." },
  { question: "Are your tea blends caffeine-free?", answer: "The vast majority of our herbal blends (tisanes) are naturally 100% caffeine-free, making them perfect for any time of day, including before bed. Any blend containing caffeine (like Matcha or Yerba Mate) is clearly labeled." },
  { question: "Do you test your herbs for heavy metals and pesticides?", answer: "Absolutely. Safety is our top priority. Every single batch of our herbs undergoes rigorous third-party lab testing for purity, heavy metals, pesticides, and microbial contaminants before it reaches your cup." },
  { question: "How long should I steep the herbal blends?", answer: "For the best flavor and maximum health benefits, we recommend steeping most of our herbal blends in boiling water (212°F) for 5 to 7 minutes. Some robust roots and berries can even be steeped longer!" }
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  subtitle = "Everything you need to know about our herbal blends, sourcing, and brewing process. Can't find your answer? Reach out to our herbalist team.", 
  faqs = DEFAULT_FAQS 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f4f2ee] py-10 lg:py-12 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            {subtitle}
          </p>
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
                <span className="text-[15px] md:text-[16px] font-semibold text-[#1c2e24] group-hover:text-[#2c4a35] transition-colors pr-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{faq.question}</span>
                <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-400 ease-in-out ${openIndex === index ? 'rotate-180 bg-[#1c2e24] text-[#c49d56]' : 'bg-[#f4f2ee] text-[#6b7b72] group-hover:bg-[#e8f2e1] group-hover:text-[#6b9933]'}`}>
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
