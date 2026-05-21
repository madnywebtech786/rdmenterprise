import Navbar from "@/components/Navbar";
import AboutPage from "@/components/about";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://www.rdmenterprises.ca";

export const metadata = {
  title: "About RDM Enterprises | Calgary's Trusted Moving Company",
  description:
    "Learn about RDM Enterprises — Calgary's trusted movers since 2016. Our story, mission, team, and values. 5,000+ jobs completed, 98% client satisfaction, fully licensed and insured across Calgary, Airdrie, Cochrane, Chestermere, Okotoks, and Strathmore.",
  keywords: [
    "about RDM Enterprises",
    "Calgary moving company story",
    "trusted movers Calgary",
    "licensed movers Calgary AB",
    "Calgary moving company team",
    "RDM Enterprises reviews",
    "best movers Calgary",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About RDM Enterprises | Calgary's Trusted Moving Company",
    description:
      "Calgary's trusted movers since 2016. 5,000+ jobs completed, 98% client satisfaction. Learn our story, meet the team, and see why Calgary families and businesses choose RDM.",
    url: `${BASE_URL}/about`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RDM Enterprises Team – Calgary Movers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RDM Enterprises | Calgary's Trusted Moving Company",
    description:
      "Calgary's trusted movers since 2016. 5,000+ jobs, 98% satisfaction. Learn our story and meet the team.",
    images: ["/og-image.jpg"],
  },
};

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
