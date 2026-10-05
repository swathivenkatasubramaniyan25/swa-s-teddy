import React, { useState } from 'react';
import { TeddyProduct } from '../types';
import { TeddyVisualizer } from './TeddyVisualizer';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Sparkles, Feather } from 'lucide-react';
import { playAdoptionFanfare } from '../utils/audio';

interface ProductModalProps {
  product: TeddyProduct | null;
  onClose: () => void;
  onAddToCart: (product: TeddyProduct, ribbonText: string, giftBox: boolean) => void;
  onCustomizeThis: (product: TeddyProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onCustomizeThis,
}) => {
  if (!product) return null;

  const [customRibbon, setCustomRibbon] = useState(product.defaultRibbonText || '');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'standard' | 'large'>('standard');

  const finalPrice = selectedSize === 'large' ? product.price + 35 : product.price;

  const handleAdd = () => {
    playAdoptionFanfare();
    onAddToCart(product, customRibbon, includeGiftBox);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#E5DACD] shadow-2xl overflow-hidden my-8">
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#7C6653] hover:text-[#2C241E] bg-[#EFE6DC] hover:bg-[#E5DACD] rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Canvas & Audio Test */}
          <div className="md:col-span-6 p-6 sm:p-10 bg-radial from-[#F5ECE0] to-[#FAF7F2] border-b md:border-b-0 md:border-r border-[#E8DFD5] flex flex-col items-center justify-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8C5D38] mb-2">
              {product.badge || 'Atelier Masterpiece'}
            </span>

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
              ribbonText={customRibbon}
              heartType={product.collection === 'plush' ? 'dreams' : 'love'}
              soundType={product.collection === 'plush' ? 'lullaby' : 'heartbeat'}
              sizeScale={selectedSize === 'large' ? 1.08 : 0.95}
              interactive={true}
              className="w-full max-w-[320px]"
            />

            <p className="mt-4 text-xs text-[#8C7662] text-center italic">
              Tap bear’s tummy to preview heart token audio
            </p>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Reviews & Title */}
              <div className="flex items-center gap-1.5 text-xs text-[#8C6D52] mb-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  ))}
                </div>
                <span className="font-mono font-bold tabular-nums text-[#2C241E]">{product.rating.toFixed(2)}</span>
                <span>({product.reviewsCount} verified adoptions)</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E]">
                {product.name}
              </h2>
              <p className="text-xs text-[#8C5D38] font-medium tracking-wide">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-[#2C241E] tabular-nums">
                  ${finalPrice}
                </span>
                {product.originalPrice && selectedSize === 'standard' && (
                  <span className="font-mono text-sm text-[#A89887] line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  In Atelier Stock · Ready to Ship
                </span>
              </div>

              {/* Story */}
              <p className="mt-4 text-xs sm:text-sm text-[#614F40] leading-relaxed">
                {product.story}
              </p>

              {/* Material Specifications Table */}
              <div className="mt-5 space-y-2 py-3 border-y border-[#EDE3D6] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8C7662]">Fur & Coat:</span>
                  <span className="font-medium text-[#2C241E] text-right">{product.furType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7662]">Articulation:</span>
                  <span className="font-medium text-[#2C241E] text-right">{product.jointing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7662]">Stuffing Core:</span>
                  <span className="font-medium text-[#2C241E] text-right">{product.stuffing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7662]">Weight & Scale:</span>
                  <span className="font-medium text-[#2C241E] text-right">{product.size} ({product.weight})</span>
                </div>
              </div>

              {/* Ribbon Embroidery Option */}
              <div className="mt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-1">
                  Personalized Silk Ribbon Inscription (Complimentary)
                </label>
                <input
                  type="text"
                  maxLength={26}
                  value={customRibbon}
                  onChange={(e) => setCustomRibbon(e.target.value)}
                  placeholder="e.g. For Arthur with Love"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                />
              </div>

              {/* Gift Box Checkbox */}
              <label className="mt-3 flex items-start gap-2 text-xs text-[#523E2F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGiftBox}
                  onChange={(e) => setIncludeGiftBox(e.target.checked)}
                  className="mt-0.5 rounded text-[#43281C] focus:ring-[#8C5D38]"
                />
                <span>Include embossed wax-sealed presentation box and blank adoption deed</span>
              </label>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#EDE3D6] space-y-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3 px-4 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E4C8A6]" />
                <span>Adopt {product.name.split(' ')[0]} · ${finalPrice}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCustomizeThis(product);
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#523A27] bg-[#EDE4D8] hover:bg-[#DFD3C3] rounded-xl transition-colors cursor-pointer"
              >
                Open in Custom Atelier Workshop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
