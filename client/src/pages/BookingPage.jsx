import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Minus,
  ShieldCheck,
  User,
  WalletCards
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { turf } from "../data/site";
import { formatDisplayDate, isWeekend } from "../utils/booking";

const SESSION_KEY = "ace_turf_session";
const steps = ["Date", "Slot", "Review", "Payment"];

const slotGroups = [
  {
    label: "1 Hour Slots",
    slots: [
      { label: "8 AM", start: "08:00", duration: 1, state: "available" },
      { label: "9 AM", start: "09:00", duration: 1, state: "available" },
      { label: "10 AM", start: "10:00", duration: 1, state: "booked" },
      { label: "11 AM", start: "11:00", duration: 1, state: "available" },
      { label: "12 PM", start: "12:00", duration: 1, state: "available" },
      { label: "1 PM", start: "13:00", duration: 1, state: "available" },
      { label: "2 PM", start: "14:00", duration: 1, state: "available" },
      { label: "3 PM", start: "15:00", duration: 1, state: "booked" },
      { label: "4 PM", start: "16:00", duration: 1, state: "available" },
      { label: "5 PM", start: "17:00", duration: 1, state: "available" },
      { label: "6 PM", start: "18:00", duration: 1, state: "available", peak: true },
      { label: "7 PM", start: "19:00", duration: 1, state: "available", peak: true },
      { label: "8 PM", start: "20:00", duration: 1, state: "booked", peak: true },
      { label: "9 PM", start: "21:00", duration: 1, state: "available", peak: true },
      { label: "10 PM", start: "22:00", duration: 1, state: "available" },
      { label: "11 PM", start: "23:00", duration: 1, state: "available" },
      { label: "12 AM", start: "00:00", duration: 1, state: "available" },
      { label: "1 AM", start: "01:00", duration: 1, state: "booked" },
      { label: "2 AM", start: "02:00", duration: 1, state: "available" }
    ]
  },
  {
    label: "2 Hour Slots",
    slots: [
      { label: "8 AM - 10 AM", start: "08:00", duration: 2, state: "available" },
      { label: "10 AM - 12 PM", start: "10:00", duration: 2, state: "booked" },
      { label: "12 PM - 2 PM", start: "12:00", duration: 2, state: "available" },
      { label: "2 PM - 4 PM", start: "14:00", duration: 2, state: "available" },
      { label: "4 PM - 6 PM", start: "16:00", duration: 2, state: "available" },
      { label: "6 PM - 8 PM", start: "18:00", duration: 2, state: "available", peak: true },
      { label: "8 PM - 10 PM", start: "20:00", duration: 2, state: "booked", peak: true },
      { label: "10 PM - 12 AM", start: "22:00", duration: 2, state: "available" },
      { label: "12 AM - 1 AM", start: "00:00", duration: 1, state: "available" }
    ]
  }
];

