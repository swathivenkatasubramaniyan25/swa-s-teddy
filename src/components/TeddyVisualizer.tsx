import React, { useState } from 'react';
import { playHeartbeat, playMusicBox, playTeddySqueak, playAdoptionFanfare } from '../utils/audio';

interface TeddyVisualizerProps {
  furColor: string;
  snoutColor?: string;
  eyeStyle?: 'amber' | 'button' | 'stitched';
  outfit?: string;
  accessory?: string;
  ribbonColor?: string;
  ribbonText?: string;
  heartType?: 'love' | 'courage' | 'dreams' | 'joy' | 'none';
  soundType?: 'heartbeat' | 'lullaby' | 'squeak' | 'melody';
  sizeScale?: number; // 0.85 for 10", 1 for 14", 1.15 for 18"
  interactive?: boolean;
  className?: string;
  showHeartPulse?: boolean;
}

export const TeddyVisualizer: React.FC<TeddyVisualizerProps> = ({
  furColor = '#C49A5B',
  snoutColor = '#4A2E18',
  eyeStyle = 'amber',
  outfit = 'none',
  accessory = 'none',
  ribbonColor = '#1A365D',
  ribbonText = '',
  heartType = 'love',
  soundType = 'heartbeat',
  sizeScale = 1,
  interactive = true,
  className = '',
  showHeartPulse = true,
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const handleHeartPress = () => {
    setIsPressing(true);
    setPulseCount((prev) => prev + 1);

    if (soundType === 'heartbeat') playHeartbeat();
    else if (soundType === 'lullaby') playMusicBox();
    else if (soundType === 'squeak') playTeddySqueak();
    else if (soundType === 'melody') playAdoptionFanfare();
    else playHeartbeat();

    setTimeout(() => setIsPressing(false), 400);
  };

  // Derive shading colors from furColor
  const furHighlight = '#FFF4E5';
  const innerEarColor = '#EAD6C0';
  const pawPadColor = '#D4B89A';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* SVG Canvas for High-Precision Heirloom Bear */}
      <div
        className="relative w-full aspect-square max-w-[420px] transition-transform duration-300 ease-out"
        style={{ transform: `scale(${sizeScale})` }}
      >
        <svg
          viewBox="0 0 400 440"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fur Linear & Radial Gradients */}
            <radialGradient id="furBodyGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor={furHighlight} stopOpacity="0.25" />
              <stop offset="60%" stopColor={furColor} />
              <stop offset="100%" stopColor={furColor} stopOpacity="0.88" />
            </radialGradient>

            <radialGradient id="furHeadGrad" cx="45%" cy="40%" r="50%">
              <stop offset="0%" stopColor={furHighlight} stopOpacity="0.3" />
              <stop offset="70%" stopColor={furColor} />
              <stop offset="100%" stopColor="#1B120C" stopOpacity="0.25" />
            </radialGradient>

            <radialGradient id="snoutGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF9F2" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#E6D3BF" />
              <stop offset="100%" stopColor="#C9B198" />
            </radialGradient>

            {/* Amber Glass Eye Gradient */}
            <radialGradient id="amberEyeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="75%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#180C04" />
            </radialGradient>

            {/* Soft Shadow Filter */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2C241E" floodOpacity="0.15" />
            </filter>

            {/* Heart Glow Filter */}
            <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="200" cy="415" rx="125" ry="18" fill="#1C150E" fillOpacity="0.12" />
          <ellipse cx="200" cy="415" rx="85" ry="10" fill="#1C150E" fillOpacity="0.1" />

          {/* BACK LEGS & PAWS */}
          {/* Left Leg */}
          <g>
            <ellipse cx="120" cy="355" rx="42" ry="50" fill={furColor} transform="rotate(-15 120 355)" />
            <ellipse cx="120" cy="355" rx="40" ry="48" fill="url(#furBodyGrad)" transform="rotate(-15 120 355)" />
            {/* Footpad */}
            <ellipse cx="112" cy="378" rx="26" ry="18" fill={pawPadColor} transform="rotate(-5 112 378)" />
            {/* Pad Stitch Marks */}
            <circle cx="98" cy="365" r="4" fill="#6A4E36" opacity="0.6" />
            <circle cx="112" cy="362" r="4.5" fill="#6A4E36" opacity="0.6" />
            <circle cx="126" cy="365" r="4" fill="#6A4E36" opacity="0.6" />
          </g>

          {/* Right Leg */}
          <g>
            <ellipse cx="280" cy="355" rx="42" ry="50" fill={furColor} transform="rotate(15 280 355)" />
            <ellipse cx="280" cy="355" rx="40" ry="48" fill="url(#furBodyGrad)" transform="rotate(15 280 355)" />
            {/* Footpad */}
            <ellipse cx="288" cy="378" rx="26" ry="18" fill={pawPadColor} transform="rotate(5 288 378)" />
            {/* Pad Stitch Marks */}
            <circle cx="274" cy="365" r="4" fill="#6A4E36" opacity="0.6" />
            <circle cx="288" cy="362" r="4.5" fill="#6A4E36" opacity="0.6" />
            <circle cx="302" cy="365" r="4" fill="#6A4E36" opacity="0.6" />
          </g>

          {/* TORSO / BELLY */}
          <ellipse cx="200" cy="275" rx="86" ry="102" fill={furColor} filter="url(#softShadow)" />
          <ellipse cx="200" cy="275" rx="84" ry="100" fill="url(#furBodyGrad)" />

          {/* Subtle Belly Seam Stitch Line */}
          <path
            d="M 200 200 Q 201 270 200 350"
            stroke="#2C1B10"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            opacity="0.25"
          />

          {/* OUTFIT LAYER: Dungarees / Sweater / Vest / Pajamas */}
          {outfit === 'cable_sweater' && (
            <g id="outfit-sweater">
              {/* Cable knit jumper body */}
              <path
                d="M 132 210 Q 200 195 268 210 L 274 320 Q 200 335 126 320 Z"
                fill="#1E4733"
              />
              {/* Knitted Cable rib textures */}
              <path d="M 155 210 L 152 320 M 175 205 L 173 324 M 200 204 L 200 326 M 225 205 L 227 324 M 245 210 L 248 320"
                stroke="#2A6147" strokeWidth="2.5" strokeDasharray="5 3" />
              {/* Ribbed neck collar */}
              <ellipse cx="200" cy="205" rx="48" ry="14" fill="#143625" stroke="#2A6147" strokeWidth="2" />
              {/* Ribbed hem */}
              <path d="M 126 318 Q 200 332 274 318 L 274 328 Q 200 342 126 328 Z" fill="#143625" />
            </g>
          )}

          {outfit === 'aviator' && (
            <g id="outfit-aviator">
              {/* Distressed leather flight jacket */}
              <path
                d="M 130 210 Q 200 195 270 210 L 275 320 Q 200 330 125 320 Z"
                fill="#4E3321"
              />
              {/* Cream shearling lapels */}
              <path
                d="M 160 205 Q 185 245 200 270 Q 215 245 240 205 L 255 215 Q 225 265 200 295 Q 175 265 145 215 Z"
                fill="#F3E7D7"
              />
              {/* Brass zipper & buckle */}
              <line x1="200" y1="285" x2="200" y2="322" stroke="#C59B27" strokeWidth="3" strokeDasharray="3 2" />
              <rect x="194" y="318" width="12" height="6" rx="1" fill="#C59B27" />
            </g>
          )}

          {outfit === 'dungarees' && (
            <g id="outfit-dungarees">
              {/* Corduroy bib */}
              <rect x="156" y="235" width="88" height="75" rx="6" fill="#84532B" />
              {/* Overalls pants section */}
              <path d="M 132 300 Q 200 295 268 300 L 272 360 Q 200 370 128 360 Z" fill="#724522" />
              {/* Straps */}
              <path d="M 158 240 L 150 202 L 165 200 L 172 240 Z" fill="#84532B" />
              <path d="M 242 240 L 250 202 L 235 200 L 228 240 Z" fill="#84532B" />
              {/* Wooden buttons on straps */}
              <circle cx="165" cy="245" r="4.5" fill="#D3A068" stroke="#523215" strokeWidth="1" />
              <circle cx="235" cy="245" r="4.5" fill="#D3A068" stroke="#523215" strokeWidth="1" />
              {/* Front kangaroo pocket */}
              <path d="M 175 265 H 225 V 295 Q 200 302 175 295 Z" fill="#653D1E" stroke="#8E5A30" strokeWidth="1" />
            </g>
          )}

          {outfit === 'vest_bowtie' && (
            <g id="outfit-vest">
              {/* Tweed waistcoat */}
              <path d="M 140 215 L 180 210 L 195 285 L 155 315 L 132 290 Z" fill="#4B5563" />
              <path d="M 260 215 L 220 210 L 205 285 L 245 315 L 268 290 Z" fill="#4B5563" />
              {/* Vest buttons */}
              <circle cx="200" cy="245" r="3" fill="#D1D5DB" />
              <circle cx="200" cy="265" r="3" fill="#D1D5DB" />
              <circle cx="200" cy="285" r="3" fill="#D1D5DB" />
            </g>
          )}

          {outfit === 'pajamas' && (
            <g id="outfit-pajamas">
              {/* Starry night pajamas */}
              <path d="M 132 210 Q 200 195 268 210 L 274 340 Q 200 350 126 340 Z" fill="#E0F2FE" />
              {/* Thin blue stripes */}
              <line x1="145" y1="210" x2="145" y2="340" stroke="#7DD3FC" strokeWidth="2.5" />
              <line x1="170" y1="205" x2="170" y2="345" stroke="#7DD3FC" strokeWidth="2.5" />
              <line x1="200" y1="205" x2="200" y2="348" stroke="#7DD3FC" strokeWidth="2.5" />
              <line x1="230" y1="205" x2="230" y2="345" stroke="#7DD3FC" strokeWidth="2.5" />
              <line x1="255" y1="210" x2="255" y2="340" stroke="#7DD3FC" strokeWidth="2.5" />
            </g>
          )}

          {/* FRONT ARMS & PAWS */}
          {/* Left Arm */}
          <g>
            <path
              d="M 142 205 Q 85 240 100 295 Q 112 320 135 305 Q 155 290 146 240 Z"
              fill={furColor}
              filter="url(#softShadow)"
            />
            <path
              d="M 142 205 Q 85 240 100 295 Q 112 320 135 305 Q 155 290 146 240 Z"
              fill="url(#furBodyGrad)"
            />
            {/* Paw pad */}
            <ellipse cx="118" cy="298" rx="14" ry="10" fill={pawPadColor} transform="rotate(30 118 298)" />
            {/* Joint stitch button */}
            <circle cx="140" cy="215" r="4" fill="#3D2817" opacity="0.4" />
          </g>

          {/* Right Arm */}
          <g>
            <path
              d="M 258 205 Q 315 240 300 295 Q 288 320 265 305 Q 245 290 254 240 Z"
              fill={furColor}
              filter="url(#softShadow)"
            />
            <path
              d="M 258 205 Q 315 240 300 295 Q 288 320 265 305 Q 245 290 254 240 Z"
              fill="url(#furBodyGrad)"
            />
            {/* Paw pad */}
            <ellipse cx="282" cy="298" rx="14" ry="10" fill={pawPadColor} transform="rotate(-30 282 298)" />
            {/* Joint stitch button */}
            <circle cx="260" cy="215" r="4" fill="#3D2817" opacity="0.4" />
          </g>

          {/* HEART TOKEN EMBEDDED IN CHEST (Interactive Heartbeat) */}
          {heartType !== 'none' && (
            <g
              className="cursor-pointer group"
              onClick={interactive ? handleHeartPress : undefined}
            >
              {/* Outer pulsing ring */}
              {showHeartPulse && (
                <circle
                  cx="200"
                  cy="255"
                  r={isPressing ? '26' : '18'}
                  fill="#E11D48"
                  fillOpacity={isPressing ? '0.35' : '0.15'}
                  className="transition-all duration-300 animate-pulse"
                />
              )}
              {/* Heart Shape */}
              <g
                transform={`translate(186, 241) scale(${isPressing ? 1.25 : 1})`}
                className="transition-transform duration-150 origin-center"
                filter="url(#heartGlow)"
              >
                <path
                  d="M14 24 C14 24 2 16 2 8 C2 3.5 5.5 0 10 0 C12.5 0 13.5 1.5 14 3 C14.5 1.5 15.5 0 18 0 C22.5 0 26 3.5 26 8 C26 16 14 24 14 24 Z"
                  fill="#E11D48"
                />
                <circle cx="8" cy="6" r="2" fill="#FDA4AF" opacity="0.7" />
              </g>
            </g>
          )}

          {/* ACCESSORY: Crossbody Satchel */}
          {accessory === 'satchel' && (
            <g id="accessory-satchel">
              {/* Leather strap */}
              <path d="M 125 210 Q 190 260 270 310" stroke="#5D3A1F" strokeWidth="6" />
              {/* Satchel Bag on Hip */}
              <rect x="250" y="285" width="46" height="36" rx="4" fill="#6B4226" stroke="#462B17" strokeWidth="2" filter="url(#softShadow)" />
              <path d="M 250 285 L 273 305 L 296 285 Z" fill="#52321B" />
              <rect x="270" y="302" width="6" height="8" rx="1" fill="#D97706" />
            </g>
          )}

          {/* ACCESSORY: Pocket Compass Charm */}
          {accessory === 'compass' && (
            <g id="accessory-compass" transform="translate(165, 270)">
              <line x1="12" y1="-15" x2="12" y2="0" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="10" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="8" fill="#FFFBEB" />
              <polygon points="12,5 14,10 12,15 10,10" fill="#DC2626" />
            </g>
          )}

          {/* HEAD & EARS */}
          {/* Left Ear */}
          <g>
            <circle cx="132" cy="80" r="35" fill={furColor} />
            <circle cx="132" cy="80" r="34" fill="url(#furHeadGrad)" />
            <circle cx="134" cy="82" r="20" fill={innerEarColor} opacity="0.85" />
            {/* Fur edge tufts */}
            <path d="M 120 70 Q 115 80 122 88" stroke={furHighlight} strokeWidth="1.5" opacity="0.4" />
          </g>

          {/* Right Ear */}
          <g>
            <circle cx="268" cy="80" r="35" fill={furColor} />
            <circle cx="268" cy="80" r="34" fill="url(#furHeadGrad)" />
            <circle cx="266" cy="82" r="20" fill={innerEarColor} opacity="0.85" />
            <path d="M 280 70 Q 285 80 278 88" stroke={furHighlight} strokeWidth="1.5" opacity="0.4" />
          </g>

          {/* Head Sphere */}
          <circle cx="200" cy="130" r="76" fill={furColor} filter="url(#softShadow)" />
          <circle cx="200" cy="130" r="75" fill="url(#furHeadGrad)" />

          {/* SNOUT & MUZZLE (Contrasting Light Fur) */}
          <ellipse cx="200" cy="148" rx="42" ry="32" fill="url(#snoutGrad)" filter="url(#softShadow)" />

          {/* HAND-STITCHED NOSE */}
          {/* Triangular embroidered nose block */}
          <path
            d="M 188 135 Q 200 132 212 135 L 206 148 Q 200 152 194 148 Z"
            fill={snoutColor}
          />
          {/* Horizontal stitch ridges */}
          <line x1="189" y1="138" x2="211" y2="138" stroke="#1F130B" strokeWidth="1" opacity="0.5" />
          <line x1="192" y1="142" x2="208" y2="142" stroke="#1F130B" strokeWidth="1" opacity="0.5" />

          {/* Philtrum and Mouth Stitch */}
          <line x1="200" y1="150" x2="200" y2="160" stroke={snoutColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Gentle Smile Curve */}
          <path
            d="M 188 160 Q 200 168 212 160"
            stroke={snoutColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* EYES */}
          {eyeStyle === 'amber' && (
            <g id="amber-glass-eyes">
              {/* Left Eye */}
              <circle cx="166" cy="118" r="9.5" fill="url(#amberEyeGrad)" />
              <circle cx="166" cy="118" r="5" fill="#0F0904" />
              <circle cx="163.5" cy="115.5" r="2.2" fill="#FFFFFF" opacity="0.9" />
              <circle cx="168" cy="120" r="1.2" fill="#FDE68A" opacity="0.7" />

              {/* Right Eye */}
              <circle cx="234" cy="118" r="9.5" fill="url(#amberEyeGrad)" />
              <circle cx="234" cy="118" r="5" fill="#0F0904" />
              <circle cx="231.5" cy="115.5" r="2.2" fill="#FFFFFF" opacity="0.9" />
              <circle cx="236" cy="120" r="1.2" fill="#FDE68A" opacity="0.7" />
            </g>
          )}

          {eyeStyle === 'button' && (
            <g id="horn-button-eyes">
              {/* Left Button */}
              <circle cx="166" cy="118" r="9" fill="#3D291C" stroke="#24170E" strokeWidth="1.5" />
              <circle cx="164" cy="116" r="1.5" fill="#E5D3B8" />
              <circle cx="168" cy="116" r="1.5" fill="#E5D3B8" />
              <circle cx="164" cy="120" r="1.5" fill="#E5D3B8" />
              <circle cx="168" cy="120" r="1.5" fill="#E5D3B8" />
              <line x1="164" y1="116" x2="168" y2="120" stroke="#FAF5EF" strokeWidth="1" />
              <line x1="168" y1="116" x2="164" y2="120" stroke="#FAF5EF" strokeWidth="1" />

              {/* Right Button */}
              <circle cx="234" cy="118" r="9" fill="#3D291C" stroke="#24170E" strokeWidth="1.5" />
              <circle cx="232" cy="116" r="1.5" fill="#E5D3B8" />
              <circle cx="236" cy="116" r="1.5" fill="#E5D3B8" />
              <circle cx="232" cy="120" r="1.5" fill="#E5D3B8" />
              <circle cx="236" cy="120" r="1.5" fill="#E5D3B8" />
              <line x1="232" y1="116" x2="236" y2="120" stroke="#FAF5EF" strokeWidth="1" />
              <line x1="236" y1="116" x2="232" y2="120" stroke="#FAF5EF" strokeWidth="1" />
            </g>
          )}

          {eyeStyle === 'stitched' && (
            <g id="stitched-sleeping-eyes">
              {/* Gentle curved thread stitches */}
              <path d="M 158 119 Q 166 126 174 119" stroke={snoutColor} strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 226 119 Q 234 126 242 119" stroke={snoutColor} strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ACCESSORY: Round Wire Spectacles */}
          {accessory === 'spectacles' && (
            <g id="accessory-spectacles">
              {/* Left Lens Frame */}
              <circle cx="166" cy="118" r="15" stroke="#C59B27" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.12" />
              {/* Right Lens Frame */}
              <circle cx="234" cy="118" r="15" stroke="#C59B27" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.12" />
              {/* Bridge */}
              <path d="M 181 118 Q 200 112 219 118" stroke="#C59B27" strokeWidth="2.5" fill="none" />
              {/* Side arms */}
              <path d="M 151 118 L 136 112" stroke="#C59B27" strokeWidth="2" />
              <path d="M 249 118 L 264 112" stroke="#C59B27" strokeWidth="2" />
            </g>
          )}

          {/* AVIATOR GOGGLES (If Aviator Outfit Selected) */}
          {outfit === 'aviator' && (
            <g id="aviator-goggles" transform="translate(0, -50)">
              {/* Goggle Strap */}
              <path d="M 125 125 Q 200 110 275 125" stroke="#2E1C0C" strokeWidth="8" />
              {/* Brass Rim Lenses resting on forehead */}
              <circle cx="168" cy="120" r="18" fill="#4B607F" stroke="#D4AF37" strokeWidth="4" />
              <circle cx="232" cy="120" r="18" fill="#4B607F" stroke="#D4AF37" strokeWidth="4" />
              {/* Glass sheen */}
              <path d="M 158 114 Q 168 124 178 114" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
              <path d="M 222 114 Q 232 124 242 114" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            </g>
          )}

          {/* PAJAMA NIGHTCAP (If Pajamas Selected) */}
          {outfit === 'pajamas' && (
            <g id="nightcap">
              <path d="M 140 85 Q 200 40 270 90 Q 240 20 180 5 Q 140 30 140 85 Z" fill="#BAE6FD" />
              <circle cx="178" cy="5" r="9" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="1.5" />
            </g>
          )}

          {/* SILK NECK RIBBON & BOW */}
          <g id="silk-ribbon">
            {/* Neck Band */}
            <path
              d="M 152 192 Q 200 204 248 192 L 250 206 Q 200 218 150 206 Z"
              fill={ribbonColor}
              filter="url(#softShadow)"
            />

            {/* Bow Knot */}
            <rect x="190" y="196" width="20" height="15" rx="3" fill={ribbonColor} stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" />

            {/* Left Bow Loop */}
            <ellipse cx="176" cy="204" rx="18" ry="12" fill={ribbonColor} transform="rotate(-15 176 204)" />
            <ellipse cx="178" cy="204" rx="10" ry="6" fill="#111827" fillOpacity="0.2" transform="rotate(-15 178 204)" />

            {/* Right Bow Loop */}
            <ellipse cx="224" cy="204" rx="18" ry="12" fill={ribbonColor} transform="rotate(15 224 204)" />
            <ellipse cx="222" cy="204" rx="10" ry="6" fill="#111827" fillOpacity="0.2" transform="rotate(15 222 204)" />

            {/* Ribbon Tails */}
            <path d="M 194 208 Q 185 240 178 260 L 190 262 Q 198 238 202 208 Z" fill={ribbonColor} />
            <path d="M 206 208 Q 215 240 222 260 L 210 262 Q 202 238 198 208 Z" fill={ribbonColor} />
          </g>

          {/* EMBROIDERED TEXT ON RIBBON (If Specified) */}
          {ribbonText && (
            <g id="ribbon-text-overlay">
              <rect x="140" y="270" width="120" height="20" rx="3" fill="#FAF5EF" fillOpacity="0.95" stroke="#D1B89D" strokeWidth="1" filter="url(#softShadow)" />
              <text
                x="200"
                y="283"
                textAnchor="middle"
                fill="#2C1B10"
                fontSize="9"
                fontFamily="var(--font-serif)"
                fontWeight="600"
                letterSpacing="0.5"
              >
                {ribbonText.length > 22 ? ribbonText.slice(0, 20) + '…' : ribbonText}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Heartbeat Prompt / Sound Cue */}
      {interactive && heartType !== 'none' && (
        <button
          type="button"
          onClick={handleHeartPress}
          className="mt-3 group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#7C5335] bg-[#F3EBE1] hover:bg-[#EAE0D3] hover:text-[#52321B] transition-colors border border-[#E3D4C3] shadow-xs active:scale-95 cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-sans">
            Press tummy to hear {soundType === 'heartbeat' ? 'heartbeat' : soundType === 'lullaby' ? 'music box' : soundType === 'squeak' ? 'soft squeak' : 'fanfare'}
          </span>
        </button>
      )}
    </div>
  );
};
