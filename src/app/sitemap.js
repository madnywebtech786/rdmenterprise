import { services } from "@/data/services";

const BASE_URL = "https://www.rdmenterprises.ca";

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL,           lastModified: new Date(), changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,   lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
  ];

  const servicePages = services.map((svc) => ({
    url: `${BASE_URL}/services/${svc.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}
