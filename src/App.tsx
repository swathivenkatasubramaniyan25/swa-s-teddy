/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TeddyProduct, CartItem, CustomTeddyConfig } from './types';
import { TEDDY_PRODUCTS } from './data/products';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CustomAtelier } from './components/CustomAtelier';
import { AdoptionModal } from './components/AdoptionModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CareGuide } from './components/CareGuide';
import { HeritageSection } from './components/HeritageSection';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Sparkles, Check, Filter } from 'lucide-react';
import { playAdoptionFanfare, playWoodTick } from './utils/audio';

export default function App() {
  // Navigation & View State
  const [activeSection, setActiveSection] = useState<'shop' | 'atelier' | 'adoption' | 'hospital' | 'story'>('shop');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'mohair' | 'dressed' | 'plush' | 'pocket'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<TeddyProduct | null>(null);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [adoptionConfig, setAdoptionConfig] = useState<CustomTeddyConfig | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_teddy_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial starter cart item
    return [
      {
        cartItemId: 'init-barnaby-1',
        isCustom: false,
        productId: 'barnaby-classic',
        name: 'Barnaby Heirloom Mohair',
        furDescription: '15" German Schulte Mohair · 5-Way Disc Jointed',
        size: '15 inches',
        price: 135,
        quantity: 1,
        ribbonColor: '#1A365D',
        ribbonText: 'Barnaby · Heirloom',
        giftBox: true,
      },
    ];
  });

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bb_teddy_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  // Add standard catalog product to cart
  const handleAddToCart = (product: TeddyProduct, ribbonText: string, giftBox: boolean) => {
    const newItem: CartItem = {
      cartItemId: `prod-${product.id}-${Date.now()}`,
      isCustom: false,
      productId: product.id,
      name: product.name,
      furDescription: `${product.size} · ${product.furType.split(' ')[0]} Mohair`,
      size: product.size,
      price: product.price,
      quantity: 1,
      ribbonColor: product.ribbonColor,
      ribbonText: ribbonText || product.defaultRibbonText,
      giftBox: giftBox,
    };

    setCart((prev) => [newItem, ...prev]);
    showNotification(`Adopted ${product.name}! Added to basket.`);
  };

  // Add custom bear to cart
  const handleAddCustomToCart = (config: CustomTeddyConfig, price: number) => {
    const newItem: CartItem = {
      cartItemId: `custom-${Date.now()}`,
      isCustom: true,
      name: config.bearName || 'Bespoke Heirloom Bear',
      furDescription: `${config.size}" Custom Mohair · ${config.heartInsert.name.split('&')[0]}`,
      size: `${config.size} inches`,
      price: price,
      quantity: 1,
      ribbonColor: config.ribbonColor,
      ribbonText: config.ribbonText,
      customConfig: config,
      giftBox: true,
    };

    setCart((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
    showNotification(`Bespoke Bear "${config.bearName}" added to basket!`);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    playWoodTick();
  };

  const handleToggleGiftBox = (cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, giftBox: !item.giftBox } : item
      )
    );
  };

  // Filter & Sort Products
  const displayedProducts = useMemo(() => {
    let list = [...TEDDY_PRODUCTS];

    if (categoryFilter !== 'all') {
      list = list.filter((p) => p.collection === categoryFilter);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [categoryFilter, sortBy]);

  const scrollToSection = (section: string) => {
    setActiveSection(section as typeof activeSection);
    const element = document.getElementById(
      section === 'shop'
        ? 'collection-grid'
        : section === 'atelier'
        ? 'custom-atelier'
        : section === 'hospital'
        ? 'hospital-section'
        : section === 'story'
        ? 'heritage-section'
        : 'collection-grid'
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'adoption') {
      setIsAdoptionModalOpen(true);
    }
  };

  const cartTotalCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans">
      {/* Top Bar Navigation (Strict 3-Zone Contract) */}
      <TopBar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#321E14] text-[#FDFBF7] px-4 py-3 rounded-xl shadow-2xl border border-[#A87B51] flex items-center gap-2.5 text-xs font-medium animate-bounce-short">
          <Sparkles className="w-4 h-4 text-[#E4C8A6]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Hero Section */}
      <Hero
        onOpenAtelier={() => scrollToSection('atelier')}
        onExploreCollection={() => scrollToSection('shop')}
        onQuickAdoptBarnaby={() => {
          const barnaby = TEDDY_PRODUCTS[0];
          handleAddToCart(barnaby, 'Barnaby · 1924', true);
          setIsCartOpen(true);
        }}
      />

      {/* Main Catalog Collection Grid */}
      <main id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Collection Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DFD5]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7C5335] mb-2">
              <span>Hand-Stitched In Small Batches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
              The Heirloom Catalog
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#705D4C]">
              Every bear arrives packed in archival acid-free tissue with its registered deed of adoption.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#EFE7DC] rounded-xl">
              {[
                { id: 'all' as const, label: 'All Bears' },
                { id: 'mohair' as const, label: 'Heirloom Mohair' },
                { id: 'dressed' as const, label: 'Dressed Originals' },
                { id: 'plush' as const, label: 'Cozy Plush' },
                { id: 'pocket' as const, label: 'Pocket Travel' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    categoryFilter === tab.id
                      ? 'bg-white text-[#2C241E] shadow-xs font-semibold'
                      : 'text-[#6E5948] hover:text-[#2C241E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 text-xs rounded-xl bg-[#EFE7DC] border border-[#DDD0C1] text-[#2C241E] font-medium focus:outline-none focus:ring-1 focus:ring-[#8C5D38] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Modest to Rare</option>
              <option value="price-desc">Price: Rare to Modest</option>
              <option value="rating">Highest Acclaim</option>
            </select>
          </div>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(p) => setSelectedProduct(p)}
              onQuickAdd={(p) => {
                handleAddToCart(p, p.defaultRibbonText || '', true);
              }}
            />
          ))}
        </div>
      </main>

      {/* Interactive Custom Atelier Workshop */}
      <CustomAtelier
        onAddCustomToCart={handleAddCustomToCart}
        onPreviewCertificate={(config) => {
          setAdoptionConfig(config);
          setIsAdoptionModalOpen(true);
        }}
      />

      {/* Teddy Hospital & Infirmary Section */}
      <CareGuide />

      {/* Heritage & Customer Love Notes */}
      <HeritageSection />

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Modals & Slide-overs */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onCustomizeThis={(p) => {
          scrollToSection('atelier');
        }}
      />

      {isAdoptionModalOpen && (
        <AdoptionModal
          initialConfig={adoptionConfig}
          onClose={() => setIsAdoptionModalOpen(false)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleGiftBox={handleToggleGiftBox}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          items={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={(orderId) => {
            setCart([]);
          }}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
