import {
  Truck, PackageOpen, Building2, Trash2,
  HardHat, Zap, MapPin, Leaf, Recycle, Clock, Users,
  CheckCircle2, Shield,
} from "lucide-react";

export const ICON_MAP = {
  Truck, PackageOpen, Building2, Trash2,
  HardHat, Zap, MapPin, Leaf, Recycle, Clock, Users,
  CheckCircle2, Shield,
};

export const services = [
  {
    id: "delivery",
    icon: "Truck",
    title: "Delivery",
    subtitle: "Express and Scheduled",
    tagline: "Fast, tracked, handled with care.",
    descriptionShort: "Fast, reliable delivery for packages of all sizes across the GTA. Same-day slots available. Real-time tracking on every run.",
    descriptionLong: "RDM Enterprises offers same-day and scheduled delivery for parcels, freight, and specialty cargo anywhere across the Greater Toronto Area. Whether it's a single fragile item or a full commercial shipment, our drivers treat every package with the same level of care. You get real-time tracking, proof-of-delivery confirmation, and a direct line to our dispatch team at all times.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
    imageMobile: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=85",
    accent: "#DF5B10",
    num: "01",
    features: ["Same-day delivery", "Real-time tracking", "Fragile handling"],
    sub: [
      { icon: "Zap",    label: "Same-Day Express" },
      { icon: "MapPin", label: "GTA-Wide Coverage" },
    ],
    highlights: [
      { icon: "Zap",          title: "Same-Day Express",     body: "Order by noon and we'll have it there today. Evening slots also available." },
      { icon: "MapPin",       title: "GTA-Wide Coverage",    body: "Toronto, Mississauga, Brampton, Vaughan, Markham, Scarborough and 15+ more cities." },
      { icon: "Shield",       title: "Fully Insured",        body: "Every delivery is covered under our comprehensive cargo liability policy." },
      { icon: "CheckCircle2", title: "Proof of Delivery",    body: "Signature capture and timestamped photo confirmation sent to your inbox." },
    ],
    faqs: [
      { q: "How do I book a same-day delivery?", a: "Call or WhatsApp us before noon. We'll confirm availability and dispatch within the hour." },
      { q: "What size items can you deliver?", a: "Anything from envelopes to large furniture pieces. Just let us know dimensions and weight when booking." },
      { q: "Do you deliver on weekends?", a: "Yes — 7 days a week, including stat holidays. Rates may vary." },
    ],
  },
  {
    id: "moving",
    icon: "PackageOpen",
    title: "Moving Services",
    subtitle: "Residential and Commercial",
    tagline: "Your home, moved with zero stress.",
    descriptionShort: "Full-service moves handled end-to-end. We pack, protect, load, transport, and set up so you don't lift a finger.",
    descriptionLong: "From a single-bedroom apartment to a multi-floor office, RDM handles every aspect of your move. Our crew arrives with all the equipment — boxes, blankets, dollies, straps — and walks you through a pre-move walkthrough to make sure nothing gets missed. We disassemble and reassemble furniture, protect floors and walls, and don't leave until you're satisfied.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    imageMobile: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85",
    accent: "#0D1D46",
    num: "02",
    features: ["Residential moves", "Office relocations", "Furniture assembly"],
    sub: [
      { icon: "PackageOpen", label: "Packing and Unpacking" },
      { icon: "Building2",   label: "Office Move" },
    ],
    highlights: [
      { icon: "PackageOpen",  title: "Full Packing Service",   body: "We bring all materials. Boxes, bubble wrap, tape, furniture blankets — everything included." },
      { icon: "Building2",    title: "Office Relocations",     body: "Staged moves, after-hours crews, IT equipment handling. Zero business downtime." },
      { icon: "Shield",       title: "Floor & Wall Protection", body: "We protect your property throughout the entire move, not just the furniture." },
      { icon: "CheckCircle2", title: "Furniture Assembly",     body: "We disassemble at origin and fully reassemble at destination. IKEA to custom pieces." },
    ],
    faqs: [
      { q: "How far in advance should I book?", a: "1–2 days for small moves, at least a week for large residential or office moves." },
      { q: "Do I need to supply any materials?", a: "No. We bring all boxes, packing materials, and equipment. Nothing to buy." },
      { q: "Can you move specialty items like pianos or safes?", a: "Yes. Let us know at booking so we can send the right crew and equipment." },
    ],
  },
  {
    id: "junk",
    icon: "Trash2",
    title: "Junk Removal",
    subtitle: "Eco-Friendly Disposal",
    tagline: "Gone today. Donated, not dumped.",
    descriptionShort: "Stress-free haul-away from homes, offices, and job sites. We sort, donate, and recycle to keep landfill use minimal.",
    descriptionLong: "Our junk removal team handles everything from single-item pickups to full property clearouts. We sort every load — usable items are donated to local GTA charities, electronics go to certified recyclers, and only what truly can't be reused ends up at the landfill. We provide same-day service on most days and leave the space broom-clean.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
    imageMobile: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85",
    accent: "#DF5B10",
    num: "03",
    features: ["Furniture removal", "Electronics disposal", "Same-day pickup"],
    sub: [
      { icon: "Leaf",    label: "Eco-Responsible" },
      { icon: "Recycle", label: "Donate and Recycle" },
    ],
    highlights: [
      { icon: "Leaf",         title: "Eco-Responsible",       body: "We're a certified disposal partner. Over 70% of what we remove stays out of landfill." },
      { icon: "Recycle",      title: "Donate & Recycle",      body: "Good-condition items go to GTA charities. Electronics are properly recycled." },
      { icon: "Zap",          title: "Same-Day Pickup",       body: "Available most days. Call by 10am and we can usually be there that afternoon." },
      { icon: "CheckCircle2", title: "Full Clearouts",        body: "Basements, attics, garages, entire properties. No job too large." },
    ],
    faqs: [
      { q: "What items do you not take?", a: "Hazardous materials, paint, chemicals, and propane tanks. Everything else is fair game." },
      { q: "Do you donate items?", a: "Yes — everything in usable condition is offered to local charities before disposal." },
      { q: "How is pricing determined?", a: "By volume (how much space in the truck) and access difficulty. Get a free quote before we start." },
    ],
  },
  {
    id: "labour",
    icon: "HardHat",
    title: "Hourly Labour",
    subtitle: "Flexible Crew Hire",
    tagline: "Our crew, your agenda.",
    descriptionShort: "Extra hands when you need them. Trained, vetted labourers available by the hour for loading, unloading, assembly, or any heavy work.",
    descriptionLong: "Sometimes you just need reliable people who show up and work hard. Our hourly labour service puts trained, background-checked crew members at your disposal for any physical task — loading a container, clearing a space, assembling furniture, staging a property, or helping with a DIY project. Billed in 2-hour minimum blocks with no hidden fees.",
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=85",
    imageMobile: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=85",
    accent: "#0D1D46",
    num: "04",
    features: ["Min. 2-hour blocks", "Vetted crew", "Flexible scheduling"],
    sub: [
      { icon: "Clock", label: "Min. 2-Hour Blocks" },
      { icon: "Users", label: "Vetted Crew" },
    ],
    highlights: [
      { icon: "Users",        title: "Background-Checked",    body: "Every crew member passes a full criminal background check before joining RDM." },
      { icon: "Clock",        title: "2-Hour Minimum",        body: "Book the exact time you need. Scale up or down. Billed honestly to the half-hour." },
      { icon: "Shield",       title: "Insured On-Site",       body: "Our crew is covered by workplace insurance throughout every job." },
      { icon: "CheckCircle2", title: "Any Physical Task",     body: "Loading, unloading, assembly, staging, cleaning, heavy lifting — you name it." },
    ],
    faqs: [
      { q: "What's the minimum booking?", a: "2 hours. After that you're billed to the nearest half-hour." },
      { q: "Can I direct the crew myself?", a: "Absolutely. You're in charge. Our team is there to execute your plan." },
      { q: "How many crew members can I book?", a: "1 to 6+. Let us know what the job requires and we'll match the right team size." },
    ],
  },
];

export function getServiceById(id) {
  return services.find((s) => s.id === id) ?? null;
}
