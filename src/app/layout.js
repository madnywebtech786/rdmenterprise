import { League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://www.rdmenterprises.ca";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "RDM Enterprises | Delivery, Moving & Junk Removal – GTA",
    template: "%s | RDM Enterprises",
  },
  description:
    "RDM Enterprises — professional delivery, moving services, junk removal, and hourly labour across the Greater Toronto Area. Licensed, insured, same-day available.",
  keywords: [
    "delivery GTA",
    "moving services Toronto",
    "junk removal Toronto",
    "hourly labour GTA",
    "same-day delivery Toronto",
    "office moving GTA",
    "packing and unpacking",
    "RDM Enterprises",
  ],
  authors: [{ name: "RDM Enterprises" }],
  creator: "RDM Enterprises",
  publisher: "RDM Enterprises",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "RDM Enterprises",
    title: "RDM Enterprises | Delivery, Moving & Junk Removal – GTA",
    description:
      "Professional delivery, moving, junk removal, and labour services across the GTA. Licensed, insured, same-day available.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RDM Enterprises – GTA Delivery & Moving Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RDM Enterprises | Delivery, Moving & Junk Removal – GTA",
    description:
      "Professional delivery, moving, junk removal, and labour services across the GTA.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport = {
  themeColor: "#0D1D46",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RDM Enterprises",
  description:
    "Professional delivery, moving, junk removal, and hourly labour services across the Greater Toronto Area.",
  url: BASE_URL,
  telephone: "+16471234567",
  email: "info@rdmenterprises.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7,
    longitude: -79.42,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Greater Toronto Area",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "21:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Delivery" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Moving Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Junk Removal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hourly Labour" } },
    ],
  },
  sameAs: [
    "https://www.facebook.com/rdmenterprises",
    "https://www.instagram.com/rdmenterprises",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${montserrat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
