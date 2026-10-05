import React from 'react';
import { TeddyVisualizer } from './TeddyVisualizer';
import { Heart, Award, ShieldCheck, Feather, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenAtelier: () => void;
  onExploreCollection: () => void;
  onQuickAdoptBarnaby: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAtelier,
  onExploreCollection,
  onQuickAdoptBarnaby,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F5EFE6] border-b border-[#E8DFD5] pt-10 pb-16 lg:py-20">
      {/* Subtle organic watermark background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#43281C_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial & Story */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7C5335] bg-[#EBE2D5] px-3.5 py-1.5 rounded-full">
              <Feather className="w-3.5 h-3.5 text-[#A87B51]" />
              <span>Centennial Handcrafted Teddy Bears · Est. 1924</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C241E] leading-[1.15] text-balance">
              Heirloom companions crafted to be loved for generations.
            </h1>

            <p className="text-base sm:text-lg text-[#5E4D3E] max-w-2xl leading-relaxed font-sans">
              Cut from authentic German Schulte mohair, filled with organic botanical wool, and articulated with traditional wooden disc joints. Each bear is born with a sewn heart and registered with its own official deed of adoption.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenAtelier}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build a Bespoke Bear</span>
                <ArrowRight className="w-4 h-4 text-[#E4C8A6]" />
              </button>

              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#43281C] bg-[#E8DDD0] hover:bg-[#DDCFBF] rounded-xl transition-all border border-[#D5C5B2] cursor-pointer"
              >
                Explore Heirloom Collection
              </button>
            </div>

            {/* Editorial Craftsmanship Markers (Clean Unboxed Text with Separators) */}
            <div className="pt-6 border-t border-[#E4D7C7] flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs font-medium text-[#6B5949]">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#A87B51]" />
                100% Schulte Mohair
              </span>
              <span aria-hidden="true" className="text-[#C4B39F]">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A87B51]" />
                5-Way Disc Articulated
              </span>
              <span aria-hidden="true" className="text-[#C4B39F]">·</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#DC2626]" />
                Interactive Heart Ceremony
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Featured Bear Focal Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E5DACD] shadow-xl text-center">
              {/* Corner Hallmark Tag */}
              <div className="absolute top-4 right-4 text-[11px] font-mono uppercase tracking-wider text-[#7C5335] bg-[#EFE6DC] px-2.5 py-1 rounded-md border border-[#DFD1C1]">
                Atelier No. 001
              </div>

              {/* Interactive Bear Visualizer */}
              <TeddyVisualizer
                furColor="#C49A5B"
                snoutColor="#4A2E18"
                eyeStyle="amber"
                outfit="none"
                ribbonColor="#1A365D"
                ribbonText="Barnaby · 1924"
                heartType="love"
                soundType="heartbeat"
                sizeScale={1}
                interactive={true}
              />

              <div className="mt-4 pt-4 border-t border-[#EBE1D4]">
                <div className="flex items-baseline justify-between">
                  <div className="text-left">
                    <h3 className="font-serif text-xl font-bold text-[#2C241E]">Barnaby Classic</h3>
                    <p className="text-xs text-[#7C6653]">15" German Curly Mohair · Amber Glass Eyes</p>
                  </div>
                  <span className="font-mono text-lg font-bold text-[#2C241E] tabular-nums">$135</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={onQuickAdoptBarnaby}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer"
                  >
                    Quick Adopt Barnaby
                  </button>
                  <button
                    onClick={onOpenAtelier}
                    className="py-2.5 px-3 text-xs font-semibold text-[#523826] bg-[#EDE3D6] hover:bg-[#DFD3C3] rounded-lg transition-colors cursor-pointer"
                    title="Customize from scratch"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
