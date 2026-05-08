import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../data/site";
import { PremiumButton } from "./PremiumButton";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleAnchorClick = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: href });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setActiveHash(href);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition ${
        scrolled ? "border-b border-black/10 bg-white/85 shadow-xl backdrop-blur-xl" : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-3xl bg-line font-display text-xl text-black shadow-neon">
            A
          </span>
          <span className="hidden font-display text-xl uppercase leading-none text-black sm:block">
            ACE
            <span className="block text-xs tracking-[0.32em] text-line">Arena</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/80 px-2 py-1 shadow-sm md:flex">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            const anchorActive = isAnchor && activeHash === item.href;

            return isAnchor ? (
              <a
                key={item.label}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-xs font-black uppercase text-black/70 transition hover:text-line ${
                  anchorActive ? "text-line" : ""
                }`}
                onClick={(event) => handleAnchorClick(event, item.href)}
              >
                <span className="relative">{item.label}</span>
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive: routeActive }) =>
                  `relative rounded-full px-4 py-2 text-xs font-black uppercase text-black/70 transition hover:text-line ${
                    routeActive ? "text-line" : ""
                  }`
                }
              >
                {({ isActive: routeActive }) => (
                  <>
                    {routeActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-line/10" />}
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <PremiumButton to="/book">Book Slot</PremiumButton>
        </div>

        <button
          className="rounded-3xl border border-black/10 bg-white p-3 text-line shadow-sm md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-black/10 bg-white/95 px-4 py-5 shadow-xl md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isAnchor = item.href.startsWith("#");
                return isAnchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-3xl bg-black/[0.04] px-4 py-3 font-black uppercase text-black"
                    onClick={(event) => handleAnchorClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="rounded-3xl bg-black/[0.04] px-4 py-3 font-black uppercase text-black"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <PremiumButton to="/book" onClick={() => setOpen(false)}>
                Book Slot
              </PremiumButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


