import React, { useState } from 'react';
import { Reveal } from './Reveal';
import { Star, ChevronDown, ChevronLeft, ChevronRight, Quote, MessageSquare, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, GOOGLE_REVIEW_LINK, REVIEWS } from '../config/siteConfig';
import { loadAllFaqItems, loadAllReviews } from './CmsContent';

export const ReviewsAndFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const cmsReviews = loadAllReviews();
  const cmsFaq = loadAllFaqItems();
  const reviews = cmsReviews.length ? cmsReviews.map((r, idx) => ({ id: idx + 1, name: r.name, role: r.project, content: r.content, stars: Math.min(5, Math.max(1, Math.round(r.rating))) })) : REVIEWS;
  const faqItems = cmsFaq.length ? cmsFaq.map((f) => ({ question: f.question, answer: f.answer })) : FAQ_ITEMS;
  const faqPreview = faqItems.slice(0, 4);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const activeReview = reviews[currentReviewIndex];

  return (
    <div className="py-24 bg-background relative overflow-hidden">
      {/* Schema JSON-LD géré par SEOSchema.tsx */}

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* --- COLONNE GAUCHE : AVIS (Slider) --- */}
            <div className="flex flex-col h-full">
                <div>
                  <Reveal>
                      <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <MessageSquare className="text-accent" size={20} />
                          </div>
                          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Témoignages</span>
                      </div>
                      <h2 id="reviews-title" className="scroll-mt-20 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-12">Ils nous font <br/>confiance</h2>
                  </Reveal>

                  {/* Review Card Slider */}
                  <Reveal delay={100}>
                      <div className="relative group perspective">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-[2rem] blur-lg opacity-30 group-hover:opacity-60 transition duration-700"></div>

                        {/* Card Container - RESPONSIVE HEIGHT */}
                        <div className="relative bg-[#111111] border border-white/10 p-8 rounded-[1.8rem] h-[450px] md:h-[320px] flex flex-col shadow-2xl transition-all">
                            
                            {/* Decorative Quote - Smaller Size */}
                            <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 transform rotate-180 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Stars */}
                                <div className="flex gap-1.5 mb-4 flex-shrink-0">
                                    {[...Array(activeReview.stars)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-accent text-accent drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                                    ))}
                                </div>
                                
                                {/* Review Content - Fixed height container with scroll if needed */}
                                <div className="flex-1 min-h-0 overflow-y-auto pr-2 mb-4 no-scrollbar">
                                    <div key={activeReview.id} className="animate-fade-in">
                                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light italic tracking-wide font-serif">
                                            "{activeReview.content}"
                                        </p>
                                    </div>
                                </div>

                                {/* Footer pushed to bottom */}
                                <div className="mt-auto pt-4 border-t border-white/5 flex flex-col sm:flex-row items-end justify-between gap-4 flex-shrink-0">
                                    {/* Author */}
                                    <div className="animate-fade-in w-full sm:w-auto">
                                        <div className="text-base font-bold text-white">{activeReview.name}</div>
                                        <div className="text-accent text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-80">{activeReview.role}</div>
                                    </div>

                                    {/* Controls Capsule */}
                                    <div className="flex items-center gap-2 bg-[#0A0A0A] p-1 rounded-full border border-white/10 shadow-inner">
                                        <button 
                                            onClick={prevReview}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-all duration-300 group/nav"
                                            aria-label="Précédent"
                                        >
                                            <ChevronLeft size={16} className="transform group-hover/nav:-translate-x-0.5 transition-transform" />
                                        </button>
                                        
                                        <div className="h-3 w-[1px] bg-white/10"></div>

                                        <div className="text-[10px] font-mono text-white/50 tracking-widest px-2 min-w-[2.5rem] text-center">
                                            <span className="text-white font-bold">{currentReviewIndex + 1}</span>
                                            <span className="opacity-30">/</span>
                                            <span className="opacity-30">{reviews.length}</span>
                                        </div>

                                        <div className="h-3 w-[1px] bg-white/10"></div>

                                        <button 
                                            onClick={nextReview}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:bg-accent hover:text-black transition-all duration-300 group/nav"
                                            aria-label="Suivant"
                                        >
                                            <ChevronRight size={16} className="transform group-hover/nav:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                  </Reveal>
                </div>

                {/* --- GOOGLE REVIEW CTA --- */}
                <Reveal delay={200}>
                  <div className="mt-4 bg-surfaceHighlight rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-black/20">
                     <div>
                        <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                            <Star size={16} className="text-accent fill-accent" />
                            Votre avis compte
                        </h4>
                        <p className="text-sm text-textSecondary">Aidez-nous à améliorer nos services.</p>
                     </div>
                     <a 
                        href={GOOGLE_REVIEW_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)] whitespace-nowrap"
                     >
                        Laisser un avis Google
                     </a>
                  </div>
                </Reveal>
            </div>

            {/* --- COLONNE DROITE : FAQ --- */}
            <div>
                 <Reveal>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent/10 rounded-lg">
                           <HelpCircle className="text-accent" size={20} />
                        </div>
                        <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-12">Questions <br/> fréquentes</h2>
                 </Reveal>

                <div className="space-y-4">
                    {faqPreview.map((item, index) => (
                    <Reveal key={index} delay={index * 50}>
                        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        openIndex === index 
                            ? 'bg-surfaceHighlight border-accent/30 shadow-lg shadow-black/20' 
                            : 'bg-surfaceHighlight/20 border-white/5 hover:bg-surfaceHighlight/40'
                        }`}>
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                        >
                            <span className={`font-semibold pr-4 transition-colors [text-wrap:balance] ${
                            openIndex === index ? 'text-accent' : 'text-white'
                            }`}>
                            {item.question}
                            </span>
                            <div className={`p-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                            openIndex === index ? 'bg-accent text-background rotate-180' : 'bg-white/5 text-textSecondary'
                            }`}>
                            <ChevronDown size={18} />
                            </div>
                        </button>
                        
                        <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-5 pt-0 text-textSecondary text-sm leading-relaxed border-t border-white/5 mt-2">
                              {typeof item.answer === 'string' && item.answer.trim().startsWith('<') ? (
                                <div className="blog-content" dangerouslySetInnerHTML={{ __html: item.answer }} />
                              ) : (
                                <div className="whitespace-pre-line">{item.answer as any}</div>
                              )}
                            </div>
                        </div>
                        </div>
                    </Reveal>
                    ))}
                </div>
                <Reveal delay={250}>
                  <div className="mt-6">
                    <a
                      href="/faq"
                      className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
                    >
                      Voir toute la FAQ
                    </a>
                  </div>
                </Reveal>
            </div>

        </div>

      </div>
    </div>
  );
};
