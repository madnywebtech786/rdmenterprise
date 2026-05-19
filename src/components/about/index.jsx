"use client";

import AboutHero        from "./AboutHero";
import MissionSection   from "./MissionSection";
import StatsSection     from "./StatsSection";
import ValuesSection    from "./ValuesSection";
import ProcessSection   from "./ProcessSection";
import ServicesOverview from "./ServicesOverview";
import TeamSection      from "./TeamSection";
import TestimonialBanner from "./TestimonialBanner";
import TrustSection     from "./TrustSection";
import FinalCTA         from "./FinalCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <StatsSection />
      <ValuesSection />
      <ProcessSection />
      <ServicesOverview />
      <TeamSection />
      <TestimonialBanner />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
