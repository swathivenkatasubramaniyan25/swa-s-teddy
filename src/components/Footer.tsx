import React, { useState } from 'react';
import { Sparkles, Heart, Check } from 'lucide-react';
import { playAdoptionFanfare } from '../utils/audio';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      playAdoptionFanfare();
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2C1C13] text-[#EDE4DA] pt-16 pb-12 border-t border-[#432A1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#4A3222]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-bold text-[#FBF8F4] block">
              Barnaby & Brooks
            </span>
            <p className="text-xs text-[#C5B3A2] leading-relaxed max-w-sm">
              Handcrafted heirloom teddy bears in the Cotswolds tradition since 1924. Each creation is five-way disc articulated, stuffed with pure botanical wool, and blessed with an official adoption deed.
            </p>
            <div className="pt-2 text-xs text-[#9E8773] flex items-center gap-2">
              <span>Cotswold Atelier & Toymaker Guild</span>
              <span aria-hidden="true">·</span>
              <span>United Kingdom</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FBF8F4]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B3A2]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Centennial Mohair Bears
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dressed Originals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cloud Plush Nursery Bears
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pocket Travel Companions
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Services */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FBF8F4]">
              Services & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B3A2]">
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Build-A-Bear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('adoption')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Adoption Registry Deeds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hospital')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Teddy Hospital & Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Centennial History (1924)
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FBF8F4]">
              The Bearmaker’s Gazette
            </h4>
            <p className="text-xs text-[#C5B3A2]">
              Receive rare invitations to limited atelier runs and collector release dates. No commercial spam.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium py-2">
                <Check className="w-4 h-4" />
                <span>You are inscribed in our atelier roll.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#3C261B] border border-[#5A3C2B] text-white placeholder-[#9E8773] focus:outline-none focus:ring-1 focus:ring-[#A87B51]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#2C1C13] bg-[#E4C8A6] hover:bg-[#F3DEC3] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Inscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8773] gap-4">
          <div className="flex items-center gap-2">
            <span>© 1924–2026 Barnaby & Brooks Atelier Ltd.</span>
            <span aria-hidden="true">·</span>
            <span>All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C5B3A2] flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Hand-sewn with honor & care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
