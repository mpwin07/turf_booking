import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, CreditCard, Loader2, ShieldCheck, Wallet, Zap } from "lucide-react";
import React, { useMemo, useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { PremiumButton } from "../components/PremiumButton";
import { blockedSlots, bookings, slotTimes, turf } from "../data/site";
import { addHours, formatDisplayDate, isWeekend, makeDateOptions, resolveSlotState } from "../utils/booking";

export function BookingPage() {
  const dates = useMemo(() => makeDateOptions(), []);
  const [selectedDate, setSelectedDate] = useState(dates[3].iso);
  const [duration, setDuration] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState("18:00");
  const [paymentType, setPaymentType] = useState("advance");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const endTime = addHours(selectedSlot, duration);
  const dayType = isWeekend(selectedDate) ? "Weekend" : "Weekday";
  const fullAmount = duration === 1 ? turf.oneHourPrice : isWeekend(selectedDate) ? turf.weekendPrice : turf.weekdayPrice;
  const payable = paymentType === "advance" ? turf.advanceAmount : fullAmount;
  const selectedState = resolveSlotState({
    date: selectedDate,
    start: selectedSlot,
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,213,0,0.18),transparent_32%),linear-gradient(135deg,#0A0A0A,#111,#0A0A0A)]" />
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
                      className={`rounded-md border p-4 text-left transition ${
                        selectedDate === date.iso
                          ? "border-line bg-line text-black shadow-neon"
                          : date.available
                            ? "border-white/10 bg-white/[0.055] hover:border-line/70"
                            : "cursor-not-allowed border-white/5 bg-white/[0.025] text-white/25"
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
                  {slotTimes.map((start) => {
                    const end = addHours(start, duration);
                    const state = resolveSlotState({ date: selectedDate, start, end, bookings, blockedSlots });
                    const isSelected = selectedSlot === start;
                    const palette = {
                      available: isSelected
                        ? "border-turf bg-turf/20 text-turf shadow-[0_0_24px_rgba(24,180,107,0.25)]"
                        : "border-turf/25 bg-turf/5 text-turf hover:border-turf",
                      booked: "cursor-not-allowed border-danger/35 bg-danger/10 text-danger",
                      reserved: "cursor-not-allowed border-white/10 bg-white/[0.04] text-white/45"
                    };

                    return (
                      <motion.button
                        key={start}
                        disabled={state.state !== "available"}
                        onClick={() => setSelectedSlot(start)}
                        className={`rounded-md border p-4 text-left transition ${palette[state.state]}`}
                        whileHover={state.state === "available" ? { y: -5, scale: 1.02 } : undefined}
                        layout
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-display text-2xl">{start} - {end}</p>
                          {state.state === "available" && <CheckCircle2 className="h-5 w-5" />}
                        </div>
                        <p className="mt-2 text-xs font-black uppercase">{state.label}</p>
                        <p className="mt-1 text-xs opacity-70">{state.detail}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </Panel>

              <div className="grid gap-6 xl:grid-cols-2">
                <Panel icon={Zap} title="Duration">
                  <div className="grid grid-cols-2 rounded-md bg-black p-1">
                    {[1, 2].map((hours) => (
                      <button
                        key={hours}
                        className={`relative rounded px-4 py-4 font-black uppercase ${duration === hours ? "text-black" : "text-white/55"}`}
                        onClick={() => setDuration(hours)}
                      >
                        {duration === hours && <motion.span layoutId="duration-pill" className="absolute inset-0 rounded bg-line" />}
                        <span className="relative">{hours} Hour{hours > 1 ? "s" : ""}</span>
                      </button>
                    ))}
                  </div>
                </Panel>

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
                className="overflow-hidden rounded-md border border-line/35 bg-black/70 shadow-neon backdrop-blur-xl"
                layout
              >
                <div className="bg-line p-5 text-black">
                  <p className="text-xs font-black uppercase tracking-[0.22em]">Booking Summary</p>
                  <p className="mt-2 font-display text-4xl uppercase">{dayType}</p>
                </div>
                <div className="space-y-4 p-5">
                  <SummaryRow label="Date" value={formatDisplayDate(selectedDate)} />
                  <SummaryRow label="Time" value={`${selectedSlot} - ${endTime}`} />
                  <SummaryRow label="Duration" value={`${duration} Hour${duration > 1 ? "s" : ""}`} />
                  <SummaryRow label="Slot Status" value={selectedState.label} tone={selectedState.state} />
                  <div className="rounded-md border border-white/10 bg-white/[0.055] p-4">
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Full amount</span>
                      <span>Rs {fullAmount}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-white/60">
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
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-line via-white to-line bg-[length:220%_100%] px-5 py-4 font-black uppercase text-black shadow-neon transition hover:bg-right disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/15 disabled:text-white/45 disabled:shadow-none"
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
                        className="rounded-md border border-turf/30 bg-turf/10 p-4 text-sm font-bold text-turf"
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
      className="rounded-md border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-line text-black">
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
      className={`relative rounded-md border p-4 text-left transition ${
        active ? "border-line bg-line/15 shadow-neon" : "border-white/10 bg-black/45 hover:border-line/60"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {active && <motion.span layoutId="payment-border" className="absolute inset-0 rounded-md ring-2 ring-line" />}
      <Wallet className="mb-4 h-6 w-6 text-line" />
      <p className="font-black uppercase">{label}</p>
      <p className="mt-2 text-2xl font-black text-line">Rs {amount}</p>
    </motion.button>
  );
}

function SummaryRow({ label, value, tone }) {
  const toneClass = tone === "available" ? "text-turf" : tone === "booked" ? "text-danger" : "text-white/60";
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-sm text-white/45">{label}</span>
      <span className={`text-right font-black ${tone ? toneClass : "text-white"}`}>{value}</span>
    </div>
  );
}
