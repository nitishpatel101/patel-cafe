"use client";

import React, { useState, useMemo } from "react";
import { MenuItem, useTastingBag } from "@/context/TastingBagContext";
import { Sparkles, Search, Plus, Check, Coffee, UtensilsCrossed, Flame, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_DATA: MenuItem[] = [
  // COFFEE & CHAI
  {
    id: "m-01",
    name: "Monsooned Malabar Nitro Pour-Over",
    vernacular: "Kaapi",
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
    id: "m-03",
    name: "Spiced Cardamom Cortado",
    vernacular: "Elaichi Cortado",
    category: "coffee-chai",
    price: 340,
    description: "Equal parts double ristretto and silky steamed oat milk infused with freshly crushed Alleppey green cardamom.",
    dietary: "vegan",
    origin: "Cardamom Hills Estate",
  },
  {
    id: "m-04",
    name: "Cold-Pressed Solera Cold Brew",
    vernacular: "Kapi Noir",
    category: "coffee-chai",
    price: 380,
    description: "24-hour slow drip extraction over roasted chicory and whole Ceylon cinnamon, served over clear crystal ice sphere.",
    dietary: "vegan",
    origin: "Coorg Highland Elevation",
  },

  // SAMOSAS & SAVOURIES
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
    id: "m-06",
    name: "Crisp Lotus Stem & Smoked Plum Coulis",
    vernacular: "Kamal Kakdi",
    category: "samosas-savouries",
    price: 460,
    description: "Thinly shaved Dal Lake lotus stems flash-fried with crushed Tellicherry pepper, Himalayan pink rock salt and tart plum glaze.",
    dietary: "vegan",
    spiceLevel: 1,
    origin: "Kashmir Lake Harvest",
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
    id: "m-08",
    name: "Smoked Paneer Tikka Shards",
    vernacular: "Paneer Tikka",
    category: "samosas-savouries",
    price: 540,
    description: "Aged grass-fed buffalo milk paneer marinated in yellow mustard oil and Kashmiri degi mirch, fired on iron skewers.",
    dietary: "veg",
    spiceLevel: 2,
    origin: "Amritsar Dairy Hearth",
  },

  // THALIS & MAINS
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
    id: "m-10",
    name: "Patel Shakahari Botanical Feast",
    vernacular: "Shakahari Thali",
    category: "thalis-mains",
    price: 1450,
    description: "Celebration of six sacred Ayurvedic tastes: heirloom seasonal vegetables, cold-pressed seed oils, stone-ground millets, and wild herbs.",
    dietary: "veg",
    spiceLevel: 1,
    origin: "Ayurvedic Heritage Farm",
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
  {
    id: "m-12",
    name: "Kashmiri Morel & Chenna Kofta",
    vernacular: "Gucchi Kofta",
    category: "thalis-mains",
    price: 890,
    description: "Wild Himalayan morels stuffed with spiced fresh chenna, served in a velvety cashew-saffron reduction infused with cardamom smoke.",
    dietary: "chef-signature",
    spiceLevel: 2,
    origin: "Anantnag Foraged Morels",
  },

  // BREADS & SIDES
  {
    id: "m-13",
    name: "Fermented Khamir Naan with Churned Butter",
    vernacular: "Khamiri Roti",
    category: "breads-sides",
    price: 220,
    description: "Naturally wild-fermented wheat dough slapped against clay tandoor walls, brushed with smoked A2 cow ghee.",
    dietary: "veg",
    origin: "Mughlai Hearth Tradition",
  },
  {
    id: "m-14",
    name: "Winter Truffle & Aged Cheese Kulcha",
    vernacular: "Truffle Kulcha",
    category: "breads-sides",
    price: 360,
    description: "Flaky layered tandoor bread stuffed with kalari artisanal cheese, black winter truffle carpaccio and fresh coriander leaf.",
    dietary: "veg",
    origin: "Jammu Artisanal Kalari",
  },
  {
    id: "m-15",
    name: "House Chutney Triad & Papad Shards",
    vernacular: "Chutney Tray",
    category: "breads-sides",
    price: 260,
    description: "Trio of 30-day aged Saunth, raw Himalayan mint, and roasted garlic-chilli oil served with sun-dried lentil crisps.",
    dietary: "vegan",
    origin: "Patel In-House Fermentation",
  },

  // DESSERTS
  {
    id: "m-16",
    name: "Kesar Phirni with Edible Silver Vark",
    vernacular: "Phirni",
    category: "desserts",
    price: 420,
    description: "Slow-pounded Basmati rice pudding steeped in whole saffron milk, topped with Iranian green pistachios and artisanal silver leaf.",
    dietary: "chef-signature",
    origin: "Lucknow Royal Kitchens",
  },
  {
    id: "m-17",
    name: "Damask Rose & Pistachio Kulfi Pop",
    vernacular: "Kulfi",
    category: "desserts",
    price: 380,
    description: "Reduced whole milk infused with organic Kannauj rose petals, crushed pistachios, and frozen in earthen terracotta cones.",
    dietary: "veg",
    origin: "Kannauj Rose Distilleries",
  },
  {
    id: "m-18",
    name: "Smoked Organic Jaggery & Ginger Tart",
    vernacular: "Gur Tart",
    category: "desserts",
    price: 440,
    description: "Crisp almond sable tart shell filled with warm sugarcane jaggery caramel, sonth ginger spice, and sea salt crunch.",
    dietary: "veg",
    origin: "Kolhapur Cane Harvest",
  },
];

