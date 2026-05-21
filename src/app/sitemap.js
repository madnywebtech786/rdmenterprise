import { services, movingSubServices } from "@/data/services";

const BASE_URL = "https://www.rdmenterprise.ca";

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL,                  lastModified: new Date(), changeFrequency: "weekly",   priority: 1.0 },
    { url: `${BASE_URL}/about`,       lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/contact`,     lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
  ];

  const servicePages = services.map((svc) => ({
    url: `${BASE_URL}/services/${svc.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const movingSubPages = movingSubServices.map((svc) => ({
    url: `${BASE_URL}/services/moving/${svc.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages, ...movingSubPages];
}
