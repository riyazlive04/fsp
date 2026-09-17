import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f7",
    theme_color: "#263672",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
