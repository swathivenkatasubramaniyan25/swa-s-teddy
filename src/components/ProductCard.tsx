import React from 'react';
import { TeddyProduct } from '../types';
import { TeddyVisualizer } from './TeddyVisualizer';
import { Star, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: TeddyProduct;
  onSelect: (product: TeddyProduct) => void;
  onQuickAdd: (product: TeddyProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
}) => {
  return (
    <div className="group relative flex flex-col bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Top Metadata Banner (Clean text, no pill clusters) */}
      <div className="px-5 pt-4 flex items-center justify-between text-xs text-[#7C6653]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold text-[#8C5D38]">
          {product.badge || (product.collection === 'mohair' ? 'Heirloom Mohair' : product.collection === 'dressed' ? 'Dressed Original' : 'Cloud Plush')}
        </span>
        <div className="flex items-center gap-1 text-[#9A7B61]">
          <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
          <span className="font-mono font-medium tabular-nums">{product.rating.toFixed(2)}</span>
          <span className="text-[#BFAFA0]">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Visual Canvas (65%–70% of card upper presence) */}
      <div
        onClick={() => onSelect(product)}
        className="relative p-4 sm:p-6 flex items-center justify-center cursor-pointer bg-radial from-[#F5EFE6] to-[#FAF7F2] overflow-hidden"
      >
        <TeddyVisualizer
          furColor={product.furColor}
          snoutColor={product.snoutColor}
          eyeStyle={product.eyeStyle}
          outfit={
            product.id === 'arthur-aviator'
              ? 'aviator'
              : product.id === 'clover-woodland'
              ? 'cable_sweater'
              : product.id === 'theo-tweed'
              ? 'vest_bowtie'
              : 'none'
          }
          accessory={
            product.id === 'clover-woodland'
              ? 'spectacles'
              : product.id === 'pip-pocket'
              ? 'compass'
              : 'none'
          }
          ribbonColor={product.ribbonColor}
          ribbonText={product.defaultRibbonText || ''}
          heartType={product.collection === 'plush' ? 'dreams' : 'love'}
          soundType={product.collection === 'plush' ? 'lullaby' : 'heartbeat'}
          sizeScale={product.collection === 'pocket' ? 0.78 : 0.95}
          interactive={false}
          showHeartPulse={false}
          className="w-full max-w-[240px] transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-0 bg-[#2C241E]/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-[#2C241E] bg-[#FAF7F2] hover:bg-white rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Bear</span>
          </button>
        </div>
      </div>

      {/* Details & Purchase Contiguous Action */}
      <div className="p-5 flex-1 flex flex-col justify-between border-t border-[#EFE7DC] bg-[#FAF7F2]">
        <div>
          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-lg font-bold text-[#2C241E] hover:text-[#7C5335] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-[#735D49] line-clamp-2">
            {product.description}
          </p>

          {/* Quiet Metadata with Typographic Separator */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-[#8C7561]">
            <span>{product.size}</span>
            <span aria-hidden="true">·</span>
            <span>{product.jointing.includes('5-way') ? '5-Way Jointed' : 'Soft Hug'}</span>
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-[#2C241E] tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#A89887] line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            className="px-3 py-1.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Add to adoption basket"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E4C8A6]" />
            <span>Adopt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
