import React, { useState } from 'react';
import { CustomTeddyConfig } from '../types';
import {
  FUR_COLOR_OPTIONS,
  SNOUT_COLOR_OPTIONS,
  EYE_OPTIONS,
  HEART_INSERTS,
  OUTFIT_OPTIONS,
  ACCESSORY_OPTIONS,
  RIBBON_COLORS,
} from '../data/products';
import { TeddyVisualizer } from './TeddyVisualizer';
import { Sparkles, Heart, Check, Scissors, Volume2, Shield, Calendar, User, MapPin } from 'lucide-react';
import { playHeartbeat, playMusicBox, playTeddySqueak, playAdoptionFanfare } from '../utils/audio';

interface CustomAtelierProps {
  onAddCustomToCart: (config: CustomTeddyConfig, price: number) => void;
  onPreviewCertificate: (config: CustomTeddyConfig) => void;
}

export const CustomAtelier: React.FC<CustomAtelierProps> = ({
  onAddCustomToCart,
  onPreviewCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'fur' | 'face' | 'heart' | 'wardrobe' | 'deed'>('fur');

  // Config State
  const [config, setConfig] = useState<CustomTeddyConfig>({
    furColor: '#C49A5B',
    furTexture: 'mohair',
    size: '14',
    snoutColor: '#3E2413',
    eyeStyle: 'amber',
    heartInsert: {
      type: 'love',
      name: 'Eternal Love & Warm Hugs',
      sound: 'heartbeat',
    },
    outfit: 'none',
    accessory: 'none',
    ribbonColor: '#1E3A8A',
    ribbonText: 'Beloved Companion',
    bearName: 'Barnaby Brooks',
    adoptiveParent: 'Gentle Keeper',
    birthCity: 'Edinburgh Atelier',
    birthDate: 'October 2026',
    notes: 'Hand-stitched with German mohair and wooden cotter-pin joints.',
  });

  // Calculate dynamic price
  const basePrice = config.size === '10' ? 85 : config.size === '14' ? 120 : 155;
  const furAdd = FUR_COLOR_OPTIONS.find((f) => f.hex === config.furColor)?.priceAdd || 0;
  const heartAdd = HEART_INSERTS.find((h) => h.type === config.heartInsert.type)?.price || 8;
  const outfitAdd = OUTFIT_OPTIONS.find((o) => o.id === config.outfit)?.price || 0;
  const accessoryAdd = ACCESSORY_OPTIONS.find((a) => a.id === config.accessory)?.price || 0;
  const ribbonAdd = config.ribbonText ? 6 : 0;
  const totalPrice = basePrice + furAdd + heartAdd + outfitAdd + accessoryAdd + ribbonAdd;

  const handleTestSound = (sound: 'heartbeat' | 'lullaby' | 'squeak' | 'melody') => {
    if (sound === 'heartbeat') playHeartbeat();
    else if (sound === 'lullaby') playMusicBox();
    else if (sound === 'squeak') playTeddySqueak();
    else if (sound === 'melody') playAdoptionFanfare();
  };

  const handleAdopt = () => {
    playAdoptionFanfare();
    onAddCustomToCart(config, totalPrice);
  };

  return (
    <section id="custom-atelier" className="py-12 lg:py-16 bg-[#F6F0E7] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7C5335] bg-[#EBE0D2] px-3.5 py-1.5 rounded-full mb-3">
            <Scissors className="w-3.5 h-3.5 text-[#A87B51]" />
            <span>Interactive Custom Bear Workshop</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] text-balance">
            Design your bespoke heirloom companion.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E5946]">
            Every stitch is placed by master artisans. Choose his coat, whisper a secret promise into his sewn heart, dress him in hand-spun wool, and inscribe his velvet ribbon.
          </p>
        </div>

        {/* Workspace Layout: Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: Live Interactive Visualizer Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E5DACD] shadow-lg flex flex-col items-center">
            {/* Hallmark Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#EFE5D9] text-xs text-[#7C6653]">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#96633B]">
                {config.size}" Atelier Pattern
              </span>
              <span className="text-[#8C7662]">5-Way Articulated</span>
            </div>

            {/* Bear Preview */}
            <TeddyVisualizer
              furColor={config.furColor}
              snoutColor={config.snoutColor}
              eyeStyle={config.eyeStyle}
              outfit={config.outfit}
              accessory={config.accessory}
              ribbonColor={config.ribbonColor}
              ribbonText={config.ribbonText}
              heartType={config.heartInsert.type}
              soundType={config.heartInsert.sound}
              sizeScale={config.size === '10' ? 0.85 : config.size === '18' ? 1.08 : 0.98}
              interactive={true}
              className="w-full max-w-[340px]"
            />

            {/* Live Config Summary Banner */}
            <div className="mt-4 w-full bg-[#F3ECE2] rounded-2xl p-4 border border-[#E2D4C3] text-left">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-base text-[#2C241E]">
                  {config.bearName || 'Unnamed Bear'}
                </h4>
                <span className="font-mono text-xl font-bold text-[#2C241E] tabular-nums">
                  ${totalPrice}
                </span>
              </div>
              <p className="text-xs text-[#705D4C] flex flex-wrap items-center gap-1.5">
                <span>{config.size}" Scale</span>
                <span aria-hidden="true">·</span>
                <span>{FUR_COLOR_OPTIONS.find((f) => f.hex === config.furColor)?.name.split(' ')[0]}</span>
                <span aria-hidden="true">·</span>
                <span>{config.heartInsert.name.split('&')[0]}</span>
                {config.outfit !== 'none' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{OUTFIT_OPTIONS.find((o) => o.id === config.outfit)?.name.split(' ')[0]}</span>
                  </>
                )}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 w-full flex gap-3">
              <button
                type="button"
                onClick={() => onPreviewCertificate(config)}
                className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#523B2A] bg-[#EDE4D8] hover:bg-[#E2D5C4] rounded-xl transition-colors cursor-pointer"
              >
                Preview Deed
              </button>
              <button
                type="button"
                onClick={handleAdopt}
                className="flex-1 py-2.5 px-4 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#2F1B12] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E4C8A6]" />
                <span>Adopt Bear (${totalPrice})</span>
              </button>
            </div>
          </div>

          {/* Right Configuration Deck: Stepped Tabs */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#E5DACD] shadow-sm p-6 sm:p-8">
            {/* Clean Segmented Tab Control */}
            <div className="flex items-center gap-1 p-1 bg-[#EFE7DC] rounded-xl overflow-x-auto mb-6">
              {[
                { id: 'fur', label: '1. Fur & Scale' },
                { id: 'face', label: '2. Facial Features' },
                { id: 'heart', label: '3. Heart Token' },
                { id: 'wardrobe', label: '4. Wardrobe' },
                { id: 'deed', label: '5. Adoption Deed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 min-w-[110px] py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#FAF7F2] text-[#2C241E] shadow-xs'
                      : 'text-[#6E5948] hover:text-[#2C241E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Fur & Scale */}
            {activeTab === 'fur' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Select Mohair Coat Palette
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FUR_COLOR_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setConfig({ ...config, furColor: f.hex })}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          config.furColor === f.hex
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shrink-0 border border-black/10 shadow-xs"
                          style={{ backgroundColor: f.hex }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-[#2C241E]">{f.name}</span>
                            {f.priceAdd > 0 && (
                              <span className="font-mono text-xs text-[#8C5D38]">+{f.priceAdd}$</span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#7E6A57]">{f.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE5D9]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Atelier Scale & Proportion
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { size: '10' as const, label: '10" Pocket Heirloom', base: '$85', desc: 'Fits comfortably in hand & satchel' },
                      { size: '14' as const, label: '14" Cotswold Classic', base: '$120', desc: 'Standard 1920s parlor scale' },
                      { size: '18' as const, label: '18" Grand Library Bear', base: '$155', desc: 'Substantial weighted nursery presence' },
                    ].map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setConfig({ ...config, size: s.size })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          config.size === s.size
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-[#2C241E]">{s.label}</span>
                          <span className="font-mono text-xs font-bold text-[#8C5D38]">{s.base}</span>
                        </div>
                        <p className="text-[11px] text-[#7E6A57]">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('face')}
                    className="px-5 py-2.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer"
                  >
                    Next: Facial Features →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Face */}
            {activeTab === 'face' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Eye Craftsmanship & Gaze
                  </label>
                  <div className="space-y-2.5">
                    {EYE_OPTIONS.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setConfig({ ...config, eyeStyle: e.id as typeof config.eyeStyle })}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          config.eyeStyle === e.id
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-xs text-[#2C241E] block">{e.name}</span>
                          <span className="text-[11px] text-[#7E6A57]">{e.desc}</span>
                        </div>
                        {config.eyeStyle === e.id && <Check className="w-4 h-4 text-[#8C5D38]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE5D9]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Hand-Embroidered Snout & Mouth Stitch
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SNOUT_COLOR_OPTIONS.map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setConfig({ ...config, snoutColor: sc.hex })}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          config.snoutColor === sc.hex
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                          style={{ backgroundColor: sc.hex }}
                        />
                        <span className="font-medium text-xs text-[#2C241E]">{sc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('fur')}
                    className="px-4 py-2 text-xs font-semibold text-[#6E5948] hover:text-[#2C241E] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('heart')}
                    className="px-5 py-2.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer"
                  >
                    Next: Heart Token Ceremony →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Heart Insert */}
            {activeTab === 'heart' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    <label className="text-xs font-bold uppercase tracking-wider text-[#685341]">
                      The Heart Inscription Ceremony
                    </label>
                  </div>
                  <p className="text-xs text-[#7E6A57] mb-4">
                    Before final closure of the back seam, we gently tuck a ceremonial red plush token deep within the chest cavity. Select what blessing your bear will carry:
                  </p>

                  <div className="space-y-3">
                    {HEART_INSERTS.map((h) => {
                      const isSelected = config.heartInsert.type === h.type;
                      return (
                        <div
                          key={h.type}
                          onClick={() =>
                            setConfig({
                              ...config,
                              heartInsert: {
                                type: h.type,
                                name: h.name,
                                sound: h.sound,
                              },
                            })
                          }
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                              : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{h.symbol}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-[#2C241E]">{h.name}</span>
                                <span className="font-mono text-xs text-[#8C5D38]">+{h.price}$</span>
                              </div>
                              <p className="text-[11px] text-[#7E6A57]">{h.desc}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTestSound(h.sound);
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-[#523826] bg-[#EBE0D2] hover:bg-[#DDCFBF] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                              title="Listen to audio token"
                            >
                              <Volume2 className="w-3 h-3 text-[#A87B51]" />
                              <span>Listen</span>
                            </button>
                            {isSelected && <Check className="w-4 h-4 text-[#8C5D38]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('face')}
                    className="px-4 py-2 text-xs font-semibold text-[#6E5948] hover:text-[#2C241E] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('wardrobe')}
                    className="px-5 py-2.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer"
                  >
                    Next: Wardrobe & Accessories →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: Wardrobe & Accessories */}
            {activeTab === 'wardrobe' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Hand-Tailored Garments
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {OUTFIT_OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setConfig({ ...config, outfit: o.id as typeof config.outfit })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          config.outfit === o.id
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-[#2C241E]">{o.name}</span>
                          <span className="font-mono text-xs font-bold text-[#8C5D38]">
                            {o.price === 0 ? 'Included' : `+$${o.price}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7E6A57]">{o.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE5D9]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Bespoke Miniature Accessories
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACCESSORY_OPTIONS.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setConfig({ ...config, accessory: a.id as typeof config.accessory })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          config.accessory === a.id
                            ? 'border-[#8C5D38] bg-[#F7EFE4] ring-1 ring-[#8C5D38]'
                            : 'border-[#EAE0D4] bg-[#FDFBF7] hover:border-[#D5C5B3]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#2C241E]">{a.name}</span>
                          <span className="font-mono text-xs text-[#8C5D38]">
                            {a.price === 0 ? 'None' : `+$${a.price}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('heart')}
                    className="px-4 py-2 text-xs font-semibold text-[#6E5948] hover:text-[#2C241E] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('deed')}
                    className="px-5 py-2.5 text-xs font-semibold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-lg transition-colors cursor-pointer"
                  >
                    Next: Personalized Ribbon & Deed →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: Ribbon & Deed */}
            {activeTab === 'deed' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-3">
                    Silk Ribbon Color
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {RIBBON_COLORS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setConfig({ ...config, ribbonColor: r.hex })}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          config.ribbonColor === r.hex
                            ? 'border-[#8C5D38] bg-[#F7EFE4] font-bold'
                            : 'border-[#EAE0D4] bg-[#FDFBF7]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: r.hex }}
                        />
                        <span>{r.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-1.5">
                    Gold-Stitched Ribbon Text (Optional +$6)
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={config.ribbonText}
                    onChange={(e) => setConfig({ ...config, ribbonText: e.target.value })}
                    placeholder="e.g. For Oliver with All My Love"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C5B3] bg-white text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                  <p className="mt-1 text-[11px] text-[#8C7662]">
                    Rendered live on the bear's silk ribbon and recorded on the certificate.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE5D9] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-1.5 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#8C5D38]" />
                      Bear's Name
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={config.bearName}
                      onChange={(e) => setConfig({ ...config, bearName: e.target.value })}
                      placeholder="e.g. Barnaby Brooks"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5C5B3] bg-white text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#685341] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#8C5D38]" />
                      Adoptive Parent / Companion
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={config.adoptiveParent}
                      onChange={(e) => setConfig({ ...config, adoptiveParent: e.target.value })}
                      placeholder="e.g. Charlotte & Family"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5C5B3] bg-white text-xs text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('wardrobe')}
                    className="px-4 py-2 text-xs font-semibold text-[#6E5948] hover:text-[#2C241E] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleAdopt}
                    className="px-6 py-3 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#321E14] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#E4C8A6]" />
                    <span>Complete Bear & Adopt (${totalPrice})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
