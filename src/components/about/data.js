import {
  Award, Clock, Shield, CheckCircle2, Truck, Users, Star,
  Phone, Zap, Heart, Target, Package, Home,
  Building2, Leaf,
} from "lucide-react";

export const stats = [
  { value: 5000, suffix: "+", label: "Jobs Completed",      icon: Package    },
  { value: 500,  suffix: "+", label: "5-Star Reviews",      icon: Star       },
  { value: 98,   suffix: "%", label: "Client Satisfaction", icon: Heart      },
  { value: 100,  suffix: "%", label: "Insured & Licensed",  icon: Shield     },
];

export const team = [
  {
    name: "Rahul D.",
    role: "Founder & Operations Lead",
    bio: "10+ years running logistics across Calgary. Built RDM from 1 truck to a full fleet.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    star: true,
  },
  {
    name: "Danielle M.",
    role: "Customer Experience Manager",
    bio: "Makes sure every job ends with a 5-star review. Your first call, your best call.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    star: false,
  },
  {
    name: "Marcus K.",
    role: "Senior Crew Lead",
    bio: "Leads our best moving crews. No item too fragile, no floor plan too complex.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    star: false,
  },
  {
    name: "Priya S.",
    role: "Logistics & Dispatch",
    bio: "Coordinates every route and schedule so your delivery arrives when we said it would.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    star: false,
  },
];

export const values = [
  { icon: Shield, title: "Reliability", color: "#0D1D46", body: "We show up, on time, every time. No cancellations, no surprises — just dependable service you can count on." },
  { icon: Heart,  title: "Care",        color: "#DF5B10", body: "Every item we touch belongs to someone's home or livelihood. We treat your belongings as if they were our own." },
  { icon: Target, title: "Precision",   color: "#0D1D46", body: "Efficient routes, thorough packing, zero damage. We sweat the details so you don't have to." },
  { icon: Users,  title: "Community",   color: "#DF5B10", body: "We're Calgary-born and Calgary-proud. A portion of every junk removal is donated to local charities." },
  { icon: Zap,    title: "Speed",       color: "#0D1D46", body: "Same-day options, rapid response quotes, crews that move with urgency. Time is money — we respect both." },
  { icon: Award,  title: "Excellence",  color: "#DF5B10", body: "Fully licensed, fully insured, background-checked professionals. The standard everyone claims, we deliver." },
];

export const processSteps = [
  { step: "01", icon: Phone,        title: "Contact Us",      detail: "Available 7 days a week, 8am–8pm",             body: "Call, email, or fill out the form. You'll reach a real person — no bots, no hold music. We respond within 2 hours." },
  { step: "02", icon: Package,      title: "Get Your Quote",  detail: "Quotes sent within 2 hours",                   body: "Tell us what you need. We'll give you a clear, itemised quote with no hidden fees — free of charge, no obligation." },
  { step: "03", icon: Clock,        title: "Book a Time",     detail: "Same-day availability on select services",     body: "Pick a date and window that works for you. Same-day slots available on most services. We confirm your booking instantly." },
  { step: "04", icon: Truck,        title: "We Show Up",      detail: "Fully equipped, uniformed crew",               body: "Our vetted, uniformed crew arrives on time with all equipment and materials needed. Zero delays, zero excuses." },
  { step: "05", icon: CheckCircle2, title: "Job Done Right",  detail: "100% satisfaction guarantee",                  body: "We complete the job to your satisfaction. Everything is documented. If anything isn't perfect, we fix it on the spot." },
  { step: "06", icon: Star,         title: "You Leave a Review", detail: "500+ five-star reviews and counting",       body: "98% of our customers come back or refer a friend. That's the standard we hold ourselves to — every single job." },
];

