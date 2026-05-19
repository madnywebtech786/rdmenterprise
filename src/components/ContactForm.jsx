"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import {
  Send, Phone, Mail, MapPin, Clock,
  CheckCircle, Loader2,
} from "lucide-react";
import ServiceSelect from "./ServiceSelect";

const contactInfo = [
  { icon: Phone,  label: "Phone",        value: "+1 (647) 123-4567",      href: "tel:+16471234567" },
  { icon: Mail,   label: "Email",        value: "info@rdmenterprises.ca", href: "mailto:info@rdmenterprises.ca" },
  { icon: MapPin, label: "Service Area", value: "Greater Toronto Area",   href: "#areas" },
  { icon: Clock,  label: "Hours",        value: "Mon to Sat: 7am to 9pm", href: null },
];

/* Animated form field wrapper */
function Field({ children, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactForm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState("idle");
  const [form, setForm]     = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <section id="contact" className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="dot-badge mb-4 inline-flex">Get In Touch</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] mb-4"
            >
              Request a{" "}
              <span style={{ color: "#DF5B10" }}>Free Quote</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/60 text-lg max-w-md mx-auto"
          >
            Fill out the form and we'll get back to you{" "}
            <strong className="text-[#0D1D46]/80 font-700">within a few hours</strong> with a no-obligation quote.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* LEFT sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="flex-1 bg-[#0D1D46] rounded-3xl p-8 relative overflow-hidden flex flex-col">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/8 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {/* Animated corner brackets */}
              {[
                "top-4 left-4 border-t-2 border-l-2 rounded-tl-2xl",
                "top-4 right-4 border-t-2 border-r-2 rounded-tr-2xl",
                "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-2xl",
                "bottom-4 right-4 border-b-2 border-r-2 rounded-br-2xl",
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.07, type: "spring", stiffness: 220, damping: 18 }}
                  className={`absolute w-6 h-6 border-secondary/30 ${cls}`}
                />
              ))}

              <div className="relative z-10 flex flex-col flex-1">
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="font-heading font-800 text-xl text-white mb-1"
                >
                  Contact Information
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.35 }}
                  className="font-body text-white/45 text-sm mb-8"
                >
                  Reach us directly or use the form.
                </motion.p>

                <div className="flex flex-col gap-5">
                  {contactInfo.map((item, i) => {
                    const Icon = item.icon;
                    const inner = (
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0
                                        hover:bg-secondary transition-colors duration-300 group">
                          <Icon size={16} style={{ color: "#DF5B10" }} className="group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <div className="font-body text-xs text-white/35 mb-0.5">{item.label}</div>
                          <div className="font-heading font-700 text-sm text-white">{item.value}</div>
                        </div>
                      </motion.div>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">{inner}</a>
                    ) : (
                      <div key={item.label}>{inner}</div>
                    );
                  })}
                </div>

                {/* Social proof bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75 }}
                  className="mt-auto pt-8 border-t border-white/8"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 shrink-0">
                      <span className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
                      <span className="relative flex h-10 w-10 rounded-full bg-green-400/15 border border-green-400/30 items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-green-400" />
                      </span>
                    </div>
                    <div>
                      <div className="font-heading font-700 text-sm text-white">We respond fast</div>
                      <div className="font-body text-xs text-white/40 mt-0.5">Average reply under 2 hours</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="flex-1 bg-white rounded-3xl p-8 border border-[#e8e4dd] shadow-[0_4px_32px_rgba(13,29,70,0.06)] flex flex-col">

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.45, type: "spring", stiffness: 200, damping: 18 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 18 }}
                      className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={36} className="text-green-500" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-heading font-800 text-2xl text-[#0D1D46] mb-2"
                    >
                      Message Received!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 }}
                      className="font-body text-[#0D1D46]/60 max-w-xs"
                    >
                      We'll get back to you with a quote within 2 hours. Thank you for choosing RDM Enterprises!
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-8 px-6 py-3 rounded-full bg-[#0D1D46] text-white font-heading font-700 text-sm hover:bg-[#1a2f6b] transition-colors"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 flex-1"
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field delay={0.35} inView={inView}>
                        <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
                          Full Name *
                        </label>
                        <input
                          type="text" name="name" required value={form.name} onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 rounded-xl border border-[#e8e4dd] bg-[#f8f7f4] font-body text-sm
                                     text-[#0D1D46] placeholder:text-[#0D1D46]/30 focus:outline-none focus:border-secondary
                                     focus:ring-2 focus:ring-secondary/10 transition-all"
                        />
                      </Field>
                      <Field delay={0.4} inView={inView}>
                        <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+1 (647) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border border-[#e8e4dd] bg-[#f8f7f4] font-body text-sm
                                     text-[#0D1D46] placeholder:text-[#0D1D46]/30 focus:outline-none focus:border-secondary
                                     focus:ring-2 focus:ring-secondary/10 transition-all"
                        />
                      </Field>
                    </div>

                    {/* Email */}
                    <Field delay={0.45} inView={inView}>
                      <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
                        Email Address *
                      </label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#e8e4dd] bg-[#f8f7f4] font-body text-sm
                                   text-[#0D1D46] placeholder:text-[#0D1D46]/30 focus:outline-none focus:border-secondary
                                   focus:ring-2 focus:ring-secondary/10 transition-all"
                      />
                    </Field>

                    {/* Service */}
                    <Field delay={0.5} inView={inView}>
                      <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
                        Service Required *
                      </label>
                      <ServiceSelect
                        value={form.service}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    {/* Message */}
                    <Field delay={0.55} inView={inView}>
                      <div className="flex flex-col flex-1">
                        <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
                          Message and Details *
                        </label>
                        <textarea
                          name="message" required value={form.message} onChange={handleChange}
                          placeholder="Tell us about your job. Location, items, timing..."
                          className="flex-1 w-full px-4 py-3 rounded-xl border border-[#e8e4dd] bg-[#f8f7f4] font-body text-sm
                                     text-[#0D1D46] placeholder:text-[#0D1D46]/30 focus:outline-none focus:border-secondary
                                     focus:ring-2 focus:ring-secondary/10 transition-all resize-none min-h-[100px]"
                        />
                      </div>
                    </Field>

                    {/* Submit button */}
                    <Field delay={0.6} inView={inView}>
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-ripple flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-secondary text-white
                                   font-heading font-700 text-base tracking-wide hover:bg-secondary-light disabled:opacity-70
                                   transition-all shadow-[0_6px_24px_rgba(223,91,16,0.35)] hover:shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
                      >
                        {status === "sending" ? (
                          <><Loader2 size={18} className="animate-spin" />Sending...</>
                        ) : (
                          <><Send size={16} />Send Message and Get Quote</>
                        )}
                      </motion.button>
                    </Field>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
