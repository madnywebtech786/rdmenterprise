import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://www.rdmenterprise.ca";

export const metadata = {
  title: "Contact RDM enterprise | Get a Free Moving Quote – Calgary",
  description:
    "Contact RDM enterprise for a free quote on moving, junk removal, packing, or jobsite labour in Calgary. We reply within 2 hours. Serving Calgary, Airdrie, Cochrane, Chestermere, Okotoks, and Strathmore.",
  keywords: [
    "contact RDM enterprise",
    "free moving quote Calgary",
    "Calgary movers quote",
    "junk removal quote Calgary",
    "book movers Calgary",
    "moving estimate Calgary AB",
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact RDM enterprise | Free Moving Quote – Calgary",
    description:
      "Get a free quote for moving, junk removal, packing, or jobsite labour in Calgary. We reply within 2 hours. Call +1 (825) 583-5070.",
    url: `${BASE_URL}/contact`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact RDM enterprise Calgary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RDM enterprise | Free Moving Quote – Calgary",
    description:
      "Get a free quote for moving, junk removal, or jobsite labour in Calgary. We reply within 2 hours.",
    images: ["/og-image.jpg"],
  },
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
