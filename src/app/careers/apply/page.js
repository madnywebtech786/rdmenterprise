import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ApplicationForm from "@/components/careers/ApplicationForm";

const BASE_URL = "https://www.rdmenterprise.ca";

export const metadata = {
  title: "Apply | Careers at RDM enterprise",
  description: "Apply for a position at RDM enterprise. Join Calgary's most trusted moving and junk removal crew.",
  alternates: { canonical: `${BASE_URL}/careers/apply` },
  robots: { index: false }, // application page — no need to index
};

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <ApplicationForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
