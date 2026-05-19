import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://www.rdmenterprises.ca";

export const metadata = {
  title: "Contact Us | RDM Enterprises",
  description:
    "Get a free quote from RDM Enterprises. Reach out for delivery, moving, junk removal, or hourly labour services across the Greater Toronto Area.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact RDM Enterprises – Free Quote",
    description:
      "Get a free quote for delivery, moving, junk removal, or hourly labour in the GTA. We reply within 2 hours.",
    url: `${BASE_URL}/contact`,
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