export const servicesExtended = [
  { icon: Truck,     label: "Delivery",    color: "#DF5B10", tagline: "Fast, tracked, handled with care.",  img: "/images/moving-service.webp",  desc: "Same-day and scheduled parcel & cargo delivery anywhere across Calgary and surrounding communities. Real-time tracking, fragile-item handling, and a crew that treats your goods like their own.",                                     features: ["Same-day express available", "Real-time tracking updates", "Fragile & specialty handling", "Residential & commercial"] },
  { icon: Home,      label: "Moving",      color: "#0D1D46", tagline: "Your home, moved with zero stress.", img: "/images/residential-moving.webp",  desc: "Residential and office relocations with full packing support. We bring boxes, blankets, dollies — everything needed to get you moved in one clean day.",                                                  features: ["Full packing & unpacking", "Furniture disassembly/assembly", "Floor & wall protection", "Same or next day slots"] },
  { icon: Leaf,      label: "Junk Removal",color: "#DF5B10", tagline: "Gone today. Donated, not dumped.",   img: "/images/junk-removal.webp",  desc: "Eco-responsible removal of furniture, appliances, electronics, and construction debris. We sort everything — good condition items go to charity, the rest gets recycled.",                                features: ["Same-day pickup slots", "Eco-certified disposal", "Donation to local charities", "Construction debris OK"] },
  { icon: Users,     label: "Hourly Labour",color: "#0D1D46",tagline: "Our crew, your agenda.",              img: "/images/job-site-helper.webp", desc: "Vetted crew members available by the hour for loading, unloading, heavy lifting, assembly, or any physical task you need done. Minimum 2-hour blocks.",                                                   features: ["Min. 2-hour blocks", "Background-checked crew", "Flexible scheduling", "Any physical task"] },
  { icon: Building2, label: "Office Move", color: "#DF5B10", tagline: "Minimal downtime. Maximum care.",    img: "/images/office-moving.webp", desc: "We plan and execute office relocations around your schedule — evenings, weekends, staged moves. IT equipment, furniture, files: all handled with zero disruption to your team.",                            features: ["After-hours & weekend moves", "IT equipment handling", "Floor plan coordination", "Staged multi-day moves"] },
  { icon: Package,   label: "Packing",     color: "#0D1D46", tagline: "We pack it right. Nothing breaks.",  img: "/images/packing-unpacking.webp", desc: "Full packing and unpacking service with all materials included — boxes, bubble wrap, packing paper, tape, and furniture blankets. You don't need to buy a thing.",                                        features: ["All supplies included", "Room-by-room labelling", "Fragile item specialists", "Unpacking service too"] },
];

export const certifications = [
  "Licensed & Bonded in Alberta",
  "Comprehensive Liability Insurance",
  "Background-Checked Crew",
  "WCB Alberta Certified",
  "GDPR-Compliant Data Handling",
  "Eco-Certified Disposal Partner",
];

export const trustPoints = [
  { icon: Shield,       title: "Fully Insured",             body: "Comprehensive liability insurance covers every job, every time. Your belongings are protected." },
  { icon: Award,        title: "Licensed & Bonded",         body: "Fully licensed to operate in Alberta with all required certifications and compliance." },
  { icon: CheckCircle2, title: "Background-Checked Crew",   body: "Every crew member passes a full criminal background check before they set foot in your home." },
  { icon: Clock,        title: "On-Time Guarantee",         body: "We commit to a window and we show up. If we're late, we make it right." },
  { icon: Leaf,         title: "Eco-Responsible",           body: "We partner with certified recyclers and charities so your junk doesn't all end up in a landfill." },
  { icon: Phone,        title: "Real Humans, Real Support", body: "Call, email, or WhatsApp. You'll reach a real person every time — no bots, no call centres." },
];

export const testimonials = [
  { text: "They moved our entire office in one day with zero downtime. Absolutely incredible.", author: "James T.", role: "Business Owner" },
  { text: "Same-day delivery, careful handling, friendly crew. I use RDM for everything now.",  author: "Sarah L.", role: "Homeowner"      },
  { text: "The junk removal team donated half our stuff instead of dumping it. That matters to me.", author: "Omar K.", role: "Tenant"    },
];
