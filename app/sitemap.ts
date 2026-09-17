import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/events" || route === "/resources" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/contact" || route === "/core-program" ? 0.9 : 0.7,
  }));
}
