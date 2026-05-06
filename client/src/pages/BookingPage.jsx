import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, CreditCard, Loader2, Wallet } from "lucide-react";
import React, { useMemo, useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { PremiumButton } from "../components/PremiumButton";
import { blockedSlots, bookings, slotTimes, turf } from "../data/site";
import { formatDisplayDate, isWeekend, makeDateOptions, resolveSlotState } from "../utils/booking";

export function BookingPage() {
  const dates = useMemo(() => makeDateOptions(), []);
  const [selectedDate, setSelectedDate] = useState(dates[3].iso);
  const [selectedSlot, setSelectedSlot] = useState(slotTimes[0]);
  const [paymentType, setPaymentType] = useState("advance");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const duration = selectedSlot.duration;
  const endTime = selectedSlot.end;
  const dayType = isWeekend(selectedDate) ? "Weekend" : "Weekday";
  const fullAmount = duration === 1 ? turf.oneHourPrice : isWeekend(selectedDate) ? turf.weekendPrice : turf.weekdayPrice;
  const payable = paymentType === "advance" ? turf.advanceAmount : fullAmount;
  const selectedState = resolveSlotState({
    date: selectedDate,
    start: selectedSlot.start,
    end: endTime,
    bookings,
    blockedSlots
  });
  const canConfirm = selectedState.state === "available";

  function confirmBooking() {
    if (!canConfirm) return;
    setLoading(true);
    setDone(false);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-pitch pt-20">
        <section className="stadium-lines relative overflow-hidden px-4 py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#fffdf6,#fff4c8,#f6f3ea)]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.p className="text-xs font-black uppercase tracking-[0.28em] text-line" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              Live slot booking
            </motion.p>
            <motion.h1
              className="mt-3 font-display text-5xl uppercase leading-none sm:text-7xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              Book Your Turf Slot
            </motion.h1>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <Panel icon={CalendarDays} title="Select Date">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {dates.map((date) => (
                    <motion.button
                      key={date.iso}
                      disabled={!date.available}
                      onClick={() => date.available && setSelectedDate(date.iso)}
                      className={`rounded-3xl border p-4 text-left transition ${
                        selectedDate === date.iso
                          ? "border-line bg-line text-black shadow-premium"
                          : date.available
                            ? "border-white/10 bg-white/[0.055] hover:border-line/70"
                            : "cursor-not-allowed border-black/5 bg-white/45 text-black/25"
                      }`}
                      whileHover={date.available ? { y: -4 } : undefined}
                    >
                      <p className="text-xs font-black uppercase">{isWeekend(date.iso) ? "Weekend" : "Weekday"}</p>
                      <p className="mt-1 font-black">{date.label}</p>
                    </motion.button>
                  ))}
                </div>
              </Panel>

              <Panel icon={Clock3} title="Select Slot">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {slotTimes.map((slot) => {
                    const state = resolveSlotState({ date: selectedDate, start: slot.start, end: slot.end, bookings, blockedSlots });
                    const isSelected = selectedSlot.start === slot.start && selectedSlot.end === slot.end;
                    const palette = {
                      available: isSelected
                        ? "border-turf bg-turf/20 text-turf shadow-[0_0_24px_rgba(24,180,107,0.25)]"
                        : "border-turf/25 bg-turf/5 text-turf hover:border-turf",
                      booked: "cursor-not-allowed border-danger/35 bg-danger/10 text-danger",
                      reserved: "cursor-not-allowed border-black/10 bg-white/50 text-black/45"
                    };

                    return (
                      <motion.button
                        key={`${slot.start}-${slot.end}`}
                        disabled={state.state !== "available"}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-3xl border p-4 text-left transition ${palette[state.state]}`}
                        whileHover={state.state === "available" ? { y: -5, scale: 1.02 } : undefined}
                        layout
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-display text-2xl">{slot.label}</p>
                          {state.state === "available" && <CheckCircle2 className="h-5 w-5" />}
                        </div>
                        <p className="mt-2 text-xs font-black uppercase">{state.label}</p>
                        <p className="mt-1 text-xs opacity-70">{slot.duration} hours · {state.detail}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </Panel>

              <div className="grid gap-6">
                <Panel icon={CreditCard} title="Payment Option">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PaymentCard label="Pay Advance" amount={turf.advanceAmount} active={paymentType === "advance"} onClick={() => setPaymentType("advance")} />
                    <PaymentCard label="Pay Full" amount={fullAmount} active={paymentType === "full"} onClick={() => setPaymentType("full")} />
                  </div>
                </Panel>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                className="overflow-hidden rounded-3xl border border-line/25 bg-white/90 shadow-premium backdrop-blur-xl"
                layout
              >
                <div className="bg-line p-5 text-black">
                  <p className="text-xs font-black uppercase tracking-[0.22em]">Booking Summary</p>
                  <p className="mt-2 font-display text-4xl uppercase">{dayType}</p>
                </div>
                <div className="space-y-4 p-5">
                  <SummaryRow label="Date" value={formatDisplayDate(selectedDate)} />
                  <SummaryRow label="Time" value={selectedSlot.label} />
                  <SummaryRow label="Duration" value={`${duration} Hour${duration > 1 ? "s" : ""}`} />
                  <SummaryRow label="Slot Status" value={selectedState.label} tone={selectedState.state} />
                  <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                    <div className="flex justify-between text-sm text-black/60">
                      <span>Full amount</span>
                      <span>Rs {fullAmount}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-black/60">
                      <span>{paymentType === "advance" ? "Advance now" : "Paying now"}</span>
                      <span>Rs {payable}</span>
                    </div>
                    <motion.p
                      key={payable}
                      className="mt-4 font-display text-5xl text-line"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      Rs {payable}
                    </motion.p>
                  </div>
                  <button
                    disabled={!canConfirm || loading}
                    onClick={confirmBooking}
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-line px-5 py-4 font-black uppercase text-black shadow-neon transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/35 disabled:shadow-none"
                  >
                    <span className="absolute inset-0 scale-0 rounded-full bg-white/40 transition group-active:scale-100" />
                    <span className="relative flex items-center gap-2">
                      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                      {loading ? "Processing" : "Confirm Booking"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {done && (
                      <motion.div
                        className="rounded-3xl border border-turf/30 bg-turf/10 p-4 text-sm font-bold text-turf"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Slot held successfully. Payment gateway wiring can plug in here.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </aside>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function Panel({ icon: Icon, title, children }) {
  return (
    <motion.section
      className="professional-surface p-5"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-3xl bg-line text-black">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="font-display text-2xl uppercase">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function PaymentCard({ label, amount, active, onClick }) {
  return (
    <motion.button
      className={`relative rounded-3xl border p-4 text-left transition ${
        active ? "border-line bg-line/15 shadow-premium" : "border-white/10 bg-black/35 hover:border-line/60"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {active && <motion.span layoutId="payment-border" className="absolute inset-0 rounded-3xl ring-2 ring-line" />}
      <Wallet className="mb-4 h-6 w-6 text-line" />
      <p className="font-black uppercase">{label}</p>
      <p className="mt-2 text-2xl font-black text-line">Rs {amount}</p>
    </motion.button>
  );
}

function SummaryRow({ label, value, tone }) {
  const toneClass = tone === "available" ? "text-turf" : tone === "booked" ? "text-danger" : "text-black/60";
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-sm text-black/45">{label}</span>
      <span className={`text-right font-black ${tone ? toneClass : "text-black"}`}>{value}</span>
    </div>
  );
}


