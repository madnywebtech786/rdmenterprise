"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import ServiceSelect, { PROPERTY_TYPE_OPTIONS, JUNK_TYPE_OPTIONS } from "./ServiceSelect";

// RFC 5322 email regex — same as backend
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const MOVING_SERVICES   = ["Residential Moving", "Commercial Moving", "Packing & Unpacking", "Office Moving", "Moving Services"];
const JUNK_SERVICES     = ["Junk Removal"];
const DELIVERY_SERVICES = ["Delivery Service"];

const contactInfo = [
  { icon: Phone,  label: "Phone",        value: "+1 (825) 583-5070",      href: "tel:+18255835070" },
  { icon: Mail,   label: "Email",        value: "info@rdmenterprise.ca", href: "mailto:info@rdmenterprise.ca" },
  { icon: MapPin, label: "Service Area", value: "Calgary & Surrounding",  href: "#areas" },
  { icon: Clock,  label: "Hours",        value: "Mon–Sat: 7am–9pm",       href: null },
];

const EMPTY_FORM = {
  name: "", email: "", phone: "", service: "", message: "",
  movingDate: "", pickupAddress: "", dropoffAddress: "", propertyType: "", junkType: "",
};

// Shared input classes
const inputCls = (err) =>
  `w-full px-4 py-3 rounded-xl border bg-bg font-body text-sm text-[#0D1D46]
   placeholder:text-[#0D1D46]/30 focus:outline-none transition-all
   ${err
     ? "border-red-400 ring-2 ring-red-100 focus:border-red-400"
     : "border-surface-2 focus:border-secondary focus:ring-2 focus:ring-secondary/10"}`;

