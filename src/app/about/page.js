import Navbar from "@/components/Navbar";
import AboutPage from "@/components/about";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://www.rdmenterprises.ca";

export const metadata = {
  title: "About RDM Enterprises | Our Story, Team & Values",
  description:
    "Learn about RDM Enterprises — our story, mission, team, values, and why thousands of GTA families and businesses trust us for delivery, moving, and junk removal.",
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About RDM Enterprises | Our Story, Team & Values",
    description:
      "Learn about RDM Enterprises — our story, mission, team, values, and why thousands of GTA families and businesses trust us.",
    url: `${BASE_URL}/about`,
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
