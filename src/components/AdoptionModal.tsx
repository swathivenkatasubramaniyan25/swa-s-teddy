import React, { useState } from 'react';
import { AdoptionCertificateData, CustomTeddyConfig } from '../types';
import { X, Printer, Award, Shield, Heart, Sparkles, Check } from 'lucide-react';
import { playAdoptionFanfare } from '../utils/audio';

interface AdoptionModalProps {
  initialConfig?: CustomTeddyConfig | null;
  onClose: () => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  initialConfig,
  onClose,
}) => {
  const [bearName, setBearName] = useState(initialConfig?.bearName || 'Barnaby Oliver');
  const [parentName, setParentName] = useState(initialConfig?.adoptiveParent || 'Lady Eleanor');
  const [birthCity, setBirthCity] = useState(initialConfig?.birthCity || 'Edinburgh Atelier');
  const [birthDate, setBirthDate] = useState(initialConfig?.birthDate || 'October 2026');
  const [pledge, setPledge] = useState(
    'I solemnly promise to provide generous hugs, keep watch against nighttime shadows, and carry this companion through all life’s wanderings.'
  );
  const [isCopied, setIsCopied] = useState(false);

  const serialNumber = `BB-${Math.floor(1000 + Math.random() * 9000)}-${initialConfig?.size || '14'}M`;

  const handlePrint = () => {
    playAdoptionFanfare();
    window.print();
  };

  const handleCopyRecord = () => {
    const text = `BARNABY & BROOKS ADOPTION REGISTRY\nBear Name: ${bearName}\nGuardian: ${parentName}\nSerial Number: ${serialNumber}\nDate: ${birthDate}\nAtelier: ${birthCity}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in print:p-0 print:bg-white print:fixed-none">
      <div className="relative w-full max-w-3xl bg-[#FAF6EE] rounded-3xl border-2 border-[#D9C4A9] shadow-2xl overflow-hidden my-6 print:border-none print:shadow-none print:m-0 print:w-full">
        {/* Top Action Bar (hidden when printing) */}
        <div className="px-6 py-4 bg-[#EDE2D2] border-b border-[#DECBB4] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#664C35]">
            <Award className="w-4 h-4 text-[#A87B51]" />
            <span>Official Atelier Adoption Registry Deed</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#E4C8A6]" />
              <span>Print Deed</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7C6653] hover:text-[#2C241E] bg-[#E3D4C1] hover:bg-[#D5C3AE] rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Parchment Body */}
        <div className="p-8 sm:p-12 relative bg-[#FDFBF7] font-serif text-[#2C241E]">
          {/* Ornate Double Border */}
          <div className="border-4 border-[#C9B194] p-2 rounded-2xl">
            <div className="border border-[#D4C3AC] p-6 sm:p-8 rounded-xl relative space-y-6 text-center">
              {/* Corner Flourishes */}
              <div className="absolute top-2 left-2 text-[#C4AC90] text-sm">✦</div>
              <div className="absolute top-2 right-2 text-[#C4AC90] text-sm">✦</div>
              <div className="absolute bottom-2 left-2 text-[#C4AC90] text-sm">✦</div>
              <div className="absolute bottom-2 right-2 text-[#C4AC90] text-sm">✦</div>

              {/* Header Lockup */}
              <div className="space-y-1">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#8C5D38] block">
                  The Cotswold Guild of Master Toymakers
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2C241E]">
                  Certificate of Adoption
                </h1>
                <p className="text-xs italic text-[#7C6653] font-sans">
                  Entered into the Permanent Heirloom Roll of Barnaby & Brooks
                </p>
              </div>

              {/* Proclamation Text */}
              <div className="py-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#4A3B2C]">
                <p>
                  Be it formally recorded that on this day, the handcrafted plush companion bearing the name of
                </p>

                <div className="inline-block border-b-2 border-[#8C5D38] px-6 py-1 min-w-[240px]">
                  <span className="text-2xl sm:text-3xl font-bold text-[#43281C]">
                    {bearName}
                  </span>
                </div>

                <p>
                  has been lovingly welcomed into the lifelong care and keeping of
                </p>

                <div className="inline-block border-b-2 border-[#8C5D38] px-6 py-1 min-w-[240px]">
                  <span className="text-xl sm:text-2xl font-semibold text-[#43281C]">
                    {parentName}
                  </span>
                </div>

                {/* Solemn Promise */}
                <div className="my-4 max-w-lg mx-auto bg-[#F7EFE4] p-4 rounded-xl border border-[#E8DACB] text-xs font-sans italic text-[#634E3C]">
                  "{pledge}"
                </div>
              </div>

              {/* Registered Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-sans text-xs bg-[#F9F4EB] p-4 rounded-xl border border-[#EADBCA]">
                <div>
                  <span className="text-[#8C7662] block text-[10px] uppercase font-bold">Serial Number</span>
                  <span className="font-mono font-bold text-[#2C241E]">{serialNumber}</span>
                </div>
                <div>
                  <span className="text-[#8C7662] block text-[10px] uppercase font-bold">Consecrated Date</span>
                  <span className="font-medium text-[#2C241E]">{birthDate}</span>
                </div>
                <div>
                  <span className="text-[#8C7662] block text-[10px] uppercase font-bold">Atelier Origin</span>
                  <span className="font-medium text-[#2C241E]">{birthCity}</span>
                </div>
                <div>
                  <span className="text-[#8C7662] block text-[10px] uppercase font-bold">Heart Token</span>
                  <span className="font-medium text-[#2C241E]">
                    {initialConfig?.heartInsert?.name || 'Love & Courage'}
                  </span>
                </div>
              </div>

              {/* Signatures & Wax Seal */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Master Artisan Signature */}
                <div className="text-center sm:text-left space-y-1">
                  <div className="font-serif italic text-lg text-[#523A25] font-semibold">
                    Alexander Brooks, Master Toymaker
                  </div>
                  <div className="border-t border-[#A89279] pt-1 text-[10px] font-sans uppercase tracking-wider text-[#8C7662]">
                    Keeper of the Guild Seal
                  </div>
                </div>

                {/* Ornate Gold Wax Seal */}
                <div className="relative flex items-center justify-center">
                  <div className="w-18 h-18 rounded-full bg-[#9A2C2C] shadow-md border-2 border-[#7D2121] flex flex-col items-center justify-center text-[#FDFBF7] text-center p-1">
                    <Award className="w-5 h-5 text-[#E4C8A6]" />
                    <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-[#F3E2CE]">
                      SEAL OF GENUINE MOHAIR
                    </span>
                  </div>
                </div>

                {/* Adoptive Parent Signature Line */}
                <div className="text-center sm:text-right space-y-1">
                  <div className="font-serif italic text-lg text-[#523A25] min-w-[140px]">
                    {parentName}
                  </div>
                  <div className="border-t border-[#A89279] pt-1 text-[10px] font-sans uppercase tracking-wider text-[#8C7662]">
                    Guardian & Lifelong Friend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quick Controls for Edit */}
        <div className="p-4 bg-[#EDE2D2] border-t border-[#DECBB4] flex flex-wrap items-center justify-between gap-3 text-xs font-sans print:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyRecord}
              className="px-3 py-1.5 text-xs font-medium text-[#4A3725] bg-[#DFCFBA] hover:bg-[#D5C2A9] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied to Clipboard' : 'Copy Registry Entry'}</span>
            </button>
          </div>

          <span className="text-[11px] text-[#7C6653]">
            This deed ships enclosed in an archival parchment envelope with every bear.
          </span>
        </div>
      </div>
    </div>
  );
};
