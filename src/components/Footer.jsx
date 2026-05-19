import { Phone, Mail, MapPin, Truck } from "lucide-react";
import FooterNewsletter from "./FooterNewsletter";

function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { Icon: IconInstagram, href: "#", label: "Instagram" },
  { Icon: IconFacebook,  href: "#", label: "Facebook"  },
  { Icon: IconX,         href: "#", label: "X"         },
];

const links = {
  Services: ["Delivery", "Moving Services", "Packing & Unpacking", "Office Move", "Junk Removal", "Hourly Labour"],
  Company:  ["About Us", "Why Choose Us", "Service Areas", "Reviews", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D1D46] overflow-hidden">

      {/* ── Newsletter strip ── */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-800 text-xl text-white mb-1">
              Stay Updated with{" "}
              <span style={{ color: "#DF5B10" }}>RDM News</span>
            </h3>
            <p className="font-body text-sm text-white/50">
              Special offers, seasonal tips, and company updates.
            </p>
          </div>
          <FooterNewsletter />
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center
                           shadow-[0_4px_16px_rgba(223,91,16,0.4)]"
              >
                <Truck size={22} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-900 text-lg text-white tracking-wide leading-tight">
                  RDM Enterprises
                </div>
                <div className="font-heading font-600 text-xs tracking-[0.2em] uppercase" style={{ color: "#DF5B10" }}>
                  Delivery Company
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Professional delivery, moving, junk removal, and labour services
              across the Greater Toronto Area. Reliable, insured, and ready
              when you need us.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: Phone,  text: "+1 (647) 123-4567",      href: "tel:+16471234567" },
                { icon: Mail,   text: "info@rdmenterprises.ca", href: "mailto:info@rdmenterprises.ca" },
                { icon: MapPin, text: "Greater Toronto Area, ON", href: "#areas" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <Icon size={14} style={{ color: "#DF5B10" }} className="group-hover:scale-110 transition-transform duration-200" />
                    {item.text}
                  </a>
                );
              })}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center
                             text-white/50 hover:text-white hover:bg-secondary hover:border-secondary transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-heading font-700 text-sm text-white tracking-wider uppercase mb-5">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-sm text-white/45 hover:text-white hover:translate-x-1
                                 transition-all duration-200 inline-block group"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300 rounded-full" />
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30 text-center md:text-left">
            © {new Date().getFullYear()} RDM Enterprises Delivery Company. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-body text-xs text-white/30">
            <span>Built with</span>
            <span style={{ color: "#DF5B10" }}>♥</span>
            <span>for reliable service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
