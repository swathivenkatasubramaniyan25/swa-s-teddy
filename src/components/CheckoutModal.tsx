import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Gift, Heart, Sparkles } from 'lucide-react';
import { playAdoptionFanfare } from '../utils/audio';

interface CheckoutModalProps {
  items: CartItem[];
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  onClose,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@cotswold.org',
    phone: '+44 7700 900123',
    address: '14 Millstone Lane',
    city: 'Chipping Campden',
    postalCode: 'GL55 6HB',
    country: 'United Kingdom',
    deliveryMethod: 'courier', // courier or express_box
    paymentMethod: 'card', // card or cod
    giftNote: 'To my dearest Arthur, may this bear keep you safe in all your bold endeavors. All my love, Gran.',
  });

  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = formData.deliveryMethod === 'express_box' ? 18 : subtotal >= 150 ? 0 : 12;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    playAdoptionFanfare();
    setStep('success');
    onOrderSuccess(newOrderId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E5DACD] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F2EAE0] border-b border-[#E3D6C5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8C5D38]" />
            <h2 className="font-serif text-lg font-bold text-[#2C241E]">
              {step === 'details' ? 'Atelier Adoption Dispatch' : 'Order & Adoption Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7C6653] hover:text-[#2C241E] hover:bg-[#E2D5C3] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Guardian & Shipping Details */}
            <div>
              <h3 className="font-serif font-bold text-sm text-[#2C241E] mb-3 flex items-center gap-2">
                <span>1. Guardian Name & Destination</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Email for Deed Dispatch
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="pt-4 border-t border-[#EDE1D2]">
              <h3 className="font-serif font-bold text-sm text-[#2C241E] mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8C5D38]" />
                <span>2. Atelier Delivery Method</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  formData.deliveryMethod === 'courier'
                    ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                    : 'border-[#EAE0D4] bg-[#FDFBF7]'
                }`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="courier"
                    checked={formData.deliveryMethod === 'courier'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'courier' })}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-xs text-[#2C241E]">Standard Atelier Courier</span>
                    <span className="font-mono text-xs font-bold text-[#8C5D38]">
                      {subtotal >= 150 ? 'FREE' : '$12'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7E6A57]">3–5 business days, wrapped in archival tissue</p>
                </label>

                <label className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  formData.deliveryMethod === 'express_box'
                    ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                    : 'border-[#EAE0D4] bg-[#FDFBF7]'
                }`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="express_box"
                    checked={formData.deliveryMethod === 'express_box'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'express_box' })}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-xs text-[#2C241E]">Hand-Packed Velvet Keepsake Box</span>
                    <span className="font-mono text-xs font-bold text-[#8C5D38]">+$18</span>
                  </div>
                  <p className="text-[11px] text-[#7E6A57]">Wax-sealed gift chest, lavender satchel & priority shipping</p>
                </label>
              </div>
            </div>

            {/* Handwritten Gift Note */}
            <div className="pt-4 border-t border-[#EDE1D2]">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1.5 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#8C5D38]" />
                <span>Calligraphed Enclosure Note (Complimentary)</span>
              </label>
              <textarea
                rows={2}
                value={formData.giftNote}
                onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                placeholder="Write a message to be written with antique ink on parchment..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
              />
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-[#EDE1D2]">
              <h3 className="font-serif font-bold text-sm text-[#2C241E] mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#8C5D38]" />
                <span>3. Payment Selection</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#8C5D38] bg-[#F7EFE4] text-[#2C241E]'
                      : 'border-[#EAE0D4] bg-white text-[#6E5948]'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#8C5D38] bg-[#F7EFE4] text-[#2C241E]'
                      : 'border-[#EAE0D4] bg-white text-[#6E5948]'
                  }`}
                >
                  Pay on Delivery (COD)
                </button>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#EDE1D2] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7C6653] block">Total Amount:</span>
                <span className="font-mono text-2xl font-bold text-[#2C241E] tabular-nums">
                  ${grandTotal}
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#E4C8A6]" />
                <span>Confirm Adoption & Dispatch</span>
              </button>
            </div>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C5D38]">
                Official Order & Deed #{orderId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E]">
                Your bears are preparing for the journey home!
              </h3>
              <p className="text-xs text-[#6B5745] max-w-md mx-auto">
                A confirmation and certified adoption roll has been dispatched to <span className="font-semibold text-[#2C241E]">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-[#F3ECE2] p-5 rounded-2xl border border-[#E3D5C3] text-left max-w-lg mx-auto text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7C6653]">Destination:</span>
                <span className="font-medium text-[#2C241E]">{formData.fullName}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6653]">Estimated Dispatch:</span>
                <span className="font-medium text-[#2C241E]">Tomorrow morning by 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6653]">Courier Carrier:</span>
                <span className="font-medium text-[#2C241E]">Royal Cotswold Parcel Express</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#DFD1BF]">
                <span className="font-bold text-[#2C241E]">Grand Total:</span>
                <span className="font-mono font-bold text-[#2C241E] tabular-nums">${grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Return to Atelier Shoppe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
