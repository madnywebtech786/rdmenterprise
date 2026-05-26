"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Send, CheckCircle, Loader2, Upload, X, FileText,
  User, Phone, Mail, ArrowLeft,
} from "lucide-react";
import { JOBS } from "@/data/jobs";
import ServiceSelect from "@/components/ServiceSelect";

// RFC 5322 email regex — same as backend
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const JOB_OPTIONS = JOBS.map((j) => ({ value: j.id, label: j.title, Icon: j.icon }));

const EMPTY_FORM = { name: "", phone: "", email: "", message: "", jobId: "" };
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

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

function ResumeDropzone({ file, onFile, onClear, error }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(files) {
    const f = files[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      onFile(null, "Only PDF files are accepted.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      onFile(null, "File must be under 5 MB.");
      return;
    }
    onFile(f, null);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <Label required>Resume (PDF only, max 5 MB)</Label>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/40 bg-secondary/5">
          <FileText size={18} className="text-secondary shrink-0" />
          <span className="font-body text-sm text-[#0D1D46] flex-1 truncate">{file.name}</span>
          <span className="font-body text-xs text-[#0D1D46]/40">{(file.size / 1024).toFixed(0)} KB</span>
          <button type="button" onClick={onClear}
            className="w-6 h-6 rounded-full bg-[#0D1D46]/8 flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors">
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all
                      ${dragging
                        ? "border-secondary bg-secondary/5"
                        : error
                          ? "border-red-400 bg-red-50"
                          : "border-surface-2 bg-bg hover:border-secondary/50 hover:bg-secondary/3"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload size={22} className={`mx-auto mb-2 ${dragging ? "text-secondary" : "text-[#0D1D46]/30"}`} />
          <p className="font-body text-sm text-[#0D1D46]/50">
            Drag and drop your resume, or{" "}
            <span className="text-secondary font-600">browse</span>
          </p>
          <p className="font-body text-xs text-[#0D1D46]/30 mt-1">PDF only, max 5 MB</p>
        </div>
      )}
      <FieldError msg={error} />
    </div>
  );
}