export function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(() => readSession());

  useEffect(() => {
    const hasSession = Boolean(readSession());

    if (location.pathname === "/book") {
      navigate(hasSession ? "/book/dashboard" : "/book/login", { replace: true });
    }

    if (location.pathname === "/book/dashboard" && !hasSession) {
      navigate("/book/login", { replace: true });
    }

    if (location.pathname === "/book/login" && hasSession) {
      navigate("/book/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  function handleLogin(credentials) {
    const nextSession = {
      name: credentials.identifier.includes("@") ? credentials.identifier.split("@")[0] : "ACE Player",
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    navigate("/book/dashboard", { replace: true });
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    navigate("/book/login", { replace: true });
  }

  return (
    <PageTransition>
      {location.pathname === "/book" ? null : location.pathname.includes("/login") ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        session && <BookingDashboard session={session} onLogout={handleLogout} />
      )}
    </PageTransition>
  );
}

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = identifier.trim().length > 2 && password.trim().length > 3;

  function submit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onLogin({ identifier, password });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-white px-4 py-10 text-[#111827]">
      <motion.form
        onSubmit={submit}
        className="w-full max-w-md rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.10)] sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-8 text-center">
          <Link to="/" className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#facc15] font-black text-black shadow-[0_14px_36px_rgba(250,204,21,0.30)]">
            ACE
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9d7800]">ACE TURF</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Book your slot</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue to the premium booking dashboard.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Phone or email</span>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="h-14 w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-base outline-none transition focus:border-[#facc15] focus:ring-4 focus:ring-[#fde68a]/45"
              placeholder="player@email.com"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="h-14 w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-base outline-none transition focus:border-[#facc15] focus:ring-4 focus:ring-[#fde68a]/45"
              placeholder="Password"
            />
          </label>
        </div>

        <motion.button
          disabled={!canSubmit}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#facc15] px-5 py-4 font-black text-black shadow-[0_18px_44px_rgba(250,204,21,0.28)] transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          whileHover={canSubmit ? { y: -2, scale: 1.01 } : undefined}
          whileTap={canSubmit ? { scale: 0.98 } : undefined}
        >
          <LockKeyhole className="h-5 w-5" />
          {mode === "login" ? "Login" : "Create Account"}
        </motion.button>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === "login" ? "New to ACE TURF?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-black text-[#111827] underline decoration-[#facc15] decoration-2 underline-offset-4">
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.form>
    </main>
  );
}

function BookingDashboard({ session, onLogout }) {
  const dates = useMemo(() => makeCalendarDates(), []);
  const firstAvailable = dates.find((date) => date.available)?.iso;
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(firstAvailable);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [needPlayers, setNeedPlayers] = useState(false);
  const [playersNeeded, setPlayersNeeded] = useState(2);

  const booking = {
    turfName: turf.name,
    date: selectedDate,
    slot: selectedSlot,
    needPlayers,
    playersNeeded,
    price: selectedSlot ? getSlotPrice(selectedSlot, selectedDate) : getSlotPrice({ duration: 2 }, selectedDate)
  };

  function next() {
    setStep((value) => Math.min(value + 1, 4));
  }

  function back() {
    setStep((value) => Math.max(value - 1, 0));
  }

  function reset() {
    setStep(0);
    setSelectedSlot(null);
    setNeedPlayers(false);
    setPlayersNeeded(2);
  }

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <DashboardNavbar session={session} onLogout={onLogout} />
      <ProgressStepper currentStep={step} />

      <section className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <BookingCard key="date" eyebrow="Step 1" title="Select Date" icon={CalendarDays}>
              <DateSelection dates={dates} selectedDate={selectedDate} onSelect={setSelectedDate} />
              <CardActions canContinue={Boolean(selectedDate)} onNext={next} nextLabel="Select Time Slot" />
            </BookingCard>
          )}

          {step === 1 && (
            <BookingCard key="slot" eyebrow="Step 2" title="Select Time Slot" icon={Clock3}>
              <SlotGrid selectedDate={selectedDate} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
              <NeedPlayersToggle
                enabled={needPlayers}
                onChange={setNeedPlayers}
                playersNeeded={playersNeeded}
                onPlayersChange={setPlayersNeeded}
              />
              <CardActions canContinue={Boolean(selectedSlot)} onBack={back} onNext={next} nextLabel="Review Booking" />
            </BookingCard>
          )}

          {step === 2 && (
            <ReviewCard key="review" booking={booking} onBack={back} onNext={next} />
          )}

          {step === 3 && (
            <PaymentPlaceholder key="payment" booking={booking} onBack={back} onNext={next} />
          )}

          {step === 4 && (
            <SuccessScreen key="success" booking={booking} onReset={reset} />
          )}
        </AnimatePresence>
      </section>

      <MyBookingsSection booking={booking} />
    </main>
  );
}

function DashboardNavbar({ session, onLogout }) {
  return (
    <div className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 backdrop-blur" role="banner">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#facc15] text-sm font-black text-black">ACE</span>
          <span className="font-black tracking-tight">ACE TURF</span>
        </Link>
        <div className="flex items-center gap-3 text-xs font-bold text-gray-600 sm:gap-8 sm:text-sm">
          <a href="#bookings" className="transition hover:text-black">My Bookings</a>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onLogout} className="hidden rounded-full border border-[#e5e7eb] px-4 py-2 text-xs font-black uppercase text-gray-500 transition hover:border-black hover:text-black sm:block">
            Logout
          </button>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e7eb] bg-white text-black shadow-sm" title={session?.name || "Profile"}>
            <User className="h-5 w-5" />
          </span>
        </div>
      </nav>
    </div>
  );
}

