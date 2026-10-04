"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { TastingBagProvider } from "@/context/TastingBagContext";
import { CustomCursor } from "@/components/common/CustomCursor";
import { EditorialNav } from "@/components/common/EditorialNav";
import { EditorialLoader } from "@/components/common/EditorialLoader";
import { EditorialFooter } from "@/components/common/EditorialFooter";
import { TastingOrderDrawer } from "@/components/common/TastingOrderDrawer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExplodedSamosaSection } from "@/components/sections/ExplodedSamosaSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { CraftProcessSection } from "@/components/sections/CraftProcessSection";
import { SaucesSection } from "@/components/sections/SaucesSection";
import { DiningExperienceSection } from "@/components/sections/DiningExperienceSection";
import { CafeMenuSection } from "@/components/sections/CafeMenuSection";
import { AccoladesReviewsSection } from "@/components/sections/AccoladesReviewsSection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { CafeVisitSection } from "@/components/sections/CafeVisitSection";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <TastingBagProvider>
      <SmoothScrollProvider>
        {/* Paper Grain Subtle Overlay */}
        <div className="paper-grain" />

        {/* Luxury Interactive Cursor */}
        <CustomCursor />

        {/* Typographic Countdown Loader */}
        <EditorialLoader onComplete={() => setIsLoaded(true)} />

        {/* Interactive Order Bag Slide-over Drawer */}
        <TastingOrderDrawer />

        {/* Main Experience */}
        <div
          className={`transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <EditorialNav />

          <main className="relative w-full">
            {/* Section 01: Hero (Exploded Royal Thali, Video 1) */}
            <HeroSection />

            {/* Section 02: Exploded Samosa (Anatomy of a Delicacy, Video 2) */}
            <ExplodedSamosaSection />

            {/* Section 04: The Spice Constellation (Botanical Physics, Video 3) */}
            <IngredientsSection />

            {/* Section 05: Craft Process (The Assembly Blueprint, Video 4) */}
            <CraftProcessSection />

            {/* Section 06: Signature Sauces (Fluid Dynamics, Video 5) */}
            <SaucesSection />

            {/* Section 07: Dining Experience (The Grand Salon, Video 6) */}
            <DiningExperienceSection />

            {/* Section 08: Artisanal Café & Gastronomy Repertoire (Interactive Menu & Cart) */}
            <CafeMenuSection />

            {/* Section 09: Accolades & Critics' Reviews (Michelin & 50 Best Acclaim) */}
            <AccoladesReviewsSection />

            {/* Section 10: Table Reservation System (Invitation to Dine) */}
            <ReservationSection />

            {/* Section 11: Café Hours, Location & Private Atelier Dispatch */}
            <CafeVisitSection />
          </main>

          <EditorialFooter />
        </div>
      </SmoothScrollProvider>
    </TastingBagProvider>
  );
}
