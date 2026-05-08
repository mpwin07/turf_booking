import {
  Activity,
  BarChart3,
  CalendarClock,
  Car,
  Droplets,
  Dumbbell,
  Instagram,
  LampCeiling,
  MapPin,
  Phone,
  ShieldCheck,
  ShowerHead,
  Sofa,
  Trophy,
  UserRoundCheck,
  WalletCards
} from "lucide-react";

export const turf = {
  name: "ACE MULTISPORTS ARENA",
  tagline: "Play Under The Lights.",
  phone: "[ENTER PHONE NUMBER]",
  whatsapp: "[ENTER WHATSAPP NUMBER]",
  email: "[ENTER EMAIL]",
  instagram: "[ENTER INSTAGRAM LINK]",
  address: "ACE Multisports Arena",
  map: "https://www.google.com/maps/place/ace+multisports+arena/data=!4m2!3m1!1s0x3a5291fc5ed9265f:0x34fee5192daa632c?sa=X&ved=1t:242&ictx=111",
  mapEmbed: "https://www.google.com/maps?q=ACE%20Multisports%20Arena&output=embed",
  weekdayPrice: 1200,
  weekendPrice: 1500,
  advanceAmount: 200,
  oneHourPrice: 700,
  workingHours: "8:00 AM - 1:30 AM"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" }
];

export const gallery = [
  {
    title: "Covered Turf",
    type: "image",
    size: "large",
    image: "/arena/covered-turf-day.webp",
    fallback:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Street Entrance",
    type: "image",
    image: "/arena/entrance-signboard-day.webp",
    fallback:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Kids Coaching",
    type: "image",
    image: "/arena/kids-coaching-session.webp",
    fallback:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Night Cricket",
    type: "image",
    size: "wide",
    image: "/arena/night-turf-cricket.webp",
    fallback:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Brand Signage",
    type: "image",
    image: "/arena/night-signboard.webp",
    fallback:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Cricket Practice",
    type: "image",
    image: "/arena/day-cricket-practice.webp",
    fallback:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Roofed Layout",
    type: "image",
    image: "/arena/roofed-turf-layout.webp",
    fallback:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1000&q=80"
  }
];

export const amenities = [
  ["Flood Lights", LampCeiling],
  ["Parking", Car],
  ["Drinking Water", Droplets],
  ["Seating Area", Sofa],
  ["Washroom", ShowerHead],
  ["Coaching", UserRoundCheck],
  ["Turf Shoes Rental", Dumbbell],
  ["Changing Room", ShieldCheck]
];

export const testimonials = [
  {
    name: "Arjun M",
    role: "Weekend captain",
    text: "The lights, turf grip, and booking flow feel proper. No back-and-forth messages anymore.",
    avatar: "AM"
  },
  {
    name: "Rahul FC",
    role: "Five-a-side team",
    text: "Clean ground, clear timings, and fast confirmation. This is how turf booking should work.",
    avatar: "RF"
  },
  {
    name: "Vikram S",
    role: "Tournament host",
    text: "Easy to plan evening matches because availability is clear before collecting team payments.",
    avatar: "VS"
  },
  {
    name: "Naveen K",
    role: "Academy coach",
    text: "Coach-reserved slots being visible is a big win. The dashboard makes operations smoother.",
    avatar: "NK"
  }
];

export const bookings = [
  { date: "2026-05-09", start: "18:00", end: "20:00", name: "Weekend Warriors", status: "booked" },
  { date: "2026-05-10", start: "07:00", end: "09:00", name: "Morning League", status: "booked" },
  { date: "2026-05-11", start: "20:00", end: "22:00", name: "Northside FC", status: "booked" }
];

export const blockedSlots = [
  { date: "2026-05-09", start: "17:00", end: "18:00", reason: "Coach practice", status: "reserved" },
  { recurring: "daily", start: "05:00", end: "07:00", reason: "Academy training", status: "reserved" }
];

export const slotTimes = [
  { label: "8 AM - 10 AM", start: "08:00", end: "10:00", duration: 2 },
  { label: "10 AM - 12 PM", start: "10:00", end: "12:00", duration: 2 },
  { label: "12 PM - 2 PM", start: "12:00", end: "14:00", duration: 2 },
  { label: "2 PM - 5 PM", start: "14:00", end: "17:00", duration: 3 },
  { label: "5 PM - 7 PM", start: "17:00", end: "19:00", duration: 2 },
  { label: "7 PM - 9 PM", start: "19:00", end: "21:00", duration: 2 },
  { label: "9 PM - 11 PM", start: "21:00", end: "23:00", duration: 2 },
  { label: "11 PM - 1 AM", start: "23:00", end: "01:00", duration: 2 }
];

export const adminStats = [
  { label: "Today Revenue", value: "Rs 8.4K", trend: "+18%", icon: BarChart3 },
  { label: "Approved Slots", value: "24", trend: "+6", icon: CalendarClock },
  { label: "Occupancy", value: "78%", trend: "+12%", icon: Activity },
  { label: "Tournament Leads", value: "9", trend: "+3", icon: Trophy }
];

export const quickContacts = [
  { label: "Phone", value: turf.phone, icon: Phone },
  { label: "WhatsApp", value: turf.whatsapp, icon: WalletCards },
  { label: "Instagram", value: turf.instagram, icon: Instagram },
  { label: "Location", value: turf.address, icon: MapPin }
];
