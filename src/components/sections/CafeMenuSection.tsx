"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MenuItem, useTastingBag } from "@/context/TastingBagContext";
import {
  Sparkles,
  Search,
  Plus,
  Check,
  Coffee,
  UtensilsCrossed,
  Flame,
  Leaf,
  Heart,
  Cake,
  Cherry,
  RotateCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 3D Floating Plates Showcase Data (Matching the reference design exactly)
interface FloatingDessertItem extends MenuItem {
  image: string;
  weightOrPortion?: string;
  badge?: string;
}

const DOLCE_3D_ITEMS: FloatingDessertItem[] = [
  {
    id: "dolce-01",
    name: "Wild Berry & Solera Cheesecake",
    vernacular: "ЧИЗКЕЙК С ЯГОДАМИ",
    category: "desserts",
    price: 390,
    weightOrPortion: "185g",
    image: "/images/menu/cheesecake.jpg",
    description: "Delicate cream cheesecake on light almond sable biscuit crust, glossy wild raspberry coulis, fresh blueberries & dusted matcha powder.",
    dietary: "chef-signature",
    origin: "Himalayan Forest Berries",
    badge: "PATEL SIGNATURE",
  },
  {
    id: "dolce-02",
    name: "Warm Spiced Chocolate Lava Fondant",
    vernacular: "ШОКОЛАДНЫЙ ФОНДАН",
    category: "desserts",
    price: 350,
    weightOrPortion: "160g",
    image: "/images/menu/chocolate-fondant.jpg",
    description: "Warm single-origin dark cocoa cake with molten spiced cinnamon heart, dusted with powdered sugar, fresh raspberries & garden mint.",
    dietary: "veg",
    origin: "Kerala Single-Estate Cocoa",
    badge: "MOLTEN CORE",
  },
  {
    id: "dolce-03",
    name: "Mascarpone & Cardamom Tiramisu",
    vernacular: "ТИРАМИСУ",
    category: "desserts",
    price: 360,
    weightOrPortion: "210g",
    image: "/images/menu/tiramisu.jpg",
    description: "Classic savoiardi steeped in Monsooned Malabar espresso, layered with whipped mascarpone cream, dark cocoa swirl and roasted beans.",
    dietary: "veg",
    origin: "Malabar Nitro Roast",
    badge: "HAND-WHIPPED",
  },
  {
    id: "dolce-04",
    name: "Silky Tahitian Vanilla Panna Cotta",
    vernacular: "ПАННА КОТТА",
    category: "desserts",
    price: 320,
    weightOrPortion: "175g",
    image: "/images/menu/panna-cotta.jpg",
    description: "Slow-simmered whole cream infused with natural vanilla pods, crowned with tart strawberry-raspberry reduction and blueberries.",
    dietary: "veg",
    origin: "Grass-Fed Dairy Hearth",
    badge: "SILK TEXTURE",
  },
  {
    id: "dolce-05",
    name: "Damask Rose & Pistachio Macarons",
    vernacular: "МАКАРОНС",
    category: "desserts",
    price: 250,
    weightOrPortion: "3 pcs",
    image: "/images/menu/macarons.jpg",
    description: "Delicate almond meringue shells filled with Kannauj rose blossom, pistachio matcha ganache, and dark chocolate with molten dip.",
    dietary: "chef-signature",
    origin: "Kannauj Rose Distillate",
    badge: "TRIO FLIGHT",
  },
  {
    id: "dolce-06",
    name: "Artisanal Gelato & Kulfi Trio",
    vernacular: "МОРОЖЕНОЕ",
    category: "desserts",
    price: 280,
    weightOrPortion: "3 scoops",
    image: "/images/menu/gelato-kulfi.jpg",
    description: "Three hand-churned scoops: roasted pistachio crunch, wild strawberry blossom, and Tahitian vanilla with rolled waffle and mint.",
    dietary: "veg",
    origin: "Churned Daily In-House",
    badge: "ARTISANAL CHURN",
  },
];

const ADDONS = [
  { id: "addon-1", name: "Warm Dark Chocolate Sauce", vernacular: "Шоколадный соус", price: 50 },
  { id: "addon-2", name: "Spiced Jaggery Caramel", vernacular: "Карамельный соус", price: 50 },
  { id: "addon-3", name: "Whipped Vanilla Bean Cream", vernacular: "Взбитые сливки", price: 50 },
  { id: "addon-4", name: "Fresh Hand-Picked Berries", vernacular: "Свежие ягоды", price: 80 },
];

// Additional Repertoire Menu Items
const REPERTOIRE_DATA: MenuItem[] = [
  {
    id: "m-01",
    name: "Monsooned Malabar Nitro Pour-Over",
    vernacular: "Kaapi Noir",
    category: "coffee-chai",
    price: 360,
    description: "Aged coastal beans exposed to sea winds, dark cocoa notes, cold nitrogen cascade with hazelnut undertones.",
    dietary: "vegan",
    origin: "Chikmagalur Single Estate",
  },
  {
    id: "m-02",
    name: "Kashmir Saffron Dum Karak Chai",
    vernacular: "Kesar Chai",
    category: "coffee-chai",
    price: 320,
    description: "Hand-rolled Assam golden tips simmered with green cardamom, ginger smoke, and pure Pampore saffron strands.",
    dietary: "veg",
    origin: "Pampore, Kashmir Valley",
  },
  {
    id: "m-05",
    name: "Deconstructed Truffle Samosa Flight",
    vernacular: "Samosa Chaat",
    category: "samosas-savouries",
    price: 520,
    description: "0.4mm ajwain pastry, Yukon gold potato, winter truffle snow, micro-coriander and 30-day solera tamarind ribbon.",
    dietary: "chef-signature",
    spiceLevel: 2,
    origin: "Old Delhi Atelier Recipe",
  },
  {
    id: "m-07",
    name: "Dahi Puri Spheres with Mint Caviar",
    vernacular: "Gol Gappa",
    category: "samosas-savouries",
    price: 440,
    description: "Crispy semolina orbs filled with spiced mung sprouts, sweet cultured yoghurt foam, and molecular mint chutney pearls.",
    dietary: "veg",
    spiceLevel: 1,
    origin: "Royal Jaipur Courtyard",
  },
  {
    id: "m-09",
    name: "The Patel Imperial Royal Thali",
    vernacular: "Raj Shahi Thali",
    category: "thalis-mains",
    price: 1850,
    description: "The complete 36-element deconstructed banquet: Saffron Dum Rice, 24H Dal Bukhara, Morel Mushroom Kofta, Khamir Naan, 6 Katoris and Kesar Phirni.",
    dietary: "chef-signature",
    spiceLevel: 2,
    origin: "Imperial Rajputana Archives",
  },
  {
    id: "m-11",
    name: "24-Hour Charcoal Simmer Dal Bukhara",
    vernacular: "Maa Ki Dal",
    category: "thalis-mains",
    price: 680,
    description: "Whole black urad lentils slow simmered over embers for 24 continuous hours with vine-ripened tomatoes, garlic and churned white butter.",
    dietary: "veg",
    spiceLevel: 1,
    origin: "Peshawar Frontier Heritage",
  },
];

export function CafeMenuSection() {
  const { addToBag } = useTastingBag();
  const [activeTab, setActiveTab] = useState<"dolce-3d" | "full-repertoire">("dolce-3d");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});

  const handleAdd = (item: MenuItem) => {
    addToBag(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1600);
  };

  return (
    <section
      id="section-cafe-menu"
      className="relative w-full bg-[#FAFAF8] py-24 md:py-36 overflow-hidden border-t border-[rgba(43,35,32,0.08)]"
    >
      {/* Top Experience Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-16 text-center">
        <div className="inline-flex items-center space-x-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C27838] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C27838]" />
          <span>07 // GASTRONOMIC REPERTOIRE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2B2320] tracking-tight mb-4">
          Patel Atelier & Café Repertoire
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#574B46] font-normal leading-relaxed">
          Explore our signature 3D floating desserts sculpted with botanical precision, alongside royal thalis, fermented breads, and single-origin brews.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          <button
            onClick={() => setActiveTab("dolce-3d")}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === "dolce-3d"
                ? "bg-[#2F3E2B] text-[#FAFAF8] shadow-lg scale-105"
                : "bg-[rgba(43,35,32,0.06)] text-[#574B46] hover:bg-[rgba(43,35,32,0.12)]"
            }`}
          >
            ✦ 3D Floating Desserts Showcase
          </button>
          <button
            onClick={() => setActiveTab("full-repertoire")}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === "full-repertoire"
                ? "bg-[#2B2320] text-[#FAFAF8] shadow-lg scale-105"
                : "bg-[rgba(43,35,32,0.06)] text-[#574B46] hover:bg-[rgba(43,35,32,0.12)]"
            }`}
          >
            All Atelier Repertoire & Thalis
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D FLOATING DESSERT MENU (MATCHING USER REFERENCE DESIGN) */}
      {/* ========================================================================= */}
      {activeTab === "dolce-3d" && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Dual-Tone Organic Layout Container */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[rgba(43,35,32,0.12)] bg-[#FAFAF8]">
            {/* Background Organic Curved Sage/Forest Green Ribbon on Right Half */}
            <div
              className="absolute inset-y-0 right-0 w-full md:w-[62%] pointer-events-none z-0"
              style={{
                background: "linear-gradient(135deg, #35452F 0%, #293624 100%)",
                clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />

            {/* Subtle decorative background curves */}
            <svg
              className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 z-0"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <path
                d="M400,0 C550,300 300,700 450,1000"
                fill="none"
                stroke="#FAFAF8"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Content Grid: Left Branding Column + Right 3D Floating Dishes Column */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 min-h-[900px] p-6 sm:p-10 md:p-16 gap-10">
              {/* LEFT COLUMN: BRAND MONOGRAM & ARTISANAL PROMISE BADGES */}
              <div className="md:col-span-4 flex flex-col justify-between space-y-12">
                <div className="space-y-6">
                  {/* Brand Logo & Monogram */}
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-full border border-[rgba(43,35,32,0.2)] bg-[#FAFAF8] shadow-sm flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#C27838]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold tracking-widest text-[#2B2320]">
                        PATEL
                      </h3>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#574B46]">
                        DOLCE & ATELIER
                      </p>
                    </div>
                  </div>

                  {/* Main Editorial Hook */}
                  <div className="space-y-2 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#C27838] font-semibold">
                      CONFECTIONERY ARCHITECTURE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2320] leading-tight">
                      Desserts Crafted <br />
                      <span className="font-serif italic font-light text-[#574B46]">
                        for Royal Moments.
                      </span>
                    </h2>
                    <p className="text-xs text-[#574B46] leading-relaxed pt-2">
                      Suspended between European pastry discipline and centuries of Indian sweet alchemy.
                    </p>
                  </div>

                  {/* 4 Feature Badges with Circular Icons (From Reference Image) */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center space-x-3.5 group">
                      <div className="w-9 h-9 rounded-full bg-[rgba(43,35,32,0.06)] border border-[rgba(43,35,32,0.1)] flex items-center justify-center group-hover:bg-[#C27838] group-hover:text-[#FAFAF8] transition-all">
                        <Leaf className="w-4 h-4 text-[#5A6B48] group-hover:text-[#FAFAF8]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#2B2320] font-bold">
                          Natural Heirloom Ingredients
                        </div>
                        <div className="text-[10px] text-[#574B46]">
                          Zero synthetic dyes or preservatives
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 group">
                      <div className="w-9 h-9 rounded-full bg-[rgba(43,35,32,0.06)] border border-[rgba(43,35,32,0.1)] flex items-center justify-center group-hover:bg-[#C27838] group-hover:text-[#FAFAF8] transition-all">
                        <Heart className="w-4 h-4 text-[#A9442C] group-hover:text-[#FAFAF8]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#2B2320] font-bold">
                          Handcrafted with Reverence
                        </div>
                        <div className="text-[10px] text-[#574B46]">
                          Sculpted daily in micro-batches
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 group">
                      <div className="w-9 h-9 rounded-full bg-[rgba(43,35,32,0.06)] border border-[rgba(43,35,32,0.1)] flex items-center justify-center group-hover:bg-[#C27838] group-hover:text-[#FAFAF8] transition-all">
                        <Cake className="w-4 h-4 text-[#C27838] group-hover:text-[#FAFAF8]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#2B2320] font-bold">
                          Delicate Textures & Fragrance
                        </div>
                        <div className="text-[10px] text-[#574B46]">
                          Damask rose, saffron & pure cocoa
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 group">
                      <div className="w-9 h-9 rounded-full bg-[rgba(43,35,32,0.06)] border border-[rgba(43,35,32,0.1)] flex items-center justify-center group-hover:bg-[#C27838] group-hover:text-[#FAFAF8] transition-all">
                        <Cherry className="w-4 h-4 text-[#A9442C] group-hover:text-[#FAFAF8]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#2B2320] font-bold">
                          Fresh Harvest Each Dawn
                        </div>
                        <div className="text-[10px] text-[#574B46]">
                          Mountain berries and hand-churned cream
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM LEFT: ADD-ON / PAIRING BOX (From Reference Image) */}
                <div className="bg-[#FAFAF8]/95 backdrop-blur-md rounded-2xl p-5 border border-[rgba(43,35,32,0.15)] shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#2F3E2B] font-bold">
                      PAIR WITH DESSERT // EXTRA INDULGENCE
                    </span>
                    <Sparkles className="w-3 h-3 text-[#C27838]" />
                  </div>
                  <div className="space-y-2">
                    {ADDONS.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between text-xs py-1 hover:bg-[rgba(43,35,32,0.04)] px-2 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="font-medium text-[#2B2320]">{addon.name}</div>
                          <div className="font-mono text-[9px] text-[#574B46]">{addon.vernacular}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#C27838]">₹{addon.price}</span>
                          <button
                            onClick={() =>
                              handleAdd({
                                id: addon.id,
                                name: addon.name,
                                category: "desserts",
                                price: addon.price,
                                description: `Pairing addon: ${addon.name}`,
                                dietary: "veg",
                              })
                            }
                            className="p-1 rounded-full bg-[#2F3E2B] text-[#FAFAF8] hover:bg-[#C27838] transition-colors"
                            title="Add to Tasting Bag"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 3D FLOATING PLATES ALONG THE ORGANIC PATH */}
              <div className="md:col-span-8 flex flex-col space-y-12">
                {DOLCE_3D_ITEMS.map((item, idx) => {
                  const isAdded = addedItemIds[item.id];
                  // Staggered floating animation parameters for organic microgravity physics
                  const floatDuration = 4 + (idx % 3) * 0.8;
                  const floatDelay = idx * 0.25;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="relative grid grid-cols-1 sm:grid-cols-12 gap-6 items-center group"
                    >
                      {/* 3D Floating Ceramic Plate with Interactive Float & Tilt */}
                      <div className="sm:col-span-5 relative flex items-center justify-center">
                        <motion.div
                          animate={{
                            y: [-7, 7, -7],
                            rotate: [-1.5, 1.5, -1.5],
                          }}
                          transition={{
                            duration: floatDuration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: floatDelay,
                          }}
                          whileHover={{
                            scale: 1.07,
                            rotate: 0,
                            transition: { duration: 0.3 },
                          }}
                          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full cursor-pointer will-change-transform"
                          style={{
                            perspective: 1000,
                          }}
                        >
                          {/* Ambient Multi-Layer Plate Drop Shadow */}
                          <div className="absolute inset-0 rounded-full shadow-[0_28px_45px_rgba(0,0,0,0.55)] pointer-events-none" />

                          {/* Outer Matte Rim */}
                          <div className="relative w-full h-full rounded-full p-2 bg-[#1C1A18] border-2 border-[rgba(255,255,255,0.12)] overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 192px, 240px"
                              className="object-cover rounded-full select-none"
                              priority={idx < 2}
                            />
                            {/* Realistic Ceramic Specular Glaze Reflection */}
                            <div
                              className="pointer-events-none absolute inset-0 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
                              }}
                            />
                          </div>

                          {/* Orbiting Floating Garnish Particles */}
                          <div className="pointer-events-none absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#C27838]/80 blur-[0.5px] animate-pulse" />
                          <div className="pointer-events-none absolute -bottom-3 left-4 w-3.5 h-3.5 rounded-full bg-[#5A6B48]/70 blur-[0.5px]" />
                        </motion.div>
                      </div>

                      {/* Plate Typography & Order Action */}
                      <div className="sm:col-span-7 space-y-2.5 sm:pl-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#E5A962] font-semibold bg-[#2B2320]/60 px-2.5 py-0.5 rounded-full border border-[#E5A962]/30">
                            {item.badge}
                          </span>
                          <span className="font-mono text-[9px] text-[#FAFAF8]/70">
                            {item.origin}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl text-[#FAFAF8] tracking-tight group-hover:text-[#E5A962] transition-colors">
                          {item.name}
                        </h3>

                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#FAFAF8]/60">
                          {item.vernacular} {item.weightOrPortion && `· ${item.weightOrPortion}`}
                        </div>

                        <p className="text-xs text-[#FAFAF8]/80 leading-relaxed font-light line-clamp-2 max-w-md">
                          {item.description}
                        </p>

                        <div className="flex items-center space-x-4 pt-2">
                          <div className="font-mono text-xl font-bold text-[#E5A962]">
                            ₹{item.price}
                          </div>
                          <button
                            onClick={() => handleAdd(item)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${
                              isAdded
                                ? "bg-[#5A6B48] text-[#FAFAF8] shadow-md scale-95"
                                : "bg-[#FAFAF8] text-[#2B2320] hover:bg-[#E5A962] hover:text-[#2B2320] shadow-lg"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added to Bag</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Tasting Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL ATELIER REPERTOIRE (THALIS, MAINS, CHAIS & SAMOSAS) */}
      {/* ========================================================================= */}
      {activeTab === "full-repertoire" && (
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPERTOIRE_DATA.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#C27838] font-bold">
                        {item.origin}
                      </span>
                      <span className="font-mono text-base font-bold text-[#2B2320]">
                        ₹{item.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#2B2320]">{item.name}</h3>
                    <p className="text-xs text-[#574B46] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[rgba(43,35,32,0.08)] mt-4">
                    <button
                      onClick={() => handleAdd(item)}
                      className={`w-full py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${
                        isAdded
                          ? "bg-[#5A6B48] text-[#FAFAF8]"
                          : "bg-[#2B2320] text-[#FAFAF8] hover:bg-[#574B46]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tasting Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
