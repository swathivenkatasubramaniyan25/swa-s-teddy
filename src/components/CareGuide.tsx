import React, { useState } from 'react';
import { HeartHandshake, Shield, Sparkles, Check, Stethoscope, Clock, Award } from 'lucide-react';
import { playWoodTick } from '../utils/audio';

export const CareGuide: React.FC = () => {
  const [spaSubmitted, setSpaSubmitted] = useState(false);
  const [patientName, setPatientName] = useState('Barnaby Sr.');
  const [bearAge, setBearAge] = useState('28 Years');
  const [issue, setIssue] = useState<'grooming' | 'joint_repair' | 'eye_replacement' | 'stuffing'>('grooming');
  const [notes, setNotes] = useState('Slightly loose left shoulder joint and needs gentle botanical fur fluffing.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playWoodTick();
    setSpaSubmitted(true);
  };

  return (
    <section id="hospital-section" className="py-12 lg:py-16 bg-[#F4EDE4] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7C5335] bg-[#E7DCce] px-3.5 py-1.5 rounded-full mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#A87B51]" />
            <span>The Barnaby & Brooks Teddy Spa & Infirmary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E]">
            Heirloom care & restoration services.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E5946]">
            Every genuine teddy bear is made to live forever. Learn how to care for your heirloom companion, or send a vintage patient to our restorative spa.
          </p>
        </div>

        {/* 3 Care Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5DACD] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DC] flex items-center justify-center text-[#8C5D38]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              1. Mohair Brushing & Grooming
            </h3>
            <p className="text-xs text-[#705D4C] leading-relaxed">
              Use a natural boar-bristle brush once a month in the direction of the fur pile. For light dust, a gentle blow-dryer on the cool setting restores natural mohair luster.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5DACD] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DC] flex items-center justify-center text-[#8C5D38]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              2. Sunlight & Climate Preservation
            </h3>
            <p className="text-xs text-[#705D4C] leading-relaxed">
              Keep bears out of harsh direct ultraviolet rays to protect vegetable-dyed wool yarns. Store in breathable linen dustbags rather than airtight plastic containers.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5DACD] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DC] flex items-center justify-center text-[#8C5D38]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              3. Lifetime Stitch Guarantee
            </h3>
            <p className="text-xs text-[#705D4C] leading-relaxed">
              Every Barnaby & Brooks bear carries a lifetime guarantee against cotter-pin failure, joint slippage, and seam opening. We repair our own creations free of charge forever.
            </p>
          </div>
        </div>

        {/* Interactive Hospital Admission Form */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DACD] p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EFE7DC]">
            <HeartHandshake className="w-6 h-6 text-[#8C5D38]" />
            <div>
              <h3 className="font-serif font-bold text-xl text-[#2C241E]">
                Book an Infirmary Appointment for Your Bear
              </h3>
              <p className="text-xs text-[#7C6653]">
                Accepting vintage bears of any provenance or maker for careful artisanal restoration.
              </p>
            </div>
          </div>

          {spaSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#2C241E]">
                Admission Intake Registered for {patientName}!
              </h4>
              <p className="text-xs text-[#6B5745] max-w-md mx-auto">
                Our Chief Restorer has reviewed the request. A padded return shipping kit and medical tag will be mailed to your address.
              </p>
              <button
                type="button"
                onClick={() => setSpaSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold text-[#523A25] bg-[#EAE0D3] hover:bg-[#DDD1C2] rounded-lg transition-colors cursor-pointer"
              >
                Submit Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Bear's Name (Patient)
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Approximate Age
                  </label>
                  <input
                    type="text"
                    required
                    value={bearAge}
                    onChange={(e) => setBearAge(e.target.value)}
                    placeholder="e.g. 15 Years Old / 1950s"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Primary Service Needed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'grooming' as const, label: 'Fur Spa & Fluff' },
                      { id: 'joint_repair' as const, label: 'Joint Re-tightening' },
                      { id: 'eye_replacement' as const, label: 'Glass Eye Match' },
                      { id: 'stuffing' as const, label: 'Wool Re-stuffing' },
                    ].map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setIssue(srv.id)}
                        className={`p-2.5 rounded-lg border text-center text-xs font-medium cursor-pointer transition-all ${
                          issue === srv.id
                            ? 'border-[#8C5D38] bg-[#F7EFE4] text-[#2C241E] font-bold'
                            : 'border-[#EAE0D4] bg-white text-[#7E6A57]'
                        }`}
                      >
                        {srv.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7C6653] mb-1">
                    Patient History & Condition Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C5B3] bg-white text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#8C5D38]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-[#FDFBF7] bg-[#43281C] hover:bg-[#301B12] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Request Infirmary Assessment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
