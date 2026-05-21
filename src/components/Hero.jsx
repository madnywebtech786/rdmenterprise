"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Star, TruckIcon, Zap, PackageOpen, Trash2, HardHat } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    badge: "Calgary's Trusted Movers",
    headline: ["We Move", "Anything,", "Anywhere."],
    headlineColors: ["white", "#DF5B10", "white"],
    description: "From same-day junk removal to full office relocations. RDM Enterprises serves Calgary with precision, care, and speed you can count on.",
    cta: { label: "Get a Free Quote", href: "#contact" },
    stats: [
      { value: "5K+", label: "Moves Done" },
      { value: "98%", label: "Happy Clients" },
      { value: "$100", label: "Per Hour Labour" },
      { value: "4.9★", label: "Google Rating" },
    ],
    image: "/images/slide1.webp",
    imageAlt: "RDM moving truck Calgary",
    Icon: TruckIcon,
    floatCard1: { title: "LIVE DISPATCH", body: "3 trucks active\nin Calgary now" },
    floatCard2: { value: "4.9", label: "500+ verified reviews" },
    floatCard3: { title: "Same-Day Available", sub: "Book before 2 PM", stat: "2hr", statLabel: "ETA" },
  },
  {
    badge: "Full-Service Moving",
    headline: ["Calgary's", "Moving", "Experts."],
    headlineColors: ["white", "#DF5B10", "white"],
    description: "Residential, commercial, and office moves across Calgary and surrounding areas. We pack, protect, and deliver. All under one roof.",
    cta: { label: "Book a Move", href: "#contact" },
    stats: [
      { value: "3K+", label: "Items Moved" },
      { value: "100%", label: "On-Time Rate" },
      { value: "4", label: "Sub-Services" },
      { value: "AB", label: "Province-Wide" },
    ],
    image: "/images/slide2.webp",
    imageAlt: "Moving service Calgary",
    Icon: PackageOpen,
    floatCard1: { title: "FULL PACKING", body: "Materials supplied\nall included" },
    floatCard2: { value: "100%", label: "Floor protection guaranteed" },
    floatCard3: { title: "Airdrie, Cochrane", sub: "Chestermere, Okotoks", stat: "6+", statLabel: "Cities" },
  },
  {
    badge: "Eco-Friendly Junk Removal",
    headline: ["Clutter", "Gone,", "Today."],
    headlineColors: ["white", "#DF5B10", "white"],
    description: "Fast, responsible junk removal across Calgary. We sort, donate, and recycle, keeping 70%+ of what we haul out of the landfill.",
    cta: { label: "Book a Pickup", href: "#contact" },
    stats: [
      { value: "70%+", label: "Diverted from Landfill" },
      { value: "Same", label: "Day Available" },
      { value: "100%", label: "Insured" },
      { value: "YYC", label: "Calgary-Based" },
    ],
    image: "/images/slide3.webp",
    imageAlt: "Junk removal Calgary",
    Icon: Trash2,
    floatCard1: { title: "ECO CERTIFIED", body: "Donate & recycle\nfirst, always" },
    floatCard2: { value: "70%+", label: "Stays out of landfill" },
    floatCard3: { title: "Full Clearouts", sub: "Homes, offices, garages", stat: "1hr", statLabel: "Call-Out" },
  },
  {
    badge: "Jobsite Labour $100/hr",
    headline: ["Trained", "Hands,", "Your Terms."],
    headlineColors: ["white", "#DF5B10", "white"],
    description: "Reliable, background-checked labourers available by the hour across Calgary. Flat $100/hour, no agency fees, no surprises.",
    cta: { label: "Book Labour", href: "#contact" },
    stats: [
      { value: "$100", label: "Per Hour Flat" },
      { value: "2hr", label: "Minimum Booking" },
      { value: "6+", label: "Crew Available" },
      { value: "✓", label: "Background Checked" },
    ],
    image: "/images/slide4.webp",
    imageAlt: "Jobsite helper Calgary",
    Icon: HardHat,
    floatCard1: { title: "FLAT RATE", body: "$100/hr, no\nhidden fees" },
    floatCard2: { value: "$100", label: "Per hour, all in" },
    floatCard3: { title: "Book Today", sub: "2-hour minimum", stat: "6+", statLabel: "Crew" },
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0D1D46]"
    >
      {/* ── Animated grid lines ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Orange radial glow — desktop only ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#DF5B10]/12 blur-[120px] pointer-events-none z-0 hidden lg:block" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#DF5B10]/8 blur-[80px] pointer-events-none z-0 hidden lg:block" />

      {/* ── Scanning line ── */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DF5B10]/40 to-transparent z-10 pointer-events-none"
        style={{ animation: "scanline 6s linear infinite", top: "30%" }}
      />

      {/* ── Diagonal slash accent ── */}
      <div className="absolute inset-y-0 right-[38%] w-px bg-gradient-to-b from-transparent via-[#DF5B10]/20 to-transparent z-10 hidden lg:block" />

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        loop
        className="min-h-screen"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots — above scroll cue */}
      <div className="hero-pagination absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] text-white/30 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#DF5B10]/60 to-transparent" />
      </motion.div>
    </section>
  );
}

