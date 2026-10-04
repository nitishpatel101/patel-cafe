"use client";

import React, { useState } from "react";
import { useTastingBag } from "@/context/TastingBagContext";
import { X, Plus, Minus, Trash2, CheckCircle2, ShoppingBag, Sparkles, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TastingOrderDrawer() {
  const {
    bagItems,
    isBagOpen,
    setIsBagOpen,
    updateQuantity,
    removeFromBag,
    clearBag,
    subtotal,
    totalCount,
  } = useTastingBag();

  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [tableOrTime, setTableOrTime] = useState("");
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  const gst = Math.round(subtotal * 0.05);
  const packaging = orderType === "takeaway" ? 60 : 0;
  const grandTotal = subtotal + gst + packaging;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const orderNumber = `PTL-CAF-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderPlaced(orderNumber);
    clearBag();
  };

  const handleClose = () => {
    setIsBagOpen(false);
    if (orderPlaced) {
      setTimeout(() => setOrderPlaced(null), 400);
    }
  };

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#2B2320]/40 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-55 w-full max-w-md bg-[#FAFAF8] text-[#2B2320] border-l border-[rgba(43,35,32,0.12)] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(43,35,32,0.08)] flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#C27838]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C27838] font-bold">
                    PATEL ATELIER TASTING BAG
                  </span>
                </div>
                <div className="font-serif text-lg text-[#2B2320] mt-0.5">
                  {totalCount} {totalCount === 1 ? "Creation Selected" : "Creations Selected"}
                </div>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close Tasting Bag"
                className="w-9 h-9 rounded-full border border-[rgba(43,35,32,0.15)] flex items-center justify-center hover:bg-[rgba(43,35,32,0.05)] transition-colors"
              >
                <X className="w-4 h-4 text-[#2B2320]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderPlaced ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#2B2320] text-[#FAFAF8] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7 text-[#C27838]" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C27838] font-semibold">
                    TRANSMISSION CONFIRMED
                  </div>
                  <h3 className="font-serif text-2xl text-[#2B2320]">
                    Order Dispatched to Hearth
                  </h3>
                  <p className="text-xs text-[#574B46] leading-relaxed max-w-xs mx-auto">
                    Thank you, {guestName}. Your culinary selections are being prepared by Chef Patel’s brigade.
                  </p>
                  <div className="bg-[#2B2320]/[0.03] border border-[rgba(43,35,32,0.1)] rounded-xl p-4 max-w-xs mx-auto text-left font-mono text-xs space-y-1">
                    <div className="text-[10px] text-[#574B46]">ORDER IDENTIFIER:</div>
                    <div className="text-base text-[#2B2320] font-bold tracking-wider">{orderPlaced}</div>
                    <div className="text-[10px] text-[#574B46] pt-1">
                      {orderType === "dine-in" ? "DINE-IN SERVICE" : "EXPRESS TAKEAWAY PARCEL"}
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-6 bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-[#574B46] transition-colors"
                  >
                    Return to Atelier Experience
                  </button>
                </div>
              ) : bagItems.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[rgba(43,35,32,0.2)] flex items-center justify-center mx-auto text-[#574B46]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg text-[#2B2320]">Your Tasting Bag is Empty</h4>
                  <p className="text-xs text-[#574B46] max-w-xs mx-auto">
                    Explore our artisanal coffees, deconstructed samosas, and imperial thalis to compose your tasting flight.
                  </p>
                  <button
                    onClick={() => {
                      setIsBagOpen(false);
                      document.getElementById("section-cafe-menu")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border border-[#2B2320] text-[#2B2320] font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-colors"
                  >
                    Explore Menu Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Order Mode Toggle */}
                  <div className="grid grid-cols-2 gap-2 bg-[#2B2320]/[0.04] p-1 rounded-xl font-mono text-[10px] uppercase tracking-wider">
                    <button
                      onClick={() => setOrderType("dine-in")}
                      className={`py-2 rounded-lg transition-all ${
                        orderType === "dine-in"
                          ? "bg-[#2B2320] text-[#FAFAF8] shadow-sm font-semibold"
                          : "text-[#574B46] hover:text-[#2B2320]"
                      }`}
                    >
                      Dine-In Table
                    </button>
                    <button
                      onClick={() => setOrderType("takeaway")}
                      className={`py-2 rounded-lg transition-all ${
                        orderType === "takeaway"
                          ? "bg-[#2B2320] text-[#FAFAF8] shadow-sm font-semibold"
                          : "text-[#574B46] hover:text-[#2B2320]"
                      }`}
                    >
                      Café Takeaway
                    </button>
                  </div>

                  {/* Item List */}
                  <div className="space-y-4">
                    {bagItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#FAFAF8] border border-[rgba(43,35,32,0.08)] rounded-xl p-3.5 flex flex-col justify-between shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="font-serif text-sm font-semibold text-[#2B2320] leading-snug">
                              {item.name}
                            </div>
                            {item.origin && (
                              <div className="font-mono text-[9px] uppercase tracking-wider text-[#C27838] mt-0.5">
                                {item.origin}
                              </div>
                            )}
                          </div>
                          <div className="font-mono text-xs font-semibold text-[#2B2320] whitespace-nowrap">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[rgba(43,35,32,0.05)]">
                          <div className="flex items-center space-x-2 border border-[rgba(43,35,32,0.12)] rounded-lg px-2 py-0.5 bg-[#FAFAF8]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="text-[#574B46] hover:text-[#2B2320]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs px-1 text-[#2B2320] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="text-[#574B46] hover:text-[#2B2320]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromBag(item.id)}
                            aria-label="Remove item"
                            className="text-[#574B46] hover:text-[#A9442C] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} id="bag-checkout-form" className="space-y-3 pt-2">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#574B46] font-semibold">
                      Patron Coordinates
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Guest Name *"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-lg px-3 py-2 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Phone *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-lg px-3 py-2 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={orderType === "dine-in" ? "Table Number / Area (e.g. Table 04, Verandah)" : "Preferred Pickup Time (e.g. In 20 mins)"}
                      value={tableOrTime}
                      onChange={(e) => setTableOrTime(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-lg px-3 py-2 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                    />
                  </form>
                </>
              )}
            </div>

            {/* Footer Summary & Action */}
            {!orderPlaced && bagItems.length > 0 && (
              <div className="p-6 border-t border-[rgba(43,35,32,0.08)] bg-[#FAFAF8] space-y-4">
                <div className="space-y-1.5 font-mono text-[11px] text-[#574B46]">
                  <div className="flex justify-between">
                    <span>Catering Subtotal</span>
                    <span className="text-[#2B2320]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Culinary GST (5%)</span>
                    <span className="text-[#2B2320]">₹{gst}</span>
                  </div>
                  {packaging > 0 && (
                    <div className="flex justify-between">
                      <span>Artisan Box Packaging</span>
                      <span className="text-[#2B2320]">₹{packaging}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-base text-[#2B2320] font-semibold pt-2 border-t border-[rgba(43,35,32,0.08)]">
                    <span>Total Valuation</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="bag-checkout-form"
                  className="w-full bg-[#2B2320] text-[#FAFAF8] font-mono text-xs uppercase tracking-[0.2em] py-3.5 rounded-full hover:bg-[#574B46] transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Dispatch Tasting Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
