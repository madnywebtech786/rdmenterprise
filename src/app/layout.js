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
    default: "RDM Enterprises | Calgary Movers – Moving, Junk Removal & Labour",
    template: "%s | RDM Enterprises Calgary",
  },
  description:
    "RDM Enterprises — Calgary's trusted movers. Full-service residential and commercial moving, eco-friendly junk removal, packing, and jobsite labour at $100/hr. Licensed, insured, same-day available across Calgary, Airdrie, Cochrane, Chestermere, Okotoks, and Strathmore.",
  keywords: [
    "Calgary movers",
    "moving company Calgary",
    "moving services Calgary AB",
    "residential moving Calgary",
    "commercial moving Calgary",
    "office moving Calgary",
    "packing and unpacking Calgary",
    "junk removal Calgary",
    "same-day junk removal Calgary",
    "eco-friendly junk removal Calgary",
    "jobsite labour Calgary",
    "hourly movers Calgary",
    "RDM Enterprises Calgary",
    "Airdrie moving company",
    "Cochrane movers",
    "Chestermere moving",
    "Okotoks movers",
    "Strathmore moving company",
    "Calgary moving and junk removal",
    "licensed movers Calgary Alberta",
  ],
  authors: [{ name: "RDM Enterprises" }],
  creator: "RDM Enterprises",
  publisher: "RDM Enterprises",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "RDM Enterprises",
    title: "RDM Enterprises | Calgary Movers – Moving, Junk Removal & Labour",
    description:
      "Calgary's trusted movers. Residential and commercial moving, junk removal, packing, and jobsite labour at $100/hr. Serving Calgary, Airdrie, Cochrane, Chestermere, Okotoks, and Strathmore.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RDM Enterprises – Calgary Moving & Junk Removal Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RDM Enterprises | Calgary Movers – Moving, Junk Removal & Labour",
    description:
      "Calgary's trusted movers. Residential and commercial moving, junk removal, packing, and jobsite labour. Serving Calgary and surrounding Alberta communities.",
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
  "@type": "MovingCompany",
  name: "RDM Enterprises",
  alternateName: "RDM Enterprises Inc.",
  description:
    "Calgary's trusted full-service moving company offering residential moving, commercial moving, office moving, packing and unpacking, eco-friendly junk removal, and jobsite labour at $100/hr.",
  url: BASE_URL,
  telephone: "+18255835070",
  email: "info@rdmenterprises.ca",
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, E-Transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    postalCode: "T2P",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.0447,
    longitude: -114.0719,
  },
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "City", name: "Airdrie" },
    { "@type": "City", name: "Cochrane" },
    { "@type": "City", name: "Chestermere" },
    { "@type": "City", name: "Okotoks" },
    { "@type": "City", name: "Strathmore" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moving & Labour Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Moving Calgary",   url: `${BASE_URL}/services/moving/residential`  } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Moving Calgary",    url: `${BASE_URL}/services/moving/commercial`   } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Moving Calgary",        url: `${BASE_URL}/services/moving/office`        } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Packing and Unpacking Calgary",url: `${BASE_URL}/services/moving/packing`       } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Junk Removal Calgary",         url: `${BASE_URL}/services/junk`                 } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jobsite Labour Calgary",       url: `${BASE_URL}/services/labour`               } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Investor Relations",           url: `${BASE_URL}/services/investors`            } },
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
