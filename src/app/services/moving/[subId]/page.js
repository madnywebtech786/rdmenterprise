import { notFound } from "next/navigation";
import { movingSubServices, getMovingSubServiceById, services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceDetailPage from "@/components/service-detail";

export function generateStaticParams() {
  return movingSubServices.map((s) => ({ subId: s.id }));
}

const BASE_URL = "https://www.rdmenterprise.ca";

export async function generateMetadata({ params }) {
  const { subId } = await params;
  const svc = getMovingSubServiceById(subId);
  if (!svc) return {};
  return {
    title: `${svc.title} in Calgary | RDM enterprise`,
    description: svc.descriptionShort,
    keywords: [
      `${svc.title.toLowerCase()} Calgary`,
      `Calgary ${svc.title.toLowerCase()}`,
      "moving company Calgary",
      "RDM enterprise",
      "Calgary movers",
      "Airdrie movers",
      "Cochrane movers",
      "Chestermere movers",
      "Okotoks movers",
    ].join(", "),
    alternates: { canonical: `${BASE_URL}/services/moving/${svc.id}` },
    openGraph: {
      title: `${svc.title} in Calgary – RDM enterprise`,
      description: svc.descriptionShort,
      url: `${BASE_URL}/services/moving/${svc.id}`,
      images: [{ url: svc.image, width: 1200, height: 800, alt: svc.title }],
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
  const { subId } = await params;
  const svc = getMovingSubServiceById(subId);
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