function FormInner() {
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initialJobId = searchParams.get("job") ?? "";
  const initialJob = JOBS.find((j) => j.id === initialJobId) ?? null;

  const [form, setForm] = useState({ ...EMPTY_FORM, jobId: initialJobId });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Update jobId if search param changes on client nav
  useEffect(() => {
    const id = searchParams.get("job") ?? "";
    setForm((f) => ({ ...f, jobId: id }));
  }, [searchParams]);

  const selectedJob = JOBS.find((j) => j.id === form.jobId) ?? null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  function validate() {
    const e = {};
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || name.length < 2)                 e.name    = "Please enter your full name.";
    if (name.length > 100)                         e.name    = "Name is too long.";
    if (!phone || phone.length < 7)               e.phone   = "Please enter a valid phone number.";
    if (phone.length > 30)                         e.phone   = "Phone number is too long.";
    if (!email)                                    e.email   = "Email address is required.";
    else if (!EMAIL_RE.test(email))               e.email   = "Please enter a valid email address.";
    if (!message || message.length < 10)          e.message = "Please include a short message (at least 10 characters).";
    if (message.length > 2000)                    e.message = "Message is too long (max 2000 characters).";
    if (!form.jobId)                               e.jobId   = "Please select the position you're applying for.";
    if (!resume)                                   e.resume  = "Please upload your resume (PDF).";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstKey}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      const fd = new FormData();
      fd.append("name",    form.name.trim());
      fd.append("phone",   form.phone.trim());
      fd.append("email",   form.email.trim());
      fd.append("message", form.message.trim());
      fd.append("jobId",   form.jobId);
      fd.append("resume",  resume);

      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
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
    <section className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <a href="/careers"
            className="inline-flex items-center gap-2 font-body text-sm text-[#0D1D46]/50
                       hover:text-secondary transition-colors">
            <ArrowLeft size={14} /> Back to All Positions
          </a>
        </motion.div>

        {/* Header */}
        <div ref={ref} className="mb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="dot-badge mb-4 inline-flex">
              {selectedJob ? `Applying for: ${selectedJob.title}` : "Apply Now"}
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] mb-4"
            >
              {selectedJob
                ? <>{selectedJob.title}</>
                : <>Join the <span style={{ color: "#DF5B10" }}>Team</span></>
              }
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/55 text-base leading-relaxed max-w-lg"
          >
            Fill out the form below. We review every application and get back to you as soon as possible.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-surface-2 shadow-[0_4px_32px_rgba(13,29,70,0.07)] overflow-hidden"
        >
          <div className="h-1 w-full bg-linear-to-r from-secondary via-secondary-light to-secondary/40" />
          <div className="p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 18 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 18 }}
                    className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
                    <CheckCircle size={36} className="text-green-500" />
                  </motion.div>
                  <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="font-heading font-800 text-2xl text-[#0D1D46] mb-2">
                    Application Submitted!
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                    className="font-body text-[#0D1D46]/55 max-w-sm mb-2">
                    Thank you for applying to RDM enterprise. We'll review your application and reach out as soon as possible.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
                    className="font-body text-sm text-[#0D1D46]/40 max-w-sm mb-8">
                    A confirmation email has been sent to <strong className="text-[#0D1D46]/60">{form.email}</strong>.
                  </motion.p>
                  <motion.a initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    href="/careers"
                    className="px-6 py-3 rounded-full bg-[#0D1D46] text-white font-heading font-700 text-sm
                               hover:bg-primary-light transition-colors">
                    View More Positions
                  </motion.a>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} noValidate encType="multipart/form-data"
                  className="flex flex-col gap-6"
                >
                  {/* Form-level error */}
                  {errors.form && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
                      {errors.form}
                    </div>
                  )}

                  {/* Position selector */}
                  <div>
                    <Label required>Position Applying For</Label>
                    <ServiceSelect
                      name="jobId"
                      value={form.jobId}
                      onChange={handleChange}
                      options={JOB_OPTIONS}
                      placeholder="Select a position..."
                      error={errors.jobId}
                    />
                    <FieldError msg={errors.jobId} />
                  </div>

                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label required>Full Name</Label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1D46]/30 pointer-events-none" />
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="John Smith" autoComplete="name"
                          className={`${inputCls(errors.name)} pl-9`} />
                      </div>
                      <FieldError msg={errors.name} />
                    </div>
                    <div>
                      <Label required>Phone Number</Label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1D46]/30 pointer-events-none" />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+1 (825) 000-0000" autoComplete="tel"
                          className={`${inputCls(errors.phone)} pl-9`} />
                      </div>
                      <FieldError msg={errors.phone} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label required>Email Address</Label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1D46]/30 pointer-events-none" />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" autoComplete="email"
                        className={`${inputCls(errors.email)} pl-9`} />
                    </div>
                    <FieldError msg={errors.email} />
                  </div>

                  {/* Message */}
                  <div>
                    <Label required>Message</Label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us a bit about yourself, your availability, and why you'd be a great fit..."
                      rows={4}
                      className={`${inputCls(errors.message)} resize-none`} />
                    <FieldError msg={errors.message} />
                  </div>

                  {/* Resume upload */}
                  <ResumeDropzone
                    file={resume}
                    onFile={(f, err) => {
                      setResume(f);
                      if (err) setErrors((prev) => ({ ...prev, resume: err }));
                      else setErrors((prev) => { const n = { ...prev }; delete n.resume; return n; });
                    }}
                    onClear={() => { setResume(null); setErrors((prev) => { const n = { ...prev }; delete n.resume; return n; }); }}
                    error={errors.resume}
                  />

                  {/* Required note */}
                  <p className="font-body text-xs text-[#0D1D46]/35">
                    Fields marked <span className="text-red-500">*</span> are required.
                  </p>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={status !== "sending" ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-secondary text-white
                               font-heading font-700 text-base tracking-wide hover:bg-secondary-light
                               disabled:opacity-60 disabled:cursor-not-allowed
                               transition-all shadow-[0_6px_24px_rgba(223,91,16,0.35)]
                               hover:shadow-[0_8px_32px_rgba(223,91,16,0.45)]"
                  >
                    {status === "sending"
                      ? <><Loader2 size={18} className="animate-spin" /> Submitting Application...</>
                      : <><Send size={16} /> Submit Application</>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Wrap in Suspense because useSearchParams requires it in Next.js App Router
export default function ApplicationForm() {
  return (
    <Suspense fallback={
      <div className="section-padding bg-[#f8f7f4] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-secondary" />
      </div>
    }>
      <FormInner />
    </Suspense>
  );
}