function Label({ children, required }) {
  return (
    <label className="font-heading font-700 text-xs text-[#0D1D46]/55 uppercase tracking-wider mb-2 block">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <AnimatePresence>
      <motion.p
        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
        className="mt-1.5 text-xs text-red-500 font-body"
      >
        {msg}
      </motion.p>
    </AnimatePresence>
  );
}

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

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isMoving   = MOVING_SERVICES.includes(form.service);
  const isJunk     = JUNK_SERVICES.includes(form.service);
  const isDelivery = DELIVERY_SERVICES.includes(form.service);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    // Reset conditional fields when service changes
    if (name === "service") {
      setForm((f) => ({ ...f, service: value, movingDate: "", pickupAddress: "", dropoffAddress: "", propertyType: "", junkType: "" }));
    }
  }

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!form.email.trim())                               e.email = "Email address is required.";
    else if (!EMAIL_RE.test(form.email.trim()))           e.email = "Please enter a valid email address.";
    if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = "Please enter a valid phone number.";
    if (!form.service)                                    e.service = "Please select a service.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please describe your job (at least 10 characters).";

    if (isMoving || isJunk) {
      if (!form.movingDate)           e.movingDate    = "Please provide a date.";
      if (!form.pickupAddress.trim()) e.pickupAddress = "Pickup address is required.";
    }
    if (isMoving) {
      if (!form.dropoffAddress.trim()) e.dropoffAddress = "Drop-off address is required.";
      if (!form.propertyType)          e.propertyType   = "Please select a property type.";
    }
    if (isJunk) {
      if (!form.junkType) e.junkType = "Please select a junk type.";
    }
    if (isDelivery) {
      if (!form.movingDate)            e.movingDate     = "Please provide a delivery date.";
      if (!form.pickupAddress.trim())  e.pickupAddress  = "Pickup address is required.";
      if (!form.dropoffAddress.trim()) e.dropoffAddress = "Drop-off address is required.";
    }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstKey = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstKey}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("sent");
      } else {
        setErrors(data.errors || { form: "Something went wrong. Please try again." });
        setStatus("idle");
      }
    } catch {
      setErrors({ form: "Network error. Please check your connection and try again." });
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">Get In Touch</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] mb-4"
            >
              Request a <span style={{ color: "#DF5B10" }}>Free Quote</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/8 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {["top-4 left-4 border-t-2 border-l-2 rounded-tl-2xl", "top-4 right-4 border-t-2 border-r-2 rounded-tr-2xl",
                "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-2xl", "bottom-4 right-4 border-b-2 border-r-2 rounded-br-2xl"
              ].map((cls, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.07, type: "spring", stiffness: 220, damping: 18 }}
                  className={`absolute w-6 h-6 border-secondary/30 ${cls}`} />
              ))}

              <div className="relative z-10 flex flex-col flex-1">
                <motion.h3 initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }} className="font-heading font-800 text-xl text-white mb-1">
                  Contact Information
                </motion.h3>
                <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.35 }} className="font-body text-white/45 text-sm mb-8">
                  Reach us directly or use the form.
                </motion.p>

                <div className="flex flex-col gap-5">
                  {contactInfo.map((item, i) => {
                    const Icon = item.icon;
                    const inner = (
                      <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                          <Icon size={16} style={{ color: "#DF5B10" }} />
                        </div>
                        <div>
                          <div className="font-body text-xs text-white/35 mb-0.5">{item.label}</div>
                          <div className="font-heading font-700 text-sm text-white">{item.value}</div>
                        </div>
                      </motion.div>
                    );
                    return item.href
                      ? <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">{inner}</a>
                      : <div key={item.label}>{inner}</div>;
                  })}
                </div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75 }} className="mt-auto pt-8 border-t border-white/8">
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
            <div className="flex-1 bg-white rounded-3xl p-8 border border-surface-2 shadow-[0_4px_32px_rgba(13,29,70,0.06)] flex flex-col">

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, type: "spring", stiffness: 200, damping: 18 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 18 }}
                      className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
                      <CheckCircle size={36} className="text-green-500" />
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                      className="font-heading font-800 text-2xl text-[#0D1D46] mb-2">Quote Request Sent!</motion.h3>
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                      className="font-body text-[#0D1D46]/60 max-w-xs">
                      We'll get back to you within 2 hours. Thank you for choosing RDM enterprise!
                    </motion.p>
                    <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      onClick={() => { setStatus("idle"); setForm(EMPTY_FORM); setErrors({}); }}
                      className="mt-8 px-6 py-3 rounded-full bg-[#0D1D46] text-white font-heading font-700 text-sm hover:bg-primary-light transition-colors">
                      Send Another Request
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 flex-1"
                  >
                    {/* Form-level error */}
                    {errors.form && (
                      <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
                        {errors.form}
                      </div>
                    )}

                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field delay={0.35} inView={inView}>
                        <Label required>Full Name</Label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="John Smith" autoComplete="name"
                          className={inputCls(errors.name)} />
                        <FieldError msg={errors.name} />
                      </Field>
                      <Field delay={0.4} inView={inView}>
                        <Label required>Phone Number</Label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+1 (825) 000-0000" autoComplete="tel"
                          className={inputCls(errors.phone)} />
                        <FieldError msg={errors.phone} />
                      </Field>
                    </div>

                    {/* Email */}
                    <Field delay={0.43} inView={inView}>
                      <Label required>Email Address</Label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" autoComplete="email"
                        className={inputCls(errors.email)} />
                      <FieldError msg={errors.email} />
                    </Field>

                    {/* Service */}
                    <Field delay={0.46} inView={inView}>
                      <Label required>Service Required</Label>
                      <ServiceSelect value={form.service} onChange={handleChange} required />
                      <FieldError msg={errors.service} />
                    </Field>

                    {/* Moving-specific fields */}
                    <AnimatePresence>
                      {isMoving && (
                        <motion.div key="moving-fields"
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col gap-5"
                        >
                          {/* Moving date + property type */}
                          <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                              <Label required>Moving Date</Label>
                              <input type="date" name="movingDate" value={form.movingDate} onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                className={inputCls(errors.movingDate)} />
                              <FieldError msg={errors.movingDate} />
                            </div>
                            <div>
                              <Label required>Property Type</Label>
                              <ServiceSelect name="propertyType" value={form.propertyType} onChange={handleChange}
                                options={PROPERTY_TYPE_OPTIONS} placeholder="Select type..." error={errors.propertyType} />
                              <FieldError msg={errors.propertyType} />
                            </div>
                          </div>
                          <div>
                            <Label required>Pickup Address</Label>
                            <input type="text" name="pickupAddress" value={form.pickupAddress} onChange={handleChange}
                              placeholder="123 Main St, Calgary, AB" autoComplete="street-address"
                              className={inputCls(errors.pickupAddress)} />
                            <FieldError msg={errors.pickupAddress} />
                          </div>
                          <div>
                            <Label required>Drop-off Address</Label>
                            <input type="text" name="dropoffAddress" value={form.dropoffAddress} onChange={handleChange}
                              placeholder="456 Oak Ave, Airdrie, AB"
                              className={inputCls(errors.dropoffAddress)} />
                            <FieldError msg={errors.dropoffAddress} />
                          </div>
                        </motion.div>
                      )}

                      {/* Junk-specific fields */}
                      {isJunk && (
                        <motion.div key="junk-fields"
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col gap-5"
                        >
                          <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                              <Label required>Preferred Date</Label>
                              <input type="date" name="movingDate" value={form.movingDate} onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                className={inputCls(errors.movingDate)} />
                              <FieldError msg={errors.movingDate} />
                            </div>
                            <div>
                              <Label required>Junk Type</Label>
                              <ServiceSelect name="junkType" value={form.junkType} onChange={handleChange}
                                options={JUNK_TYPE_OPTIONS} placeholder="Select type..." error={errors.junkType} />
                              <FieldError msg={errors.junkType} />
                            </div>
                          </div>
                          <div>
                            <Label required>Pickup Address</Label>
                            <input type="text" name="pickupAddress" value={form.pickupAddress} onChange={handleChange}
                              placeholder="123 Main St, Calgary, AB" autoComplete="street-address"
                              className={inputCls(errors.pickupAddress)} />
                            <FieldError msg={errors.pickupAddress} />
                          </div>
                        </motion.div>
                      )}

                      {/* Delivery-specific fields */}
                      {isDelivery && (
                        <motion.div key="delivery-fields"
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col gap-5"
                        >
                          <div>
                            <Label required>Delivery Date</Label>
                            <input type="date" name="movingDate" value={form.movingDate} onChange={handleChange}
                              min={new Date().toISOString().split("T")[0]}
                              className={inputCls(errors.movingDate)} />
                            <FieldError msg={errors.movingDate} />
                          </div>
                          <div>
                            <Label required>Pickup Address</Label>
                            <input type="text" name="pickupAddress" value={form.pickupAddress} onChange={handleChange}
                              placeholder="123 Main St, Calgary, AB" autoComplete="street-address"
                              className={inputCls(errors.pickupAddress)} />
                            <FieldError msg={errors.pickupAddress} />
                          </div>
                          <div>
                            <Label required>Drop-off Address</Label>
                            <input type="text" name="dropoffAddress" value={form.dropoffAddress} onChange={handleChange}
                              placeholder="456 Oak Ave, Airdrie, AB"
                              className={inputCls(errors.dropoffAddress)} />
                            <FieldError msg={errors.dropoffAddress} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <Field delay={0.5} inView={inView}>
                      <Label required>Message and Details</Label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us about your job — location, items, timing, any special requirements..."
                        rows={4}
                        className={`${inputCls(errors.message)} resize-none`} />
                      <FieldError msg={errors.message} />
                    </Field>

                    {/* Required fields note */}
                    <p className="font-body text-xs text-[#0D1D46]/35">
                      Fields marked <span className="text-red-500">*</span> are required.
                    </p>

                    {/* Submit */}
                    <Field delay={0.55} inView={inView}>
                      <motion.button type="submit" disabled={status === "sending"}
                        whileHover={status !== "sending" ? { scale: 1.02, y: -2 } : {}}
                        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                        className="btn-ripple flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-secondary text-white
                                   font-heading font-700 text-base tracking-wide hover:bg-secondary-light
                                   disabled:opacity-60 disabled:cursor-not-allowed
                                   transition-all shadow-[0_6px_24px_rgba(223,91,16,0.35)] hover:shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
                      >
                        {status === "sending"
                          ? <><Loader2 size={18} className="animate-spin" /> Sending...</>
                          : <><Send size={16} /> Send Message and Get Quote</>}
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
