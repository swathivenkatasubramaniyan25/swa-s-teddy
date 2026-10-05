import React from 'react';
import { ShoppingBag, Sparkles, Search } from 'lucide-react';

interface TopBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5]">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#43281C] text-[#FDFBF7] px-4 py-1.5 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E4C8A6]" />
        <span>Complimentary Hand-Inscribed Adoption Deed & Heirloom Velvet Gift Box on orders over $120</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Title (Single text element wordmark in display face) */}
        <button
          onClick={() => onNavigate('shop')}
          className="text-left font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C241E] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Barnaby & Brooks
        </button>

        {/* Zone 2: 4-6 Clean Nav Links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5E4D3E]">
          <button
            onClick={() => onNavigate('shop')}
            className={`transition-colors hover:text-[#2C241E] cursor-pointer ${
              activeSection === 'shop' ? 'text-[#2C241E] font-semibold underline underline-offset-8 decoration-[#A87B51] decoration-2' : ''
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => onNavigate('atelier')}
            className={`transition-colors hover:text-[#2C241E] cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'atelier' ? 'text-[#2C241E] font-semibold underline underline-offset-8 decoration-[#A87B51] decoration-2' : ''
            }`}
          >
            <span>Custom Atelier</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EADECC] text-[#7C5335]">Workshop</span>
          </button>
          <button
            onClick={() => onNavigate('adoption')}
            className={`transition-colors hover:text-[#2C241E] cursor-pointer ${
              activeSection === 'adoption' ? 'text-[#2C241E] font-semibold underline underline-offset-8 decoration-[#A87B51] decoration-2' : ''
            }`}
          >
            Adoption Registry
          </button>
          <button
            onClick={() => onNavigate('hospital')}
            className={`transition-colors hover:text-[#2C241E] cursor-pointer ${
              activeSection === 'hospital' ? 'text-[#2C241E] font-semibold underline underline-offset-8 decoration-[#A87B51] decoration-2' : ''
            }`}
          >
            Teddy Hospital
          </button>
          <button
            onClick={() => onNavigate('story')}
            className={`transition-colors hover:text-[#2C241E] cursor-pointer ${
              activeSection === 'story' ? 'text-[#2C241E] font-semibold underline underline-offset-8 decoration-[#A87B51] decoration-2' : ''
            }`}
          >
            Our Heritage
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#5E4D3E] hover:text-[#2C241E] hover:bg-[#F2EAE1] rounded-full transition-colors cursor-pointer"
            title="Search bears & accessories"
            aria-label="Search bears"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#E4C8A6]" />
            <span className="hidden sm:inline">Adoption Basket</span>
            <span className="tabular-nums font-mono bg-[#E4C8A6] text-[#321E14] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Subnav Strip */}
      <div className="md:hidden flex items-center justify-around py-2.5 px-3 border-t border-[#E8DFD5] bg-[#FAF7F2] text-xs font-medium text-[#5E4D3E] overflow-x-auto">
        <button
          onClick={() => onNavigate('shop')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeSection === 'shop' ? 'font-bold text-[#2C241E] bg-[#EFE7DC] rounded-md' : ''}`}
        >
          Collection
        </button>
        <button
          onClick={() => onNavigate('atelier')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeSection === 'atelier' ? 'font-bold text-[#2C241E] bg-[#EFE7DC] rounded-md' : ''}`}
        >
          Custom Atelier
        </button>
        <button
          onClick={() => onNavigate('adoption')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeSection === 'adoption' ? 'font-bold text-[#2C241E] bg-[#EFE7DC] rounded-md' : ''}`}
        >
          Adoption Deed
        </button>
        <button
          onClick={() => onNavigate('hospital')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeSection === 'hospital' ? 'font-bold text-[#2C241E] bg-[#EFE7DC] rounded-md' : ''}`}
        >
          Hospital
        </button>
      </div>
    </header>
  );
};
