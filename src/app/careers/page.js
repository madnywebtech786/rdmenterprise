import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CareersHero from "@/components/careers/CareersHero";
import JobListings from "@/components/careers/JobListings";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";

const BASE_URL = "https://www.rdmenterprise.ca";

export const metadata = {
  title: "Careers at RDM enterprise | Join Our Calgary Team",
  description:
    "Join RDM enterprise's growing Calgary team. We're hiring movers, junk removal specialists, and jobsite labour. Competitive pay, flexible hours, and a crew that has your back.",
  keywords: [
    "RDM enterprise jobs",
    "Calgary mover jobs",
    "junk removal jobs Calgary",
    "moving company hiring Calgary",
    "jobsite labour jobs Calgary",
    "Calgary trades jobs",
  ],
  alternates: { canonical: `${BASE_URL}/careers` },
  openGraph: {
    title: "Careers at RDM enterprise | Join Our Calgary Team",
    description: "Join Calgary's most trusted moving crew. Competitive pay, flexible shifts, real growth.",
    url: `${BASE_URL}/careers`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Careers at RDM enterprise Calgary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at RDM enterprise | Join Our Calgary Team",
    description: "Join Calgary's most trusted moving crew. Competitive pay, flexible shifts, real growth.",
    images: ["/og-image.jpg"],
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <CareersHero />
        <JobListings />
        <WhyWorkWithUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
