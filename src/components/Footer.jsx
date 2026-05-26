import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

function IconInstagram() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  { Icon: IconFacebook, href: "#", label: "Facebook" },
  { Icon: IconX, href: "#", label: "X" },
];

const links = {
  Services: [
    "Delivery",
    "Moving Services",
    "Packing & Unpacking",
    "Office Move",
    "Junk Removal",
    "Hourly Labour",
  ],
  Company: ["About Us", "Why Choose Us", "Service Areas", "Reviews", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D1D46] overflow-hidden">
      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <a href="/">
                <div className="bg-white rounded-md border border-surface-2 overflow-hidden w-30 h-16 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="RDM enterprise" width={120} height={120} className="object-contain" loading="lazy" />
                </div>
              </a>
            </div>

            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Professional moving, junk removal, and jobsite labour services
              across Calgary and surrounding Alberta communities. Reliable,
              insured, and ready when you need us.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                {
                  icon: Phone,
                  text: "+1 (825) 583-5070",
                  href: "tel:+18255835070",
                },
                {
                  icon: Mail,
                  text: "info@rdmenterprise.ca",
                  href: "mailto:info@rdmenterprise.ca",
                },
                { icon: MapPin, text: "Calgary, Alberta", href: "#areas" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <Icon
                      size={14}
                      style={{ color: "#DF5B10" }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
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
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-center gap-4">
          <p className="font-body text-xs text-white/30 text-center md:text-left">
            © {new Date().getFullYear()} RDM Enterprise Delivery Company. All
            rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
