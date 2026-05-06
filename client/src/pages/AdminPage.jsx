import { motion } from "framer-motion";
import { Ban, CalendarRange, CircleDollarSign, LayoutDashboard, Search, Settings, Users } from "lucide-react";
import React, { useMemo, useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { adminStats, blockedSlots, bookings } from "../data/site";

const sidebar = [
  ["Overview", LayoutDashboard],
  ["Bookings", CalendarRange],
  ["Block Slots", Ban],
  ["Revenue", CircleDollarSign],
  ["Players", Users],
  ["Settings", Settings]
];

export function AdminPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => bookings.filter((item) => `${item.name} ${item.date} ${item.start}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <PageTransition>
      <main className="min-h-screen bg-pitch pt-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
          <aside className="professional-surface p-4 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-line">Owner Panel</p>
            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {sidebar.map(([label, Icon], index) => (
                <button
                  key={label}
                  className={`flex min-w-max items-center gap-3 rounded-3xl px-4 py-3 text-sm font-black uppercase transition ${
                    index === 0 ? "bg-line text-black shadow-premium" : "bg-white/80 text-black/65 hover:text-line"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-line">Live operations</p>
              <h1 className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">Admin Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {adminStats.map(({ label, value, trend, icon: Icon }, index) => (
                <motion.article
                  key={label}
                  className="professional-surface p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-3xl bg-line text-black">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-turf/15 px-3 py-1 text-xs font-black text-turf">{trend}</span>
                  </div>
                  <p className="text-sm text-black/45">{label}</p>
                  <p className="mt-1 font-display text-4xl">{value}</p>
                </motion.article>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div className="professional-surface p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-display text-3xl uppercase">Booking Table</h2>
                  <div className="flex items-center gap-2 rounded-3xl bg-white px-3 py-2 shadow-sm">
                    <Search className="h-4 w-4 text-line" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search"
                      className="bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/10">
                  <div className="grid grid-cols-4 bg-line px-4 py-3 text-xs font-black uppercase text-black">
                    <span>Team</span>
                    <span>Date</span>
                    <span>Slot</span>
                    <span>Status</span>
                  </div>
                  {filtered.map((item, index) => (
                    <motion.div
                      key={`${item.date}-${item.start}`}
                      className="grid grid-cols-4 border-t border-white/10 px-4 py-4 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="font-bold">{item.name}</span>
                      <span className="text-black/60">{item.date}</span>
                      <span className="text-black/60">{item.start} - {item.end}</span>
                      <span className="font-black text-turf">Approved</span>
                    </motion.div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-8 text-center text-black/45">No bookings found for this search.</div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="professional-surface p-5">
                  <h2 className="font-display text-3xl uppercase">Revenue Pulse</h2>
                  <div className="mt-6 flex h-44 items-end gap-3">
                    {[36, 72, 48, 86, 64, 92, 78].map((height, index) => (
                      <motion.div
                        key={height + index}
                        className="flex-1 rounded-t bg-gradient-to-t from-line to-white"
                        initial={{ height: 10 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.07, duration: 0.55 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="professional-surface p-5">
                  <h2 className="font-display text-3xl uppercase">Slot Blocking</h2>
                  <div className="mt-4 space-y-3">
                    {blockedSlots.map((slot) => (
                      <div key={`${slot.start}-${slot.end}-${slot.reason}`} className="rounded-3xl bg-white/80 p-4 shadow-sm">
                        <p className="font-black text-line">{slot.start} - {slot.end}</p>
                        <p className="text-sm text-black/55">{slot.reason}</p>
                        <p className="mt-2 text-xs uppercase text-black/35">{slot.recurring || slot.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.025] p-6 text-center">
                  <div className="mx-auto mb-4 h-3 w-2/3 animate-pulse rounded-2xl bg-white/10" />
                  <div className="mx-auto mb-3 h-3 w-1/2 animate-pulse rounded-2xl bg-white/10" />
                  <p className="text-sm text-black/45">Loading skeletons are styled for future API states.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}


