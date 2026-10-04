"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  name: string;
  vernacular?: string;
  category: "coffee-chai" | "samosas-savouries" | "thalis-mains" | "breads-sides" | "desserts";
  price: number;
  description: string;
  dietary: "veg" | "vegan" | "gf" | "chef-signature";
  spiceLevel?: number; // 0 to 3
  origin?: string;
}

export interface BagItem extends MenuItem {
  quantity: number;
}

interface TastingBagContextType {
  bagItems: BagItem[];
  addToBag: (item: MenuItem) => void;
  removeFromBag: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearBag: () => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  totalCount: number;
  subtotal: number;
}

const TastingBagContext = createContext<TastingBagContextType | undefined>(undefined);

export function TastingBagProvider({ children }: { children: React.ReactNode }) {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Initialize with 2 signature tasting items for instant interactive richness
  useEffect(() => {
    setBagItems([
      {
        id: "m-01",
        name: "Deconstructed Truffle Samosa Flight",
        vernacular: "Samosa Chaat",
        category: "samosas-savouries",
        price: 520,
        description: "0.4mm ajwain pastry, Yukon gold potato, winter truffle snow & wild tamarind ribbon",
        dietary: "chef-signature",
        spiceLevel: 2,
        origin: "Old Delhi Atelier Recipe",
        quantity: 1,
      },
      {
        id: "m-04",
        name: "Monsooned Malabar Nitro Pour-Over",
        vernacular: "Kapi",
        category: "coffee-chai",
        price: 360,
        description: "Aged coastal beans exposed to sea winds, dark cocoa notes, cold nitrogen cascade",
        dietary: "vegan",
        origin: "Chikmagalur Single Estate",
        quantity: 2,
      },
    ]);
  }, []);

  const addToBag = (item: MenuItem) => {
    setBagItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (id: string) => {
    setBagItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const clearBag = () => setBagItems([]);

  const totalCount = bagItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = bagItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <TastingBagContext.Provider
      value={{
        bagItems,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearBag,
        isBagOpen,
        setIsBagOpen,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </TastingBagContext.Provider>
  );
}

export function useTastingBag() {
  const context = useContext(TastingBagContext);
  if (!context) {
    throw new Error("useTastingBag must be used within a TastingBagProvider");
  }
  return context;
}