function SlideContent({ slide }) {
  const lineClasses = ["hero-slide-line hero-slide-line-1", "hero-slide-line hero-slide-line-2", "hero-slide-line hero-slide-line-3"];
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center min-h-screen">

      {/* LEFT — Copy */}
      <div>
        {/* Badge */}
        <div className="hero-slide-badge flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DF5B10]/30 bg-[#DF5B10]/8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DF5B10] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DF5B10]" />
            </span>
            <span className="font-heading font-700 text-[#DF5B10] text-xs tracking-widest uppercase">{slide.badge}</span>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#DF5B10] text-[#DF5B10]" />)}
            <span className="font-body text-white/40 text-xs ml-1">500+ reviews</span>
          </div>
        </div>

        {/* Headline — each line clips and slides up */}
        {slide.headline.map((line, i) => (
          <div key={i} className="overflow-hidden mb-3 last:mb-8">
            <div className={lineClasses[i]}>
              <h1
                className="font-heading font-900 text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]"
                style={{ color: slide.headlineColors[i] }}
              >
                {line}
              </h1>
            </div>
          </div>
        ))}

        {/* Description */}
        <p className="hero-slide-desc font-body text-white/55 text-base md:text-lg leading-relaxed max-w-md mb-10">
          {slide.description}
        </p>

        {/* CTAs */}
        <div className="hero-slide-ctas flex flex-wrap gap-3 mb-14">
          <a
            href={slide.cta.href}
            className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#DF5B10] text-white font-heading font-700 text-sm tracking-wide overflow-hidden transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" />
            <Zap size={15} />
            {slide.cta.label}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white font-heading font-700 text-sm tracking-wide hover:bg-white/6 hover:border-white/30 transition-all duration-300"
          >
            Our Services
          </a>
        </div>

        {/* Stats */}
        <div className="hero-slide-stats grid grid-cols-2 sm:flex sm:items-center gap-x-0 gap-y-4">
          {slide.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col sm:pr-6 sm:mr-6 sm:border-r border-white/10 sm:last:border-0 sm:last:mr-0 sm:last:pr-0"
            >
              <span className="font-heading font-900 text-2xl text-white leading-none">{s.value}</span>
              <span className="font-body text-xs text-white/40 mt-0.5 whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Hero image with floating UI elements */}
      <div className="hero-slide-img relative hidden lg:flex items-center justify-center">
        <div className="relative w-[480px] h-[560px]">

          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-[#DF5B10]/20 animate-pulse" style={{ animationDuration: "3s" }} />
          <div className="absolute -inset-3 rounded-[3rem] border border-white/4" />

          {/* Corner brackets — static, no motion */}
          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 border-[#DF5B10] ${cls}`} />
          ))}

          {/* Main image */}
          <div className="absolute inset-2 rounded-[2rem] overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D46]/60 via-transparent to-[#0D1D46]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1D46]/30 to-transparent" />
          </div>

          {/* HUD scan line */}
          <div className="absolute inset-2 rounded-[2rem] overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#DF5B10]/60 to-transparent"
              style={{ animation: "imgScan 4s ease-in-out infinite", top: "40%" }}
            />
          </div>

          {/* Floating card — top left */}
          <div
            className="hero-slide-card-l absolute -left-14 top-16 bg-[#0D1D46]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-44 animate-float"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-heading font-700 text-white text-xs">{slide.floatCard1.title}</span>
            </div>
            <div className="font-body text-white/50 text-[10px] leading-relaxed whitespace-pre-line">
              {slide.floatCard1.body}
            </div>
          </div>

          {/* Floating card — right */}
          <div
            className="hero-slide-card-r absolute -right-12 top-1/3 bg-[#DF5B10] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(223,91,16,0.5)] w-36 animate-float-slow"
          >
            <div className="font-heading font-900 text-3xl text-white leading-none">{slide.floatCard2.value}</div>
            <div className="flex gap-0.5 my-1.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-white text-white" />)}
            </div>
            <div className="font-body text-white/75 text-[10px]">{slide.floatCard2.label}</div>
          </div>

          {/* Floating card — bottom */}
          <div
            className="hero-slide-card-b absolute -bottom-6 left-1/2 bg-[#0D1D46]/90 backdrop-blur-xl border border-[#DF5B10]/30 rounded-2xl px-6 py-3.5 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-max"
          >
            <slide.Icon size={20} style={{ color: "#DF5B10" }} />
            <div>
              <div className="font-heading font-700 text-white text-sm">{slide.floatCard3.title}</div>
              <div className="font-body text-white/45 text-xs">{slide.floatCard3.sub}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="font-heading font-900 text-[#DF5B10] text-lg leading-none">
              {slide.floatCard3.stat}<br />
              <span className="text-white/40 text-xs font-body font-400">{slide.floatCard3.statLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
