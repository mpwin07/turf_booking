import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Play,
  Send,
  Star,
  Trophy,
  Users
} from "lucide-react";
import React, { useState } from "react";
import { Lightbox } from "../components/Lightbox";
import { PageTransition } from "../components/PageTransition";
import { PremiumButton } from "../components/PremiumButton";
import { Section } from "../components/Section";
import { amenities, gallery, quickContacts, testimonials, turf } from "../data/site";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.65, ease: "easeOut" }
  })
};

export function LandingPage() {
  const [preview, setPreview] = useState(null);

  return (
    <PageTransition>
      <main className="overflow-hidden">
        <Hero />
        <Section id="gallery" eyebrow="Matchday media" title="A turf that looks alive before kickoff">
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {gallery.map((item, index) => (
              <motion.button
                key={item.title}
                className={`group relative overflow-hidden rounded-md border border-white/10 bg-white/5 text-left ${
                  item.size === "large" ? "md:col-span-2 md:row-span-2" : ""
                } ${item.size === "wide" ? "md:col-span-2" : ""}`}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={index}
                whileHover={{ y: -8 }}
                onClick={() => setPreview(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-black uppercase text-line backdrop-blur">
                  {item.type === "video" ? "Preview" : "Photo"}
                </div>
                {item.type === "video" && (
                  <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-line text-black shadow-neon">
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl uppercase">{item.title}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </Section>

        <Section id="amenities" eyebrow="Facilities" title="Premium essentials for every squad">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {amenities.map(([label, Icon], index) => (
              <motion.div
                key={label}
                className="group rounded-md border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition hover:border-line/70 hover:shadow-neon"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={index}
                whileHover={{ rotateX: 4, rotateY: -4, y: -8 }}
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-line text-black transition group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-black uppercase sm:text-base">{label}</h3>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="pricing" eyebrow="Pricing" title="Clear rates, fast decisions">
          <div className="grid gap-5 lg:grid-cols-3">
            <PricingCard label="Weekday" price={turf.weekdayPrice} note="2 hour prime slot" />
            <PricingCard label="Weekend" price={turf.weekendPrice} note="Highlighted matchday rate" featured />
            <PricingCard label="Advance" price={turf.advanceAmount} note="Locks your booking instantly" />
          </div>
        </Section>

        <section className="overflow-hidden border-y border-white/10 bg-line py-5 text-black">
          <motion.div
            className="flex min-w-max gap-10 font-display text-2xl uppercase"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center gap-4">
                <span>{item.name}</span>
                <Star className="h-5 w-5 fill-current" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </section>

        <Section id="testimonials" eyebrow="Player feedback" title="Trusted by teams that play every week">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                className="rounded-md border border-white/10 bg-white/[0.055] p-5 backdrop-blur"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={index}
              >
                <div className="mb-4 flex gap-1 text-line">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <motion.span key={star} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: star * 0.08 }}>
                      <Star className="h-4 w-4 fill-current" />
                    </motion.span>
                  ))}
                </div>
                <p className="text-white/75">{item.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-line font-black text-black">
                    {item.avatar}
                  </span>
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-xs uppercase text-white/45">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Plan a match, tournament, or coaching slot">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.055] p-6 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {quickContacts.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-md bg-black/45 p-4">
                    <Icon className="mb-3 h-6 w-6 text-line" />
                    <p className="text-xs font-black uppercase text-white/45">{label}</p>
                    <p className="mt-1 break-words font-bold">{value}</p>
                  </div>
                ))}
              </div>
              <a
                href={`https://wa.me/${turf.whatsapp}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-md bg-line px-5 py-4 font-black uppercase text-black shadow-neon transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
            </div>
            <form className="rounded-md border border-white/10 bg-black/50 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" placeholder="Team captain" />
                <Input label="Phone" placeholder="Mobile number" />
                <Input label="Email" placeholder="name@email.com" />
                <Input label="Match Type" placeholder="5v5, coaching, tournament" />
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-line">Message</span>
                <textarea
                  className="min-h-28 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-line"
                  placeholder="Tell us what you want to book"
                />
              </label>
              <button className="group mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-line via-white to-line bg-[length:200%_100%] px-5 py-4 font-black uppercase text-black shadow-neon transition hover:bg-right">
                Submit Enquiry
                <Send className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
          <iframe
            title="ACE Multisports Arena map"
            src="https://www.google.com/maps?q=football%20turf&output=embed"
            className="mt-6 h-80 w-full rounded-md border border-white/10"
            loading="lazy"
          />
        </Section>

        <Footer />
        <Lightbox item={preview} onClose={() => setPreview(null)} />
      </main>
    </PageTransition>
  );
}

function Hero() {
  return (
    <section className="stadium-lines relative min-h-screen overflow-hidden px-4 pt-24">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1800&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-soccer-field-7193/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-black/70 to-black/30" />
      </div>
      <motion.div className="glow-one" animate={{ y: [0, 28, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 6 }} />
      <motion.div className="glow-two" animate={{ x: [0, -28, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 7 }} />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 pb-16 lg:grid-cols-[1fr_0.75fr]">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-line/30 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-line backdrop-blur">
            <Clock className="h-4 w-4" />
            {turf.workingHours}
          </div>
          <h1 className="font-display text-5xl uppercase leading-none sm:text-7xl xl:text-8xl">
            {turf.name}
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-black text-line sm:text-4xl">{turf.tagline}</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
            Premium futsal booking with live slot clarity, quick payment decisions, and a matchday experience that starts before the whistle.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <PremiumButton to="/book">Book Slot</PremiumButton>
            <PremiumButton href="#contact" variant="ghost">
              Contact Us
            </PremiumButton>
          </div>
        </motion.div>

        <motion.div
          className="rounded-md border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1000&q=80"
              alt="Football player on turf"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Metric icon={Trophy} label="Prime" value="Slots" />
            <Metric icon={Users} label="Teams" value="24+" />
            <Metric icon={MapPin} label="Arena" value="Live" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ label, price, note, featured }) {
  return (
    <motion.article
      className={`relative overflow-hidden rounded-md border p-6 ${
        featured ? "border-line bg-line text-black shadow-neon" : "border-white/10 bg-white/[0.055] backdrop-blur"
      }`}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <p className={`text-xs font-black uppercase tracking-[0.22em] ${featured ? "text-black/70" : "text-line"}`}>
        {label}
      </p>
      <motion.p
        className="mt-4 font-display text-6xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Rs {price}
      </motion.p>
      <p className={`mt-3 ${featured ? "text-black/65" : "text-white/60"}`}>{note}</p>
      <ChevronRight className="absolute bottom-5 right-5 h-7 w-7" />
    </motion.article>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md bg-black/55 p-3">
      <Icon className="mb-2 h-5 w-5 text-line" />
      <p className="text-xs uppercase text-white/45">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-line">{label}</span>
      <input
        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-line"
        placeholder={placeholder}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl text-line">ACE MULTISPORTS ARENA</p>
          <p className="text-sm text-white/45">Copyright 2026. Premium turf booking experience.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {["Gallery", "Pricing", "Contact", "Instagram"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/70 hover:text-line">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
