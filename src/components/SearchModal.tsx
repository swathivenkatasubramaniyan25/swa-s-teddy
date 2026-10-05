import React, { useState, useMemo } from 'react';
import { TeddyProduct } from '../types';
import { TEDDY_PRODUCTS } from '../data/products';
import { X, Search, Star, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: TeddyProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return TEDDY_PRODUCTS.slice(0, 4);
    const q = query.toLowerCase();
    return TEDDY_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.furType.toLowerCase().includes(q) ||
        (p.outfit && p.outfit.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border border-[#E5DACD] shadow-2xl overflow-hidden">
        {/* Search Header Input */}
        <div className="p-4 border-b border-[#EDE2D4] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#8C5D38]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bears by name, fur, outfit, or size..."
            className="flex-1 text-sm bg-transparent text-[#2C241E] focus:outline-none placeholder-[#9E8773]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8C7662] hover:text-[#2C241E] cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#7C6653] hover:text-[#2C241E] rounded-md hover:bg-[#F0E6D8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7662] block px-2 mb-2">
            {query.trim() ? `Search Results (${filteredProducts.length})` : 'Curated Atelier Highlights'}
          </span>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#7C6653]">
              No bears found matching "{query}". Try "mohair", "aviator", or "classic".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="p-3 rounded-xl bg-white hover:bg-[#F5EDE2] border border-[#EBE1D4] hover:border-[#D5C2AE] transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: p.furColor }}
                  />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#2C241E] group-hover:text-[#7C5335]">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#7C6653]">
                      {p.size} · {p.furType.split(' ')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#2C241E] tabular-nums">
                    ${p.price}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7662] group-hover:text-[#2C241E] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
