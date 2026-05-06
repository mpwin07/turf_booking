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
  address: "[ENTER ADDRESS]",
  map: "https://www.google.com/maps",
  weekdayPrice: 1200,
  weekendPrice: 1500,
  advanceAmount: 200,
  oneHourPrice: 700,
  workingHours: "5:00 AM - 11:00 PM"
};

export const navItems = [
  { label: "Gallery", href: "/#gallery" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
  { label: "Admin", href: "/admin" }
];

export const gallery = [
  {
    title: "Floodlight Arena",
    type: "image",
    size: "large",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Match Tempo",
    type: "video",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Coaching Hours",
    type: "image",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Team Nights",
    type: "image",
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Tournament Ready",
    type: "video",
    image:
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
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00"
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