function ProgressStepper({ currentStep }) {
  const visibleStep = Math.min(currentStep, steps.length - 1);
  const width = `${(visibleStep / (steps.length - 1)) * 100}%`;

  return (
    <div className="sticky top-[65px] z-30 border-b border-[#e5e7eb] bg-white/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto max-w-4xl">
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-gray-100" />
          <motion.div className="absolute left-0 top-5 h-1 rounded-full bg-[#facc15]" animate={{ width }} transition={{ duration: 0.45, ease: "easeOut" }} />
          <div className="relative flex justify-between">
            {steps.map((label, index) => {
              const completed = currentStep > index;
              const active = currentStep === index;
              return (
                <div key={label} className="flex min-w-0 flex-col items-center gap-2">
                  <motion.span
                    className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition ${
                      completed
                        ? "border-[#facc15] bg-[#facc15] text-black"
                        : active
                          ? "border-[#facc15] bg-[#fde68a] text-black"
                          : "border-[#e5e7eb] bg-white text-gray-400"
                    }`}
                    animate={{ scale: active ? 1.08 : 1 }}
                  >
                    {completed ? <Check className="h-5 w-5" /> : index + 1}
                  </motion.span>
                  <span className={`text-[11px] font-black uppercase tracking-[0.12em] ${active ? "text-black" : "text-gray-400"}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ eyebrow, title, icon: Icon, children }) {
  return (
    <motion.article
      className="mx-auto w-full rounded-[28px] border border-[#e5e7eb] bg-white p-5 shadow-[0_24px_80px_rgba(17,24,39,0.10)] sm:p-7"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9d7800]">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fde68a] text-black">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      {children}
    </motion.article>
  );
}

function DateSelection({ dates, selectedDate, onSelect }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center justify-between">
        <button className="grid h-8 w-8 place-items-center rounded-full border border-[#e5e7eb] text-gray-500">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-black">May 2026</p>
        <button className="grid h-8 w-8 place-items-center rounded-full border border-[#e5e7eb] text-gray-500">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {dates.map((date) => {
          if (date.blank) {
            return <span key={date.key} className="aspect-square" />;
          }

          const selected = selectedDate === date.iso;
          return (
            <motion.button
              key={date.iso}
              disabled={false}
              onClick={() => onSelect(date.iso)}
              className={`aspect-square rounded-xl border text-xs font-black transition sm:text-sm ${
                selected
                  ? "border-[#facc15] bg-[#facc15] text-black shadow-[0_10px_24px_rgba(250,204,21,0.28)]"
                  : "border-[#e5e7eb] bg-white hover:border-[#facc15] hover:bg-[#fde68a]/60"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              {date.day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function MyBookingsSection({ booking }) {
  const hasDraft = booking.date && booking.slot;

  return (
    <section id="bookings" className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9d7800]">My Bookings</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Your current slot</h2>
        </div>

        <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-5 shadow-[0_16px_50px_rgba(17,24,39,0.07)]">
          {hasDraft ? (
            <div className="grid gap-4 sm:grid-cols-4">
              <SummaryTile label="Date" value={formatDisplayDate(booking.date)} />
              <SummaryTile label="Time" value={booking.slot.label} />
              <SummaryTile label="Players" value={booking.needPlayers ? `${booking.playersNeeded} needed` : "Private"} />
              <SummaryTile label="Price" value={`Rs ${booking.price}`} />
            </div>
          ) : (
            <p className="text-sm font-bold text-gray-500">Pick a date and slot to preview your booking here.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">{label}</p>
      <p className="mt-2 font-black">{value}</p>
    </div>
  );
}

function SlotGrid({ selectedDate, selectedSlot, onSelect }) {
  return (
    <div className="space-y-6">
      {slotGroups.map((group) => (
        <section key={group.label}>
          <h2 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-gray-500">{group.label}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {group.slots.map((slot) => {
              const selected = selectedSlot?.start === slot.start && selectedSlot?.label === slot.label;
              const booked = slot.state === "booked";
              const price = getSlotPrice(slot, selectedDate);
              return (
                <motion.button
                  key={slot.start}
                  disabled={booked}
                  onClick={() => onSelect(slot)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    booked
                      ? "cursor-not-allowed border-red-200 bg-red-50 text-red-600"
                      : selected
                        ? "border-[#facc15] bg-[#facc15] text-black shadow-[0_18px_40px_rgba(250,204,21,0.25)]"
                        : slot.peak
                          ? "border-[#facc15] bg-white hover:bg-[#fde68a]/50"
                          : "border-[#e5e7eb] bg-white hover:border-[#facc15]"
                  }`}
                  whileHover={!booked ? { y: -4, scale: 1.02 } : undefined}
                  whileTap={!booked ? { scale: 0.98 } : undefined}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-black leading-tight sm:text-lg">{slot.label}</span>
                    {selected ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : booked ? <Minus className="h-4 w-4 shrink-0" /> : null}
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-current opacity-65">
                    {booked ? "Booked" : slot.peak ? "Peak slot" : "Available"}
                  </p>
                  <p className="mt-0.5 text-xs font-bold">Rs {price}</p>
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function NeedPlayersToggle({ enabled, onChange, playersNeeded, onPlayersChange }) {
  return (
    <div className="mt-8 rounded-3xl border border-[#e5e7eb] bg-gray-50/60 p-4">
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span className="flex items-center gap-3 font-black">
          <span className={`grid h-6 w-6 place-items-center rounded-lg border ${enabled ? "border-[#facc15] bg-[#facc15]" : "border-gray-300 bg-white"}`}>
            {enabled && <Check className="h-4 w-4" />}
          </span>
          Need Players
        </span>
        <input type="checkbox" checked={enabled} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
      </label>

      <AnimatePresence>
        {enabled && (
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-gray-500">Players needed</span>
              <select
                value={playersNeeded}
                onChange={(event) => onPlayersChange(Number(event.target.value))}
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 font-bold outline-none focus:border-[#facc15]"
              >
                {[1, 2, 3, 4, 5, 6].map((count) => <option key={count}>{count}</option>)}
              </select>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewCard({ booking, onBack, onNext }) {
  return (
    <BookingCard eyebrow="Step 3" title="Booking Review" icon={WalletCards}>
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#e5e7eb] bg-white p-5">
        <SummaryRow label="Turf name" value={booking.turfName} />
        <SummaryRow label="Date" value={formatDisplayDate(booking.date)} />
        <SummaryRow label="Time" value={booking.slot?.label || "Select slot"} />
        <SummaryRow label="Need Players" value={booking.needPlayers ? `${booking.playersNeeded} players` : "No"} />
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#fde68a] px-4 py-4">
          <span className="font-black">Price</span>
          <span className="text-2xl font-black">Rs {booking.price}</span>
        </div>
      </div>
      <CardActions onBack={onBack} onNext={onNext} nextLabel="Proceed to Payment" />
    </BookingCard>
  );
}

function PaymentPlaceholder({ booking, onBack, onNext }) {
  return (
    <BookingCard eyebrow="Step 4" title="Payment" icon={ShieldCheck}>
      <div className="mx-auto max-w-xl rounded-3xl border border-[#e5e7eb] bg-gray-50 p-6 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#facc15] text-black">
          <LockKeyhole className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-black">Razorpay Integration Coming Soon</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
          This placeholder keeps the flow ready for secure payment wiring without collecting real payment details yet.
        </p>
        <div className="mt-6 rounded-2xl bg-white px-4 py-4">
          <SummaryRow label="Payable now" value={`Rs ${booking.price}`} compact />
        </div>
      </div>
      <CardActions onBack={onBack} onNext={onNext} nextLabel="Dummy Pay" />
    </BookingCard>
  );
}

function SuccessScreen({ booking, onReset }) {
  return (
    <motion.section
      className="mx-auto w-full max-w-2xl rounded-[28px] border border-[#e5e7eb] bg-white p-6 text-center shadow-[0_24px_80px_rgba(17,24,39,0.10)] sm:p-8"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#facc15] text-black"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
      >
        <Check className="h-10 w-10" />
      </motion.span>
      <h1 className="mt-6 text-3xl font-black tracking-tight">Booking Confirmed</h1>
      <p className="mt-2 text-gray-500">Your slot is held and ready for matchday.</p>
      <div className="mx-auto mt-7 max-w-md rounded-3xl border border-[#e5e7eb] p-5 text-left">
        <SummaryRow label="Turf" value={booking.turfName} />
        <SummaryRow label="Date" value={formatDisplayDate(booking.date)} />
        <SummaryRow label="Time" value={booking.slot?.label} />
        <SummaryRow label="Need Players" value={booking.needPlayers ? `${booking.playersNeeded} players` : "No"} compact />
      </div>
      <motion.button
        onClick={onReset}
        className="mt-7 rounded-2xl bg-[#facc15] px-6 py-4 font-black text-black shadow-[0_18px_44px_rgba(250,204,21,0.28)]"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Back to Dashboard
      </motion.button>
    </motion.section>
  );
}

function CardActions({ canContinue = true, onBack, onNext, nextLabel = "Continue" }) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <motion.button
          onClick={onBack}
          className="rounded-2xl border border-[#e5e7eb] px-5 py-4 font-black text-gray-600 transition hover:border-black hover:text-black"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
      ) : <span />}
      <motion.button
        disabled={!canContinue}
        onClick={onNext}
        className="rounded-2xl bg-[#facc15] px-6 py-4 font-black text-black shadow-[0_18px_44px_rgba(250,204,21,0.28)] transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
        whileHover={canContinue ? { y: -2, scale: 1.02 } : undefined}
        whileTap={canContinue ? { scale: 0.98 } : undefined}
      >
        {nextLabel}
      </motion.button>
    </div>
  );
}

function SummaryRow({ label, value, compact = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 border-b border-[#e5e7eb] ${compact ? "py-2 last:border-b-0" : "py-4 last:border-b-0"}`}>
      <span className="text-sm font-bold text-gray-500">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function makeCalendarDates() {
  const start = new Date("2026-05-01T00:00:00");
  const leadingDays = start.getDay();
  const blanks = Array.from({ length: leadingDays }, (_, index) => ({
    key: `blank-${index}`,
    blank: true,
    available: false
  }));
  const monthDates = Array.from({ length: 31 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const iso = date.toISOString().slice(0, 10);
    const day = date.getDate();

    return {
      iso,
      day,
      available: true
    };
  });

  return [...blanks, ...monthDates];
}

function getSlotPrice(slot, date) {
  if (slot.duration === 1) {
    return isWeekend(date) ? 800 : 700;
  }

  return isWeekend(date) ? 1500 : 1200;
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
