import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "Yeti",
      allow: "/"
    },
    // sitemap: "https://www.questionbank.co.kr/sitemap.xml"
  }
}