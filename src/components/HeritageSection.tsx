import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage-section" className="py-16 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Story */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8C5D38] block mb-2">
            The Centenary Atelier (1924–2026)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] leading-tight text-balance">
            A century of whispered secrets and enduring affection.
          </h2>
          <div className="w-16 h-0.5 bg-[#C9B194] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#5E4B3A] leading-relaxed font-sans">
            In 1924, master cabinetmaker Tobias Barnaby and lace embroiderer Clara Brooks fashioned their very first mohair bear for a frightened niece during an autumn thunderstorm. That single bear—articulated with hardwood discs salvaged from cherry timber and stuffed with Cotswold carded fleece—ignited a century-long devotion to crafting bears that never grow old.
          </p>
        </div>

        {/* 3 Core Invariants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#F6EFE5] border border-[#EADBCA] text-left">
            <span className="font-mono text-xs font-bold text-[#8C5D38] block mb-2">01. THE SCHULTE WEAVE</span>
            <h3 className="font-serif font-bold text-lg text-[#2C241E] mb-2">
              Natural Angora Goat Mohair
            </h3>
            <p className="text-xs text-[#6E5948] leading-relaxed">
              Woven on hundred-year-old wooden looms in Duisburg, Germany. Mohair is flame-retardant, naturally dirt-resistant, and develops an antique patina the more it is hugged.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6EFE5] border border-[#EADBCA] text-left">
            <span className="font-mono text-xs font-bold text-[#8C5D38] block mb-2">02. MECHANICAL ARTICULATION</span>
            <h3 className="font-serif font-bold text-lg text-[#2C241E] mb-2">
              5-Way Cotter-Pin Joints
            </h3>
            <p className="text-xs text-[#6E5948] leading-relaxed">
              Every head, shoulder, and thigh is joined with pressed hardboard discs, steel washers, and split cotter pins, allowing true 360° poses for teatime and reading chairs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6EFE5] border border-[#EADBCA] text-left">
            <span className="font-mono text-xs font-bold text-[#8C5D38] block mb-2">03. ARCHIVAL DEED</span>
            <h3 className="font-serif font-bold text-lg text-[#2C241E] mb-2">
              The Perpetual Registry
            </h3>
            <p className="text-xs text-[#6E5948] leading-relaxed">
              Each bear is given a unique engraved serial number registered in our master logbook. If your bear is ever misplaced or in need of restorative spa care, our atelier preserves its genealogy.
            </p>
          </div>
        </div>

        {/* Customer Testimonials & Proof */}
        <div className="pt-8 border-t border-[#EDE1D2]">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C5D38] block mb-1">
              Letters from the Keepers
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E]">
              Generations of Love
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#EBE1D4] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#523E2F] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F2EDE6] text-xs">
                  <span className="font-serif font-bold text-[#2C241E] block">{t.author}</span>
                  <div className="text-[11px] text-[#7C6653] flex items-center gap-1.5 mt-0.5">
                    <span>{t.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.location}</span>
                  </div>
                  <div className="mt-2 text-[10px] uppercase font-bold tracking-wider text-[#8C5D38]">
                    Adopted: {t.bearAdopted}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
