"use client";

import ServiceHero       from "./ServiceHero";
import HighlightsSection from "./HighlightsSection";
import HowItWorksStrip   from "./HowItWorksStrip";
import FaqSection        from "./FaqSection";
import OtherServices     from "./OtherServices";
import BottomCTA         from "./BottomCTA";

export default function ServiceDetailPage({ service: svc, allServices }) {
  return (
    <>
      <ServiceHero svc={svc} />
      <HighlightsSection svc={svc} />
      <HowItWorksStrip serviceName={svc.title} />
      <FaqSection faqs={svc.faqs} />
      <OtherServices allServices={allServices} currentId={svc.id} />
      <BottomCTA svc={svc} />
    </>
  );
}
