export interface TeddyProduct {
  id: string;
  name: string;
  subtitle: string;
  collection: 'mohair' | 'dressed' | 'plush' | 'pocket';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  story: string;
  furType: string;
  furColor: string;
  snoutColor: string;
  eyeStyle: 'amber' | 'button' | 'stitched';
  size: string; // e.g. "14 inches (35cm)"
  weight: string; // e.g. "450g"
  stuffing: string;
  jointing: string;
  badge?: string;
  inStock: boolean;
  outfit?: string;
  accessories?: string[];
  ribbonColor: string;
  defaultRibbonText?: string;
}

export interface CustomTeddyConfig {
  furColor: string;
  furTexture: 'mohair' | 'plush' | 'boucle';
  size: '10' | '14' | '18';
  snoutColor: string;
  eyeStyle: 'amber' | 'button' | 'stitched';
  heartInsert: {
    type: 'love' | 'courage' | 'dreams' | 'joy';
    name: string;
    sound: 'heartbeat' | 'lullaby' | 'squeak' | 'melody';
  };
  outfit: 'none' | 'cable_sweater' | 'aviator' | 'dungarees' | 'vest_bowtie' | 'pajamas';
  accessory: 'none' | 'spectacles' | 'satchel' | 'compass' | 'camera';
  ribbonColor: string;
  ribbonText: string;
  bearName: string;
  adoptiveParent: string;
  birthCity: string;
  birthDate: string;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  isCustom: boolean;
  productId?: string;
  name: string;
  furDescription: string;
  size: string;
  price: number;
  quantity: number;
  ribbonColor: string;
  ribbonText?: string;
  customConfig?: CustomTeddyConfig;
  giftBox: boolean;
  giftNote?: string;
}

export interface AdoptionCertificateData {
  certificateId: string;
  bearName: string;
  adoptiveParent: string;
  birthDate: string;
  birthCity: string;
  serialNumber: string;
  furDescription: string;
  heartCharm: string;
  promisePledge: string;
}

export interface SpaRequest {
  id: string;
  patientName: string;
  bearAge: string;
  ownerName: string;
  ownerEmail: string;
  issueType: 'grooming' | 'joint_repair' | 'eye_replacement' | 'stuffing' | 'full_restoration';
  description: string;
  dateSubmitted: string;
}
