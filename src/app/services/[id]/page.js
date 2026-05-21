import { notFound } from "next/navigation";
import { services, getServiceById } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceDetailPage from "@/components/service-detail";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

const BASE_URL = "https://www.rdmenterprise.ca";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const svc = getServiceById(id);
  if (!svc) return {};
  return {
    title: `${svc.title} in Calgary, AB | RDM enterprise`,
    description: svc.descriptionShort,
    keywords: [
      `${svc.title.toLowerCase()} Calgary`,
      `Calgary ${svc.title.toLowerCase()}`,
      `${svc.title.toLowerCase()} Calgary AB`,
      "RDM enterprise Calgary",
      "moving company Calgary",
      "Airdrie movers",
      "Cochrane movers",
      "Chestermere movers",
      "Okotoks movers",
    ],
    alternates: { canonical: `${BASE_URL}/services/${svc.id}` },
    openGraph: {
      title: `${svc.title} in Calgary – RDM enterprise`,
      description: svc.descriptionShort,
      url: `${BASE_URL}/services/${svc.id}`,
      images: [{ url: svc.image, width: 1200, height: 800, alt: `${svc.title} – RDM enterprise Calgary` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.title} in Calgary – RDM enterprise`,
      description: svc.descriptionShort,
      images: [svc.image],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const svc = getServiceById(id);
  if (!svc) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetailPage service={svc} allServices={services} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