export function CafeMenuSection() {
  const { addToBag } = useTastingBag();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: "all", label: "All Repertoire", icon: UtensilsCrossed },
    { id: "coffee-chai", label: "Artisanal Coffee & Chais", icon: Coffee },
    { id: "samosas-savouries", label: "Samosas & Savouries", icon: Sparkles },
    { id: "thalis-mains", label: "Royal Thalis & Curries", icon: Flame },
    { id: "breads-sides", label: "Tandoor Breads & Chutneys", icon: UtensilsCrossed },
    { id: "desserts", label: "Botanical Desserts", icon: Sparkles },
  ];

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== "all" && item.dietary !== dietaryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesOrigin = item.origin?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesOrigin) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    addToBag(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section
      id="section-cafe-menu"
      className="relative w-full py-28 md:py-40 bg-[#FAFAF8] border-b border-[rgba(43,35,32,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(43,35,32,0.08)] pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C27838]" />
              <span>08 // ARTISANAL REPERTOIRE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2B2320] tracking-tight">
              The Patel Café Menu
            </h2>
            <p className="text-sm md:text-base text-[#574B46] max-w-xl mt-3 font-normal leading-relaxed">
              Every dish calculated like fine architecture. Single-origin coffees, crisp deconstructed savouries, and royal thalis prepared to order.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#574B46]" />
            <input
              type="text"
              placeholder="Search spices, brews, thalis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#2B2320] placeholder-[#574B46]/70 focus:outline-none focus:border-[#2B2320] transition-colors"
            />
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center space-x-2 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#2B2320] text-[#FAFAF8] border-[#2B2320] shadow-sm"
                    : "bg-[#FAFAF8] text-[#574B46] border-[rgba(43,35,32,0.12)] hover:border-[#2B2320] hover:text-[#2B2320]"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Filters Sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[rgba(43,35,32,0.06)] mb-10 text-[10px] font-mono uppercase tracking-wider text-[#574B46]">
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-[#C27838]" />
            <span>DIETARY SPECIFICATION:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Show All" },
              { id: "chef-signature", label: "★ Chef Signature" },
              { id: "veg", label: "Pure Vegetarian" },
              { id: "vegan", label: "Plant-Based (Vegan)" },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietaryFilter(diet.id)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  dietaryFilter === diet.id
                    ? "bg-[#2B2320]/10 text-[#2B2320] font-bold"
                    : "hover:text-[#2B2320]"
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FAFAF8] rounded-2xl p-6 border border-[rgba(43,35,32,0.09)] shadow-xs hover:shadow-md hover:border-[rgba(43,35,32,0.22)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Tag & Price */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[rgba(43,35,32,0.12)] text-[#574B46] bg-[#2B2320]/[0.02]">
                        {item.dietary === "chef-signature"
                          ? "★ CHEF SIGNATURE"
                          : item.dietary === "vegan"
                          ? "PLANT-BASED"
                          : "HERITAGE VEG"}
                      </span>
                      <span className="font-mono text-base font-semibold text-[#2B2320]">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Name & Vernacular */}
                    <h3 className="font-serif text-lg md:text-xl text-[#2B2320] group-hover:text-[#C27838] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {item.vernacular && (
                      <p className="font-serif italic text-xs text-[#574B46] mt-0.5">
                        {item.vernacular}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs md:text-sm text-[#574B46] font-normal leading-relaxed mt-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Strip: Origin + Add Button */}
                  <div className="pt-4 border-t border-[rgba(43,35,32,0.06)] flex items-center justify-between gap-3 mt-auto">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#C27838] truncate max-w-[170px]">
                      {item.origin}
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      data-cursor="ADD"
                      className={`shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${
                        isAdded
                          ? "bg-[#4A7C59] text-[#FAFAF8]"
                          : "bg-[#2B2320] text-[#FAFAF8] hover:bg-[#574B46]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-[#2B2320] mb-2">No culinary items match your filter</p>
            <p className="text-xs text-[#574B46] font-mono">Try adjusting your search criteria or resetting filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setDietaryFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 border border-[#2B2320] text-[#2B2320] font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
