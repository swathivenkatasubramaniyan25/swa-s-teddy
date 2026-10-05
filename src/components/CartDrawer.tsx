import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { playWoodTick } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onToggleGiftBox: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onToggleGiftBox,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DFD5] animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EDE3D6] flex items-center justify-between bg-[#F4EDE3]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C5D38]" />
            <h2 className="font-serif text-lg font-bold text-[#2C241E]">
              Your Adoption Basket
            </h2>
            <span className="text-xs font-mono font-bold bg-[#E4D6C5] text-[#43281C] px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7C6653] hover:text-[#2C241E] hover:bg-[#EAE0D3] rounded-full transition-colors cursor-pointer"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#EFE7DC] border-b border-[#E3D6C5] text-xs">
          <div className="flex justify-between font-medium text-[#5E4B3A] mb-1.5">
            <span>
              {amountRemaining === 0 ? (
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: Free Velvet Box Courier Shipping!
                </span>
              ) : (
                <>Add <span className="font-mono font-bold text-[#2C241E]">${amountRemaining}</span> more for Free Shipping</>
              )}
            </span>
            <span className="font-mono">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-[#DFD1C0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8C5D38] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFE6DC] flex items-center justify-center text-[#8C7662]">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C241E]">
                Your basket is currently empty
              </h3>
              <p className="text-xs text-[#7C6653] max-w-xs">
                Every bear is looking for a warm home. Visit our workshop to build a custom companion or adopt a classic.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-xl p-4 border border-[#EBE1D4] shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#2C241E]">
                        {item.name}
                      </h4>
                      {item.isCustom && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#F7EFE4] text-[#8C5D38] border border-[#E8DCCF]">
                          Bespoke
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7C6653] mt-0.5">{item.furDescription}</p>

                    {/* Customization Details */}
                    {item.ribbonText && (
                      <p className="text-[11px] text-[#8C5D38] font-medium mt-1">
                        Ribbon: "{item.ribbonText}"
                      </p>
                    )}

                    {item.customConfig && (
                      <p className="text-[10px] text-[#8C7662] mt-0.5">
                        Heart: {item.customConfig.heartInsert.name.split('&')[0]} · Wardrobe: {item.customConfig.outfit.replace('_', ' ')}
                      </p>
                    )}
                  </div>

                  <span className="font-mono font-bold text-sm text-[#2C241E] tabular-nums">
                    ${item.price * item.quantity}
                  </span>
                </div>

                {/* Gift Box Toggle */}
                <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onToggleGiftBox(item.cartItemId)}
                    className="flex items-center gap-1.5 text-[#6E5845] hover:text-[#2C241E] cursor-pointer"
                  >
                    <Gift className={`w-3.5 h-3.5 ${item.giftBox ? 'text-[#8C5D38]' : 'text-slate-400'}`} />
                    <span className={item.giftBox ? 'font-medium' : 'text-[#8C7662]'}>
                      {item.giftBox ? 'Velvet Presentation Box Included' : 'Standard Linen Wrap'}
                    </span>
                  </button>

                  {/* Quantity Controller & Delete */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#DDD0C1] rounded-lg overflow-hidden bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => {
                          playWoodTick();
                          onUpdateQuantity(item.cartItemId, -1);
                        }}
                        className="px-2 py-1 text-xs text-[#523A25] hover:bg-[#EFE5D9] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-[#2C241E] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          playWoodTick();
                          onUpdateQuantity(item.cartItemId, 1);
                        }}
                        className="px-2 py-1 text-xs text-[#523A25] hover:bg-[#EFE5D9] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="p-1.5 text-[#A89888] hover:text-red-700 transition-colors cursor-pointer"
                      title="Remove bear"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EDE3D6] bg-[#F4EDE3] space-y-4">
            <div className="space-y-1.5 text-xs text-[#6E5845]">
              <div className="flex justify-between">
                <span>Adoption Subtotal:</span>
                <span className="font-mono font-bold text-[#2C241E] tabular-nums">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Certified Adoption Deeds:</span>
                <span className="text-emerald-800 font-medium">Included ($0)</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-mono tabular-nums">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$12.00'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#DECBB6] flex justify-between text-sm font-bold text-[#2C241E]">
                <span>Total:</span>
                <span className="font-mono text-base tabular-nums">
                  ${subtotal + (subtotal >= freeShippingThreshold ? 0 : 12)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Complete Adoption & Order</span>
              <ArrowRight className="w-4 h-4 text-[#E4C8A6]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
